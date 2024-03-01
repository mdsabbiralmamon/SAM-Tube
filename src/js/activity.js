// API
// All category : - https://openapi.programming-hero.com/api/videos/categories

// ALL data by categoryId
// URL Format: - https://openapi.programming-hero.com/api/videos/category/${id}

// Example: - https://openapi.programming-hero.com/api/videos/category/1000

const buttonContainer = document.getElementById('buttonContainer');
const cardContainer = document.getElementById('cardContainer');

(() => {
    fetch('https://openapi.programming-hero.com/api/videos/categories')
        .then((res) => res.json())
        .then(({data}) => {
            data.forEach((fetchedData) => {
                const newBtn = document.createElement('button');
                newBtn.classList.add('btn', 'mx-2', 'btn-ghost', 'text-lg');
                newBtn.innerText = `${fetchedData.category}`;
                newBtn.addEventListener('click', () => fetchedDataByCategories(fetchedData.category_id));
                buttonContainer.appendChild(newBtn);
            })
        })
})();

const fetchedDataByCategories = (idOfData) => {
    fetch(`https://openapi.programming-hero.com/api/videos/category/${idOfData}`)
        .then((res) => res.json())
        .then(({data}) => {
            cardContainer.innerHTML = ''
            data.forEach((fetchedData) => {
                const newCard = document.createElement('div');
                newCard.innerHTML = `
                <div class="card card-compact bg-base-100 shadow-xl">
                    <figure><img src='${fetchedData.thumbnail}'
                        alt="Shoes" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
                `
                cardContainer.appendChild(newCard);
            })
        })
}