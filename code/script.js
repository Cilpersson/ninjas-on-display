window.onload = function () {
  var employeeContainer = document.getElementById("employee-container");
  var cityPick = document.querySelector(".office");

  var github = document.getElementById("gitHub");
  var twitter = document.getElementById("twitter");
  var linkedin = document.getElementById("linkedIn");
  var stackoverflow = document.getElementById("stackOverflow");

  var checkboxes = [github, twitter, linkedin, stackoverflow];

  var filterButton = document.getElementById("filter-button");
  var resetButton = document.getElementById("reset-button");

  let employeeList;
  let filteredEmployeeList;

  employeeContainer.innerHTML = "BLAJSDLKFJAS";

  url = "https://api.tretton37.com/ninjas/";
  url = url + "?t=${new Date().getTime()}";

  window
    .fetch(url, {
      mode: "no-cors", // 'cors' by default
    })
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (json) {
      employeeList = json;
      filteredEmployeeList = employeeList;
      showEmployees(employeeList);
    });

  const showEmployees = function (employees) {
    employeeContainer.innerHTML = "";
    if (employees) {
      employees.forEach(function (employee) {
        console.log(JSON.stringify(employee));
        // employeeContainer.innerHTML += `
        //   <div tabindex="0" class="employee-card">
        //     <div class="employee-info">
        //       <div class="employee-wrapper">
        //         <img class="profile-picture" src=${
        //           employee.imagePortraitUrl
        //         } alt="Profile picture of employee">
        //         <div tabindex="0" class="employee-contacts">
        //           <p  class="email">${
        //             employee.email
        //               ? `<a href="mailto:${employee.email}?Subject=Hey%20ninja!" target="_top"><img class="mini-icon" src="icons/paper-plane.svg" alt="Paper plane">  e-mail me!</a>`
        //               : ""
        //           }</p>
        //           <p tabindex="0" class="phone-nbr"> ${
        //             employee.phoneNumber
        //               ? `<img class="mini-icon" src="icons/phone.svg" alt="Paper plane"> ${employee.phoneNumber} `
        //               : ""
        //           }</p>
        //           <p class="phone-nbr"><img class="mini-icon" src="icons/office.svg" alt="Office"> ${
        //             employee.office
        //           }</p>
        //         </div>
        //       </div>
        //       <div class="employee-text">
        //         <h2>${employee.name}</h2>
        //       </div>
        //     </div>
        //     <div class="social-media">
        //       ${
        //         employee.gitHub
        //           ? `<a href="https://github.com/${employee.gitHub}" target="_blank"><img class="icon" src="icons/github.svg" alt="Github logo"></a>`
        //           : ""
        //       }
        //       ${
        //         employee.twitter
        //           ? `<a href="https://twitter.com/${employee.twitter}" target="_blank"><img class="icon" src="icons/twitter.svg"
        //           alt="Twitter logo"></a>`
        //           : ""
        //       }
        //       ${
        //         employee.stackOverflow
        //           ? `<a href="https://stackoverflow.com/users/${employee.stackOverflow}" target="_blank"><img class="icon"
        //           src="icons/stackoverflow.svg" alt="Stackoverflow logo"></a>`
        //           : ""
        //       }
        //       ${
        //         employee.linkedIn
        //           ? `<a href="https://www.linkedin.com${employee.linkedIn}" target="_blank"><img class="icon" src="icons/linkedin.svg"
        //           alt="Linkedin logo"></a>`
        //           : ""
        //       }
        //     </div>
        //   </div>
        // `;
      });
    }
  };

  const filterByOffice = function () {
    checkboxes.forEach(function (checkbox) {
      if (checkbox.value) {
        checkbox.checked = false;
      }
    });
    filteredEmployeeList = employeeList.filter(function () {
      return employee.office === cityPick.value;
    });
    filteredEmployeeList = filteredEmployeeList.sort(function (a, b) {
      a.name.localeCompare(b.name);
    });

    showEmployees(filteredEmployeeList);
  };

  const resetFilters = function () {
    location.reload();
  };

  const filterBySocialMedia = function () {
    if (github.checked) {
      filteredEmployeeList = filteredEmployeeList.filter(function (employee) {
        return employee.gitHub !== null;
      });
    }
    if (twitter.checked) {
      filteredEmployeeList = filteredEmployeeList.filter(function (employee) {
        return employee.twitter !== null;
      });
    }
    // if (linkedin.checked) {
    //   filteredEmployeeList = filteredEmployeeList.filter(
    //     (employee) => employee.linkedIn !== null
    //   );
    // }
    // if (stackoverflow.checked) {
    //   filteredEmployeeList = filteredEmployeeList.filter(
    //     (employee) => employee.stackOverflow !== null
    //   );
    // }
    // filteredEmployeeList = filteredEmployeeList.sort((a, b) =>
    //   a.name.localeCompare(b.name)
    // );
    showEmployees(filteredEmployeeList);
  };

  if (cityPick) {
    cityPick.addEventListener("change", filterByOffice);
  }
  filterButton.addEventListener("click", filterBySocialMedia);
  resetButton.addEventListener("click", resetFilters);

  showEmployees(employeeList);
};
