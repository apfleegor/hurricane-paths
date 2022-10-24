function getOccurrence(array, value) {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
};
function getAllIndexes(arr, val) {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
};
function demoInfo(data2, key, hurricane) {
    var keys = Object.keys(data2);
    keys[5] = 'Wind Speed Max (knots)';
    keys[11] = 'Maximum Category';
    keys.splice(9,3);
    keys.splice(2,4);
    var values = Object.values(data2);
    values.splice(9,3);
    values.splice(2,4);
    var ol = document.getElementById('metalist');
    var listy = document.getElementById('metalist');
    listy.innerHTML = '';
    for (let i = 0; i < keys.length -1; i++) {
        let li = document.createElement('li');
        li.innerText=`${keys[i]}: ${values[i][key]}`;
        ol.appendChild(li);
    }
    let li = document.createElement('li');
    console.log(key);
    li.innerText=`Start Date: ${getStartDate(hurricane)}`;
    ol.appendChild(li);
    li = document.createElement('li');
    li.innerText=`End Date: ${getEndDate(hurricane)}`;
    ol.appendChild(li);
    li = document.createElement('li');
    li.innerText=`Maximum Category: ${getMaxCat(hurricane)}`;
    ol.appendChild(li);
    li = document.createElement('li');
    li.innerText=`Maximum Wind Speed (knots): ${getMaxWind(hurricane)}`;
    ol.appendChild(li);};

function startInfo(data3) {
    var keys = Object.keys(data3);
    keys[5] = 'Wind Speed Max';
    keys[11] = 'Maximum Category';
    keys.splice(9,3);
    keys.splice(2,4);
    var values = Object.values(data3);
    values.splice(9,3);
    values.splice(2,4);
    var ol = document.getElementById('metalist');
    var listy = document.getElementById('metalist');
    listy.innerHTML = '';
    for (let i = 0; i < keys.length -1; i++) {
        let li = document.createElement('li');
        li.innerText=`${keys[i]}: ${values[i][0]}`;
        ol.appendChild(li);
    };
    let li = document.createElement('li');
    li.innerText=`Start Date: ${getStartDate('Janet 1955')}`;
    ol.appendChild(li);
    li = document.createElement('li');
    li.innerText=`End Date: ${getEndDate('Janet 1955')}`;
    ol.appendChild(li);
    li = document.createElement('li');
    li.innerText=`Maximum Category: ${getMaxCat('Janet 1955')}`;
    ol.appendChild(li);
    li = document.createElement('li');
    li.innerText=`Maximum Wind Speed (knots): ${getMaxWind('Janet 1955')}`;
    ol.appendChild(li);
};

function plotter(data) {
    var wind = Object.values(data['Wind Speed (mph)']);
    var damages = Object.values(data['Damages ($)']);
    var pressure = Object.values(data['Pressure (hPa)']);
    var deaths = Object.values(data['Deaths']);
    var labels = Object.values(data['Name_year']);
    var months = Object.values(data['Month']);
    var counts = [];
    counts.push(getOccurrence(months, 'June'));
    counts.push(getOccurrence(months, 'July'));
    counts.push(getOccurrence(months, 'August'));
    counts.push(getOccurrence(months, 'September'));
    counts.push(getOccurrence(months, 'October'));
    // console.log(counts);
    let trace1 = {
        x: wind,
        y: damages,
        text: labels,
        mode: 'markers',
        type: 'scatter'
    };
    let layout1 = {
        title: 'Wind Speed (mph) vs. Damages($)'
    }
    let traceData1 = [trace1];
    Plotly.newPlot('scatter1', traceData1, layout1);
    let trace2 = {
        x: wind,
        y: deaths,
        text: labels,
        mode: 'markers',
        type: 'scatter'
    };
    let layout2 = {
        title: 'Wind Speed (mph) vs. Deaths'
    }
    let traceData2 = [trace2];
    Plotly.newPlot('scatter2', traceData2, layout2);
    let trace3 = {
        x: pressure,
        y: damages,
        text: labels,
        mode: 'markers',
        type: 'scatter'
    };
    let layout3 = {
        title: 'Pressure (hPa) vs. Damages($)'
    }
    let traceData3 = [trace3];
    Plotly.newPlot('scatter3', traceData3, layout3);
    let trace4 = {
        x: pressure,
        y: deaths,
        text: labels,
        mode: 'markers',
        type: 'scatter'
    };
    let layout4 = {
        title: 'Pressure (hPa) vs. Deaths'
    }
    let traceData4 = [trace4];
    Plotly.newPlot('scatter4', traceData4, layout4);
    let trace5 = {
        x: ['June', 'July', 'August', 'September', 'October'],
        y: counts,
        type: 'bar'
    };
    let layout5 = {
        title: 'Most Common Months for Hurricanes'
    }
    let traceData5 = [trace5];
    Plotly.newPlot('scatter5', traceData5, layout5);
};

function categories(categorydata) {
    var category = Object.values(categorydata.Category);
    var year = Object.values(categorydata.Year);
    
    let trace6 = {
        
    }
}

function get_scraped_img(id) {
    for (var i=0; i<Object.keys(scraped.id).length; i++) {
        if (scraped.id[i]==id) {
            img_index = parseInt(getKeyByValue(scraped.id, id));
            return scraped.gif_url[img_index];
        };
    };
    return false;
};