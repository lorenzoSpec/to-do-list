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

const checkedSection = document.getElementById('checked-items');

const sureToDelete = document.getElementById("sure-to-delete");
const toDeleteH3 = document.getElementById('to-delete-h3');
const confirm = document.getElementById('confirm');
const cancelDelete = document.getElementById('cancel-delete');

const restoreSection = document.getElementById('restore');

let darkBgStatus = true;

/*========================================   FUNCTION FOR CREATING ELEMENT  ========================================*/

function createDiv(){
    return document.createElement('div');
}

function createP(){
    return document.createElement('p');
}

function createTxtNd(text){
    return document.createTextNode(text);
}

function createI(){
    return document.createElement('i');
}

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
}

/* function that create item with the item name and the icons */

let clikedStat = false;

function createItems(textNameItem){
   
    let cont = createDiv();
    let textDiv = createDiv();
    let pEl = createP();
    let text = createTxtNd(textNameItem);
    let iconDiv = createDiv();
    let checkI = createI();
    let trashI = createI();

    cont.setAttribute('class', 'item-cont tb');

    textDiv.setAttribute('class', 'text-div');
    pEl.setAttribute('class', 'text-p');
    textDiv.appendChild(pEl);
    pEl.appendChild(text);

    iconDiv.setAttribute('class', 'icon-div');
    checkI.setAttribute('class', 'fas fa-check v');
    trashI.setAttribute('class', 'fas fa-trash v');
    iconDiv.appendChild(checkI);
    iconDiv.appendChild(trashI);

    cont.appendChild(textDiv);
    cont.appendChild(iconDiv);
    
    checkI.addEventListener('click', function(){renderChecked(textNameItem)});
    trashI.addEventListener('click', function(){deleteItem(textNameItem)});
    toDoItemsDOM.appendChild(cont);
}


/*====================================  RENDER ITEMS THAT ARE CHECKED ======================================*/

/* First Onload if there are items that are checked */
function onloadRenderChk(){
    if(twoDAPD.length > 0){
        showChkSection();
        for(let i = 0; i < twoDAPD.length; i++){
            if(twoDAPD[i][1] === 'false'){
                createCkeckedItms(twoDAPD[i][0]);
            }
        }
    } 
} onloadRenderChk();

/* Render the checked items */
function renderChecked(i){
    checkedItemJustNow(i);
    showChkSection();
    createCkeckedItms(i);
    removeOnToDo(i);
}

/* Show the Check Items Section */
function showChkSection(){
    checkedSection.classList.remove('checked-items-i');
    checkedSection.classList.add('checked-items-v');
}


/* Make the item checked as false */
function checkedItemJustNow(id){
    twoDAPD.map(x => x[0] === id? x[1] = 'false' : x[0]);
    storage();
}

/* create items for check item */
function createCkeckedItms(chkNameItem){
    let cont = createDiv();
    let textDiv = createDiv();
    let pEl = createP();
    let text = createTxtNd(chkNameItem);
    let iconDiv = createDiv();
    let undo = createI();

    cont.setAttribute('class', 'item-cont chk-blur');

    textDiv.setAttribute('class', 'text-div');
    pEl.setAttribute('class', 'text-p');
    textDiv.appendChild(pEl);
    pEl.appendChild(text);

    iconDiv.setAttribute('class', 'chk-icon-div');
    undo.setAttribute('class', 'fas fa-undo v');
    iconDiv.appendChild(undo);

    cont.appendChild(textDiv);
    cont.appendChild(iconDiv);

    undo.addEventListener('click', function(){uncheckIt(chkNameItem)});

    checkedSection.appendChild(cont);
}

function removeOnToDo(item){
    let tb = document.getElementsByClassName('tb');
    for(let i = 0; i < tb.length; i++){
        if(tb[i].firstChild.firstChild.textContent === item){
            toDoItemsDOM.removeChild(tb[i]);
        }
    }
}

/*=========================================   UNCHECK ITEM ======================================*/

let chkedItms = document.getElementsByClassName("chk-blur");

/* Function for unchecking item */
function uncheckIt(text){
    uncheckedItem(text);
    removeOnChkSection(text);
    createItems(text);

    if(chkedItms.length === 0){
        hideChkSection();
    }
}

/* hide the Check Items Section */
function hideChkSection(){
    checkedSection.classList.remove('checked-items-v');
    checkedSection.classList.add('checked-items-i');
}
if(chkedItms.length === 0){
    hideChkSection();
}

/* Make the item unchecked as true */
function uncheckedItem(text){
    twoDAPD.map(x => x[0] === text ? x[1] = 'true' : x[0]);
    storage();
}

/* Remove checked item beacuse they are unchecked */
function removeOnChkSection(item){
    let chkBlur = document.getElementsByClassName('chk-blur');
    for(let i = 0; i < chkBlur.length; i++){
        if(chkBlur[i].firstChild.firstChild.textContent === item){
            checkedSection.removeChild(chkBlur[i]);
        }
    }
}

/*=========================================   DELETE ITEM ======================================*/

let restoreText = '';

function deleteItem(itemName){
    showSureToDelete(itemName, 'delete');
}

function dltIt(itemName){
    let tbd = document.getElementsByClassName('tb');
    for(let i = 0; i < tbd.length; i++){
        if(tbd[i].firstChild.firstChild.textContent === itemName){
            toDoItemsDOM.removeChild(tbd[i]);
        }
    }
    for(let i = 0; i < twoDAPD.length; i++){
        if(twoDAPD[i][0] === itemName){
            twoDAPD.splice(i, 1);
        }
    }
    storage();
}

function showSureToDelete(text, action){

    if(action  === 'delete'){
        confirm.addEventListener('click', function(){showRestore(text)});
    } else if(action === 'Reset'){
        confirm.addEventListener('click', resetIt);
    }

    sureToDelete.classList.remove('sure-to-delete-i');
    sureToDelete.classList.add('sure-to-delete-v');
    toDeleteH3.textContent = 'Are you sure you want to ' + action + ' "' + text + '"';
    
    showDarkBg();
}

function hideSureToDelete(){
    sureToDelete.classList.remove('sure-to-delete-v');
    sureToDelete.classList.add('sure-to-delete-i');
    hideDarkBg();
}

function showRestore(text){
    restoreSection.classList.remove('restore-i');
    restoreSection.classList.add('restore-v');
    hideSureToDelete();
    dltIt(text);
    restoreText =  text;
    setTimeout(function(){hideRestore()}, 3000);
}

function hideRestore(){
    restoreSection.classList.remove('restore-v');
    restoreSection.classList.add('restore-i');
}

darkBg.addEventListener('click', hideSureToDelete);
cancelDelete.addEventListener('click', hideSureToDelete);

/*=========================================  RESTORE  ======================================*/

function restoreItem(text){
    twoDAPD.push([text, true]);
    createItems(text);
    hideRestore();
    storage();
}
restoreSection.addEventListener('click', function(){restoreItem(restoreText)});

/*=========================================  RESET  ======================================*/



/*=========================================   RESET AND STORAGE ======================================*/

/* Reset button to delete the data in local storage */
function resetFunc(){
    showSureToDelete('Now', 'Reset');
}

function resetIt(){
    showDarkBg();
    localStorage.setItem('toDoList', '');
    location.reload();
}

/* Get  and Set data from local storage */
function storage(){
    localStorage.setItem('toDoList', twoDAPD);
    //localStorage.getItem('toDoList');
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