// script.js

// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Initialize tasks array
    let tasks = [];

    // Load tasks from Local Storage when page loads
    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
            tasks.forEach(taskText => {
                createTaskElement(taskText, false); // 'false' indicates not to save again to Local Storage
            });
        }
    }

    // Create task element in DOM
    function createTaskElement(taskText, saveToStorage = true) {
        // Create new list item
        const listItem = document.createElement('li');
        listItem.textContent = taskText;
        
        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');
        
        // Assign onclick event to remove button
        removeButton.onclick = function() {
            // Remove from DOM
            taskList.removeChild(listItem);
            
            // Remove from tasks array
            const taskIndex = tasks.indexOf(taskText);
            if (taskIndex > -1) {
                tasks.splice(taskIndex, 1);
                // Update Local Storage
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        };
        
        // Append remove button to list item
        listItem.appendChild(removeButton);
        
        // Append list item to task list
        taskList.appendChild(listItem);
    }

    // Create the addTask Function
    function addTask() {
        // Retrieve and trim the task text
        const taskText = taskInput.value.trim();
        
        // Check if task text is empty
        if (taskText === "") {
            alert("Please enter a task!");
            return; // Exit the function if no task entered
        }
        
        // Add task to DOM
        createTaskElement(taskText);
        
        // Add task to tasks array and update Local Storage
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        // Clear the input field
        taskInput.value = '';
        
        // Focus back to input for better UX
        taskInput.focus();
    }

    // Alternative addTask function that accepts parameters (for loading)
    function addTaskWithParams(taskText, saveToStorage = true) {
        if (!taskText || taskText.trim() === "") return;
        
        const trimmedText = taskText.trim();
        
        // Add task to DOM
        createTaskElement(trimmedText);
        
        // Add to tasks array and update Local Storage if requested
        if (saveToStorage) {
            tasks.push(trimmedText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    // Attach Event Listeners
    
    // Add task when button is clicked
    addButton.addEventListener('click', addTask);
    
    // Add task when Enter key is pressed
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks from Local Storage on page load
    loadTasks();
});
