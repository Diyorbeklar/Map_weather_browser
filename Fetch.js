/*
🔸Vazifa
- https://jsonplaceholder.typicode.com/posts saytidan postlar AJAX bilan olinib hammasi chiroyli dizaynda sahifaga chiqishi kerak
- 100 ta post bo'ladigan bo'lsa sahifaga 20 tadan chiqishi kerak
- 20 ta post tagida 100 / 20 = 5 bolgani uchun, postlar soniga mos page lar uchun button bo'ladi misol 1 2 3 4 5 buttonlari
- sahifaga endi kirilgan paytida localStoragedan hozirgi bet raqami qidiriladi, localStorageda bet bo'lmasa 1 deb saqlanadi va 1- page uchun button active bo'ladi va shunga mos birinchi 20 talik uchun post chiqariladi
- 2 bosilganda 21- 40 oraligida post chiqadi va localStoragedagi bet yangilanadi va 2 button active boladi
- shu tartibda davom etadi
*/ 

let page = localStorage.getItem("page")

if(!page){
    page = localStorage.setItem("page", 1)
}

console.log(page)

function getPosts(page) {
    return new Promise((resolve, reject) => {
        fetch("https://jsonplaceholder.typicode.com/posts").then(response => {
            response.json().then(posts => {
                let pagesCount = posts.length / 20; 
    
                 for(let i = 0; i<pagesCount; i++) {
                     let button = `<button>${i+1}</button>`
    
                     document.querySelector(".btns").innerHTML += button
    
                 }
                   resolve(posts)
               
            }) 
    } )
    })
}

getPosts().then(posts => {
   let post = []



   for(let i = (page - 1) * 20; i<=(page*20)-1; i++) {
       post.push(posts[i])
   }

   post.forEach(p => {

    document.querySelector("ul").innerHTML += `<li>${p.title}</li>`
   
    })

   

   document.querySelector(".btns").querySelectorAll("button").forEach((button, index) => {
    button.addEventListener("click", e => {
        window.localStorage.setItem("page", index + 1);
        window.location.reload()
    })
    })
})


//  aysnc

//  let response = await fatch()