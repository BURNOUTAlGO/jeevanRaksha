document.addEventListener("DOMContentLoaded", function () {
  fetch("https://dummyjson.com/users")
    .then((response) => response.json())
    .then((data) => {
      data["users"].forEach(function (user, index) {
        var row = document.createElement("tr");
        row.appendChild(createCell(user.firstName + " " + user.lastName));
        row.appendChild(createCell(user.age));
        row.appendChild(createCell(user.gender));
        row.appendChild(createCell(user.bloodGroup));
        row.appendChild(createCell(user.address.city));

        // Create a button that opens the modal
        var infoButton = document.createElement("button");
        infoButton.innerHTML = "<i class='fa-solid fa-circle-info'></i>";
        infoButton.classList.add("btn");
        infoButton.setAttribute("data-toggle", "modal");
        infoButton.setAttribute("data-target", "#userModal" + index);
        row.appendChild(createCell("")).appendChild(infoButton);

        document.getElementById("myTable").getElementsByTagName("tbody")[0].appendChild(row);

        // Create a modal for the user
        var modal = document.createElement("div");
        modal.classList.add("modal", "fade");
        modal.id = "userModal" + index;
        modal.innerHTML = `
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <img src="${user.image}" alt="User image" style="width: 100%;">
                                    <button type="button" class="close" data-dismiss="modal">×</button>
                                </div>
                                <div class="modal-body">
                                    <h5 class="modal-title">${user.firstName} ${user.lastName}</h5>
                                    <p>Age: ${user.age}</p>
                                    <p>Gender: ${user.gender}</p>
                                    <p>Blood Group: ${user.bloodGroup}</p>
                                    <p>City: ${user.address.city}</p>
                                </div>
                            </div>
                        </div>`;
        document.getElementById("modals").appendChild(modal);
      });
    });

  function createCell(text) {
    var cell = document.createElement("td");
    cell.appendChild(document.createTextNode(text));
    return cell;
  }
});

function filterTable() {
  var filterGender = document.getElementById("filterGender").value.toUpperCase();
  var filterBloodGroup = document.getElementById("filterBloodGroup").value.toUpperCase();
  var table = document.getElementById("myTable");
  var tr = table.getElementsByTagName("tr");
  for (var i = 0; i < tr.length; i++) {
    var tdGender = tr[i].getElementsByTagName("td")[2];
    var tdBloodGroup = tr[i].getElementsByTagName("td")[3];
    if (tdGender && tdBloodGroup) {
      var txtValueGender = tdGender.textContent || tdGender.innerText;
      var txtValueBloodGroup = tdBloodGroup.textContent || tdBloodGroup.innerText;
      if (
        (filterGender === "" || txtValueGender.toUpperCase() === filterGender) &&
        (filterBloodGroup === "" || txtValueBloodGroup.toUpperCase().indexOf(filterBloodGroup) > -1)
      ) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
