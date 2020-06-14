import $ from 'jquery';
import Task from './task';

export default class TodoList {
  constructor () {
    this.tasks = [];
    this.initElements();
    this.initEvents();
  }

  initElements () {
    this.inputTask = $('#input_add-task');
    this.deleteBtns = $('.js-delete_btn');
    this.todoList = $('.js-todolist');
  }

  initEvents () {
    this.inputTask.keypress( (event) => {
      if (event.which === 13) {
        const taskName = this.inputTask.val();
        this.addTask(taskName);
        this.inputTask.val('');
      }
    });
    this.todoList.on('click', (event) => {
      const element = $(event.target);
      const task = element.closest('.js-task');
      if (element.hasClass('js-task_name')) {
        this.checkTask(task);
      } else if (element.hasClass('js-delete_btn')) {
        this.deleteTask(task);
      } else if (element.hasClass('js-edit_btn')) {
        this.editTask(task);
      } else if (element.hasClass('js-paint_btn')) {
        this.labelTask(task);
      } else {
        this.displayError();
      }
    })
  }

  addTask (name) {
    name !== '' ? this.tasks.push(new Task(name)) : this.displayError();
    console.log(this);
  }

  checkTask (element) {
    $(element).toggleClass('done');
  }

  deleteTask (element) {
    $(element).remove();
  }
}
