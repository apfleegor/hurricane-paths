const home_url = './../static/js/test.json'
const home_caturl = './../static/js/category.json'

var catdata
var information
d3.json(home_caturl).then(function(data){
    catdata = data;
    // console.log(data)
});

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
d3.json(url).then(function(data){
    information = data;
    // test = information.Name;
    // test2 = Object.keys(test);
    // console.log(information);
    // names = information.Name_year;
    // years = information.Year;
    // for (let i =0; i < test2.length; i++){
    //     console.log(test[i]);
    // }
    function init(){
        let inital = information
        plotter(inital);
    }
    // demoInfo(data);
    init();
});