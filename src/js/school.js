"use strict"
// Connects to the api for educations

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


//funktions -------

// connects to the api database where the tabels are stored
function getApi() {
    content.innerHTML = "";
    // the link to the api
    fetch('http://localhost/apiProject/school.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(tabel => {
                // prints out our courses to the index
                content.innerHTML +=
                    `<div class="school-wrapper" id="school-wrapper">
                    <div class="box1">
                        <div class="date" id="date">
                            <div class="startdate" id="startdate">
                            ${tabel.startdate}
                            </div>
                            <div class="enddate">
                            ${tabel.enddate}
                            </div>
                        </div>
                    </div>
                    <!-- box1 end -->
                    <div class="box2">
                        <p class="school" id="school">
                        ${tabel.school}
                        </p>
                        <p class="course" id="course">
                        ${tabel.course}
                        </p>
                    </div>
                    <!-- box2 end -->
                </div>
                <!-- school-wrapper end -->`;
            })
        })
}

// function for adding courses
function addApi() {
    // vars connecting back to the database
    let value1 = addValue1.value;
    let value2 = addValue2.value;
    let value3 = addValue3.value;
    let value4 = addValue4.value;

    // connects back to the class in the api
    let arr = { 'kurskod': value1, 'kursnamn': value2, 'progression': value3, 'kursplan': value4 }
    // another link to the api
    fetch('http://localhost/apiProject/school.php', {
        // using metod post
        method: 'POST',
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