const hurr_url = './../static/js/hurricane_path.json'
const web_url = './../static/js/gif_scrape.json'

var information
var scraped
var img
var ids


d3.json(hurr_url).then(function(data) {
    path = data;
});

d3.json(web_url).then(function(data) {
    scraped = data;
});


function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}
d3.json(web_url).then(function(data){
    scraped = data;
    ids = Object.keys(path)

    function init(){
        createInitMap();
        demoInfo(path['Unnamed0 1851']);
        // startInfo(path['Unnamed0 1851']);
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
        // let id = getKeyByValue(ids, dataset);
        // if (get_scraped_img(information.Name_year[id]) != false) {
        //     let web_div = document.getElementById('web');
        //     img.src = "https://bmcnoldy.rsmas.miami.edu/" + get_scraped_img(information.Name_year[id]);
        //     web_div.appendChild(img);
        // } else {
        //     img.src="";
        // };

        demoInfo(path[dataset]);
        createMap(dataset);

    }
    init();
});