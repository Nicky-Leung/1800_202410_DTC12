/**
 * Loads the skeleton of the web page.
 * 
 * @function loadSkeleton
 * @description This function is responsible for loading the skeleton of the web page, including the navbar and footer.
 * @returns {void}
 */
function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        // User is signed in.
        // Do something for the user here.
        $('#navbarPlaceholder').load('./templates/navbar.html');
        $('#footerPlaceholder').load('./templates/footer.html');

    });
}
loadSkeleton();