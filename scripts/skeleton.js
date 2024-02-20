function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {                   //if the pointer to "user" object is not null, then someone is logged in
            // User is signed in.
            // Do something for the user here.
            $('#navbarPlaceholder').load('./text/navbar.html');
            $('#footerPlaceholder').load('./text/footer.html');

        }
    });
}
loadSkeleton(); 