firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

document.getElementById("searchForm").addEventListener("submit", function (event) {
  event.preventDefault();

  var itemName = document.getElementById("itemName").value.trim();
  var minPrice = parseInt(document.getElementById("minPrice").value);
  var maxPrice = parseInt(document.getElementById("maxPrice").value);

  var query = db.collection("items");

  if (itemName !== '') {
    query = query.where("name", "==", itemName);
  }
  if (!isNaN(minPrice)) {
    query = query.where("price", ">=", minPrice);
  }
  if (!isNaN(maxPrice)) {
    query = query.where("price", "<=", maxPrice);
  }


  query.get().then(function (querySnapshot) {
    var results = document.getElementById("searchResults");
    results.innerHTML = '';

    querySnapshot.forEach(function (doc) {
      var data = doc.data();
      var resultDiv = document.createElement("div");
      resultDiv.textContent = data.name + " - $" + data.price + " - " + data.description;
      results.appendChild(resultDiv);
    });

    if (querySnapshot.empty) {
      results.textContent = "No matching items found :(";
    }
  }).catch(function (error) {
    console.error("Error getting documents: ", error);
  });
});
