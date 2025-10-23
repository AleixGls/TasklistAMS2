document.addEventListener("DOMContentLoaded", function() {
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    addTaskBtn.addEventListener("click", addTask);

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Introdueix una tasca abans d’afegir-la!");
            return;
        }

        const li = document.createElement("li");
        li.textContent = taskText;
        taskList.appendChild(li);

        taskInput.value = ""; // buidar camp
        taskInput.focus();
    }
});