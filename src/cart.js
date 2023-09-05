let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart')



let basket = JSON.parse(localStorage.getItem('data')) || [];

// console.log(basket)

let total = () => {
    let cart = document.getElementById('cart__amnt')
    cart.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}

total()

let generateCartItems = () => {
    if(basket.length !== 0) {
        return (shoppingCart.innerHTML = basket.map((x) => {
            let {id, item} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            let {img, name, price} = search
            return `
            <div class='cart-item'>
            <img width=100 src=${img} alt="">
            <div class='details'>
                <div class='title-price-x'>
                    <h4 class='title-price'>
                        <p>${name}<p/>
                        <p> $ ${price}</p>
                    </h4>
                    <button onclick=removeItem(${id}) class='bi'>x</button>
                </div>
                <div class="btns">
                <div onclick='increment(${id})' class="plus">+</div>
                <div  id=${id} class="quantity">${item}</div>
                <div onclick='decrement(${id})' class="minus">-</div>
              </div>
                <h3>$ ${item * price}</h3>
            </div>
            </div>
            `
        })

        .join(''))
        
    } else {
        shoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2>cart is empty</h2>
        <a href='index.html'>
        <button class='homebtn'>back shopping</button>
        </a>        
        `
    }
}

generateCartItems()



let increment = (id) => {
    let selectedItem = id;

    let search = basket.find((x) => x.id === selectedItem.id);

    if(search === undefined) {

        basket.push({
            id: selectedItem.id,
            item: 1,
        })
    } else (
        search.item += 1
    )
     
    // console.log(basket)
    generateCartItems()
    update(selectedItem.id) 

    localStorage.setItem('data', JSON.stringify(basket))
}
let decrement = (id) => {
    let selectedItem = id;

    let search = basket.find((x) => x.id === selectedItem.id);

    if(search === undefined) return
    else if(search.item === 0) return;
     else (
        search.item -= 1
    )
    // console.log(basket) 
    update(selectedItem.id)
    basket = basket.filter((x) => x.item !== 0)
    generateCartItems()
    
    localStorage.setItem('data', JSON.stringify(basket));
}

let update = (id) => {
    let search = basket.find((x) => x.id === id)
    // console.log(search.item)
    document.getElementById(id).innerHTML = search.item
    total()
    totalAmount()
}

let clearCart = () => {
    basket = []
    generateCartItems()
    total()
    localStorage.setItem('data', JSON.stringify(basket));
}


let removeItem = (id) => {
    let selectedItem = id;
    // console.log(selectedItem)
    basket=basket.filter((x) => x.id !== selectedItem.id)
    generateCartItems()
    totalAmount()
    total()
    localStorage.setItem('data', JSON.stringify(basket))
}

let totalAmount = () => {
    if(basket.length !== 0) {
        let amount = basket.map((x) => {
            let {item, id} = x
            let search = shopItemsData.find((y) => y.id === id) || []; 
            return item* search.price;
        }).reduce((x, y) => x + y, 0)
        // console.log(amount)
        label.innerHTML = `
        <h2>Total Bill: $ ${amount}</h2>
        <button class='checkout'>checkout</button>
        <button onclick=clearCart() class='removeAll'>Clear Cart</button>
        `
    } else return

}

totalAmount()