export class Task {
    id;
    content;
    created;
    static #count = 0;

    constructor(content) {
        if (content) {
            const data = localStorage.getItem('tasks');
            const length = data && JSON.parse(data).length;

            if (length) {
                Task.#count = length;
            }

            this.content = content;
            this.created = new Date();
            Task.#count++;
            this.id = Task.#count;
        } else {
            throw new Error("must provide content!!!")
        }
    }
}