window.addEventListener('load', () => {
    let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

    function DisplayCompletedTasks() {
        const completedList = document.querySelector('#completed-list');
        completedList.innerHTML = '';

        completedTasks.forEach((task) => {
            const taskElement = createTaskElement(task);
            completedList.appendChild(taskElement);

            const deleteButton = taskElement.querySelector('.delete');
            deleteButton.addEventListener('click', () => {
                moveTaskToDeleted(task);
                DisplayCompletedTasks();
            });
        });
    }

    function moveTaskToDeleted(task) {
        let deletedTasks = JSON.parse(localStorage.getItem('deletedTasks')) || [];
        deletedTasks.push(task);
        localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks));

        completedTasks = completedTasks.filter((t) => t !== task);
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }

    function createTaskElement(task) {
        const taskElement = document.createElement('div');
        taskElement.classList.add('todo-item', 'done');

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const deleteButton = document.createElement('button');

        input.type = 'checkbox';
        input.checked = true;
        span.classList.add('bubble', 'completed');

        content.classList.add('todo-content');
        actions.classList.add('actions');
        deleteButton.classList.add('delete');

        content.innerHTML = `<input type="text" value="${task.content}" readonly>`;
        deleteButton.innerHTML = 'Delete';

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(deleteButton);
        taskElement.appendChild(label);
        taskElement.appendChild(content);
        taskElement.appendChild(actions);

        return taskElement;
    }

    DisplayCompletedTasks();
});