window.addEventListener("DOMContentLoaded", () => {
    // Constants
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    // Funcions
    // Afegir i comprobar si no esta buit el input de tasques
    function addTask() {
        const text = taskInput.value.trim();
        if (text === "") {
            alert("Introdueix una tasca abans d’afegir-la!");
            return;
        }

        const li = createTaskItem(text);
        taskList.appendChild(li);
        taskInput.value = "";
        taskInput.focus();
    }

    // Crear la tasca i els botons de edicio i esborrar
    function createTaskItem(text) {
        const li = document.createElement("li");
        
        // Item de la tasca
        li.classList.add("task-item");

        // Titulo
        const span = document.createElement("span");
        span.textContent = text;
        span.classList.add("task-text");

        // Boto editar
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edita";
        editBtn.classList.add("edit-btn");
        editBtn.addEventListener("click", () => editTask(span));

        // Boto borrar
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Esborra";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => li.remove());
        
        // Afegir tots els apartats
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        return li;
    }



    // Editar tasques
    function editTask(span) {
        const newText = prompt("Edita la tasca:", span.textContent);
        if (newText !== null && newText.trim() !== "") {
            span.textContent = newText.trim();
        }
    }

    // Events
    addTaskBtn.addEventListener("click", addTask);
});
