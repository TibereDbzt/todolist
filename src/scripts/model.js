/* eslint-disable */

const { generateID } = require("./helpers/generateID");

export default class Model {
    constructor () {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }
    
    // ==================================================
    // BINDING METHODS : binds a data or time change
    // ==================================================

    // Callback passed by controller on init. Called when data in the model have changed
    bindListChanged (callback) {
        this.onListChanged = callback;
    }

    // Test if minute has changed. If so, call the onTimeChanged method of the controller.
    bindTimeChanged (callback) {
        let start_minute = new Date().getMinutes();
        setInterval( () => {
            const current_minute = new Date().getMinutes();
            if (current_minute > start_minute) {
                start_minute = current_minute;
                callback();
            }
        }, 1000);
    }

    // =================================================
    // HANDLING METHODS : modify the tasks properties
    // =================================================

    // Triggered by the controller when a task has been sorted.
    sortTasks(ids) {
        let sorted = [];
        ids.forEach(id => {
            this.tasks.map( task => {
                if (id === task.id) sorted.push(task);
            });
        });
        this.tasks = [...sorted];

        this._store(this.tasks);
    }

    // Triggered by the controller when a new task has been added.
    addTask (name) {
        const task =  {
            id: generateID(),
            name: name,
            complete: false,
            index: this.tasks.length
        };
        this.tasks.push(task);

        this._store(this.tasks);
    }
    
    // Triggered by the controller when a task has been edited.
    editTask (id, updated_name) {
        this.tasks = this.tasks.map( task => {
            // task.id === id ? {id: task.id, name: updated_name, complete: task.complete} : task;
            if (task.id === id) {
                return {id: task.id, name: updated_name, complete: task.complete, index: task.index};
            } else {
                return task;
            }
        });

        this._store(this.tasks);
    }
    
    // Triggered by the controller when a task has been toggled.
    toggleTask (id) {
        this.tasks = this.tasks.map( task => {
            // task.id === id ? {id: task.id, name: task.name, complete: !task.complete} : task;
            if (task.id === id) {
                return {id: task.id, name: task.name, complete: !task.complete, index: task.index};
            } else {
                return task;
            }
        });

        this._store(this.tasks);
    }

    // Triggered by the controller when a task has been deleted.
    deleteTask (id) {
        this.tasks = this.tasks.filter((task) => task.id !== id);

        this._store(this.tasks);
    }

    // ==================================================================
    // PRIVATE METHODS : solves particular problems inside to the view
    // ==================================================================
    
    // Trigger the controller when data has changed and store tasks into local storage.
    _store (tasks) {
        this.onListChanged(tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}