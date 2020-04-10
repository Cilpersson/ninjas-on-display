const employeeContainer = document.getElementById("employee-container");
const cityPick = document.querySelector(".office");

fetch("https://api.tretton37.com/ninjas")
  .then((res) => {
    return res.json();
  })
  .then((json) => {
    let employeeList = json;

    const showEmployees = () => {
      employeeContainer.innerHTML = "";
      employeeList.map((employee) => {
        employeeContainer.innerHTML += `
        <div class="employee-card">
          <img src=${employee.imagePortraitUrl}>
          <h2>${employee.name}</h2>
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
      employeeList = employeeList.filter(
        (employee) => employee.office === cityPick.value
      );
      employeeList = employeeList.sort((a, b) => a.name.localeCompare(b.name));
      showEmployees();
      employeeList = json;
    };

    if (cityPick) {
      cityPick.addEventListener("change", filterByOffice);
    }

    showEmployees();
  });
