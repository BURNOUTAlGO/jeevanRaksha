// Division / District / Upazila onload function
window.onload = function () {
  var divisionSelect = document.getElementById("division");
  var districtSelect = document.getElementById("district");
  var upazilaSelect = document.getElementById("upazila");

  var countryData =
    "https://gist.githubusercontent.com/dizaraj/7a8a4b51c6c4dfe3400dc3203f7025fe/raw/bdinfo.json";
    
  fetch(countryData)
    .then((response) => response.json())
    .then((data) => {
      // Populate the division select element
      // console.log(data["Chittagong"]["Chittagong"]["Anwara"]);
      for (var division in data) {
        // console.log(division);
        var option = document.createElement("option");
        option.text = division;
        option.value = division;
        divisionSelect.add(option);
      }

      // Update the district and upazila select elements when a division is selected
      divisionSelect.onchange = function () {
        // Clear the district and upazila select elements
        selectedDivision = this.value;
        districtSelect.length = 1;
        upazilaSelect.length = 1;

        // Populate the district select element
        var districts = data[this.value];
        for (var district in districts) {
          // console.log(district);
          var option = document.createElement("option");
          option.text = district;
          option.value = district;
          districtSelect.add(option);
        }
      };

      // Update the upazila select element when a district is selected
      districtSelect.onchange = function () {
        // Clear the upazila select element
        upazilaSelect.length = 1;

        // Populate the upazila select element
        var upazilas = data[selectedDivision][this.value];
        if (Array.isArray(upazilas)){
          for (var upazila of upazilas) {
            var option = document.createElement("option");
            option.text = upazila;
            option.value = upazila;
            upazilaSelect.add(option);
          }
        } 
        else{
          for (var upazila in upazilas) {
            var option = document.createElement("option");
            option.text = upazila;
            option.value = upazila;
            upazilaSelect.add(option);
          }
        }
      };
    })
    .catch((error) => console.error("Error:", error));
};

function fetchAllHtml(id, htmlFile) {
  fetch(htmlFile)
    .then((response) => response.text())
    .then((data) => (document.getElementById(id).innerHTML = data))
    .catch((error) => console.error(error));
}

// List of HTML files in the 'body_parts' folder
var htmlFiles = ["header", "hero", "cta", "footer", "request"];

// Fetch each HTML file
htmlFiles.forEach((file) => {
  fetchAllHtml(file, `./assets/body_parts/${file}.html`);
});
