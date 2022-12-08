let cart = {};
//Loads the cart from the JSON in device storage.
if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
}

let tablebody = document.getElementById("tbody");

for (let id in cart) {
    let item = cart[id];

    let tr = document.createElement("tr")

    let name_thread = document.createElement("td")
    name_thread.textContent = item.name
    tr.appendChild(name_thread)


    let price_thread = document.createElement("td");
    price_thread.textContent = item.price;
    tr.appendChild(price_thread);

    let amount_thread = document.createElement("td");
    amount_thread.textContent = item.amount;
    tr.appendChild(amount_thread);

    tablebody.prepend(tr)

}
createsummary()

function createsummary(){
    let totalprice = document.getElementById("totalprice")
    totalprice.textContent = "€"+parseInt(localStorage.getItem("sum"));
    let totalitems = document.getElementById("totalitems")
    totalitems.textContent = parseInt(localStorage.getItem("count")) + " Items";
}