/* eslint-disable */
import Controller from './controller'
import Model from './model'
import View from './view'
import 'normalize.css';
import '../styles/main.sass';

document.addEventListener('DOMContentLoaded', e => {
  const TodoList = new Controller(new Model(), new View());
});
