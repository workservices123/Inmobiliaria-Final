const container = document.getElementById("container-cards")
const selectProducts = document.getElementById("select-products")
const btnCreate = document.getElementById("btn-create")

const shopping_card = document.querySelector('#products');
const overlay = document.querySelector("#overlay");
const popup= document.querySelector("#popup")
const btn_close_popup = document.querySelector("#btn-close-popup");
const shoppingCart_container= document.querySelector(".shoppingCart-container");
const totel = document.querySelector("#total");
let imgSelected = " "
let cartProduct = []
let idProduct = 30 

const modal = document.querySelector('.modal')
const closeModal = document.getElementById('close-modal')
const newProduct = document. getElementById('new-product')
const newPrice = document.getElementById('new-price')
const newImage = document.getElementById('new-image')
const newArea = document.getElementById('new-area')
const newciudad = document.getElementById('new-ciudad')
const newTipo = document.getElementById('new-tipo')
const newestrellas = document.getElementById('newEstrellas') 
const btnNewProduct = document.getElementById('btn-new-create')
const filterXPrice = document.getElementById('filterXPrice')
const counter = document.getElementById('products')
const precio_total = document.getElementById('total')

// window.addEventListener("DOMContentLoaded",listSelect)




selectProducts.addEventListener('change',renderCards)
btnCreate.addEventListener('click', showModal)
btnNewProduct.addEventListener('click', createNewProduct)
newImage.addEventListener('change', importImg)
closeModal.addEventListener('click', removeModal)
filterXPrice.addEventListener('change', filterProducts)

const products = []

import { getProducts } from './firebase.js'
window.addEventListener('DOMContentLoaded', async ()=> {
    
    

    getProducts((querySnapshot) =>{
      querySnapshot.forEach(doc => {
          products.push(doc.data())
          createCards(doc.data())
      // console.log(products)
  
      });
     listSelect()
      })
    })
function filterProducts(event){
    const responseFilter = event.target.value === 'Armenia'
    ? products.filter(product => product.ciudad == 'Armenia')
    : event.target.value === 'Pereira'
    ? products.filter(product => product.ciudad == 'Pereira')
    : event.target.value === 'Cali'
    ? products.filter(product => product.ciudad == 'Cali')
    : event.target.value === 'Bogota'
    ? products.filter(product => product.ciudad == 'Bogota')
    : event.target.value === 'Cartagena'
    ? products.filter(product => product.ciudad == 'Cartagena')
    : event.target.value === 'Medellin'
    ? products.filter(product => product.ciudad == 'Medellin')
    : event.target.value === '1E'
    ? products.filter(product => product.estrellas == ' ★ ')
    : event.target.value === '2E'
    ? products.filter(product => product.estrellas == ' ★ ★ ')
    : event.target.value === '3E'
    ? products.filter(product => product.estrellas == ' ★ ★ ★ ')
    : event.target.value === '4E'
    ? products.filter(product => product.estrellas == ' ★ ★ ★ ★ ')
    : event.target.value === '5E'
    ? products.filter(product => product.estrellas == ' ★ ★ ★ ★ ★ ')
    : event.target.value === 'area1'
    ? products.filter(product => Number(product.area) < 300.000)
    : event.target.value === 'area2'
    ? products.filter(product => Number(product.area) >= 300.000 && Number(product.area) < 500.000)
    : event.target.value === 'area3'
    ? products.filter(product => Number(product.area) >= 500.000 && Number(product.area) < 700.000)
    : event.target.value === 'precio1'
    ? products.filter(product => Number(product.price) < 500000000)
    : event.target.value === 'precio2'
    ? products.filter(product => Number(product.price) >= 500000000 && Number(product.price) < 1000000000)
    : event.target.value === 'precio3'
    ? products.filter(product => Number(product.price) >= 1000000000 && Number(product.price) < 1500000000)
    : event.target.value === 'precio4'
    ? products.filter(product => Number(product.price) >= 1500000000)
    : null

    container.innerHTML = ''
    responseFilter.map(product => createCards(product))
}

