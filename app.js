//IIFE
( () => {
//DOM elements needed to add items.
const addItemContainer = document.querySelector('.addItems-container');
const addForm = addItemContainer.querySelector('form');
const addDisplayAction = addItemContainer.querySelector('.addItems-action');
const addInput = addItemContainer.querySelector('input');

//DOM elements needed to display items
const displayItemContainer = document.querySelector('.displayItems-container');
const displayItemsAction = displayItemContainer.querySelector('.displayItems-action');
const displayItemsDiv = displayItemContainer.querySelector('.grocery-list');
const displayClearButton = displayItemContainer.querySelector('button');

let appendedItems = [];

//Creating items func.
const createItems = (itemName) => {
    const item = document.createElement('div');
    item.classList.add('grocery-item');
    item.innerHTML = `<div class="grocery-item">
    <h4 class="grocery-item__title">${itemName}</h4>
    <a href="#" class="grocery-item__link">
        <i class="far fa-trash-alt"></i>
    </a>
    </div> `;
    displayItemsDiv.prepend(item);
    feedBackMsg(true, addDisplayAction, 'An Item Was Successfully Created!');
    appendedItems.push(item); 
//Deleting an item
    appendedItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if(e.target.classList.contains('fa-trash-alt')) {
                item.remove();
                feedBackMsg(true, displayItemsAction, 'The Item Was Successfully Removed!');
            }
        })
    })
}
//Clearing all items func
const clearAllItems = (items) => {
    items.forEach(item => {
        item.remove();
    });
    items = []
}

//FeedBack msg function.
const feedBackMsg = (value, element, message) => {
    if(value === true) {
        element.innerHTML = message;
        element.classList.add('success');
        setTimeout(() => {
            element.classList.remove('success');
        }, 1000);
    } 
    element.innerHTML = message;
    element.classList.add('alert');
    setTimeout(() => {
        element.classList.remove('alert');
    }, 1000);
}

//Clear all items click event
displayClearButton.addEventListener('click', () => {
   if(appendedItems.length > 0) {
    feedBackMsg(false, displayItemsAction, 'All Items have Been Successfully Removed!');
    clearAllItems(appendedItems);    
    appendedItems.length = 0;
   } else {
    feedBackMsg(false, displayItemsAction, 'No More Items Left To Be Removed!');
   }
})

//Creating items submit event
addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const itemName = addInput.value;
    if(addInput.value !== ''){
    createItems(itemName);
    addInput.value = '';
    } else {
        feedBackMsg(false, addDisplayAction, 'Enter A Valid Value!');
    }  
})
})();


