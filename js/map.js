// Initialize and add the map
async function initMap() {
  //retrieve data from marker.json
  const dataMarker = await $.getJSON("./js/marker.json", function (data) {
    return data;
  });
  //center of map position
  const pos = { lat: 1.293666, lng: 103.850524 };
  // The map, centered at pos
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: pos,
  });

  //Looping data marker
  dataMarker.forEach(([position, title, desc, regPoint, largePoint]) => {
    const regIcon = {
      url: "/img/path-map.png", // url
      scaledSize: new google.maps.Size(80, 80), // scaled size
      labelOrigin: new google.maps.Point(regPoint.x, regPoint.y),
    };
    const largeIcon = {
      url: "/img/path-map.png", // url
      scaledSize: new google.maps.Size(150, 150), // scaled size
      labelOrigin: new google.maps.Point(largePoint.x, largePoint.y),
    };
    const regLabel = {
      text: `${title}`,
      fontSize: "12px",
      className: "label-pin-reg",
    };
    const largeLabel = {
      text: `${title}`,
      fontSize: "12px",
      className: "label-pin-large",
    };
    //add marker
    const marker = new google.maps.Marker({
      position,
      map,
      icon: regIcon,
      title: title,
      label: regLabel,
    });

    //function change to reguler
    function reguler() {
      marker.setIcon(regIcon);
      marker.setLabel(regLabel);
    }
    //function change to large
    function large() {
      marker.setIcon(largeIcon);
      marker.setLabel(largeLabel);
    }

    var hoverEvent = true;
    //update size marker when hovered
    marker.addListener("mouseover", large);
    marker.addListener("mouseout", () => {
      if (hoverEvent) {
        reguler();
      }
    });
    // Add a click listener for each marker
    marker.addListener("click", () => {
      map.setZoom(17);
      map.setCenter(position);
      //show up the description box
      description(title, desc, large);
      hoverEvent = false;
    });

    //centered map when menu sidebar clicked
    let choosen = document.getElementById(title);
    choosen.addEventListener("click", () => {
      large();
      map.setZoom(15);
      map.setCenter(position);
      map.setZoom(17);
      //show up the description box
      description(title, desc, large);
      hoverEvent = false;
    });

    //update zoom to 15 if description box closed
    $("#close,#logo-Browse").click(() => {
      map.setZoom(15);
      map.setCenter(pos);
      hoverEvent = true;
      //close the description box
      closeDescription(reguler);
    });
  });
}

window.initMap = initMap;


// MARKER LABEL POSITION
// https://stackoverflow.com/questions/37441729/google-maps-custom-label-x-and-y-position

// MARKER LABEL CLASSNAME 
// https://stackoverflow.com/questions/42323569/customize-google-map-api-v3-marker-label

