import $ from 'jquery';
import TodoList from './todolist';
import 'normalize.css';
import '../styles/main.sass';

$(document).ready( () => {
  new TodoList();
});
