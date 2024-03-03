function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        // User is signed in.
        // Do something for the user here.
        $('#navbarPlaceholder').load('./templates/navbar.html');
        $('#footerPlaceholder').load('./templates/footer.html');

    });
}
loadSkeleton();