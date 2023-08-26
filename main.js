let shop = document.getElementById('shop');

let shopItemsData = [
    {
        id: "jfhgbvnscs",
        name: "Casual Shirt",
        price: 45,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
        img: "images/img-1.jpg",
      },
      {
        id: "ioytrhndcv",
        name: "Office Shirt",
        price: 100,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
        img: "images/img-2.jpg",
      },
      {
        id: "wuefbncxbsn",
        name: "T Shirt",
        price: 25,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
        img: "images/img-3.jpg",
      },
      {
        id: "thyfhcbcv",
        name: "Mens Suit",
        price: 300,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
        img: "images/img-4.jpg",
      },
]


let basket = [
    {
        // id:'nnmjuytrr',
        // item: 1 
    }
]

let generateShop = () => {
   return (shop.innerHTML = shopItemsData.map((item) => {
    let {id, name, price, desc, img} = item
    return `
    <div id=product-id-${id} class="item">
    <img width="220" src=${img} alt="">
    <div class="details">
        <h3>${name}</h3>
        <p>${desc}</p>
        <div class="price-quantity">
            <h2>$${price}</h2>
            <div class="btns">
              <div onclick='increment(${id})' class="plus">+</div>
              <div  id=${id} class="quantity">0</div>
              <div onclick='decrement(${id})' class="minus">-</div>
            </div>
        </div>
    </div>
 </div>
    `
   }).join(''))
}

generateShop()


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
    update(selectedItem.id) 
}
let decrement = (id) => {
    let selectedItem = id;

    let search = basket.find((x) => x.id === selectedItem.id);

    if(search.item === 0) return;
     else (
        search.item -= 1
    )
    // console.log(basket) 
    update(selectedItem.id)

}
let update = (id) => {
    let search = basket.find((x) => x.id === id)
    // console.log(search.item)
    document.getElementById(id).innerHTML = search.item
    total()
}


let total = () => {
    let cart = document.getElementById('cart__amnt')
    
    console.log(basket.map((x) => x.item))
}