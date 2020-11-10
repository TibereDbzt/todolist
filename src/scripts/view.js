/* eslint-disable */
import { focusLastChar } from './helpers/focusLastChar';
import { Sortable } from 'sortablejs';
import { manageInputText } from './helpers/manageInputText';
import { hoverToggle } from './helpers/hoverToggle';

export default class View {
    constructor () {
        manageInputText('.input-text', 'grabbed');
        this.taskTemplate = require('./../templates/task.handlebars');
        this.formTask = document.querySelector('.js-form_task');
        this.inputTask = document.querySelector('.js-input_task');
        this.todoList = document.querySelector('.js-todolist');
        this.tasks = document.getElementsByClassName('js-task');
    }

    displayList (tasks) {
        while (this.todoList.firstChild) {
            this.todoList.removeChild(this.todoList.firstChild);
        }
        const list = this.taskTemplate(tasks);
        this.todoList.innerHTML = list;
    }

    bindSortTasks (handler) {
        Sortable.create(this.todoList, {
            delay: 10,
            animation: 200,
            easing: "cubic-bezier(1, 0, 0, 1)",
            ghostClass: "sortable-ghost",

            onEnd: (e) => {
                let ids = [];
                Object.values(this.tasks).forEach( (task) => {
                    ids.push(task.dataset.id);
                });

                handler(ids);
            }
        });
    }

    bindAddTask (handler) {
        this.formTask.addEventListener('submit', e => {
            e.preventDefault();
            if (this.inputTask.value) {
                handler(this.inputTask.value);
                this.inputTask.value = null;
            }
        });
    }

    bindEditTask (handler) {
        this.todoList.addEventListener('click', e => {
            if (e.target.classList.contains('js-edit_btn')) {
                const task_name = e.target.closest('.js-task').querySelector('.js-task_name');

                focusLastChar(task_name);
            }
        });
        this.todoList.addEventListener('focusout', e => {
            if (e.target.classList.contains('js-task_name')) {
                const edited_name = e.target.value;
                const id = e.target.closest('.js-task').dataset.id;
                
                handler(id, edited_name);
            }
        });
    }

    bindToggleTask (handler) {
        this.todoList.addEventListener('click', e => {
            if (e.target.classList.contains('js-task')) {
                const id = e.target.dataset.id;

                handler(id);
            }
        });
    }

    bindDeleteTask (handler) {
        this.todoList.addEventListener('click', e => {
            if (e.target.classList.contains('js-delete_btn')) {
                const id = e.target.closest('.js-task').dataset.id;

                handler(id);
            }
        });
    }
}
