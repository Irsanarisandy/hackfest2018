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

// Instantiate the HTML Class
const html = new HTML();

// Event Listeners
eventListeners();

function eventListeners() {

    // App Init
    document.addEventListener('DOMContentLoaded', getData);

}

html.insertCuisine();

// Functions

function getData(){
    fetch('http://localhost:5000/api') // Change for heroku deployment
        .then(response => response.text())
        .then(data => console.log(data))
}


