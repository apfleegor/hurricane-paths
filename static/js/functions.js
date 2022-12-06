
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
