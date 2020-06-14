import $ from 'jQuery';
import { generateID } from './helpers/generateID';

export default class Task {
  constructor (name) {
    this.id = generateID();
    this.name = name;
    this.done = false;
    this.renderToDOM();
  }

  initElements () {
  }

  initEvents () {
  }

  renderToDOM () {
    const template = require('./../templates/task.handlebars');
    const rendered = template(this)
    $('.js-todolist').append(rendered);
  }
}
