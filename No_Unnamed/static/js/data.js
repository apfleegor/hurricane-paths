const hurr_url = './static/js/hurricane_path_no_unnamed.json'

var ids

d3.json(hurr_url).then(function(data) {
    path = data;
});


function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}
d3.json(hurr_url).then(function(data){
    ids = Object.keys(path)

    function init(){
        createInitMap();
        demoInfo(path['Able 1950']);
    };

    let filterednames = [...new Set(ids)];
    var selctor = document.getElementById('selDataset');
    for (let i=0; i< filterednames.length; i++){
        let option = document.createElement('option');
        option.innerHTML=`<option value='${filterednames[i]}'>${filterednames[i]}</option>`
        selctor.appendChild(option);
    };
    img = document.createElement("img");
    d3.selectAll('#selDataset').on('change', allTogether)
    function allTogether(){
        let dropdownMenu = d3.select('#selDataset');
        let dataset = dropdownMenu.property('value');

        demoInfo(path[dataset]);
        createMap(dataset);

    }
    init();
});