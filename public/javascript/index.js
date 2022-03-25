const charactersAPI = new APIHandler("http://localhost:8000");

window.addEventListener("load", () => {
  document
    .getElementById("fetch-all")
    .addEventListener("click", function (event) {
      event.preventDefault();
      const divContainer = document.querySelector(".character-info");
      charactersAPI.getFullList().then((data) => {
        let containerDiv = "";
        data.map((character) => {
          containerDiv += `
          <div class="character-info">
            <div class="name">${character.name}</div>
            <div class="occupation">${character.occupation}</div>
            <div class="cartoon">${character.cartoon}</div>
            <div class="weapon">${character.weapon}</div>
          </div>
          `;
        });
        document.querySelector(".characters-container").innerHTML =
          containerDiv;
      });
    });

  document
    .getElementById("fetch-one")
    .addEventListener("click", function (event) {
      event.preventDefault();
      const id = document.querySelector("input[name='character-id']").value;
      charactersAPI.getOneRegister(id).then((data) => {
        console.log(data);
        let containerDiv = "";
        containerDiv += `
          <div class="character-info">
            <div class="name">${data.name}</div>
            <div class="occupation">${data.occupation}</div>
            <div class="cartoon">${data.cartoon}</div>
            <div class="weapon">${data.weapon}</div>
          </div>
          `;
        document.querySelector(".characters-container").innerHTML =
          containerDiv;
      });
    });

  document
    .getElementById("delete-one")
    .addEventListener("click", function (event) {
      event.preventDefault();
      const id = document.querySelector(
        "input[name='character-id-delete']"
      ).value;
      let containerDiv = "";
      charactersAPI
        .deleteOneRegister(id)
        .then(() => {
          document.querySelector(".characters-container").innerHTML =
            "Character has been successfully deleted";
        })
        .catch(() => {
          document.querySelector(".characters-container").innerHTML =
            "Character not found";
        });
    });

  document
    .getElementById("edit-character-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const id = document.querySelector(
        '.character-form  input[name="chr-id"]'
      ).value;
      const data = {
        name: event.target.name.value,
        occupation: event.target.occupation.value,
        weapon: event.target.weapon.value,
        cartoon: event.target.cartoon.checked ? true : false,
      };

      charactersAPI
        .updateOneRegister(id, data)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });

  document
    .getElementById("new-character-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const data = {
        name: event.target.name.value,
        occupation: event.target.occupation.value,
        weapon: event.target.weapon.value,
        cartoon: event.target.cartoon.checked ? true : false,
      };
      charactersAPI.createOneRegister(data);
    });
});