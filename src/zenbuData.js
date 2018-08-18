/*
function getData() {
    $.ajax({
        url: "dummyData.xml",

        // The name of the callback parameter, as specified by the YQL service
        jsonp: "callback",

        // Tell jQuery we're expecting JSONP
        dataType: "jsonp",

        // Tell YQL what we want and that we want JSON
        data: {
            q: "select name",
            format: "json"
        },

        // Work with the response
        success: function (response) {
            console.log(response); // server response
        }
    });

    $.getJSON('apiurl',function(data){
        console.log(data);
    }
}
*/

//
// function getData() {
//     let jqxhr = $.ajax({
//         type: 'GET',
//         url: "localhost:3000",
//         dataType: 'xml',
//         global: false,
//         async:false,
//         success: function(data) {
//             return data;
//         }
//     }).responseText;
//
//     //let entries = $(jqxhr).find("entry").text();
//     let entries = $(jqxhr).find("entry");
//
//     console.log(typeof(entries));
//
//     for (let i = 0; i < entries.length; i++) {
//         console.log(entries[i].find("entry").text());
//     }
//
// }

function getData(){
    fetch('http://localhost:3000/api') // Change for heroku deployment
        .then(console.log)
}


