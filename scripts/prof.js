var ImageFile;      //global variable to store the File Object reference

function chooseFileListener() {
    const fileInput = document.getElementById("mypic-input");   // pointer #1
    const image = document.getElementById("mypic-goes-here");   // pointer #2

    //attach listener to input file
    //when this file changes, do something
    fileInput.addEventListener('change', function (e) {

        //the change event returns a file "e.target.files[0]"
        ImageFile = e.target.files[0];
        var blob = URL.createObjectURL(ImageFile);

        //change the DOM img element source to point to this file
        image.src = blob;    //assign the "src" property of the "img" tag
    })
}
chooseFileListener();




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
