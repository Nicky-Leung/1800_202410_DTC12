var ImageFile; // global variable to store the File Object reference


function chooseFileListener() {
    const fileInput = document.getElementById("mypic-input"); // pointer #1
    const image = document.getElementById("mypic-goes-here"); // pointer #2

    console.log(fileInput)
    console.log(image)

    // check if file input and image elements exist
    if (fileInput && image) {
        // attach listener to input file
        // when this file changes, do something
        fileInput.addEventListener('change', function (e) {

            // the change event returns a file "e.target.files[0]"
            ImageFile = e.target.files[0];
            var blob = URL.createObjectURL(ImageFile);

            // change the DOM img element source to point to this file
            image.src = blob; // assign the "src" property of the "img" tag
        });

        document.querySelector('form').addEventListener('submit', function (event) {
            // prevent the default form submission behavior
            event.preventDefault();
            saveUserInfo();
        });
    } else {
        console.error("File input or image element not found."); // Log an error if elements are not found
    }
}

// call chooseFileListener when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", chooseFileListener);





function saveUserInfo() {
    // get new name and bio saved by user
    var newName = document.getElementById("nameInput").value;
    var newBio = document.getElementById("schoolInput").value;

    // update elements with id="name-goes-here" and "bio-goes-here" in profile.html
    // using local storage - no firebase atm
    localStorage.setItem("savedName", newName);
    localStorage.setItem("savedBio", newBio);

    // redirect user to the profile.html after saving data
    window.location.href = "profile.html";
}







