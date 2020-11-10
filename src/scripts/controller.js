/* eslint-disable */
export default class Controller {
    constructor (model, view) {
        this.model = model;
        this.view = view;

        // Sends to the model the callback function to be called when data has changed
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

    // Triggered by the model when data has changed
    onListChanged (tasks) {
        this.view.displayList(tasks);
    }

    // Triggered by the view when a task has been sorted
    handleSortTasks (ids) {
        this.model.sortTasks(ids);
    }

    // Triggered by the view when a task has been added
    handleAddTask (name) {
        this.model.addTask(name);
    }

    // Triggered by the view when a task has been edited
    handleEditTask (id, name_updated) {
        this.model.editTask(id, name_updated);
    }
    
    // Triggered by the view when a task has been toggled
    handleToggleTask (id) {
        this.model.toggleTask(id);
    }

    // Triggered by the view when a task has been deleted
    handleDeleteTask (id) {
        this.model.deleteTask(id);
    }
}