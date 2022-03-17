console.log("Welcome to notes app, This is script.js");
showNotes();
//If user adds a note, ad it to the localStorage .
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myNote = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myNote);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTitle.value = "";
    addTxt.value = "";
    // console.log(notesObj);
    showNotes();


})

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard mx-2 my-2 card" style="width: 18rem">
          <div class="card-body">
          <h6 class="card-title">Note ${index + 1}:<br></h6> 
            <h4 class="card-title">${element.title} </h4>
            <p class="card-text">${element.text}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
          </div>
        </div> `;
    });
    let notesElm = document.getElementById(`notes`);
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show, Use "Add a note" above to add something.`
    }
}

//Function to delete a note
function deleteNote(index) {
    // console.log("I am deleting ", index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById(`searchTxt`);
search.addEventListener(`input`, function () {
    let inputVal = search.value;
    // console.log(`Input Event Fired`, inputVal);
    let noteCards = document.getElementsByClassName(`noteCard`);
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        // console.log(cardTxt) ;
    })
});
