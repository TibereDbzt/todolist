/* eslint-disable */

import { Sortable } from 'sortablejs';
import { focusLastChar } from './helpers/focusLastChar';
import { manageInputText } from './helpers/manageInputText';
import { hoverToggle } from './helpers/hoverToggle';

export default class View {
    constructor () {
        // Fire events on inputs text by passing default and hover classes.
        manageInputText('.input-text', 'grabbed');
        
        // Get HTML templates.
        this.taskTemplate = require('./../templates/task.handlebars');
        this.errorTemplate = require('./../templates/error.handlebars');

        // Init DOM elements to trigger events on them.
        this.time = document.querySelector('.js-time');
        this.date = document.querySelector('.js-date');
        this.formTask = document.querySelector('.js-form_task');
        this.inputTask = document.querySelector('.js-input_task');
        this.todoList = document.querySelector('.js-todolist');
        this.tasks = document.getElementsByClassName('js-task');
        this.alertsContainer = document.querySelector('.js-alerts_container');

        // Init view states.
        this.taskEditing = false;
        this.renderTimeAndDate();
    }

    // ======================================================================
    // RENDERING METHODS : triggered by the controller to display new data.
    // ======================================================================
    
    // Trigger when minute has changed. Render time and date.
    renderTimeAndDate () {
        const time = new Date().toLocaleTimeString('en-GB', {minute: '2-digit', hour: '2-digit', hour12: true});
        const date = new Date().toLocaleDateString('en-GB', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
        const split_time = String(time).split(':');
        this.time.innerHTML = `${split_time[0]}<span>:</span>${split_time[1]}`;
        this.date.innerHTML = date;
    }

    // Trigger when data from model has changed. Render all the todolist.
    renderList (tasks) {
        while (this.todoList.firstChild) {
            this.todoList.removeChild(this.todoList.firstChild);
        }
        const list = this.taskTemplate(tasks);
        this.todoList.innerHTML = list;
    }
    
    // Trigger when controller detects an error. Render error alert.
    renderError (name, msg) {
        const alert = this.errorTemplate({name: name, message: msg});
        this.alertsContainer.innerHTML = alert;
        setTimeout( () => {
            this.alertsContainer.removeChild(this.alertsContainer.firstChild);
        }, 3500)
    }
    
    // ==================================================================
    // BINDING METHODS : binds a user action to a controller method.
    // ==================================================================
    
    // Bind new tasks order. Passes to controller the new object tasks ids ordered.
    bindSortTasks (handler) {
        Sortable.create(this.todoList, {
            delay: 10,
            animation: 200,
            easing: "cubic-bezier(1, 0, 0, 1)",
            ghostClass: "sortable-ghost",
            filter: '.js-task_name',
            preventOnFilter: false,
            
            onEnd: (e) => {
                let ids = [];
                Object.values(this.tasks).forEach( (task) => {
                    ids.push(task.dataset.id);
                });
                
                handler(ids);
            }
        });
    }

    // Bind an new task. Passes to controller the task name.
    bindAddTask (handler) {
        this.formTask.addEventListener('submit', e => {
            e.preventDefault();
            const name = this.inputTask.value;
            handler(name);
            this.inputTask.value = null;
        });
    }
    
    // Bind an edited task. Passes to controller the task id and the new task name.
    bindEditTask (handler) {
        this.todoList.addEventListener('click', e => {
            if (e.target.classList.contains('js-edit_btn')) {
                const task_name = e.target.closest('.js-task').querySelector('.js-task_name');
                
                this._togglePointerEvents(task_name);
                focusLastChar(task_name);
                task_name.addEventListener('keypress', e => {
                    if (e.which === 13) task_name.blur();
                });
            }
        });
        this.todoList.addEventListener('focusout', e => {
            if (e.target.classList.contains('js-task_name')) {
                const input = e.target;
                const edited_name = input.value;
                const id = input.closest('.js-task').dataset.id;
                
                this._togglePointerEvents(input);
                handler(id, edited_name);
            }
        });
    }
    
    // Bind a toggled task. Passes to the controller the task id.
    bindToggleTask (handler) {
        this.todoList.addEventListener('click', e => {
            if (e.target.classList.contains('js-task') && !this.taskEditing) {
                const id = e.target.dataset.id;
                
                handler(id);
            }
        });
    }
    
    // Bind a deleted task. Passes to the controller the task id.
    bindDeleteTask (handler) {
        this.todoList.addEventListener('click', e => {
            if (e.target.classList.contains('js-delete_btn')) {
                const id = e.target.closest('.js-task').dataset.id;
                
                handler(id);
            }
        });
    }

    // ==================================================================
    // PRIVATE METHODS : solves particular problems inside to the view
    // ==================================================================

    // Solves the problem of event priorities between toggleTask and SortableJS.
    _togglePointerEvents (input) {
        this.taskEditing = !this.taskEditing;
        this.taskEditing ? input.style.pointerEvents = 'all' : input.style.pointerEvents = 'none';
    }
}
