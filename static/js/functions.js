
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



function get_scraped_img(id) {
    for (var i=0; i<Object.keys(scraped.id).length; i++) {
        if (scraped.id[i]==id) {
            img_index = parseInt(getKeyByValue(scraped.id, id));
            return scraped.gif_url[img_index];
        };
    };
    return false;
};