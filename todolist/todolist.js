 document.addEventListener('DOMContentLoaded', function() {
            const taskInput = document.getElementById('taskInput');
            const addBtn = document.getElementById('addBtn');
            const taskList = document.getElementById('taskList');
            const taskCount = document.getElementById('taskCount');
            const selectAll = document.getElementById('selectAll');
            const deleteAllBtn = document.getElementById('deleteAllBtn');
            
            let tasks = [];
            let taskId = 0;
            
            // Add task function
            function addTask() {
                const taskText = taskInput.value.trim();
                
                if (taskText === '') {
                    alert('Please enter a task!');
                    return;
                }
                
                tasks.push({
                    id: taskId++,
                    text: taskText,
                    completed: false,
                    selected: false
                });
                
                taskInput.value = '';
                renderTasks();
                updateTaskCount();
                updateSelectAllState();
            }
            
            // Delete task function
            function deleteTask(id) {
                tasks = tasks.filter(task => task.id !== id);
                renderTasks();
                updateTaskCount();
                updateSelectAllState();
            }
            
            // Edit task function
            function editTask(id) {
                const task = tasks.find(task => task.id === id);
                const newText = prompt('Edit your task:', task.text);
                
                if (newText !== null && newText.trim() !== '') {
                    task.text = newText.trim();
                    renderTasks();
                }
            }
            
            // Toggle task completion
            function toggleTask(id) {
                const task = tasks.find(task => task.id === id);
                task.completed = !task.completed;
                renderTasks();
                updateTaskCount();
                updateSelectAllState();
            }
            
            // Toggle task selection
            function toggleTaskSelection(id) {
                const task = tasks.find(task => task.id === id);
                task.selected = !task.selected;
                updateSelectAllState();
                updateDeleteButton();
            }
            
            // Select all tasks
            function toggleSelectAll() {
                const allSelected = tasks.every(task => task.selected);
                
                tasks.forEach(task => {
                    task.selected = !allSelected;
                });
                
                renderTasks();
                updateDeleteButton();
            }
            
            // Delete all selected tasks
            function deleteSelectedTasks() {
                if (tasks.length === 0) return;
                
                const selectedCount = tasks.filter(task => task.selected).length;
                
                if (selectedCount === 0) {
                    alert('No tasks selected!');
                    return;
                }
                
                if (confirm(`Are you sure you want to delete ${selectedCount} task(s)?`)) {
                    tasks = tasks.filter(task => !task.selected);
                    selectAll.checked = false;
                    renderTasks();
                    updateTaskCount();
                    updateDeleteButton();
                }
            }
            
            // Update select all checkbox state
            function updateSelectAllState() {
                if (tasks.length === 0) {
                    selectAll.checked = false;
                    selectAll.disabled = true;
                    return;
                }
                
                selectAll.disabled = false;
                const allSelected = tasks.every(task => task.selected);
                const someSelected = tasks.some(task => task.selected);
                
                selectAll.checked = allSelected;
                selectAll.indeterminate = someSelected && !allSelected;
            }
            
            // Update delete button visibility
            function updateDeleteButton() {
                const hasSelectedTasks = tasks.some(task => task.selected);
                
                if (hasSelectedTasks) {
                    deleteAllBtn.classList.add('show');
                } else {
                    deleteAllBtn.classList.remove('show');
                }
            }
            
            // Render tasks to the DOM
            function renderTasks() {
                taskList.innerHTML = '';
                
                if (tasks.length === 0) {
                    taskList.innerHTML = `
                        <div class="empty-state">
                            <p>No tasks yet. Add a new task to get started!</p>
                            <button onclick="document.getElementById('taskInput').focus()">Add Your First Task</button>
                        </div>
                    `;
                    return;
                }
                
                tasks.forEach(task => {
                    const taskItem = document.createElement('div');
                    taskItem.className = 'task-item';
                    if (task.selected) {
                        taskItem.style.backgroundColor = '#e3f2fd';
                        taskItem.style.borderLeftColor = '#2196f3';
                    }
                    
                    taskItem.innerHTML = `
                        <div style="display: flex; align-items: center; gap: 10px; flex: 1;">
                            <input type="checkbox" ${task.selected ? 'checked' : ''} onchange="toggleTaskSelection(${task.id})">
                            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
                            <span class="task-text" style="${task.completed ? 'text-decoration: line-through; color: #888;' : ''}">${task.text}</span>
                        </div>
                        <div class="task-actions">
                            <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
                            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                        </div>
                    `;
                    
                    taskList.appendChild(taskItem);
                });
            }
            
            // Update task count with color change
            function updateTaskCount() {
                const pendingTasks = tasks.filter(task => !task.completed).length;
                
                // Change color based on number of pending tasks
                let color;
                if (pendingTasks === 0) {
                    color = '#27ae60'; 
                } else if (pendingTasks <= 2) {
                    color = '#d6ec0cd3'; 
                } else if (pendingTasks <= 5) {
                    color = '#f40924ff'; 
                } else {
                    color = '#f209b7ff'; 
                }
                
                taskCount.textContent = `You have ${pendingTasks} pending tasks`;
                taskCount.style.color = color;
                
                // Add color indicator
                let indicator = taskCount.querySelector('.color-indicator');
                if (!indicator) {
                    indicator = document.createElement('span');
                    indicator.className = 'color-indicator';
                    taskCount.appendChild(indicator);
                }
                indicator.style.backgroundColor = color;
            }
            
            // Event listeners
            addBtn.addEventListener('click', addTask);
            
            taskInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    addTask();
                }
            });
            
            selectAll.addEventListener('change', toggleSelectAll);
            deleteAllBtn.addEventListener('click', deleteSelectedTasks);
            
            // Make functions available globally for inline event handlers
            window.toggleTask = toggleTask;
            window.toggleTaskSelection = toggleTaskSelection;
            window.editTask = editTask;
            window.deleteTask = deleteTask;
            
            eee
            
            renderTasks();
            updateTaskCount();
            updateSelectAllState();
        });