function importImg(event){
    const currentImg = event.target.files[0]
    const objectURL = URL.createObjectURL(currentImg)
    imgSelected = objectURL
}

function createNewProduct(){
    idProduct++
    const titleProduct = newProduct.value
    const priceProduct = newPrice.value
    const areaProduct = newArea.value
    const tipoProduct = newTipo.value
    const ciudadProduct = newciudad.value
    const estrellasProduct = newestrellas.value
    const id = idProduct


    const newProducts = {id:id , name: titleProduct, price: priceProduct,img: imgSelected, tipo: tipoProduct, area: areaProduct, ciudad: ciudadProduct, estrellas: estrellasProduct}

    products.push(newProducts)
    listSelect()
    modal.style.display = 'none'
}

function showModal() {
    modal.style.display = 'flex'
}

function removeModal(){

    modal.style.display = 'none'
}

function renderCards (){

    products.map( product => {product.name ===  selectProducts.value ? createCards(product): null})
}

function listSelect(){
    
    selectProducts.innerHTML = '' 
    const anyOption = document.createElement('option')
    selectProducts.appendChild(anyOption)
    anyOption.textContent = 'Select a Product'

    products.map( product => {
        const option = document.createElement('option')
        option.value = product.name
        option.textContent = product.name
        selectProducts.appendChild(option)
        console.log(product.name)
        })
}



let parte_total = 0
 
function createCards(product){
    const{id, name, price, img, area, tipo, ciudad, estrellas } = product

    const card = document.createElement("div")
    card.classList.add('card-product')

    const imgCard  = document.createElement('img')
    imgCard.setAttribute('src',img)
    imgCard.setAttribute('alt',name)
    imgCard.classList.add('img-product')

    const nameCard = document.createElement('p')
    nameCard.textContent = name
    nameCard.classList.add('name-product')

    const tipoCard = document.createElement('p')
    tipoCard.textContent = 'Tipo: ' + tipo

    const ciudadCard = document.createElement('p')
    ciudadCard.textContent = 'Ciudad: ' + ciudad

    const areaCard = document.createElement('p')
    areaCard.textContent = 'Area: ' + area + 'm2'
    
    const priceCard = document.createElement('p')
    priceCard.textContent = 'Precio: $' + price

    const estrellaCard = document.createElement('p')
    estrellaCard.textContent = '' + estrellas


    const btnAdd = document.createElement('button')
    btnAdd.setAttribute ('id',id)
    btnAdd.textContent = 'add to the cart'
    btnAdd.addEventListener('click', addCarrito)
    btnAdd.classList.add('btn-add')
    btnAdd.addEventListener('click', parte)
    

    function parte(){
        parte_total+=Number(price)
        let total_pagar = total_precio+parte_total
    precio_total.textContent =  'Total: $'+total_pagar
    }

    const btnElim = document.createElement('button')
    btnElim.textContent = 'X'
    btnElim.addEventListener('click',ELiminar)
    btnElim.classList.add('btn-add')

    card.appendChild(imgCard)
    card.appendChild(nameCard)
    card.appendChild(tipoCard)
    card.appendChild(ciudadCard)
    card.appendChild(areaCard)
    card.appendChild(priceCard)
    card.appendChild(estrellaCard)
    card.appendChild(btnAdd)
    card.appendChild(btnElim)

    container.appendChild(card)

    function ELiminar(){

    container.removeChild(card)
}
}

let total_cantidad = 0
let total_precio = 0

shopping_card.addEventListener('click', showCarrito)

function showCarrito() {
    overlay.classList.add('activate')
    popup.classList.add('activate')
}

btn_close_popup.addEventListener('click', close_cart)

function close_cart(){
overlay.classList.remove('activate');
popup.classList.remove('activate');
}

const subtract_food = (event) => {
    total_cantidad--
    // let sumar = Number(contador.textContent)-1
    // contador.textContent = sumar
    let item = event.target.getAttribute('id') 
    cartProduct.splice(parseInt(cartProduct.indexOf(item)),1)
    showCart();
}

