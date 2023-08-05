const addButton = document.getElementById('addButton');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

addButton.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const task = document.createElement('div');
        task.className = 'task';
        task.innerHTML = `
            <span>${taskText}</span>
            <div class="task-buttons">
                <button class="done-button">Done</button>
                <button class="delete-button">Delete</button>
            </div>
        `;
        taskList.appendChild(task);
        taskInput.value = '';
        taskInput.focus();

        const deleteButton = task.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(task);
        });

        const doneButton = task.querySelector('.done-button');
        doneButton.addEventListener('click', () => {
            task.classList.toggle('completed');
        });
    }
}
