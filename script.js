let tasks = JSON.parse(
    localStorage.getItem("studentTasks")
) || [];

function saveTasks() {
    localStorage.setItem(
        "studentTasks",
        JSON.stringify(tasks)
    );
}

function addTask() {
    const input = document.getElementById("taskInput");
    const priority = document.getElementById("priority");

    const taskName = input.value.trim();

    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        id: Date.now(),
        name: taskName,
        priority: priority.value,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    input.value = "";
    displayTasks();
}

function completeTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });

    saveTasks();
    displayTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    displayTasks();
}

function displayTasks() {
    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach(task => {
        const div = document.createElement("div");

        div.className = task.completed
            ? "task done"
            : "task";

        const info = document.createElement("div");
        info.className = "task-info";

        const name = document.createElement("strong");
        name.textContent = task.name;

        const priority = document.createElement("small");
        priority.textContent = "Priority: " + task.priority;

        info.append(name, priority);

        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed
            ? "Undo"
            : "Done";

        completeButton.addEventListener("click", () => {
            completeTask(task.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        });

        div.append(info, completeButton, deleteButton);
        taskList.appendChild(div);
    });

    if (tasks.length === 0) {
        taskList.innerHTML =
            '<p class="empty">No tasks yet. Add your first task!</p>';
    }

    document.getElementById("total").textContent = tasks.length;

    document.getElementById("pending").textContent =
        tasks.filter(task => !task.completed).length;

    document.getElementById("completed").textContent =
        tasks.filter(task => task.completed).length;
}

displayTasks();