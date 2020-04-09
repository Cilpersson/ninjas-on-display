const employeeContainer = document.getElementById("employee-container");

fetch("https://api.tretton37.com/ninjas")
  .then((res) => {
    return res.json();
  })
  .then((json) => {
    const employeeList = json;

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
                ? `<a href="https://github.com/${employee.gitHub}"><img class="icon" src="icons/github.svg"></a>`
                : ""
            }
            
            ${
              employee.twitter
                ? `<a href="https://twitter.com/${employee.twitter}"><img class="icon" src="icons/twitter.svg"></a>`
                : ""
            }
            ${
              employee.stackOverflow
                ? `<a href="https://stackoverflow.com/users/${employee.stackOverflow}"><img class="icon" src="icons/stackoverflow.svg"></a>`
                : ""
            }
            ${
              employee.linkedIn
                ? `<a href="https://www.linkedin.com${employee.linkedIn}"><img class="icon" src="icons/linkedin.svg"></a>`
                : ""
            }
          </div>
        </div>`;
      });
    };
    showEmployees();
  });
