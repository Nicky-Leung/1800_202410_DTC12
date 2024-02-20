function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        // User is signed in.
        // Do something for the user here.
        $('#navbarPlaceholder').load('./text/navbar.html');
        $('#footerPlaceholder').load('./text/footer.html');

    });
}
loadSkeleton();