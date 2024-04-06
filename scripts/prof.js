var ImageFile; // A global variable to store the File Object reference


function chooseFileListener() {
    const fileInput = document.getElementById("mypic-input"); // pointer #1
    const image = document.getElementById("mypic-goes-here"); // pointer #2

    console.log(fileInput)
    console.log(image)

    // Check if file input and image elements exist
    if (fileInput && image) {
        // Attach listener to input file
        // When this file changes, do something
        fileInput.addEventListener('change', function (e) {

            // The change event returns a file "e.target.files[0]"
            ImageFile = e.target.files[0];
            var blob = URL.createObjectURL(ImageFile);

            // Change the DOM img element source to point to this file
            image.src = blob; // Assign the "src" property of the "img" tag
        });

        document.querySelector('form').addEventListener('submit', function (event) {
            // Prevent the default form submission behavior
            event.preventDefault();
            saveUserInfo();
        });
    } else {
        console.error("File input or image element not found."); // Log an error if elements are not found
    }
}

// Call chooseFileListener when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", chooseFileListener);











