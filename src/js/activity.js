// API
// All category : - https://openapi.programming-hero.com/api/videos/categories

// ALL data by categoryId
// URL Format: - https://openapi.programming-hero.com/api/videos/category/${id}

// Example: - https://openapi.programming-hero.com/api/videos/category/1000

const buttonContainer = document.getElementById('buttonContainer');
const cardContainer = document.getElementById('cardContainer');
const notFound = document.getElementById('notFound');
const sortBtn = document.getElementById('sort-btn');
let selectedCategory = 1000;
let sortByView = false;

sortBtn.addEventListener('click', () =>{
    sortByView =true;
    fetchedDataByCategories(selectedCategory, sortByView);
});

(() => {
    fetch('https://openapi.programming-hero.com/api/videos/categories')
        .then((res) => res.json())
        .then(({data}) => {
            data.forEach((fetchedData) => {
                const newBtn = document.createElement('button');
                newBtn.classList.add('category-btn', 'btn', 'mx-2', 'text-lg');
                newBtn.innerText = `${fetchedData.category}`;
                newBtn.addEventListener('click', () => {
                    fetchedDataByCategories(fetchedData.category_id);
                    const allButtons = document.querySelectorAll('.category-btn');
                    for(const btn of allButtons){
                        btn.classList.remove('bg-red-600', 'text-white');
                    }
                    newBtn.classList.add('bg-red-600', 'text-white');
                });
                buttonContainer.appendChild(newBtn);
            })
        })
})();



const fetchedDataByCategories = (idOfData, sortByView) => {
    selectedCategory = idOfData;
    fetch(`https://openapi.programming-hero.com/api/videos/category/${idOfData}`)
        .then((res) => res.json())
        .then(({data}) => {
            if(sortByView){
                data.sort((a,b) => {
                    const totalViewFirst = a.others?.views;
                    const totalViewSecond = b.others?.views;
                    const totalViewFirstNumber = parseFloat(totalViewFirst.replace("k", '')) || 0;
                    const totalViewSecondNumber = parseFloat(totalViewSecond.replace("k", '')) || 0;
                    return totalViewSecondNumber -totalViewFirstNumber;
                })
            }
            cardContainer.innerHTML = ''
            if(data.length === 0){
                notFound.classList.remove('hidden');
            }
            else{
                notFound.classList.add('hidden');
            }
            data.forEach((fetchedData) => {
                let verifiedBadge = '';
                if(fetchedData.authors[0].verified === true){
                    verifiedBadge =`<img src="../src/images/varified.png" alt="">`
                }
                const newCard = document.createElement('div');
                newCard.innerHTML = `
                <div class="card h-96 card-compact bg-base-100 shadow-xl">
                <figure style="height: 70%; overflow: hidden;"><img style="width: 100%; height: 100%; object-fit: cover;"
                        src='${fetchedData.thumbnail}' alt="Shoes" /></figure>
                <div class="flex items-center gap-4 p-3">
                    <div class="left block">
                        <img class="h-10 w-10 rounded-full" src='${fetchedData.authors[0].profile_picture}' alt="">
                    </div>
                    <div class="right">
                        <div class="title">
                            <h2 class="card-title">${fetchedData.title}</h2>
                        </div>
                        <div class="name flex gap-3">
                            <h2>${fetchedData.authors[0].profile_name}<h2>
                            ${verifiedBadge}
                        </div>
                        <div class="views">
                        <h4>${fetchedData.others.views} views</h4>
                        </div>
                    </div>
                </div>
            </div>
                  `
                cardContainer.appendChild(newCard);
            })
        })
}

fetchedDataByCategories(selectedCategory, sortByView);