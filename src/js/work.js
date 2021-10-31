"use strict"
// Connects to the api for jobs

// vars connects to the index file

// print out the values on the index screen 
let content2 = document.getElementById("printWork");

// for the add api button
let addApibtn2 = document.getElementById("addApi2");

// the four fields in the form so you can add more apis
let addValue1w = document.getElementById("addValue2-1");
let addValue2w = document.getElementById("addValue2-2");
let addValue3w = document.getElementById("addValue2-3");
let addValue4w = document.getElementById("addValue2-4");

// event listener

// lodes in the api with an event listener connects to the function getApi
window.addEventListener('load', getApi2);

//funktions -------

// connects to the api database where the tabels are stored
function getApi2() {
    content2.innerHTML = "";
    // the link to the api
    fetch('http://localhost/apiProject/work.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(tabel => {
                // prints out our courses into a tabel
                // target blank for the webblinks 
                // a button to erase a course in the bottom
                content2.innerHTML +=
                    `<div class="work-wrapper" id="work-wrapper">
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
                    <p class="title" id="title">
                    ${tabel.title}
                    </p>
                    <p class="place" id="place">
                    ${tabel.place}
                    </p>
                    </div>
                    <!-- box2 end -->
                    </div>
                    <!-- work wrapper end -->
                    `;
            })
        })
}
/* <td><a href="${course.kursplan}"target="_blank">Webblänk</a></td> */ 

{/* <div class="box1">
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
<p class="title" id="title">
${tabel.title}
</p>
<p class="place" id="place">
${tabel.place}
</p>
</div>
<!-- box2 end -->
`; */}


// function for adding courses
function addApi2() {
    // vars connecting back to the database
    let value1w = addValue1w.value;
    let value2w = addValue2w.value;
    let value3w = addValue3w.value;
    let value4w = addValue4w.value;

    // connects back to the class in the api
    let arr = { 'kurskod': value1w, 'kursnamn': value2w, 'progression': value3w, 'kursplan': value4w }
    // another link to the api
    fetch('http://localhost/apiProject/work.php', {
        // using metod post
        method: 'POST',
        // makes sure to turn them into a json format before sending them to the api
        body: JSON.stringify(arr),
    })
        .then(response => response.json())
        .then(data => {
            getApi2();
        })
        // a catch checking for errors
        .catch(error => {
            console.log('error ', error);
        })
}

// function for deleting api objects 
// we add the event from the delete button
function deleteApi2(id) {
    // we give the event a prevent defult so delete wont relode the page.
    fetch('http://localhost/apiProject/work.php?id=' + id, {
        // using metod delete
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            getApi2();
        })
        // a catch checking for errors
        .catch(error => {
            console.log('error ', error);
        })
    return false
}

// Get one api to update
function getOneApi2(id) {
    // another link to the api
    fetch('http://localhost/apiProject/work.php?id=' + id)
        .then(response => response.json())
        .then(data => {
            let result = '';
            // update form
            data.forEach(tabel => {
                result +=
                    `
                    <input type="text" id="update-1" value="${tabel.title}">

                    <input type="text" id="update-2" value="${tabel.place}">

                    <input type="text" id="update-3" value="${tabel.startdate}">

                    <input type="text" id="update-4" value="${tabel.enddate}">
                    <br>
                    <br><a id="save-btn-id" onclick="updateApi2(${tabel.id})" class="save-btn-class"/>Save</a>
                    `;
            });
            updateForm.innerHTML = result;
        });
}

// function for updateing the api
function updateApi2(id) {
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
    fetch('http://localhost/apiProject/work.php?id=' + id, {
        // using metod PUT to update
        method: 'PUT',
        // makes sure to turn them into a json format before sending them to the api
        body: JSON.stringify(arr),
    })
        .then(response => response.json())
        .then(data => {
            getApi2();
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