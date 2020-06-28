import $ from 'jquery';
import { generateID } from './helpers/generateID';
import { manageInputText } from './helpers/manageInputText';

const ENTER_KEY = 13;

export default class TodoList {
  constructor () {
    this.tasks = [];
    this.taskTemplate = require('./../templates/task.handlebars');
    manageInputText('.input-text', 'grabbed');
    this.initElements();
    this.initEvents();
  }

  initElements () {
    this.$inputTask = $('.js-input_add_task');
    this.$todoList = $('.js-todolist');
    this.$inputLabel = $('.js-input_add_label');
    this.$labelsList = $('.js-labels_list');
  }

  initEvents () {
    this.$inputTask.on('keyup', this.createTask.bind(this));
    this.$todoList
      .on('click', '.js-task_name', this.toggleTask.bind(this))
      .on('click', '.js-delete_btn', this.deleteTask.bind(this));
    this.$inputLabel.keypress( (e) => {
      if (e.which === 13) {
        const labelName = this.inputLabel.val();
        this.addLabel(labelName);
        this.inputLabel.val('');
      }
    });
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
    this.render();
  }

  render () {
    const tasks = [...this.tasks];
    const rendered = this.taskTemplate(tasks);
    this.$todoList.html(rendered);
  }

  toggleTask (e) {
    const i = this.getIndexOfTask(e.target);
    const task = this.tasks[i];
    task.completed = !task.completed;
    $(e.target.closest('.js-task')).toggleClass('completed');
  }

  deleteTask (e) {
    this.tasks.splice(this.getIndexOfTask(e.target), 1);
    this.render();
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
