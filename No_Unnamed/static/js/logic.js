var path
var hurr_paths = []
var myMap
var hurricanes
var overlayMaps
var layerControl
var baseMaps
var wind_speed_knots
var colors


// if color 0 equals color 1, then add both to list and continue
// else add both to list and then create final path
function create_path (coords, colors, hurr_paths) {
    coordinates = [];
    loop_max = colors.length - 1;
    for (let i = 0; i < loop_max; i++) {
        
        if (colors[i] == colors[i+1]) {
            coordinates.push(coords[i])
            if (i == loop_max - 1) {
                options = {
                    color: colors[i]
                }
                hurr_paths.push(L.polyline(coordinates, options));
                coordinates = [];
            };
        } else {
            coordinates.push(coords[i]);
            coordinates.push(coords[i+1]);

            options = {
                color: colors[i]
            }
            hurr_paths.push(L.polyline(coordinates, options));
            coordinates = [];
        };
    };

    return hurr_paths;
};

function getCatColor (wind_speed_knots) {
    // category 5
    if (wind_speed_knots >= 137) {
        return "#FF6060";
    }
    // category 4
    else if (wind_speed_knots >= 113) {
        return "#FE8F31";
    }
    // category 3
    else if (wind_speed_knots >= 96) {
        return "#FFC146";
    }
    // category 2
    else if (wind_speed_knots >= 83) {
        return "#FFE775";
    } 
    // category 1
    else if (wind_speed_knots >= 64) {
        return "#FFFACB";
    } 
    // tropical storm or lower
    else {
        return "#00FAF4";
    }
};

function createMap(hurricane) {

    layerControl.removeLayer(hurricanes);
    myMap.removeLayer(hurricanes);
   
    hurr_paths = [];

    coordinates = path[hurricane].coords;

    wind_speed_knots = path[hurricane].max_wind_knots;
    colors = [];
    for (let i = 0; i < wind_speed_knots.length; i++) {
        colors.push(getCatColor(wind_speed_knots[i]));
    };

    create_path(coordinates, colors, hurr_paths);

    hurricanes = L.layerGroup(hurr_paths);

    layerControl.addOverlay(hurricanes, hurricane);
};

function createInitMap() {

    coordinates = path['Able 1950'].coords;
    wind_speed_knots = path['Able 1950'].max_wind_knots;
    colors = [];

    for (let i = 0; i < wind_speed_knots.length; i++) {
        colors.push(getCatColor(wind_speed_knots[i]));
    };

    create_path(coordinates, colors, hurr_paths);

    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    baseMaps = {
        "Street Map": street,
    };

    hurricanes = L.layerGroup(hurr_paths);

    overlayMaps = {
        "Able 1950": hurricanes
    };

    // create map with layers "on" when first loaded
    myMap = L.map('map', {
        editable: true,
        center: [
        28, -60
        ],
        zoom: 2.5,
        layers: [street]
        // layers: [street, hurricanes],
        // would love to make this ^ work
    });

    layerControl = L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    var legend = L.control({position: "bottomright"});
    legend.onAdd = function () {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML += '<span>Category 5</span><i style="background: #FF6060"></i><br>';
        div.innerHTML += '<span>Category 4</span><i style="background: #FE8F31"></i><br>';
        div.innerHTML += '<span>Category 3</span><i style="background: #FFC146"></i><br>';
        div.innerHTML += '<span>Category 2</span><i style="background: #FFE775"></i><br>';
        div.innerHTML += '<span>Category 1</span><i style="background: #FFFACB"></i><br>';
        div.innerHTML += '<span>Tropical Storm or Less</span><i style="background: #00FAF4"></i><br>';
        return div;
    };

    legend.addTo(myMap);
    
};

function demoInfo(hurricane) {
    var ol = document.getElementById('metalist');
    var listy = document.getElementById('metalist');
    listy.innerHTML = '';

    let li = document.createElement('li');
    li.innerText=`Name: ${hurricane.name}`;
    ol.appendChild(li);
    li = document.createElement('li');
    li.innerText=`Start Date: ${getStartDate(hurricane.id[0])}`;
    ol.appendChild(li);
    li = document.createElement('li');
    li.innerText=`End Date: ${getEndDate(hurricane.id[0])}`;
    ol.appendChild(li);
    li = document.createElement('li');
    li.innerText=`Maximum Category: ${getMaxCat(hurricane.id[0])}`;
    ol.appendChild(li);
    li = document.createElement('li');
    li.innerText=`Maximum Wind Speed (knots): ${getMaxWind(hurricane.id[0])}`;
    ol.appendChild(li);
};

// input ex: getMaxWind("Janet 1955")
function getMaxWind(hurricane) {
    var max_wind = Math.max.apply(Math, path[hurricane].max_wind_knots);
    return max_wind;
};

// input ex: getMaxCat("Janet 1955")
function getMaxCat(hurricane) {
    max_wind = getMaxWind(hurricane);
    if (max_wind >= 137) {
        return "5";
    } else if (max_wind >= 113) {
        return "4";
    } else if (max_wind >= 96) {
        return "3";
    } else if (max_wind >= 83) {
        return "2";
    } else if (max_wind >= 64) {
        return "1";
    } else {
        return "Tropical Storm";
    }
};

// input ex: getStartDate("Janet 1955")
function getStartDate(hurricane) {
    start_month = path[hurricane].month.at(0);
    start_day = path[hurricane].day.at(0);
    start_year = path[hurricane].year.at(0);
    return (month(start_month) + " " + start_day + ", " + start_year);
};

// input ex: getEndDate("Janet 1955")
function getEndDate(hurricane) {
    end_month = path[hurricane].month.at(-1);
    end_day = path[hurricane].day.at(-1);
    end_year = path[hurricane].year.at(-1);
    return (month(end_month) + " " + end_day + ", " + end_year);

};

function month(month) {
    if (month == "01") {
        return "January";
    }
    else if (month == "02") {
        return "February";
    }
    else if (month == "03") {
        return "March";
    }
    else if (month == "04") {
        return "April";
    }
    else if (month == "05") {
        return "May";
    }
    else if (month == "06") {
        return "June";
    }
    else if (month == "07") {
        return "July";
    }
    else if (month == "08") {
        return "August";
    }
    else if (month == "09") {
        return "September";
    }
    else if (month == "10") {
        return "October";
    }
    else if (month == "11") {
        return "November";
    }
    else if (month == "12") {
        return "December";
    };
};

