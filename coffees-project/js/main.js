const searchButton = document.querySelector('#search-button');
const searchInput = document.querySelector('#search-input');
const results = document.querySelector('#results');

const runSearch = () => {
    results.innerHTML = '';
    const keyword = searchInput.value ? searchInput.value.toLowerCase() : '';

    if (keyword) {
        fetch('coffees.json').then(response => response.json())
        .then(json => {
            const coffeesArray = json;
            const resultArray = coffeesArray.filter((coffee)=>{
                return coffee.Title.toLowerCase().includes(keyword) || coffee.Description.toLowerCase().includes(keyword)
            })    
            resultArray.forEach(el => {
                showResult(el);
            })
        }) 
    }
    
};

const showResult = el =>{
    const item = document.createElement("div");
    item.className = 'item';

    const itemInfo = document.createElement("div");
    itemInfo.className = 'item-info';

    const itemTitle = document.createElement('h3');
    itemTitle.innerHTML = el.Title;
    itemTitle.className = 'title';
    itemInfo.appendChild(itemTitle);

    const itemDescription = document.createElement('p');
    itemDescription.className = 'description';
    itemDescription.innerHTML = el.Description;
    itemInfo.appendChild(itemDescription);

    const placeLink = document.createElement('a');
    placeLink.className = 'link';
    placeLink.href = `https://www.google.com/maps/place/${el.place}`
    placeLink.innerHTML = 'Show on the map';
    itemInfo.appendChild(placeLink);

    item.appendChild(itemInfo);

    const itemImage = document.createElement('img');
    itemImage.src = el.image;
    itemImage.className = 'img';
    item.appendChild(itemImage);

    results.appendChild(item)
}

const keyHandler = (event)=>{
    if (event.keyCode === 13) {
        runSearch();
    }
}
searchButton.addEventListener('click', runSearch);
searchInput.addEventListener('keydown', keyHandler, true);

