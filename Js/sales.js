import updateTable from "/Js/cart.js"

let itemsincart = 0;
let totalprice = 0;
let cart = {};

//localStorage.clear(); //If something corrupts the storage again, use this

//If the values exist, load them from the device storage.
if (localStorage.getItem("count")) {
    itemsincart = parseInt(localStorage.getItem("count"));
}

if (localStorage.getItem("sum")) {
    totalprice = parseInt(localStorage.getItem("sum"));
}

if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
}

updateCart();

// Add a click event for the add buttons.
let buttons = document.querySelectorAll(".Kaartjes .addition ");

for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    button.addEventListener("click", add);
}

buttons = document.querySelectorAll(".Kaartjes .subtraction ");

for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    button.addEventListener("click", remove);
}

// Actual logic for the addition event. If an object doesn't exist, make one.
function add(event) {
    let price = Number(event.target.dataset.price);
    let name = event.target.dataset.name;
    let id = event.target.dataset.id;

    if (id in cart) {
        cart[id].amount++;
    } else {
        let cartItem = {
            name: name,
            price: price,
            amount: 1
        };
        cart[id] = cartItem
    }

    itemsincart++;
    totalprice += price;

    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

// Logic for removal event, removes an item with the given id from the cart, price and total items before saving.
function remove(event) {
    let id = event.target.dataset.id;

    if (id in cart) {
        let price = cart[id].price;
        if(cart[id].amount > 0){
            cart[id].amount--;
            itemsincart--;
            totalprice -= price;
        }
        if(cart[id].amount == 0){
            delete cart[id]
        }
        
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
    }
    else {
        console.log("No element with id " + id)
    }


}


// Updates the total items/price displayed on the page and in the device storage to the values currently in the script.
function updateCart() {
    //document.getElementById("priceincart").textContent = totalprice;
    //document.getElementById("itemsincart").textContent = itemsincart;
    localStorage.setItem("sum", totalprice);
    localStorage.setItem("count", itemsincart);
    updateTable()
}