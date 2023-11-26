import { Task } from "../models/Task.model.js";

export class LocalStorageService {
    #initialData = [
        new Task('program'),
        new Task('eat'),
        new Task('program some more')
    ]

    constructor() {
        this.verifyData();
    }

    verifyData = () => {
        const data = localStorage.getItem('tasks');
        if (!data || data === '[]') {
            localStorage.setItem('tasks', JSON.stringify(this.#initialData));
        }
    }

    updateData = (data) => {
        if (data) {
            localStorage.setItem('tasks', JSON.stringify(data));
        } else {
            throw new Error('bad data!!!');
        }
    }

    getData = () => {
        const data = localStorage.getItem('tasks');
        if (!data) {
            this.verifyData();
        }
        return JSON.parse(data);
    }
}