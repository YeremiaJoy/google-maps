//fetch data for sidebar logo
$.getJSON("./js/sidebar.json", function (data) {
  //append div for sidebare logo name
  data.forEach(({ name }) => {
    let placeholder = document.getElementById("sidebar-logo");
    let headerElement = document.createElement("div");
    headerElement.className =
      name === "Browse" ? "logo-item active" : "logo-item";
    headerElement.id = `logo-${name}`;
    headerElement.textContent = name;

    placeholder.appendChild(headerElement);
  });
  //append div for sidebare logo image
  data.forEach(({ image, name }) => {
    let logoImage = document.getElementById(`logo-${name}`);
    let imgElement = document.createElement("img");
    imgElement.src = image;
    imgElement.setAttribute("alt", name);

    logoImage.prepend(imgElement);

    //add Listener if sidebare logo is "Browse" to hide or show sidebar menu
    if (name == "Browse") {
      logoImage.addEventListener("click", () => {
        closeDescription();
        $("#menu-side-bar").toggleClass("hide");
        $("#page").toggleClass("hide-sidebar");
      });
    }
  });
});

//fetch item for sidebar place name
$.getJSON("./js/marker.json", function (data) {
  let placeholder = document.getElementById("side-bar-items");
  data.forEach(([position, title, desc]) => {
    let headerElement = document.createElement("div");
    headerElement.className = "side-bar-item";
    headerElement.id = title;
    headerElement.textContent = title;
    placeholder.appendChild(headerElement);
    //show description
    const show = document.getElementById(title);
    show.addEventListener("click", function show() {
      description(title, desc);
    });
  });
});

//close description box
function closeDescription(reguler) {
  reguler();
  var element = document.getElementById("description");
  element.classList.add("hide");
  // $("#description").removeClass("content-divide");
  $("#side-bar-items>div.choosed").removeClass("choosed");
  element.innerHTML = "";
  $("#content").removeClass("content-divide");
}

//make description component
function description(title, data, large) {
  large();
  //delete class hide if exist to show sidebar menu
  $("#menu-side-bar").removeClass("hide");
  //delete class hide-sidebar, return to 3 grid page
  $("#page").removeClass("hide-sidebar");
  //divide content container to 2 grid (70% 30%)
  $("#content").addClass("content-divide");
  //remove all choosed class (green font color)
  $("#side-bar-items>div.choosed").removeClass("choosed");

  let choose = document.getElementById(title);
  let element = document.getElementById("description");
  //remove all child of id="description"
  element.innerHTML = "";
  //remove class hide, to show description box
  element.classList.remove("hide");
  //add class choosed to highlight selected menu
  choose.classList.add("choosed");
  //declare placeholder for all descriptoin box
  let placeholder = document.getElementById("description");

  //image desc
  let imgElement = document.createElement("img");
  imgElement.src = data.img;
  imgElement.setAttribute("alt", "desc-picture");
  //place name desc
  let placeElement = document.createElement("div");
  placeElement.className = "place-name active";
  placeElement.textContent = title;
  //desc place
  let descElement = document.createElement("div");
  descElement.className = "desc";
  descElement.textContent = data.description;
  //content desc place
  let contentElement = document.createElement("div");
  contentElement.className = "desc-content";
  contentElement.textContent = data.content;
  //address place
  let addressElement = document.createElement("div");
  addressElement.className = "address";
  addressElement.textContent = data.address;
  //location image
  let locationImgElement = document.createElement("img");
  locationImgElement.src = "./img/location.png";
  locationImgElement.setAttribute("alt", "location");
  //website place
  let webElement = document.createElement("div");
  webElement.className = "web";
  webElement.textContent = data.website;
  //web image
  let webImgElement = document.createElement("img");
  webImgElement.src = "./img/web.png";
  webImgElement.setAttribute("alt", "web");

  //append all to id="description"
  placeholder.appendChild(imgElement);
  placeholder.appendChild(placeElement);
  placeholder.appendChild(descElement);
  placeholder.appendChild(contentElement);
  placeholder.appendChild(addressElement);
  placeholder.appendChild(webElement);

  //prepend image of location and website image to id="description"
  addressElement.prepend(locationImgElement);
  webElement.prepend(webImgElement);
}
