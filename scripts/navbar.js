// remove search bar on logout
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        
    } else {
        searchbar = document.getElementById("searchbar");
        searchbar.style.display = "none";
    }
});