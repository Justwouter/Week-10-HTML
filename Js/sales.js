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

// Add a click event for all the buttons.
let buttons = document.querySelectorAll(".Kaartjes button");

for (let i = 0; i < buttons.length; i++) {
    let btn = buttons[i];
    btn.addEventListener("click", add);
}


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

// Updates the values displayed on the page and in the device storage to the values currently in the script.
function updateCart() {
    document.getElementById("totalprice").textContent = totalprice;
    document.getElementById("itemsincart").textContent = itemsincart;
    localStorage.setItem("sum", totalprice);
    localStorage.setItem("count", itemsincart);
    updateTable()
}