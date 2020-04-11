const employeeContainer = document.getElementById("employee-container");
const cityPick = document.querySelector(".office");
const github = document.getElementById("gitHub");
const twitter = document.getElementById("twitter");
const linkedin = document.getElementById("linkedIn");
const stackoverflow = document.getElementById("stackOverflow");
// const lund = document.getElementById("lund");
// const helsingborg = document.getElementById("helsingborg");
// const borlange = document.getElementById("borlange");
// const stockholm = document.getElementById("stockholm");
// const ljubljana = document.getElementById("ljubljana");
const filterButton = document.getElementById("filter-button");
const resetButton = document.getElementById("reset-button");
const checkboxValues = [github, twitter, linkedin, stackoverflow];
const loader = `<div class="loading-container"><div class="loader"><img class="loading-shuriken" src="./icons/shuriken.svg"></div></div>`;

employeeContainer.innerHTML = loader;
fetch("https://api.tretton37.com/ninjas")
  .then((res) => {
    return res.json();
  })
  .then((json) => {
    let employeeList = json;
    let filteredEmployeeList = json;

    const showEmployees = (employees) => {
      employeeContainer.innerHTML = "";
      employees.forEach((employee) => {
        employeeContainer.innerHTML += `
        <div class="employee-card">
        <div class="employee-info">
          <img class="profile-picture" src=${employee.imagePortraitUrl}>
          <div class="employee-text">
            <h2>${employee.name}</h2>
          </div>
        </div>
            <div class="social-media">
              ${
                employee.gitHub
                  ? `<a href="https://github.com/${employee.gitHub}"><img class="icon" src="icons/github.svg" alt="Github logo" ></a>`
                  : ""
              }
              ${
                employee.twitter
                  ? `<a href="https://twitter.com/${employee.twitter}"><img class="icon" src="icons/twitter.svg" alt="Twitter logo"></a>`
                  : ""
              }
              ${
                employee.stackOverflow
                  ? `<a href="https://stackoverflow.com/users/${employee.stackOverflow}"><img class="icon" src="icons/stackoverflow.svg" alt="Stackoverflow logo"></a>`
                  : ""
              }
              ${
                employee.linkedIn
                  ? `<a href="https://www.linkedin.com${employee.linkedIn}"><img class="icon" src="icons/linkedin.svg" alt="Linkedin logo"></a>`
                  : ""
              }
            </div>
        </div>`;
      });
    };

    const filterByOffice = () => {
      filteredEmployeeList = employeeList.filter(
        (employee) => employee.office === cityPick.value
      );
      filteredEmployeeList = filteredEmployeeList.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      showEmployees(filteredEmployeeList);
    };

    const resetFilters = () => {
      filteredEmployeeList = employeeList;
      checkboxValues.forEach((checkbox) => {
        checkbox.checked = false;
      });
      cityPick.selectedIndex = 0;
      showEmployees(employeeList);
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
  });
