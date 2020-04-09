const employeContainer = document.getElementById("employe-container");

fetch("https://api.tretton37.com/ninjas")
  .then((res) => {
    return res.json();
  })
  .then((json) => {
    const employeList = json;

    const showEmployes = () => {
      employeContainer.innerHTML = "";
      employeList.map((employe) => {
        employeContainer.innerHTML += `<div class="employe-card">
        <h2>${employe.name}</h2>
        <img src=${employe.imagePortraitUrl}>
        </div>`;
      });
    };
    showEmployes();
  });