const delete_cart = (event) => {
    // let restar = Number(contador.textContent)-x
    // contador.textContent = restar
    let item = event.target.getAttribute('id');
    
    cartProduct = cartProduct.filter((id_product) => {
return id_product !== item;
    });

    showCart();
}

const showCart = () => {
    let total_pagar = total_precio+parte_total
    counter.textContent =  total_cantidad
    precio_total.textContent =  'Total: $'+total_pagar
    // 'Total: ' +

    shoppingCart_container.innerHTML = ''
    let list = [...new Set(cartProduct)]

    list.forEach(item => {

        const productos = products.filter( products => {
            return products.id === parseInt(item)
        })
        let cont = 0
        let total = 0
        
        function restar_cantiad(){
            total_precio-=parseInt(productos[0].price)
            showCart()
        }
        function sumar_cantiad(){
            total_precio+=parseInt(productos[0].price)
            showCart()
        }
        // function sumar_add(){
        //     total_precio+=parseInt(productos[0].price)
        //     showCart()
        // }
        function total_cantidad1(){
            total_cantidad-=cont
            total_precio-=total
            showCart()
        }  
        
        for(let id of cartProduct){
            if (id === item){
                cont ++
                total = total + parseInt(productos[0].price)
            }
        }

        const card = document.createElement('div');
        const imagen = document.createElement('img');
        const cardContent = document.createElement('div');
        const deletec = document.createElement('p');
        const title_card=document.createElement('h2');
        // const info=document.createElement('p');
        const containerQuantityNumber= document.createElement('div');
        const quantity =document.createElement('h4');
        const quantityNumber=document.createElement('div');
        const sum =document.createElement('p');
        const number=document.createElement('p');
        const subtract=document.createElement('p');
        const pricecart=document.createElement('p');

        sum.setAttribute('id', productos[0].id);
        subtract.setAttribute('id',productos[0].id);

        card.classList.add('card');
        cardContent.classList.add('cardContent');
        deletec.classList.add('delete');
        containerQuantityNumber.classList.add('quantityNumber');
        quantity.style.fontStyle='oblique';
        quantityNumber.classList.add('numberQuantity');
        sum.classList.add('circle');
        subtract.classList.add('circle');
        pricecart.classList.add('price');

        deletec.textContent='X';
        imagen.src=productos[0].img;
        title_card.textContent=productos[0].name;
        quantity.textContent='Cantidad';
        sum.textContent='+';
        number.textContent=cont;
        subtract.textContent='-';
        pricecart.textContent=total;

        card.appendChild(imagen);
        cardContent.appendChild(title_card);
        cardContent.appendChild(containerQuantityNumber);
        containerQuantityNumber.appendChild(quantity);
        containerQuantityNumber.appendChild(quantityNumber);
        quantityNumber.appendChild(subtract);
        quantityNumber.appendChild(number);
        quantityNumber.appendChild(sum);
        cardContent.appendChild(pricecart);
        card.appendChild(deletec);
        card.appendChild(cardContent);

        sum.addEventListener('click', addCarrito);
        subtract.addEventListener('click', subtract_food);
        subtract.addEventListener('click', restar_cantiad);
        sum.addEventListener('click', sumar_cantiad);

        shoppingCart_container.appendChild(card);

        // const delete_cart = (event) =>{
        //     let restar  = Number(compras.textContent)-cont
        //     compras.textContent = restar

        //     let item = event.target.getAttribute('id')
        //     cartProduct = cartProduct.filter((id_product) => {
        //         return id_product !== item;
        //     });
        //     showCart()
        // }

        deletec.setAttribute('id',productos[0].id);
        deletec.addEventListener('click', delete_cart)
        deletec.addEventListener('click', total_cantidad1)
    })
}

const addCarrito = (event) =>{
    total_cantidad++
    // let cantidad = Number(contador.textContent)+1
    // contador.textContent = cantidad
    cartProduct.push(event.target.getAttribute('id'))
    showCart()
    console.log('agrega')
}

// createCards()