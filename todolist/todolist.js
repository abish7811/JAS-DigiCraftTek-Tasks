document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const taskCount = document.getElementById('count');


    const selectAllCheckbox = document.getElementById('select-all');
    const deleteSelectedButton = document.getElementById('delete-selected');


    function updateCounter() {
        const totalTasks = document.querySelectorAll('.todo-item').length;
        const completedTasks = document.querySelectorAll('.todo-item.completed').length;
        const selectedTasks = document.querySelectorAll('.todo-item input[type="checkbox"]:checked').length;

        taskCount.textContent = totalTasks;


        if (selectedTasks > 0) {
            deleteSelectedButton.style.display = 'block';
            
        } else {
            deleteSelectedButton.style.display = 'none';
        }


        if (totalTasks === 0) {
            selectAllCheckbox.checked = false;
            selectAllCheckbox.indeterminate = false;
            selectAllCheckbox.disabled = true;
            deleteSelectedButton.style.display = 'none';
        } else {
            selectAllCheckbox.disabled = false;

            if (completedTasks === totalTasks) {
                selectAllCheckbox.checked = true;
                selectAllCheckbox.indeterminate = false;
            }
            else if (completedTasks > 0) {
                selectAllCheckbox.checked = false;
                selectAllCheckbox.indeterminate = true;
            }
            else {
                selectAllCheckbox.checked = false;
                selectAllCheckbox.indeterminate = false;
            }
        }
    }


    function handleSelectAll() {
        const allCheckboxes = document.querySelectorAll('.todo-item input[type="checkbox"]');
        const isChecked = selectAllCheckbox.checked;

        allCheckboxes.forEach(checkbox => {
            checkbox.checked = isChecked;
            const listItem = checkbox.closest('.todo-item');
            if (isChecked) {
                listItem.classList.add('completed');
            } else {
                listItem.classList.remove('completed');
            }
        });
        updateCounter();
    }


    function deleteSelectedTasks() {
        const selectedItems = document.querySelectorAll('.todo-item.completed');

        if (selectedItems.length === 0) {
            alert('No tasks are selected!');
            return;
        }

        if (confirm(`Are you sure you want to delete ${selectedItems.length} task(s)?`)) {
            selectedItems.forEach(item => item.remove());
            updateCounter();
        }
    }


    function enterEditMode(li) {
        li.classList.add('edit-mode');
        const currentText = li.querySelector('.todo-text').textContent;


        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit-input';
        editInput.value = currentText;


        const saveBtn = document.createElement('button');
        saveBtn.className = 'save-btn';
        saveBtn.textContent = 'Save';
        saveBtn.addEventListener('click', () => saveEdit(li, editInput));


        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'cancel-btn';
        cancelBtn.textContent = 'Cancel';
        cancelBtn.addEventListener('click', () => cancelEdit(li));


        const editActionsDiv = document.createElement('div');
        editActionsDiv.className = 'edit-actions';
        editActionsDiv.appendChild(saveBtn);
        editActionsDiv.appendChild(cancelBtn);


        li.appendChild(editInput);
        li.appendChild(editActionsDiv);

        editInput.focus();


        editInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveEdit(li, editInput);
            }
        });

        editInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                cancelEdit(li);
            }
        });
    }


    function saveEdit(li, editInput) {
        const newText = editInput.value.trim();
        if (newText) {
            li.querySelector('.todo-text').textContent = newText;
        }
        exitEditMode(li);
    }


    function cancelEdit(li) {
        exitEditMode(li);
    }


    function exitEditMode(li) {
        li.classList.remove('edit-mode');
        const editInput = li.querySelector('.edit-input');
        const editActionsDiv = li.querySelector('.edit-actions');
        if (editInput) editInput.remove();
        if (editActionsDiv) editActionsDiv.remove();
    }


    function createTaskItem(taskText) {
        const li = document.createElement('li');
        li.className = 'todo-item';


        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', function () {
            li.classList.toggle('completed');
            updateCounter();
        });


        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = taskText;


        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'todo-actions';


        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => enterEditMode(li));


        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function () {
            li.remove();
            updateCounter();
        });


        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);


        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(actionsDiv);

        return li;
    }


    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task!');
            taskInput.focus();
            return;
        }
        const newTask = createTaskItem(taskText);
        todoList.appendChild(newTask);
        taskInput.value = '';
        taskInput.focus();
        updateCounter();
    }


    selectAllCheckbox.addEventListener('change', handleSelectAll);
    deleteSelectedButton.addEventListener('click', deleteSelectedTasks);


    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });


    deleteSelectedButton.style.display = 'none';


    updateCounter();
})