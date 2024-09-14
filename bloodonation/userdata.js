function getRandomDate() {
  var start = new Date(2024, 0, 1);
  var end = new Date(2024, 4, 30);
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

fetch("https://dummyjson.com/users")
  .then((response) => response.json())
  .then((data) => {
    // console.log(data.users);
    var table = document.getElementById("usersTable");
    data["users"].slice(0, 15).forEach((user) => {
      var row = table.insertRow(-1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      cell1.innerHTML = user.firstName + " " + user.lastName;
      cell2.innerHTML = user.age;
      cell3.innerHTML = user.gender;
      cell4.innerHTML = user.bloodGroup;
      cell5.innerHTML = getRandomDate().toLocaleDateString();
    });
  })
  .catch((error) => console.error("Error:", error));

fetch("https://dummyjson.com/users")
  .then((response) => response.json())
  .then((data) => {
    var table = document.getElementById("requestTable");
    data["users"].slice(0, 5).forEach((user) => {
      var row = table.insertRow(-1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      cell1.innerHTML = "<i class='fa-solid fa-droplet'></i>";
      cell2.innerHTML = user.firstName + " " + user.lastName;
      cell3.innerHTML = user.bloodGroup;
      cell4.innerHTML = user.address.address;
      cell5.innerHTML = getRandomDate().toLocaleDateString();
    });
  })
  .catch((error) => console.error("Error:", error));
