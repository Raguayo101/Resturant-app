import { menuArray } from "./data.js";
const orderTitle = document.getElementById('order-text')
const addEl = document.getElementById("order-review");
const orderEl = document.getElementById("order-total");
const payForm = document.getElementById("payment-form");
const modal = document.getElementById("modal");
// total must be global, or resets to zero everytime we click
let total = 0;

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    handleAddBtn(e.target.dataset.add);
    orderAdd(e.target.dataset.add);
    const completeOrderBtn = document.getElementById("complete-order");
    completeOrderBtn.addEventListener("click", () => {
      modal.style.display = "inline";
    });
  }
  if (e.target.dataset.remove) {
    handleRemoveBtn(e.target.dataset.remove);
    orderRemove(e.target.dataset.remove);
    const completeOrderBtn = document.getElementById("complete-order");
    completeOrderBtn.addEventListener("click", () => {
      modal.style.display = "inline";
    });
  }
});


// when submit is pressed, thank you message appears
payForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const payFormData = new FormData(payForm);
  const name = payFormData.get("name");
  console.log(name);
  addEl.innerHTML = ` <section id="thanks" class="thanks">
  <h2>Thanks, ${name}! Your order is on its way!</h2>
    </section>`
    orderEl.innerHTML = ''
  modal.style.display = "none";
});

// adds the total count of orders
const orderAdd = (orderId) => {
  const targetFoodObj = menuArray.filter((el) => {
    return el.id === orderId;
  })[0];
  let order = ``;
  if (targetFoodObj.id === orderId) {
    total += targetFoodObj.price;
  }
  
  order = `<section id='order-total' class="order-section">
            <section class="order-total">
                <h2>Total Price:</h2>
                <p>$${total}</p>
            </section>
            <button  id='complete-order' class="completeBtn">Complete order</button>
            </section>`;
  orderEl.innerHTML = order;
};

// reduces the total count of the order
const orderRemove = (orderId) => {
  const targetFoodObj = menuArray.filter((el) => {
    return el.id === orderId;
  })[0];
  let order = "";
  if (targetFoodObj.id === orderId) {
    total -= targetFoodObj.price;
  }
  order = `<section id='order-total' class="order-section">
            <section class="order-total">
                <h2>Total Price:</h2>
                <p>$${total}</p>
            </section>
            <button id='complete-order' class="completeBtn">Complete order</button>
            </section>`;
  orderEl.innerHTML = order;
  if (total == 0) {
    orderEl.innerHTML = ``;
  }

};

// removes the item the customer no longer wants from the webpage
const handleRemoveBtn = (removeId) => {
  const targetFoodObj = menuArray.filter((el) => {
    return el.id === removeId;
  })[0];

  if (targetFoodObj.id === removeId) {
    // document.getElementById(`remove-${removeId}`).classList.add('hidden')
    document.getElementById(`remove-${removeId}`).outerHTML = "";
  }
};

// adds food item onto a seperate line for ordering food.
const handleAddBtn = (foodId) => {
  const targetFoodObj = menuArray.filter((el) => {
    return el.id === foodId;
  })[0];

  let foodHTML = ``;
  orderTitle.innerHTML = `<h2 class="order-title">Your order</h2>`
  foodHTML += `
    <section class="order-review" id='remove-${targetFoodObj.id}'>
    <section class="item-review">
                    <h2>${targetFoodObj.name}</h2>
                    <button class="remove-btn" data-remove='${targetFoodObj.id}' id='remove-btn'>remove</button>
                </section>
                <p>$${targetFoodObj.price}</p>
               </section> `;

  addEl.innerHTML += foodHTML;
  
};

// render out out data into our html
const renderFood = () => {
  let foodHTML = ``;
  menuArray.forEach((el) => {
    foodHTML += `<section class="card">
            <P class="item-img">${el.emoji}<p>
            <section class="item">
                <h2 class="item-list">${el.name}</h2>
                <p class="ingredient-list item-list"> ${el.ingredients} </p>
                <p class="item-list">$${el.price}</p>
            </section>
            <button class="add-btn" id='addBtn' data-add="${el.id}">+</button>
        </section>`;
  });
  return foodHTML;
};
// render out our HTML on our webpage
function render() {
  document.getElementById("menu-list").innerHTML = renderFood();
}

render();
