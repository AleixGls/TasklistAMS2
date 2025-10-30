window.addEventListener("DOMContentLoaded", () => {
    // -----------------------------------------------------------------------------------
    // Constants
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");



    // -----------------------------------------------------------------------------------
    // Variables
    // Carrega les tasques desades al localStorage o crea un array buit si no n’hi ha
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];



    // -----------------------------------------------------------------------------------
    // Inicialització
    renderTasks(); // Mostrar les tasques guardades en iniciar



    // -----------------------------------------------------------------------------------
    // Funcions
    // Afegir una nova tasca (verifica que el camp no estigui buit)
    function addTask() {
        const text = taskInput.value.trim();
        if (text === "") {
            alert("Introdueix una tasca abans d’afegir-la!");
            return;
        }

        // Crear objecte de tasca
        const newTask = { text, completed: false };
        tasks.push(newTask);

        // Guardar i actualitzar la llista
        saveTasks();
        renderTasks();

        // Netejar el camp d’entrada
        taskInput.value = "";
        taskInput.focus();
    }

    // Mostrar totes les tasques a la pantalla
    function renderTasks() {
        // Esborra el contingut actual per tornar a generar-lo
        taskList.innerHTML = "";

        // Recorre totes les tasques i les afegeix a la llista
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.classList.add("task-item");

            // Text de la tasca
            const span = document.createElement("span");
            span.textContent = task.text;
            span.classList.add("task-text");

            // Si està completada, afegeix una classe CSS
            if (task.completed) span.classList.add("completed");

            // En fer clic sobre el text, alternar estat de completat
            span.addEventListener("click", () => {
                task.completed = !task.completed;
                saveTasks();
                renderTasks();
            });

            // Boto d’editar
            const editBtn = document.createElement("button");
            editBtn.textContent = "Edita";
            editBtn.classList.add("edit-btn");
            editBtn.addEventListener("click", () => editTask(index));

            // Boto d’esborrar
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Esborra";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.addEventListener("click", () => deleteTask(index));

            // Afegir tots els elements dins de <li>
            li.appendChild(span);
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);

            // Afegir la tasca a la llista HTML
            taskList.appendChild(li);
        });
    }

    // Editar una tasca existent
    function editTask(index) {
        const newText = prompt("Edita la tasca:", tasks[index].text);
        if (newText !== null && newText.trim() !== "") {
            tasks[index].text = newText.trim();
            saveTasks();
            renderTasks();
        }
    }

    // Esborrar una tasca per índex
    function deleteTask(index) {
        if (confirm("Vols esborrar aquesta tasca?")) {
            tasks.splice(index, 1); // Elimina la tasca
            saveTasks();            // Desa els canvis
            renderTasks();          // Actualitza la llista
        }
    }

    // Desa totes les tasques al localStorage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }



    // -----------------------------------------------------------------------------------
    // Events
    addTaskBtn.addEventListener("click", addTask);
});