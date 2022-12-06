// function getOccurrence(array, value) {
//     var count = 0;
//     array.forEach((v) => (v === value && count++));
//     return count;
// };
// function getAllIndexes(arr, val) {
//     var indexes = [], i;
//     for(i = 0; i < arr.length; i++)
//         if (arr[i] === val)
//             indexes.push(i);
//     return indexes;
// };
function demoInfo(hurricane) {
    var ol = document.getElementById('metalist');
    var listy = document.getElementById('metalist');
    listy.innerHTML = '';
    // for (let i = 0; i < keys.length -1; i++) {
    //     let li = document.createElement('li');
    //     li.innerText=`${keys[i]}: ${values[i][0]}`;
    //     ol.appendChild(li);
    // };
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


// function categories(categorydata) {
//     var category = Object.values(categorydata.Category);
//     var year = Object.values(categorydata.Year);
    
//     let trace6 = {
        
//     }
// }

function get_scraped_img(id) {
    for (var i=0; i<Object.keys(scraped.id).length; i++) {
        if (scraped.id[i]==id) {
            img_index = parseInt(getKeyByValue(scraped.id, id));
            return scraped.gif_url[img_index];
        };
    };
    return false;
};