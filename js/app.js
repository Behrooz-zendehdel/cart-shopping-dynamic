const countCounter = document.querySelector('.cart__count');
const cartDOM = document.querySelector('.cart__items');
const addToCartBtn = document.querySelectorAll('.btn_add_to_cart')
const totalCount = document.querySelector('.total__counter');
const totalCost = document.querySelector('.total__cost');


localStorage.setItem("cart__item", "my cart")


let cartItems = (JSON.parse(localStorage.getItem("cart___items")) || [])
document.addEventListener('DOMContentLoaded', loadData)

countCounter.addEventListener('click', function () {
    cartDOM.classList.toggle('active')


})
addToCartBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        let parentElement = btn.parentElement;
        const product = {
            id: parentElement.querySelector('#product__id').value,
            name: parentElement.querySelector('.product__name').innerText,
            image: parentElement.querySelector('#image').getAttribute('src'),
            price: parentElement.querySelector('.product__price').innerText,
            quantity: 1,
        }

        let IsInCart = cartItems.filter((item) => item.id === product.id).length > 0;

        if (!IsInCart) {
            addItemToTheDom(product)

        } else {
            alert('این محصول در سبد خرید موجود است ')
        }

        const cartDOMItems = document.querySelectorAll('.cart__item')
        cartDOMItems.forEach(p => {
            if (p.querySelector('#product__id').value === product.id) {
                incrementItem(p, product);
                decrementItem(p, product);
                removeItem(p, product);
            }
        })


        cartItems.push(product)
        calculateTotal();
        saveToLocalStorage();
    })
})

function saveToLocalStorage() {

    localStorage.setItem("cart___items", JSON.stringify(cartItems))
}


function addItemToTheDom(product) {
    cartDOM.insertAdjacentHTML("afterbegin", `
        <div class="cart__item">
        <input type="hidden" id="product__id" value="${product.id}"/>
        <img
        src="${product.image}"
        alt=""
        id="product__"
        />
        <h4 class="product__name">${product.name}</h4>
        <a  class="btn__small"  action="decrease">&minus;</a>
        <h4 class="product__quantity">${product.quantity}</h4>
        <a  class="btn__small" action="increase">&plus;</a>
        <h4 class="product__price">${product.price}</h4>
        <a class="btn__small btn__remove" action="remove">&times;</a>
        </div>
        `)
}
function calculateTotal() {
    let total = 0;
    cartItems.forEach(item => {
        total += item.quantity * item.price


    })
    totalCost.innerText = total;
    totalCount.innerText = cartItems.length
}


function incrementItem(p, product) {
    p.querySelector("[action='increase']").addEventListener('click', function () {
        cartItems.forEach(cartItem => {
            if (cartItem.id === product.id) {
                p.querySelector('.product__quantity').innerText = ++cartItem.quantity;
                calculateTotal();
                saveToLocalStorage();
            }
        })
    })
}
function decrementItem(p, product) {
    p.querySelector("[action='decrease']").addEventListener('click', function () {
        cartItems.forEach(cartItem => {
            if (cartItem.id === product.id) {

                if (cartItem.quantity > 1) {
                    p.querySelector('.product__quantity').innerText = --cartItem.quantity;

                } else {
                    cartItems = cartItems.filter(newElement => newElement.id !== product.id)
                    p.remove();
                }



                calculateTotal();
                saveToLocalStorage();
            }
        })
    })
}
function removeItem(p, product) {
    p.querySelector("[action='remove']").addEventListener('click', function () {
        cartItems.forEach(cartItem => {
            if (cartItem.id === product.id) {


                cartItems = cartItems.filter(newElement => newElement.id !== product.id)
                p.remove();




                calculateTotal();
                saveToLocalStorage();
            }
        })
    })
}
function loadData() {
    if (cartItems.length > 0) {
        cartItems.forEach(product => {
            addItemToTheDom(product)

            const cartDOMItems = document.querySelectorAll('.cart__item')
            cartDOMItems.forEach(p => {
                if (p.querySelector('#product__id').value === product.id) {
                    incrementItem(p, product);
                    decrementItem(p, product);
                    removeItem(p, product);
                }
            })

        })
        calculateTotal();
        saveToLocalStorage();

    }
}