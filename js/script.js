// finds errors on JS
'use strict';

//svg icon (image)
const removeIcon = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
const completeIcon = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>'

/* arrays todos and completed
 if todos/complete is null, show an empty array []
 otherwise gets what is stored
*/
const todos = (localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []);
const completed = (localStorage.getItem('completed') ? JSON.parse(localStorage.getItem('completed')) : []);

//executes function loadItens
loadItens();

// .length shows the lenght of an array
// console.log(todos.length);

// loads the itens to the to-do or completed list
function loadItens() {
    // for loop
    for (let i = 0; i < todos.length; i = i + 1) {
        // adds 'todos' to the to-do list
        addItemToDOM(todos[i]);
    }
    //adds 'completed' to the completed list
    for (let i = 0; i < completed.length; i = i + 1) {
        addItemToDOM(completed[i], true);
    }
}

// + button
document.getElementById('add').onclick = function() {
    //executes addEnter function
    addEnter();
}
// onkeypress gets info from the pressed key (e) in the item-text
document.getElementById('item-text').onkeypress = function(e) {
    // 13 is the key code of enter/return
    if (e.keyCode === 13) {
        //executes addEnter funcition
        addEnter();
    }
}

function addEnter() {
    // gets text from input
    const itemText = document.getElementById('item-text').value;
    //if text box isn't empty
    if (itemText) {
        // push method... adds to array
        todos.push(itemText);
        //executes addItemToDOM function
        addItemToDOM(itemText);
        //cleans input text box
        document.getElementById('item-text').value = '';
        //executes funtion 'updateStorage'
        updateStorage();
    }
}

//adds items to the to-do or completed list list
function addItemToDOM(itemText, completed) {
    //creates li on HTML (next task)
    const item = document.createElement('li');

    //inserts text in li
    item.innerText = itemText;

    // creates div class=buttons
    const buttons = document.createElement('div');
    buttons.classList.add('buttons');


    // creates  remove button class= remove
    const removeButton = document.createElement('button');
    // defines class
    removeButton.classList.add('remove')
    // gets svg img
    removeButton.innerHTML = removeIcon;
    // executes removeItem function
    removeButton.onclick = removeItem;

    // creates complete button class= complete
    const completeButton = document.createElement('button');
    //defines class
    completeButton.classList.add('complete');
    //gets svg img
    completeButton.innerHTML = completeIcon;
    // executes completeItem function
    completeButton.onclick = completeItem;

    // associates remove/complete buttons to div
    buttons.append(removeButton);
    buttons.append(completeButton);
    //associate buttons do li
    item.append(buttons);

    // conditional ternary operator
    const listId = (completed ? 'completed-list' : 'todo-list');
    //accesses ul by id and adds item to the beggining of the to-do/complete list
    document.getElementById(listId).prepend(item);
}

/** or you could also use this one... this code does the same but it's a lot bigger
//creates variable 'list' that will be used in both 'if' and 'else' statements
 let listId;
	if(completed) {
	// accesses ul
	listId = 'completed-list';
	} else {
	// accesses ul
	listId = 'todo-list';
	}
	//accesses ul by id and adds item to the beggining of the to-do/complete list
	document.getElementById(listId).prepend(item);
**/

//deletes items from the to-do list (trash can button)



function removeItem() {
    //accesses li element
    const item = this.parentNode.parentNode;
    // accesses which id is associate to the array element (todo-list or completed)
    const currentListId = item.parentNode.id;
    // acesses the text ( what is the task itself, what is written)
    const text = item.innerText;
    // removes task
    item.remove();
    // if the task is in the todo-list
    if (currentListId === 'todo-list') {
        // deletes the task from the array 'todos'
        todos.splice(todos.indexOf(text), 1);
    } else {
        // otherwise, deletes item from array 'completed'
        completed.splice(completed.indexOf(text), 1);
    }
    //executes funtion 'updateStorage'
    updateStorage();
}


// marks item as complete and moves it to the "complete" list
function completeItem() {
    //accesses li element
    const item = this.parentNode.parentNode;
    //accesses div element
    const currentList = item.parentNode;
    // gets which id is associated to the element
    const currentListId = currentList.id;
    // acesses the text ( what is the task itself, what is written)
    const text = item.innerText;
    //removes item
    item.remove();
    // if  the task is in the todo-list
    if (currentListId === 'todo-list') {
        //deletes the task from the array 'todos'
        todos.splice(todos.indexOf(text), 1);
        // adds text (the task itself) to the array 'completed'
        completed.push(text);
        // moves task to the completed list on HTML
        document.getElementById('completed-list').prepend(item);
    } else {
        //deletes the task from the array 'todos'
        completed.splice(todos.indexOf(text), 1);
        // adds text (the task itself) to the array 'todos'
        todos.push(text);
        // moves task to the completed list on HTML
        document.getElementById('todo-list').prepend(item);
    }
    //executes funtion 'updateStorage'
    updateStorage();
}


//executes funtion 'updateStorage'
function updateStorage() {
    // puts 'todos' in the local storage and stringifies it
    localStorage.setItem('todos', JSON.stringify(todos));
    // puts 'completed' in the local storage and stringifies it
    localStorage.setItem('completed', JSON.stringify(completed));
}