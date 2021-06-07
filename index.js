/*
    *const checkedSection = document.getElementById('checked-items');
 */

/*========================================   MESSY WAY TO GET DATA FROM LOCAL STORAGE   ==============================*/
let prevData = '';

if(localStorage.getItem('toDoList')){
    prevData = localStorage.getItem('toDoList');
}

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
console.log(28, twoDAPD);
/*=======================================   GLOBAL VARIABLES   ==============================================*/


let checkIcons;
if(document.getElementsByClassName('fa-check')){
    checkIcons = document.getElementsByClassName('fa-check');
}

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

let darkBgStatus = true;


/*========================================   RENDER ITEMS IN toDoItemsDOM  ========================================*/

/*  Start the list if the storage have data */
function renderToDoItems(){
    if(twoDAPD.length > 0){
        for(let i = 0; i < twoDAPD.length; i++){
            if(twoDAPD[i][1] === 'true'){
                createItems(twoDAPD[i][0]);
            }
        }
    } 
} renderToDoItems();


/* Add the added item into array toDoItems  */
function addItemToArr(){
    let intVal = toDoInput.value;
    twoDAPD.push([intVal, true]);

    hideTypeWindow();
    storage();
    createItems(intVal);
    eventsForCheck();
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

/*====================================  RENDER ITEMS THAT ARE CHECKED ======================================*/


/* Render the checked items */
function renderChecked(i){
    checkedItemJustNow(i);
    

    const checkedSection = document.getElementById('checked-items');
    checkedSection.classList.remove('checked-items-i');
    checkedSection.classList.add('checked-items-v');
}

/* Make the item checked as false */
function checkedItemJustNow(id){
    twoDAPD.map(x => x[0] === id? x[1] = 'false' : x[0]);
    storage();
}

/* Add event listeners for check icons */
function eventsForCheck(){
    for(let i = 0; i < checkIcons.length; i++){
        let itemIdentity = checkIcons[i].parentNode.previousSibling.firstChild.textContent;
        checkIcons[i].addEventListener('click', function(){renderChecked(itemIdentity)});
    }
};
eventsForCheck();


/*=========================================   RESET AND STORAGE ======================================*/

/* Reset button to delete the data in local storage */
function resetFunc(){
    showDarkBg();
    localStorage.setItem('toDoList', '');
    location.reload();
}

/* Get  and Set data from local storage */
function storage(){
    localStorage.setItem('toDoList', twoDAPD);
    localStorage.getItem('toDoList');
}

/*========================================   KEYBOARD SHORTCUTS  ========================================*/


/* Shortcut for adding item with Enter Key */
function enterPressed(e){
    if(e.code === 'Enter'){
        addItemToArr();
    }
}

/* Shortcut to show typewindow with A Key */
function aPressedForAdd(e){
    if(e.code === 'KeyA'){
        showTypeWindow();
    }
}

/* Shortcut to reset the items with R Key */
function rPressedForReset(e){
    if(e.code === 'KeyR' && darkBgStatus){
        resetFunc();
    }
}


/*========================================   SHOW AND HIDE WINDOWS  ========================================*/


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
    darkBgStatus = false;
}

/* Hide the element that darken the screen for windows  */
function hideDarkBg(){
    darkBg.classList.remove('dark-bg-v');
    darkBgStatus = true;
}

/*====================================   EVENT LISTENERS  =============================================*/



document.addEventListener('keypress', rPressedForReset);
document.addEventListener('keyup', aPressedForAdd);
typeTextWindow.addEventListener('keyup', enterPressed);
resetBtn.addEventListener('click', resetFunc);
addBtn.addEventListener('click', showTypeWindow);
darkBg.addEventListener('click', hideTypeWindow);
cancel.addEventListener('click', hideTypeWindow);
add.addEventListener('click', addItemToArr);