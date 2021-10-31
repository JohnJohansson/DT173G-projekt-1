"use strict"
// main js file that consumes my webservice 

// vars connects to the index file

// print out the values on the index screen 
let content = document.getElementById("print");

// for the add api button
let addApibtn = document.getElementById("addApi");

// the four fields in the form so you can add more apis
let addValue1 = document.getElementById("addValue-1");
let addValue2 = document.getElementById("addValue-2");
let addValue3 = document.getElementById("addValue-3");
let addValue4 = document.getElementById("addValue-4");

// event listener

// lodes in the api with an event listener connects to the function getApi
window.addEventListener('load', getApi);

// event listener for the add api button
// by putting an extra function and adding prevent defult we can stop the
// form from reloding the page, a defult form relodes the page
// stoping all the code from having time to run making the code not work as intended.
addApibtn.addEventListener('click', function (e) {
    e.preventDefault();
    addApi();
    // gives back empty values in our form reseting it
    addValue1.value = "";
    addValue2.value = "";
    addValue3.value = "";
    addValue4.value = "";
});

//funktions -------

// connects to the api database where the tabels are stored
function getApi() {
    content.innerHTML = "";
    // the link to the api
    fetch('http://localhost/apiProject/school.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(tabel => {
                // prints out our courses into a tabel
                // target blank for the webblinks 
                // a button to erase a course in the bottom
                content.innerHTML +=
                    `<tr><td>${tabel.school}</td>
                    <td>${tabel.course}</td>
                    <td>${tabel.startdate}</td>
                    <td>${tabel.enddate}</td>
                    <td><button id="${tabel.id}" onClick="getOneApi(${tabel.id})">Update</button></div></td>
                    <td><button id="${tabel.id}" onClick="deleteApi(${tabel.id})">Delete</button></td>
                    </tr>`;

            })
        })
}
{/* <td><a href="${course.kursplan}"target="_blank">Webblänk</a></td> */ }

// function for adding courses
function addApi() {
    // vars connecting back to the database
    let value1 = addValue1.value;
    let value2 = addValue2.value;
    let value3 = addValue3.value;
    let value4 = addValue4.value;

    // connects back to the class in the api
    let kurs = { 'kurskod': value1, 'kursnamn': value2, 'progression': value3, 'kursplan': value4 }
    // another link to the api
    fetch('http://localhost/apiProject/school.php', {
        // using metod post
        method: 'POST',
        // makes sure to turn them into a json format before sending them to the api
        body: JSON.stringify(kurs),
    })
        .then(response => response.json())
        .then(data => {
            getApi();
        })
        // a catch checking for errors
        .catch(error => {
            console.log('error ', error);
        })
}

// function for deleting api objects 
// we add the event from the delete button
function deleteApi(id) {
    // we give the event a prevent defult so delete wont relode the page.
    fetch('http://localhost/apiProject/school.php?id=' + id, {
        // using metod delete
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            getApi();
        })
        // a catch checking for errors
        .catch(error => {
            console.log('error ', error);
        })
    return false
}

// Get one api to update
function getOneApi(id) {
    // another link to the api
    fetch('http://localhost/apiProject/school.php?id=' + id)
        .then(response => response.json())
        .then(data => {
            let result = '';
            // update form
            data.forEach(tabel => {
                result +=
                    `
                    <input type="text" id="update-1" value="${tabel.school}">

                    <input type="text" id="update-2" value="${tabel.course}">

                    <input type="text" id="update-3" value="${tabel.startdate}">

                    <input type="text" id="update-4" value="${tabel.enddate}">
                    <br>
                    <br><a id="save-btn-id" onclick="updateApi(${tabel.id})" class="save-btn-class"/>Save</a>
                    `;
            });
            updateForm.innerHTML = result;
        });
}

// function for updateing the api
function updateApi(id) {
    // vars connecting back to the database

    // the four fields for the update form
    let update1 = document.getElementById('update-1');
    let update2 = document.getElementById('update-2');
    let update3 = document.getElementById('update-3');
    let update4 = document.getElementById('update-4');


    let value1 = update1.value;
    let value2 = update2.value;
    let value3 = update3.value;
    let value4 = update4.value;

    let arr = { 'id': id, 'kurskod': value1, 'kursnamn': value2, 'progression': value3, 'kursplan': value4 }
    // another link to the api
    fetch('http://localhost/apiProject/school.php?id=' + id, {
        // using metod PUT to update
        method: 'PUT',
        // makes sure to turn them into a json format before sending them to the api
        body: JSON.stringify(arr),
    })
        .then(response => response.json())
        .then(data => {
            getApi();
        })
        // a catch checking for errors
        .catch(error => {
            console.log('error ', error);
        })
    // making sure the field of the update form is empty afterwards
    update1.value = "";
    update2.value = "";
    update3.value = "";
    update4.value = "";
}