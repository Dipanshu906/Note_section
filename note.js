

// New Note button ko select kar rahe hain
let newNote = document.getElementsByClassName("new_note")[0];

// Jahan saare notes create honge us div ko select kar rahe hain
let notes = document.getElementsByClassName("notes")[0];


// localStorage se purane notes nikal rahe hain
// Agar koi note saved nahi hai to empty array [] milega
let allNotes = JSON.parse(localStorage.getItem("allNotes")) || [];


// --------------------------------------------------
// YE FUNCTION EK NAYA NOTE BOX BANATA HAI
// --------------------------------------------------

function createNote(noteData) {

    // Naye note ke liye ek div bana rahe hain
    let box = document.createElement("div");

    // Div ko note_box class de rahe hain
    box.className = "note_box";


    // ---------------- HEADING ----------------

    // Ek h1 element bana rahe hain
    let heading = document.createElement("h1");

    // h1 ko heading_text class de rahe hain
    heading.className = "heading_text";

    // Heading ko editable bana rahe hain
    // Ab user h1 ke andar directly type kar sakta hai
    heading.contentEditable = "true";

    // Saved heading ko h1 ke andar dikha rahe hain
    heading.innerText = noteData.heading;


    // ---------------- PARAGRAPH ----------------

    // Ek p element bana rahe hain
    let paragraph = document.createElement("p");

    // p ko note class de rahe hain
    paragraph.className = "note";

    // Paragraph ko editable bana rahe hain
    paragraph.contentEditable = "true";

    // Saved note ko p ke andar dikha rahe hain
    paragraph.innerText = noteData.note;


    // ---------------- DELETE BUTTON ----------------

    // Delete button bana rahe hain
    let deleteBtn = document.createElement("button");

    // Button ko delete class de rahe hain
    deleteBtn.className = "delete";

    // Button par Delete text likh rahe hain
    deleteBtn.innerText = "Delete";


    // ---------------- BOX KE ANDAR ELEMENTS ----------------

    // Heading ko note box ke andar daal rahe hain
    box.appendChild(heading);

    // Paragraph ko note box ke andar daal rahe hain
    box.appendChild(paragraph);

    // Delete button ko note box ke andar daal rahe hain
    box.appendChild(deleteBtn);

    // Pura note box .notes div ke andar daal rahe hain
    notes.appendChild(box);


    // --------------------------------------------------
    // HEADING ME KUCH LIKHNE PAR AUTOMATICALLY SAVE
    // --------------------------------------------------

    heading.addEventListener("input", function () {

        // noteData ke heading ko naye text se update kar rahe hain
        noteData.heading = heading.innerText;

        // Updated data ko localStorage me save kar rahe hain
        saveNotes();
    });


    // --------------------------------------------------
    // PARAGRAPH ME KUCH LIKHNE PAR AUTOMATICALLY SAVE
    // --------------------------------------------------

    paragraph.addEventListener("input", function () {

        // noteData ke note ko naye text se update kar rahe hain
        noteData.note = paragraph.innerText;

        // Updated data ko localStorage me save kar rahe hain
        saveNotes();
    });


    // --------------------------------------------------
    // DELETE BUTTON
    // --------------------------------------------------

    deleteBtn.addEventListener("click", function () {

        // Screen se note box remove kar rahe hain
        box.remove();


        // allNotes array me se sirf isi note ko remove kar rahe hain
        // id ke basis par note identify ho raha hai
        allNotes = allNotes.filter(function (item) {

            return item.id !== noteData.id;

        });


        // Delete hone ke baad updated array save kar rahe hain
        saveNotes();
    });
}




// --------------------------------------------------
// YE FUNCTION SAARE NOTES KO LOCALSTORAGE ME SAVE KARTA HAI
// --------------------------------------------------

function saveNotes() {

    // allNotes array ko JSON string me convert karke save kar rahe hain
    localStorage.setItem("allNotes", JSON.stringify(allNotes));
}



// --------------------------------------------------
// NEW NOTE BUTTON
// --------------------------------------------------

newNote.addEventListener("click", function () {

    // Ek naye note ka data bana rahe hain
    let noteData = {

        // Har note ko unique ID mil rahi hai
        id: Date.now(),

        // Default heading
        heading: "Write your heading here...",

        // Default paragraph
        note: "Write your note here ...."
    };


    // Naye note ko allNotes array me add kar rahe hain
    allNotes.push(noteData);


    // Screen par naya note box create kar rahe hain
    createNote(noteData);


    // Naye note ko localStorage me save kar rahe hain
    saveNotes();
});



// --------------------------------------------------
// PAGE REFRESH HONE KE BAAD PURANE NOTES LOAD KARNA
// --------------------------------------------------

// allNotes array ke andar jitne notes hain
// un sabke liye createNote function chalega

allNotes.forEach(function (noteData) {

    createNote(noteData);

});


let Notes = document.querySelectorAll(".note_box");

let backButton = document.querySelector(".back_button");

Notes.forEach((note) => {

    note.addEventListener("click", () => {

        note.classList.add("full_screen");

        backButton.classList.add("show");

    });

});

backButton.addEventListener("click", () => {

    document.querySelectorAll(".note_box").forEach((note) => {

        note.classList.remove("full_screen");

    });

    backButton.classList.remove("show");

});


// Search box ko select kar raha hai
let search_note = document.getElementById("search_note");


// Search box mein typing hone par function chalega
search_note.addEventListener("input", () => {

    // Search ki value ko lowercase mein convert kar raha hai
    let search_value = search_note.value.toLowerCase();


    // Saare note boxes ko select kar raha hai
    let all_notes = document.querySelectorAll(".note_box");


    // Har note ko ek-ek karke check kar raha hai
    all_notes.forEach((note) => {

        // Note ke andar ka text read kar raha hai
        let note_text = note.innerText.toLowerCase();


        // Check kar raha hai ki search text note mein hai ya nahi
        if (note_text.includes(search_value)) {

            // Match hone par note display karega
            note.style.display = "block";

        }
        else {

            // Match nahi hone par note hide karega
            note.style.display = "none";

        }

    });

});
