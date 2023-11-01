// grab the parent container div
const parentContainer = document.querySelector(".parent-container");

// on load slide the image up
window.addEventListener('load', ()=>{
    parentContainer.style.transform = 'translateY(-100%)';
});

//grab the classes for the hamburger menu and the list items
const menuToggle = document.querySelector(".menu-toggle");
const header = document.querySelector("header");
const navBarList = document.querySelector(".navbar ul");

// on click transform the hamburger menu
menuToggle.addEventListener('click', ()=>{
    header.classList.toggle('menu-open');
    navBarList.classList.toggle("active");
});


//API handling
const endPoint = ('https://swapi.dev/api/people');

//use the fetch function to make a GET request to the endpoint
async function fetchData() {
    try {
        const response = await fetch(endPoint);
        if (!response.ok) {
            throw new Error('Network timed out');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error', error);
    }
}

// function to create and append list items for the json data to the screen
function createList(data) {
    //target the <ul> in index.html
    const list = document.querySelector('.character-list');
    
        data.forEach((character)=>{
        //create a list from the names fetched from the API
        const listItem = document.createElement("li");
        //append those names to the newly created list and display on the screen
        listItem.innerHTML = character.name;

    // add eventlistener to the newly created list
        listItem.addEventListener('click', () => 
        showDetails(character));
        list.appendChild(listItem);
    });
    //grab the cancel button for the list
    const cancelList = document.querySelector('.but');
    
    //show the cancel button for now
    cancelList.style.display = "block";
    
    // then add event listener to hide the button
    cancelList.addEventListener('click', ()=>{
    list.innerHTML = '';
    cancelList.style.display = "none";
    });
} 

// function to show character details
const characterImages = {
    "Luke Skywalker": "Images/luke.webp",
    "C-3PO": "/Images/c-3po.jpeg",
    "R2-D2": "/Images/r2-d2.jpeg",
    "Darth Vader": "/Images/vader.webp",
    "Leia Organa": "/Images/leia.webp",
    "Owen Lars" : "/Images/Owen_Lars.webp",
    "Beru Whitesun lars": "/Images/beru.jpeg",
    "R5-D4": "/Images/d4.jpeg",
    "Biggs Darklighter": "/Images/dark-lighter.png",
    "Obi-Wan Kenobi": "/Images/obi.jpeg",
};
function showDetails(character) {
    //target the character details div in index.html
    const details = document.querySelector('.character-details');
    const characterName = character.name;
    const characterImageURL = characterImages[characterName] || "R2.jpg";
    //dynamically generate html elements to append name, image, gender and height
    details.innerHTML = `
    <h3>Name: ${character.name}</h3>
    <img src = "${characterImageURL}" alt="${characterName}" />
    <p>Gender: ${character.gender}</p>
    <p>Height: ${character.height} cm</p>
    `;

    //grab the clear button through its class name
    const clearDetailsButton = document.querySelector('.clear-details');
    clearDetailsButton.style.display = 'block';

    //add eventlistener to the clear button
    clearDetailsButton.addEventListener('click', () => {
    details.innerHTML = ''; //clears the character details
    clearDetailsButton.style.display = 'none'; // hides the clear button after clearing
    });
}

//grab the button for calling the API function fetchData
const fetchDataButton = document.querySelector('.fetchData');

//add an eventlistener to listen for a click of the button
fetchDataButton.addEventListener('click', ()=>{
    fetchData() //function call
    .then((data) => {
    createList(data);
})
.catch((error)=> {
    console.error('Error fetching data:', error);
});
});