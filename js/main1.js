const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
    constructor(container ='.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    this._getProducts()
        .then(data => {
            this.goods = [...data];
            this.render()
        });
    // this._fetchProducrs();
    }
    // _fetchProducrs(){
    //     this.goods = [
    //         {id: 1, title: 'Notebook', price: 2000},
    //         {id: 2, title: 'Mouse', price: 20},
    //         {id: 3, title: 'Keyboard', price: 200},
    //         {id: 4, title: 'Gamepad', price: 50},
    //     ];
    // }
    _getProducts(){
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods) {
            const productObject = new ProductItem(product);
            this.allProducts.push(productObject);
            block.innerHTML += productObject.render();
        }
    }
    // calcPrice() {
    //     let totalPrice = 0;
    //     this.products.forEach((item) => {
    //         totalPrice += item.price;
    //     });
    //     document.querySelector('.products-total').innerHTML = `Общая сумма товаров на ${totalPrice} рублей`;
    // }
    calcPrice() {
        let res = this.allProducts.reduce((sum, item) => sum += item.price, 0);
         document.querySelector('.products-total').innerHTML = `Общая сумма товаров на ${res} рублей`;
    }
}
 class ProductItem {
     constructor(product, img = 'https://placehold.it/200x150') {
         this.title = product.product_name;
         this.price = product.price;
         this.id = product.id_product;
         this.img = img;
     }

     render() {
         return `<div class="product-item" >
                <img src="${this.img}" alt="img">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
     }
 }

class CartItem {
    constructor(title, price, img, link) {
        this.title = title;
        this.price = price;
        this.img = img;
    }
    render() {

    }
}


class Cart {
    constructor() {
        addToCart();
        deleteFromCart();
        calcCart();
        render();
        openCart();
    }
    render(){
    }
 }


let list = new ProductsList();
list.render();
list.calcPrice();
