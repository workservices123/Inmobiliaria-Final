

const container = document.getElementById("container-cards")
const selectProducts = document.getElementById("select-products")
const btnCreate = document.getElementById("btn-create")

const shopping_card = document.querySelector('#products');
const overlay = document.querySelector("#overlay");
const popup= document.querySelector("#popup")
const btn_close_popup = document.querySelector("#btn-close-popup");
const shoppingCart_container= document.querySelector(".shoppingCart-container");
const totel = document.querySelector("#total");
let cartProduct = []

const modal = document.querySelector('.modal')
const modalSesion = document.getElementById("modal-sesion")
const closeModal = document.getElementById('close-modal')
const closeModalSesion = document.getElementById('close-modal-sesion')
const filterXPrice = document.getElementById('filterXPrice')

window.addEventListener("load",listSelect)
selectProducts.addEventListener('change',renderCards)
btnCreate.addEventListener('click', showModal)
closeModal.addEventListener('click', removeModal)
closeModalSesion.addEventListener('click', removeModalSesion)
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
    areaCard.textContent = 'Area: ' + area
    
    const priceCard = document.createElement('p')
    priceCard.textContent = 'Precio: $' + price

    const estrellaCard = document.createElement('p')
    estrellaCard.textContent = '' + estrellas



    const btnAdd = document.createElement('button')
    btnAdd.setAttribute ('id',id)
    btnAdd.textContent = 'add to the cart'
    btnAdd.addEventListener('click', showWarning)
    btnAdd.classList.add('btn-add')

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

function showWarning(){

    modalSesion.style.display = 'flex'
}

function removeModalSesion(){

    modalSesion.style.display = 'none'
}

