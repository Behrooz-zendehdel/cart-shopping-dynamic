const countCounter = document.querySelector('.cart__count');
const cartDOM = document.querySelector('.cart__items');
const addToCartBtn = document.querySelectorAll('.btn_add_to_cart')

let cartItem = []


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

        let IsInCart = cartItem.filter((item) => item.id === product.id).length > 0;

        if (!IsInCart) {
            addItemToTheDom(product)

        } else {
            alert('این محصول در سبد خرید موجود است ')
        }


        cartItem.push(product)
    })
})

function addItemToTheDom(product) {
    cartDOM.insertAdjacentHTML("afterbegin", `
<div class="cart__item">
<input type="hidden" id=${product.id} />
<img
  src=${product.image}
  alt=""
  id="product__"
/>
<h4 class=${product.name}>nike</h4>
<a href="" class="btn__small">&minus;</a>
<h4 class="product__quantity">${product.quantity}</h4>
<a href="" class="btn__small">&plus;</a>
<h4 class=${product.price}>10000</h4>
<a href="" class="btn__small btn__remove">&times;</a>
</div>
`)
}