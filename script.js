const response = await fetch('produit.json');
const productsList = await response.json();
let currentList = productsList

const factSheets = document.querySelector(".factSheets");
generateProduct()

function generateProduct(list = productsList) {
    factSheets.innerHTML = "";
    currentList = list
    
    for (let i = 0; i < list.length; i++) {
        
        let article = document.createElement('article')
        factSheets.appendChild(article)

        let titleProduct = document.createElement('h2')
        titleProduct.innerHTML = list[i].title
        article.appendChild(titleProduct)

        let imgProduct = document.createElement('img')
        imgProduct.src = list[i].image
        article.appendChild(imgProduct)

        let resumeProduct = document.createElement('p')
        resumeProduct.innerHTML = list[i].resume
        article.appendChild(resumeProduct)

        let priceProduct = document.createElement('p')
        priceProduct.innerHTML = `${list[i].prix} €`
        article.appendChild(priceProduct)

    }
};


let buttonAll = document.querySelector('.btnAll')
buttonAll.addEventListener("click", () => {
    generateProduct()
});

let buttonIphone = document.querySelector('.btnIphone')
buttonIphone.addEventListener("click", () => {
    let iphone = productsList.filter(product => product.categorie === 'iphone')

    generateProduct(iphone)
});

let buttonWatch = document.querySelector('.btnWatch')
buttonWatch.addEventListener("click", () => {
    let watch = productsList.filter(product => product.categorie === 'watch')

    generateProduct(watch)
});

let buttonLaptop = document.querySelector('.btnLaptop')
buttonLaptop.addEventListener("click", () => {
    let laptop = productsList.filter(product => product.categorie === 'mac')

    generateProduct(laptop)
});

let buttonComputer = document.querySelector('.btnComputer')
buttonComputer.addEventListener("click", () => {
    let computer = productsList.filter(product => product.categorie === 'computer')

    generateProduct(computer)
});

let buttonIpad = document.querySelector('.btnIpad')
buttonIpad.addEventListener("click", () => {
    let ipad = productsList.filter(product => product.categorie === 'ipad')

    generateProduct(ipad)
});

let isAscending = true
let btnSort = document.querySelector('.btn-sort')
btnSort.addEventListener('click', () => {
    const sortedList = Array.from(currentList)
    sortedList.sort(function (a, b) {
        return isAscending ? a.prix - b.prix : b.prix - a.prix;
    });
    //document.querySelector(".factSheets").innerHTML = ""
    isAscending = !isAscending
    generateProduct(sortedList)
});

