// Everything related to HTML
class HTML {

    // Displays the expenses from the form into the list

    insertCuisine() {
        const cuisineList = document.querySelector('#cuisinesList ul');

        // Create the template
        cuisineList.innerHTML = `
            <li>Drexels Breakfast Restaurant Wellington</li>
            <li>Drexels Breakfast Restaurant Wellington</li>
            <li>Drexels Breakfast Restaurant Wellington</li>
            <li>Drexels Breakfast Restaurant Wellington</li>
            <li>Drexels Breakfast Restaurant Wellington</li>
            <li>Drexels Breakfast Restaurant Wellington</li>                
        `;

    }

}

// Variables
const cuisineButtonOne = document.getElementById('#button1');
// saves restaurants data
var entries;
// Instantiate the HTML Class
const html = new HTML();

// Event Listeners
// eventListeners();

// function eventListeners() {

//     // App Init
//     document.addEventListener('DOMContentLoaded', getData);

// }

// html.insertCuisine();

// Functions

function getData(){
    fetch('http://localhost:5000/api') // Change for heroku deployment
        .then(response => response.text())
        .then(data => console.log(data))
}
function getRestaurantData(cuisineType){
    fetch('http://localhost:5000/api/' + cuisineType) // Change for heroku deployment
        .then(response => response.text())
        .then(data => JSON.parse(data))
        .then(data => {
            console.log('version:', data.zenbu.version);
            entries = data.zenbu.entries.entry
        })
}


