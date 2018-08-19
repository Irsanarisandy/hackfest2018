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
var entries = [];
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
            // entries.push(data.zenbu.entries.entry)
            for (i = 0; i < data.zenbu.entries.entry.length; i++) { 
                entries.push(data.zenbu.entries.entry[i])
            }

            console.log('array:', entries);
            // $("restaurantName").update(entries[0].name)
            // document.getElementById("restaurantName").innerHTML = entries[0].name;
            localStorage.setItem("entries", JSON.stringify(entries))
            localStorage.setItem("cuisineType", JSON.stringify(cuisineType))
        })
        .then(()=> {
            window.location.href = 'http://localhost:5000/lastPage.html'
        })
}

function loadRestaurantData() {
    entries = JSON.parse(localStorage.getItem("entries"));
    var cuisineType = JSON.parse(localStorage.getItem("cuisineType"));
    console.log(entries[0].name)
    document.getElementById("restaurantName").innerHTML = entries[0].name;
    document.getElementById("cuisineType").innerHTML = cuisineType;
    document.getElementById("placeAddress").innerHTML = entries[0].address;
    document.getElementById("placePhone").innerHTML = entries[0].phone;
    if (typeof entries[0].open === 'object') {
        console.log('no data');

    document.getElementById("placeHours").innerHTML = '( Please check with the restaurant )';
    } else {
        document.getElementById("placeHours").innerHTML = entries[0].open;
    }

    localStorage.setItem("entriesIndex", 0)
}

function loopRestaurants() {
    var entriesIndex = JSON.parse(localStorage.getItem("entriesIndex"));
    entriesIndex = entriesIndex + 1;
    var cuisineType = JSON.parse(localStorage.getItem("cuisineType"));
    
    document.getElementById("restaurantName").innerHTML = entries[entriesIndex].name;
    document.getElementById("cuisineType").innerHTML = cuisineType;
    document.getElementById("placeAddress").innerHTML = entries[entriesIndex].address;
    document.getElementById("placePhone").innerHTML = entries[entriesIndex].phone;
    if (typeof entries[0].open === 'object') {
        console.log('no data');

    document.getElementById("placeHours").innerHTML = '( Please check with the restaurant )';
    } else {
        document.getElementById("placeHours").innerHTML = entries[entriesIndex].open;
    }

    localStorage.setItem("entriesIndex", entriesIndex)
}

