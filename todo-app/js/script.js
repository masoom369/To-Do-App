class ToDoList {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.tasksList = document.getElementById('tasks-list');
        this.newTaskInput = document.getElementById('new-task');
        this.addButton = document.getElementById('add-button');
        this.addButton.addEventListener('click', () => this.addTask());
        this.refreshTasksList();
    }

    addTask() {
        const taskText = this.newTaskInput.value.trim();

        if (taskText !== '') {
            const newTask = {
                id: Date.now(),
                text: taskText
            };

            this.tasks.push(newTask);
            this.addTaskToDOM(newTask);
            this.newTaskInput.value = ''; // Clear the input field
            this.saveTasksToLocalStorage();
        }
    }

    addTaskToDOM(task) {
        const listItem = document.createElement('li');
        listItem.innerHTML =`<span>${task.text}</span>
        <button class="btn btn-danger" onclick="toDoList.deleteTask(${task.id})">Delete</button>
        <button class="btn btn-warning" onclick="toDoList.updateTask(${task.id})">Update</button>`;
        this.tasksList.appendChild(listItem);
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.refreshTasksList();
        this.saveTasksToLocalStorage();
    }

    updateTask(taskId) {
        const newTaskText = prompt('Enter new task text:');
        const task = this.tasks.find(task => task.id === taskId);

        if (newTaskText !== null && task) {
            task.text = newTaskText;
            this.refreshTasksList();
            this.saveTasksToLocalStorage();
        }
    }

    refreshTasksList() {
        this.tasksList.innerHTML = '';
        this.tasks.forEach(task => this.addTaskToDOM(task));
    }

    saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}

const toDoList = new ToDoList();