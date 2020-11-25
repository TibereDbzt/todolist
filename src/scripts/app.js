import '../styles/main.sass';
import Controller from './controller'
import Model from './model';
import View from './view';

document.addEventListener('DOMContentLoaded', e => {
  const TodoList = new Controller(new View(), new Model());
});
