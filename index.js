import {menuArray} from './data.js'
const addBtn = document.getElementById('addBtn')
const addEl = document.getElementById('order-review')


document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        handleAddBtn(e.target.dataset.add)
    }
    if(e.target.dataset.remove){
        handleRemoveBtn(e.target.dataset.remove)
    }
})

const orderTotal = (orderId) =>{
    const targetFoodObj = menuArray.filter(el=>{
        return el.id === removeId
    })[0]
    let order = ''

    order = `<section id='order-total' class="order-section">
            <section class="order-total">
                <h2>Total Price:</h2>
                <p>TOTAL HERE</p>
            </section>
            <button id='complete-order' class="completeBtn">Complete order</button>
            </section>`

}

// removes the item the customer no longer wants from the webpage
let handleRemoveBtn = (removeId) =>{
    const targetFoodObj = menuArray.filter(el=>{
        return el.id === removeId
    })[0]

    if(targetFoodObj.id === removeId){
        // document.getElementById(`remove-${removeId}`).classList.add('hidden')
        document.getElementById(`remove-${removeId}`).outerHTML = ""
    }
}

// adds food item onto a seperate line for ordering food. 
const handleAddBtn = (foodId) =>{
    const targetFoodObj = menuArray.filter(el=>{
        return el.id === foodId
    })[0]

    let foodHTML = ''

    foodHTML += `
    <section class="order-review" id='remove-${targetFoodObj.id}'>
    <section class="item-review">
                    <h2>${targetFoodObj.name}</h2>
                    <button class="remove-btn" data-remove='${targetFoodObj.id}' id='remove-btn'>remove</button>
                </section>
                <p>$${targetFoodObj.price}</p>
               </section> `

    addEl.innerHTML += foodHTML
}


// render out out data into our html
const renderFood = () => {
    let foodHTML = ``
    let foodItems = menuArray.forEach(el=>{
        foodHTML += `<section class="card">
            <P class="item-img">${el.emoji}<p>
            <section class="item">
                <h2 class="item-list">${el.name}</h2>
                <p class="ingredient-list item-list">${el.ingredients}</p>
                <p class="item-list">$${el.price}</p>
            </section>
            <button class="add-btn" id='addBtn' data-add="${el.id}">+</button>
        </section>`
    })
    return foodHTML
}
// render out our HTML on our webpage
function render(){
    document.getElementById('menu-list').innerHTML = renderFood()
}

render()