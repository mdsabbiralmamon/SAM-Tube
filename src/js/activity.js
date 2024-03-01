// API
// All category : - https://openapi.programming-hero.com/api/videos/categories

// ALL data by categoryId
// URL Format: - https://openapi.programming-hero.com/api/videos/category/${id}

// Example: - https://openapi.programming-hero.com/api/videos/category/1000

const buttonContainer = document.getElementById('buttonContainer');

(() => {
    fetch('https://openapi.programming-hero.com/api/videos/categories')
        .then((res) => res.json())
        .then(({data}) => {
            data.forEach((fetchedData) => {
                const newBtn = document.createElement('button');
                newBtn.classList.add('btn', 'mx-2');
                newBtn.innerText = `${fetchedData.category}`;
                buttonContainer.appendChild(newBtn);
            })
        })
})();