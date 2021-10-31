"use strict"
// Connects to the api for jobs

// vars connects to the index file

// print out the values on the index screen 
let content3 = document.getElementById("print3");

// for the add api button
let addApibtn3 = document.getElementById("addApi3");

// the four fields in the form so you can add more apis
let addValue1p = document.getElementById("addValue3-1");
let addValue2p = document.getElementById("addValue3-2");
let addValue3p = document.getElementById("addValue3-3");
let addValue4p = document.getElementById("addValue3-4");

// event listener

// lodes in the api with an event listener connects to the function getApi
window.addEventListener('load', getApi3);

//funktions -------

// connects to the api database where the tabels are stored
function getApi3() {
    content3.innerHTML = "";
    // the link to the api
    fetch('http://localhost/apiProject/webbpages.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(tabel => {
                // prints out our courses into a tabel
                // target blank for the webblinks 
                // a button to erase a course in the bottom
                content3.innerHTML +=
                    `
                    <div class="webbpage-wrapper" id="webbpage-wrapper">
                    <div class="box1">
                        <div class="date" id="date">
                            <div class="startdate" id="startdate">
                            ${tabel.created}
                            </div>
                            <div class="enddate">
                            ${tabel.title}
                            </div>
                        </div>
                    </div>
                    <!-- box1 end -->
                    <div class="box2">
                        <p class="school" id="school">
                        <a href="${tabel.url}"target="_blank">Webpage</a>
                        </p>
                        <p class="course" id="course">
                        ${tabel.body}
                        </p>
                    </div>
                    <!-- box2 end -->
                </div>
                <!-- school-wrapper end -->
                    `;
            })
        })
}
/* <td><a href="${course.kursplan}"target="_blank">Webblänk</a></td> */ 



// function for adding courses
function addApi3() {
    // vars connecting back to the database
    let value1p = addValue1p.value;
    let value2p = addValue2p.value;
    let value3p = addValue3p.value;
    let value4p = addValue4p.value;

    // connects back to the class in the api
    let arr = { 'kurskod': value1p, 'kursnamn': value2p, 'progression': value3p, 'kursplan': value4p }
    // another link to the api
    fetch('http://localhost/apiProject/webbpages.php', {
        // using metod post
        method: 'POST',
        // makes sure to turn them into a json format before sending them to the api
        body: JSON.stringify(arr),
    })
        .then(response => response.json())
        .then(data => {
            getApi3();
        })
        // a catch checking for errors
        .catch(error => {
            console.log('error ', error);
        })
}

// function for deleting api objects 
// we add the event from the delete button
function deleteApi3(id) {
    // we give the event a prevent defult so delete wont relode the page.
    fetch('http://localhost/apiProject/webbpages.php?id=' + id, {
        // using metod delete
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            getApi3();
        })
        // a catch checking for errors
        .catch(error => {
            console.log('error ', error);
        })
    return false
}

// Get one api to update
function getOneApi3(id) {
    // another link to the api
    fetch('http://localhost/apiProject/webbpages.php?id=' + id)
        .then(response => response.json())
        .then(data => {
            let result = '';
            // update form
            data.forEach(tabel => {
                result +=
                    `
                    <input type="text" id="update-1" value="${tabel.created}">

                    <input type="text" id="update-2" value="${tabel.title}">

                    <input type="text" id="update-3" value="${tabel.url}">

                    <input type="text" id="update-4" value="${tabel.body}">
                    <br>
                    <br><a id="save-btn-id" onclick="updateApi3(${tabel.id})" class="save-btn-class"/>Save</a>
                    `;
            });
            updateForm.innerHTML = result;
        });
}

// function for updateing the api
function updateApi3(id) {
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

    let arr = { 'id': id, 'kurskod': value1, 'kursnamn': value2, 'progression': value3, 'kursplan': value4}
    // another link to the api
    fetch('http://localhost/apiProject/webbpages.php?id=' + id, {
        // using metod PUT to update
        method: 'PUT',
        // makes sure to turn them into a json format before sending them to the api
        body: JSON.stringify(arr),
    })
        .then(response => response.json())
        .then(data => {
            getApi3();
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