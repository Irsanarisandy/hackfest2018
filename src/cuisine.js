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
function asyncImg(name) {
    return fetch('http://localhost:5000/image/' + name)
    .then(response => response.text())
}
function getRestaurantData(cuisineType){
    if (cuisineType === 'random') {
        var array = ['Chinese', 'Indian', 'Italian', 'Japanese', 'Mexican', 'Thai']
        var item = array[Math.floor(Math.random()*array.length)];
        cuisineType = item;
    }
    fetch('http://localhost:5000/api/' + cuisineType) // Change for heroku deployment
        .then(response => response.text())
        .then(data => JSON.parse(data))
        .then(async data => {
            // entries.push(data.zenbu.entries.entry)
            // var promises = []

            const entries = data.zenbu.entries.entry;

            console.log("entries.length =", entries.length);

            const promises = entries.map(entry => asyncImg(entry.name));
            console.log('promises = ', promises);

            Promise.all(promises).then(images => {
                console.log('images = ', images)
                images.map((img, index) => {
                    data.zenbu.entries.entry[index].imgUrl = JSON.parse(img).imgUrl;
                    // entries.push(data.zenbu.entries.entry[index])
                })

            });

            // for (i = 0; i < data.zenbu.entries.entry.length; i++) { 
            //     // promises.push(asyncImg(data.zenbu.entries.entry[i].name));
            //     entries.push(data.zenbu.entries.entry[i])
                
            //     // entries.push(data.zenbu.entries.entry[i])
            // }

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


{/* <div class="carousel-item active">
        <div style="background-image:url(assets/italianCuisine.png)" alt="First slide"></div>
    </div>
    <div class="carousel-item">
        <div style="background-image:url(assets/indianCuisine.png)" alt="Second slide"></div>
    </div> */}
function loadImg(entry) {
    var carousel = document.getElementById("carouselItems");
    var imgArray = ['italianCuisine.png', 'indianCuisine.png', 'indian2.jpeg', 'indian3.jpeg', 'indian4.jpeg']
    var item = imgArray[Math.floor(Math.random()*imgArray.length)];
    
    carousel.innerHTML = '';

    // var divs = entries.map((entry, i) => {
        var div1 = document.createElement('div');
        // if(i === 0) {
            div1.className = "carousel-item active";
        // } else {
        //     div1.className = "carousel-item";
        // }
        var div2  = document.createElement('div');
        div2.style.backgroundImage = 'url(assets/' + item + ')';
        div1.appendChild(div2);
        // return div1;
    // })
    // divs.forEach(entry => {
        carousel.appendChild(div1);
    // });

}
function loadRestaurantData() {
    entries = JSON.parse(localStorage.getItem("entries"));
    console.log(entries)


    loadImg(entries[0])



    var cuisineType = JSON.parse(localStorage.getItem("cuisineType"));
    
    if (typeof entries[0].name === 'object') {
        document.getElementById("restaurantName").innerHTML = 'N/A';
    } else {
        document.getElementById("restaurantName").innerHTML = entries[0].name;
    }

    document.getElementById("cuisineType").innerHTML = cuisineType;

    if (typeof entries[0].address === 'object') {
        document.getElementById("placeAddress").innerHTML = 'N/A';
    } else {
        document.getElementById("placeAddress").innerHTML = entries[0].address;
    }
    if (typeof entries[0].phone === 'object') {
        document.getElementById("placePhone").innerHTML = 'N/A';
    } else {
        document.getElementById("placePhone").innerHTML = entries[0].phone;
    }
    if (typeof entries[0].open === 'object') {
        document.getElementById("placeHours").innerHTML = 'N/A';
    } else {
        document.getElementById("placeHours").innerHTML = entries[0].open;
    }

    

    localStorage.setItem("entriesIndex", 0)
}

function loopRestaurants() {
    var entriesIndex = JSON.parse(localStorage.getItem("entriesIndex"));
    if (entriesIndex < entries.length-1) {
        entriesIndex = entriesIndex + 1;
    } else {
        localStorage.setItem("entriesIndex", 0)
        entriesIndex = 0
    }


    loadImg(entries[entriesIndex])


    var cuisineType = JSON.parse(localStorage.getItem("cuisineType"));

    // if (typeof entries[entriesIndex].name === 'object') {
    //     document.getElementById("restaurantName").innerHTML = 'N/A';
    // } else {
    //     if (entries[entriesIndex].name.length > 30) {
    //         document.getElementById("restaurantName").innerHTML = entries[entriesIndex].name.substr(0,27) + '...';
    //     } else {
    //         document.getElementById("restaurantName").innerHTML = entries[entriesIndex].name;
    //     }
    // }

    if (typeof entries[entriesIndex].name === 'object') {
        document.getElementById("restaurantName").innerHTML = 'N/A';
    } else {
        document.getElementById("restaurantName").innerHTML = entries[entriesIndex].name;
    }

    document.getElementById("cuisineType").innerHTML = cuisineType;

    if (typeof entries[entriesIndex].address === 'object') {
        document.getElementById("placeAddress").innerHTML = 'N/A';
    } else {
        document.getElementById("placeAddress").innerHTML = entries[entriesIndex].address;
    }
    if (typeof entries[entriesIndex].phone === 'object') {
        document.getElementById("placePhone").innerHTML = 'N/A';
    } else {
        document.getElementById("placePhone").innerHTML = entries[entriesIndex].phone;
    }
    if (typeof entries[entriesIndex].open === 'object') {
        document.getElementById("placeHours").innerHTML = 'N/A';
    } else {
        document.getElementById("placeHours").innerHTML = entries[entriesIndex].open;
    }

    localStorage.setItem("entriesIndex", entriesIndex)
}

function loopBackRestaurants() {
    var entriesIndex = JSON.parse(localStorage.getItem("entriesIndex"));
    if (entriesIndex > 0) {
        entriesIndex = entriesIndex - 1;
    } else {
        localStorage.setItem("entriesIndex", entries.length-1)
        entriesIndex = JSON.parse(localStorage.getItem("entriesIndex"));
    }


    loadImg(entries[entriesIndex])


    var cuisineType = JSON.parse(localStorage.getItem("cuisineType"));

    if (typeof entries[entriesIndex].name === 'object') {
        document.getElementById("restaurantName").innerHTML = 'N/A';
    } else {
        document.getElementById("restaurantName").innerHTML = entries[entriesIndex].name;
    }

    document.getElementById("cuisineType").innerHTML = cuisineType;

    if (typeof entries[entriesIndex].address === 'object') {
        document.getElementById("placeAddress").innerHTML = 'N/A';
    } else {
        document.getElementById("placeAddress").innerHTML = entries[entriesIndex].address;
    }
    if (typeof entries[entriesIndex].phone === 'object') {
        document.getElementById("placePhone").innerHTML = 'N/A';
    } else {
        document.getElementById("placePhone").innerHTML = entries[entriesIndex].phone;
    }
    if (typeof entries[entriesIndex].open === 'object') {
        document.getElementById("placeHours").innerHTML = 'N/A';
    } else {
        document.getElementById("placeHours").innerHTML = entries[entriesIndex].open;
    }

    localStorage.setItem("entriesIndex", entriesIndex)
}

