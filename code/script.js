const employeeContainer = document.getElementById("employee-container");
const cityPick = document.querySelector(".office");

const github = document.getElementById("gitHub");
const twitter = document.getElementById("twitter");
const linkedin = document.getElementById("linkedIn");
const stackoverflow = document.getElementById("stackOverflow");

const checkboxes = [github, twitter, linkedin, stackoverflow];

const filterButton = document.getElementById("filter-button");
const resetButton = document.getElementById("reset-button");

const loader = `<div class="loading-container"><div class="loader"><img class="loading-shuriken" src="./icons/shuriken.svg" alt="Shuriken"></div></div>`;

let employeeList;
let filteredEmployeeList;

const xhr = new XMLHttpRequest();
const url = "https://api.tretton37.com/ninjas";

xhr.onreadystatechange = function () {
  employeeContainer.innerHTML = loader;
  if (xhr.status >= 200 && xhr.status < 300) {
    console.log("hej");
    employeeList = JSON.parse(this.responseText);
    filteredEmployeeList = employeeList;
    showEmployees(employeeList);
  }
};
xhr.open("POST", url);
xhr.send();

const showEmployees = (employees) => {
  employeeContainer.innerHTML = "";
  if (employees) {
    employees.forEach((employee) => {
      employeeContainer.innerHTML += `
        
          <div tabindex="0" class="employee-card">
            <div class="employee-info">
              <div class="employee-wrapper">
                <img class="profile-picture" src=${
                  employee.imagePortraitUrl
                } alt="Profile picture of employee">
                <div tabindex="0" class="employee-contacts">
                  <p  class="email">${
                    employee.email
                      ? `<a href="mailto:${employee.email}?Subject=Hey%20ninja!" target="_top"><img class="mini-icon" src="icons/paper-plane.svg" alt="Paper plane">  e-mail me!</a>`
                      : ""
                  }</p>
                  <p tabindex="0" class="phone-nbr"> ${
                    employee.phoneNumber
                      ? `<img class="mini-icon" src="icons/phone.svg" alt="Paper plane"> ${employee.phoneNumber} `
                      : ""
                  }</p>

                  <p class="phone-nbr"><img class="mini-icon" src="icons/office.svg" alt="Office"> ${
                    employee.office
                  }</p>
                  
                </div>
              </div>
              <div class="employee-text">
                <h2>${employee.name}</h2>
              </div>
            </div>
            <div class="social-media">
              ${
                employee.gitHub
                  ? `<a href="https://github.com/${employee.gitHub}" target="_blank"><img class="icon" src="icons/github.svg" alt="Github logo"></a>`
                  : ""
              }
              ${
                employee.twitter
                  ? `<a href="https://twitter.com/${employee.twitter}" target="_blank"><img class="icon" src="icons/twitter.svg"
                  alt="Twitter logo"></a>`
                  : ""
              }
              ${
                employee.stackOverflow
                  ? `<a href="https://stackoverflow.com/users/${employee.stackOverflow}" target="_blank"><img class="icon"
                  src="icons/stackoverflow.svg" alt="Stackoverflow logo"></a>`
                  : ""
              }
              ${
                employee.linkedIn
                  ? `<a href="https://www.linkedin.com${employee.linkedIn}" target="_blank"><img class="icon" src="icons/linkedin.svg"
                  alt="Linkedin logo"></a>`
                  : ""
              }
            </div>
            
          </div>
        `;
    });
  }
};

const filterByOffice = () => {
  checkboxes.forEach((checkbox) => {
    if (checkbox.value) {
      checkbox.checked = false;
    }
  });
  filteredEmployeeList = employeeList.filter(
    (employee) => employee.office === cityPick.value
  );
  filteredEmployeeList = filteredEmployeeList.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  showEmployees(filteredEmployeeList);
};

const resetFilters = () => {
  location.reload();
};

const filterBySocialMedia = () => {
  if (github.checked) {
    filteredEmployeeList = filteredEmployeeList.filter(
      (employee) => employee.gitHub !== null
    );
  }
  if (twitter.checked) {
    filteredEmployeeList = filteredEmployeeList.filter(
      (employee) => employee.twitter !== null
    );
  }
  if (linkedin.checked) {
    filteredEmployeeList = filteredEmployeeList.filter(
      (employee) => employee.linkedIn !== null
    );
  }
  if (stackoverflow.checked) {
    filteredEmployeeList = filteredEmployeeList.filter(
      (employee) => employee.stackOverflow !== null
    );
  }
  filteredEmployeeList = filteredEmployeeList.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  showEmployees(filteredEmployeeList);
};

if (cityPick) {
  cityPick.addEventListener("change", filterByOffice);
}
filterButton.addEventListener("click", filterBySocialMedia);
resetButton.addEventListener("click", resetFilters);

showEmployees(employeeList);
