const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultsDiv = document.getElementById("results");

searchButton.addEventListener("click", () => {
  const searchText = searchInput.value.toLowerCase();
  if (searchText === "" || searchText === " ") {
    return null;
  }
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const results = data.filter((item) =>
        item.name.toLowerCase().includes(searchText.replace(/\s+/g, ""))
      );
      displayResults(results);
    })
    .catch((error) => console.error(error));
});

function displayResults(results) {
  if (results.length === 0) {
    resultsDiv.innerHTML = "<p>No results found.</p>";
  } else {
    let html = "<ul>";
    results.forEach((result) => {
      html += `<li>
          <div>
            <h2>${result.name}</h2>
            <img src=${result.img} />
            <p>${result.description}</p>
            <h4>Uses:</h4>
            <p>${result.uses}</p>

            <h4>Side Effects:</h4>
            <p>${result.side_effects}</p>

            <h4>Dosage:</h4>
            <p>${result.dosage}</p>

            <h4>Ingredients:</h4>
            <p>${result.ingredients}</p>

            <h4>Note:</h4>
            <p>${notes(result)}</p>
            ------------------------------------------------------------------------------------------------------------------------------------------------------
          </div>
        </li>`;
    });
    html += "</ul>";
    resultsDiv.innerHTML = html;
  }
}

function notes(result) {
  if (result.note === undefined) {
    return "";
  } else {
    return result.note;
  }
}
