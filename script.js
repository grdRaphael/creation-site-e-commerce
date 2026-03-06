
const response = await fetch('produit.json');
const productsList = await response.json();


let currentList = productsList

const factSheets = document.querySelector(".factSheets");


const savedFilter = window.localStorage.getItem('filtre')
if (savedFilter) {

    const filteredList = productsList.filter(product =>
        product.categorie === savedFilter
    )

    generateProduct(filteredList)

} else {

    generateProduct(productsList)

}



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

        let buttonReview = document.createElement("button")
        buttonReview.innerText = 'Afficher les avis'
        buttonReview.classList = 'btn-sort'
        buttonReview.dataset.id = list[i].id
        article.appendChild(buttonReview)

        /* 
         buttonReview.addEventListener("click", () => {
                    const id = buttonReview.dataset.id
                    const product = productsList.find(p => p.id == id)
        
                    const reviewContainer = document.createElement('div')
                    for (let i = 0; i < product.avis.length; i++) {
                        const review = document.createElement('p')
                        review.innerText = product.avis[i]
                        reviewContainer.appendChild(review)
                    }
                    article.appendChild(reviewContainer)<
                })
        */
        buttonReview.addEventListener("click", async () => {

            const response = await fetch("http://localhost:8081/avis")
            const review = await response.json()
            const id = buttonReview.dataset.id
            const apiReview = review.filter(a => a.pieceId == id)
            const reviewContainer = document.createElement('div')
            apiReview.forEach(a => {
                const review = document.createElement('p')
                review.innerText = `${a.utilisateur} : ${a.commentaire}`
                reviewContainer.appendChild(review)
            })
            article.appendChild(reviewContainer)
        })
    }
}


let buttonAll = document.querySelector('.btnAll')
buttonAll.addEventListener("click", () => {
    generateProduct()
});

let buttonIphone = document.querySelector('.btnIphone')
buttonIphone.addEventListener("click", () => {
    let iphone = productsList.filter(product => product.categorie === 'iphone')

    generateProduct(iphone)
    window.localStorage.setItem("filtre", "iphone")
});

let buttonWatch = document.querySelector('.btnWatch')
buttonWatch.addEventListener("click", () => {
    let watch = productsList.filter(product => product.categorie === 'watch')
    window.localStorage.setItem("filtre", "watch")
    generateProduct(watch)
});

let buttonLaptop = document.querySelector('.btnLaptop')
buttonLaptop.addEventListener("click", () => {
    let laptop = productsList.filter(product => product.categorie === 'mac')
    window.localStorage.setItem("filtre", "mac")
    generateProduct(laptop)
});

let buttonComputer = document.querySelector('.btnComputer')
buttonComputer.addEventListener("click", () => {
    let computer = productsList.filter(product => product.categorie === 'computer')
    window.localStorage.setItem("filtre", "computer")
    generateProduct(computer)
});

let buttonIpad = document.querySelector('.btnIpad')
buttonIpad.addEventListener("click", () => {
    let ipad = productsList.filter(product => product.categorie === 'ipad')
    window.localStorage.setItem("filtre", "ipad")
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

