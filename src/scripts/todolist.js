import $ from 'jquery';
import 'jquery-ui-bundle';
import { generateID } from './helpers/generateID';
import { manageInputText } from './helpers/manageInputText';

const ENTER_KEY = 13;

export default class TodoList {
  constructor () {
    this.tasks = this.storeOrRetrieveTodoList();
    this.taskTemplate = require('./../templates/task.handlebars');
    manageInputText('.input-text', 'grabbed');
    this.manageTime();
    this.renderTimeAndDate();
    this.initElements();
    this.initEvents();
    this.renderTasks();
  }

  initElements () {
    this.$inputTask = $('.js-input_task');
    this.$todoList = $('.js-todolist');
    this.$inputLabel = $('.js-input_label');
    this.$labelsList = $('.js-labels_list');
  }

  initEvents () {
    this.$todoList.sortable({
      update: (event, ui) => {
        this.orderTasks(event, ui);
      }
    });
    this.$inputTask.on('keyup', this.createTask.bind(this));
    this.$todoList
      .on('click', '.js-task_name', this.toggleTask.bind(this))
      .on('click', '.js-delete_btn', this.deleteTask.bind(this))
      .on('click', '.js-edit_btn', this.editTask.bind(this));
    this.$inputLabel.on('keypress', (e) => {
      if (e.which === 13) {
        const labelName = this.inputLabel.val();
        this.addLabel(labelName);
        this.$inputLabel.val('');
      }
    });
  }

  orderTasks (e, ui) {
    // $('.js-task').each( (i, elem) => {
    //   const index = this.getIndexOfTask(elem);
    //   const position = { positon: $('.js-task').index(elem) };
    //   $.extend(this.tasks[index], position);
    // });
    let tasks_id = [];
    $('.js-task').each( (i, elem) => {
      tasks_id.push($(elem).data('id'));
    });
    console.log(tasks_id.indexOf(this.tasks[0].id));
    console.log(this.tasks);
    // console.log(typeof this.tasks[0].position);
    this.tasks.sort((a, b) => console.log(tasks_id.indexOf(a.id)));
    console.log(this.tasks);
  }

  storeOrRetrieveTodoList (todolist) {
    if (arguments.length) {
      localStorage.setItem('todolist', JSON.stringify(todolist));
    } else {
      const stored = JSON.parse(localStorage.getItem('todolist'));
      return stored || [];
    }
  }

  createTask (e) {
    const $input = $(e.target);
    const value = $input.val();
    if (e.which !== ENTER_KEY || !value) {
      return;
    }
    this.tasks.push({
      id: generateID(),
      name: value,
      completed: false
    });
    $input.val('');
    console.log(this.tasks);
    this.renderTasks();
  }

  renderTasks () {
    const tasks = [...this.tasks];
    const rendered = this.taskTemplate(tasks);
    this.$todoList.html(rendered);
    this.storeOrRetrieveTodoList(tasks);
  }

  toggleTask (e) {
    const i = this.getIndexOfTask(e.target);
    const task = this.tasks[i];
    task.completed = !task.completed;
    $(e.target.closest('.js-task')).toggleClass('completed');
    this.renderTasks();
  }

  deleteTask (e) {
    this.tasks.splice(this.getIndexOfTask(e.target), 1);
    this.renderTasks();
  }

  getIndexOfTask (el) {
    const id = $(el).closest('.js-task').data('id');
    let i = this.tasks.length;
    while (i--) {
      if (this.tasks[i].id === id) {
        return i;
      }
    }
  }

  editTask(task) {
    console.log(task);
  }

  manageTime () {
    let start_minute = new Date().getMinutes();
    setInterval( () => {
      const current_minute = new Date().getMinutes();
      if (current_minute > start_minute) {
        start_minute = current_minute;
        this.renderTimeAndDate();
      }
    }, 1000);
  }

  renderTimeAndDate () {
    const time = new Date().toLocaleTimeString('en-GB', {minute: '2-digit', hour: '2-digit', hour12: true});
    const date = new Date().toLocaleDateString('en-GB', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
    let split_time = String(time).split(':');
    $('.js-time').html(`${split_time[0]}<span>:</span>${split_time[1]}`);
    $('.js-date').html(date);
  }

  // addLabel (name) {
  //   if (name !== '') {
  //     const template = require('./../templates/label.handlebars');
  //     let label = {name: name}
  //     this.labelsList.append(label);
  //   } else {
  //     this.displayError('miss-label_name');
  //   }
  // }

  // displayError (error) {
  //   const template = require('./../templates/error.handlebars');
  //   let alert = {name: '', message: ''};
  //   switch (error) {
  //     case 'miss-task_name':
  //       alert.name = 'No task name !';
  //       alert.message = 'Please name your task before adding it to the TodoList.';
  //     case 'miss-label_name':
  //       alert.name = 'No label name !';
  //       alert.message = 'Please name your label before adding it to the list.';
  //   }
  //   alert = template(alert);
  //   $('body').append(alert);
  //   $('.error').delay(3500).fadeOut(1000, () => {
  //     $('.error').remove();
  //   });
  // }
}
