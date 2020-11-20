/* eslint-disable*/

export default class Controller {
    constructor (view, model) {
        this.view = view;
        this.model = model;

        // Sends to the model the callback function to be called when data has changed
        this.model.bindTimeChanged(this.onTimeChanged.bind(this));
        this.model.bindListChanged(this.onListChanged.bind(this));

        // Sends to the view the callback functions to be called when an event is triggered
        this.view.bindSortTasks(this.handleSortTasks.bind(this));
        this.view.bindAddTask(this.handleAddTask.bind(this));
        this.view.bindEditTask(this.handleEditTask.bind(this));
        this.view.bindToggleTask(this.handleToggleTask.bind(this));
        this.view.bindDeleteTask(this.handleDeleteTask.bind(this));

        // Init with stored data
        this.onListChanged(this.model.tasks);
    }
    
    // ===================================================================
    // DATA CHANGES METHODS : triggered by model wehn data has changed.
    // ===================================================================
    
    // Triggered by the model when minute has changed
    onTimeChanged () {
        this.view.renderTimeAndDate();
    }

    // Triggered by the model when data has changed
    onListChanged (tasks) {
        this.view.renderList(tasks);
    }

    // ================================================================
    // HANDLING METHODS : triggered by binding methods of the view.
    // ================================================================

    // Triggered by the view when a task has been sorted
    handleSortTasks (ids) {
        this.model.sortTasks(ids);
    }

    // Triggered by the view when a task has been added
    handleAddTask (task_name) {
        task_name ? this.model.addTask(task_name) : this._handleError('No Task Name', 'Please name your task before adding it to the TodoList.');
    }

    // Triggered by the view when a task has been edited
    handleEditTask (task_id, new_task_name) {
        this.model.editTask(task_id, new_task_name);
    }
    
    // Triggered by the view when a task has been toggled
    handleToggleTask (id) {
        this.model.toggleTask(id);
    }

    // Triggered by the view when a task has been deleted
    handleDeleteTask (id) {
        this.model.deleteTask(id);
    }

    // =========================================================================
    // PRIVATE METHODS : solves particular problems inside to the controller.
    // =========================================================================

    // Triggered by the controller when view can't communicate with model or vice versa because of data problems
    _handleError (name, msg) {
        this.view.renderError(name, msg);
    }
}