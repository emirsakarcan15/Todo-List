let input_ekleme = document.getElementById("input-ekleme");
let addbutton = document.getElementById("button-addon1");
let list = document.getElementById("liste");
let clearbutton = document.getElementById("button-addon3");
let filter_input = document.getElementById("input-arama");
let todos = [];

events();

//FUNCTIONS

function events(){
    addbutton.addEventListener("click", add);
    clearbutton.addEventListener("click", clear);
    document.addEventListener("DOMContentLoaded", load);
    list.addEventListener("dblclick", single_clear);
    filter_input.addEventListener("keyup", filter);

}

function load(){
    checkstorage();
    todos.forEach(function(todo){
        addUX(todo);
    });
}

function add(e){
    
    let inputText = input_ekleme.value;
    if (inputText === null || inputText == ""){
        alert("Lütfen bir todo giriniz.");
    }
    else{
        addUX(inputText);
        addstorage(inputText)
        clearbutton.style.visibility = "visible";
    }
    e.preventDefault();
    
}

function addUX(inputText){
    let li = document.createElement("li");
    
    li.className = "list-group-item";
    li.textContent = inputText;

    list.appendChild(li);

    input_ekleme.value = "";    
}

function clear(e){
    let çocuklar = list.children.length;
    let n = çocuklar;

    while (n > 0){
        n = n - 1;
        list.children[n].remove();  
    }

    e.preventDefault();
    clear_storage();
}

function single_clear(e){
    if (e.target.className==="list-group-item"){
        e.target.remove();

        let todo_delete = e.target.textContent;
        single_clear_storage(todo_delete);
    }
}
function clear_storage(){
    checkstorage();
    todos.splice(0, todos.length);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function single_clear_storage(todo_delete){
    checkstorage();
    todos.forEach(function(todo, index){
        if (todo === todo_delete){
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function addstorage(inputText){
    checkstorage();
    todos.push(inputText);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function checkstorage(){
    if (localStorage.getItem("todos") == null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function filter(e){
    let finput = e.target.value.toLowerCase();
    let todolistesi = document.querySelectorAll(".list-group-item");

    if (todolistesi.length > 0){
        todolistesi.forEach(function(todo){
            todo.style.visibility = "visible";
            if (todo.textContent.toLowerCase().includes(finput)){
                todo.style.visibility = "visible";
            }
            else {
                todo.style.visibility = "hidden";
            }
        })
    }
    




    

    

}