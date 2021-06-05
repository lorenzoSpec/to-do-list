let prevData = localStorage.getItem('toDoList');
let arrPD = [];

if(prevData === ''){
    console.log('Data: ', prevData);
} else {
    arrPD = prevData.split(',');
}

let until = arrPD.length;
let twoDAPD = [];

for(let i = 0; i < until; i = i+2){
    twoDAPD.push(arrPD.slice(i, i+2));
}

/*====================   Global Variables   ====================*/
const checkedItems = [];

const addBtn = document.getElementById('add-btn');

const resetBtn = document.getElementById('reset-btn');

const darkBg = document.getElementById('dark-bg');
const typeTextWindow = document.getElementById('type-text-window');
const toDoInput = document.getElementById('to-do-item');
const add = document.getElementById('add');
const cancel = document.getElementById('cancel');

const toDoItemsDOM = document.getElementById('to-do-items');
const instruction = document.getElementById('instruction');


/*====================   Functions for Interactivity   ====================*/

/*  Start the list if the storage have data */
if(twoDAPD.length > 0){
    for(let i = 0; i < twoDAPD.length; i++){
        createItems(twoDAPD[i][0]);
    }
    toDoItemsDOM.removeChild(instruction);
} 

/* Reset button to delete the data in local storage */
function resetFunc() {
    localStorage.setItem('toDoList', '');
    location.reload();
}

/* Add the added item into array toDoItems  */
function addItemToArr(){
    if(twoDAPD.length === 0){
        toDoItemsDOM.removeChild(instruction);
    }

    let intVal = toDoInput.value;
    twoDAPD.push([intVal, true]);

    hideTypeWindow();
    storage();
    createItems(intVal);
}

/* function that create item with the item name and the icons */
function createItems(textNameItem){
   
        let cont = document.createElement('div');
        let textDiv = document.createElement('div');
        let pEl = document.createElement('p');
        let text = document.createTextNode(textNameItem);
        let iconDiv = document.createElement('div');
        let checkI = document.createElement('i');
        let trashI = document.createElement('i');

        cont.setAttribute('class', 'item-cont');

        textDiv.setAttribute('class', 'text-div');
        pEl.setAttribute('id', 'text-p');
        textDiv.appendChild(pEl);
        pEl.appendChild(text);

        iconDiv.setAttribute('class', 'icon-div');
        checkI.setAttribute('class', 'fas fa-check v');
        trashI.setAttribute('class', 'fas fa-trash v');
        iconDiv.appendChild(checkI);
        iconDiv.appendChild(trashI);

        cont.appendChild(textDiv);
        cont.appendChild(iconDiv);
    
        toDoItemsDOM.appendChild(cont);
}

/* Get  and Set data from local storage */
function storage(){
    localStorage.setItem('toDoList', twoDAPD);
    localStorage.getItem('toDoList');
}

/* Show the element that that popping up when plus icon is clicked  */
function showTypeWindow(){
    typeTextWindow.classList.add('type-text-window-v');
    toDoInput.focus();
    showDarkBg();
}

/* Hide the element that that popping up when plus icon is clicked  */
function hideTypeWindow(){
    typeTextWindow.classList.remove('type-text-window-v');
    toDoInput.value = "";
    hideDarkBg();
}

/* Show the element that darken the screen for windows  */
function showDarkBg(){
    darkBg.classList.add('dark-bg-v');
}

/* Hide the element that darken the screen for windows  */
function hideDarkBg(){
    darkBg.classList.remove('dark-bg-v');
}

/*====================   Event Listeners   ====================*/
resetBtn.addEventListener('click', resetFunc);
addBtn.addEventListener('click', showTypeWindow);
darkBg.addEventListener('click', hideTypeWindow);
cancel.addEventListener('click', hideTypeWindow);
add.addEventListener('click', addItemToArr);