/**
 * Logs out the user by signing them out of Firebase authentication and redirecting them to the index.html page.
 */
function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logging out user");
        window.location.href = "index.html";
      }).catch((error) => {
        // An error happened.
      });
}
