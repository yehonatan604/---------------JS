import { Task } from "../models/Task.model.js";

export class DomService {
    taskContent = document.querySelector("#taskContent");
    AddBtn = document.querySelector("#AddBtn");
    tasksTable = document.querySelector("#tasksTable");
    tbody = document.getElementsByTagName("tbody")[0];
    rows = document.getElementsByTagName("tr");

    #tasks = [];
    #storage;

    constructor(localStorageService) {
        if (localStorageService) {
            this.#storage = localStorageService;
            this.#tasks = localStorageService.getData();
            this.fillTable();

            this.AddBtn.addEventListener('click', () => {
                const task = new Task(this.taskContent.value);
                this.addRow(task);
            });

        } else {
            throw new Error('you must provide LocalStorageService to create instance!!!');
        }
    }

    addIcons = (row) => {
        let cell = row.insertCell();

        let icons = document.createElement("div");
        let trash = document.createElement("i");
        let pencil = document.createElement("i");

        trash.className = 'fa fa-trash pr-4';
        pencil.className = 'fa fa-pencil pl-4';

        trash.addEventListener('click', () => {
            const filteredTasks = this.#tasks.filter((item) => {
                return item.id != row.cells[0].textContent;
            });
            this.removeRow(row, filteredTasks);
        });

        icons.appendChild(trash);
        icons.appendChild(pencil);

        cell.appendChild(icons);
    }

    fillTable = () => {
        this.resetTable();
        for (let item of this.#tasks) {
            let row = this.tasksTable.insertRow();
            for (const key in item) {
                let cell = row.insertCell();
                let text = document.createTextNode(item[key]);
                cell.appendChild(text);
            }
            this.addIcons(row);
        }
    }

    resetTable = () => {
        for (let i = this.rows.length - 1; i >= 1; i--) {
            const row = this.rows[index];
            this.removeRow(row);
        }
    }

    addRow = (task) => {
        let row = this.tasksTable.insertRow();
        for (const key in task) {
            let cell = row.insertCell();
            let text = document.createTextNode(task[key]);
            cell.appendChild(text);
        }
        this.addIcons(row);

        this.#tasks.push(task);
        this.#storage.updateData(this.#tasks);
        this.taskContent.value = '';
    }

    removeRow = (row, currTasks) => {
        row.parentNode.removeChild(row);
        this.#tasks = currTasks;
        this.#storage.updateData(this.#tasks);
    }
}