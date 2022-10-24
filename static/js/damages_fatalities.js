
const most_damaged_url = "./../static/js/storms.json";

d3.json(most_damaged_url).then(function (data) {

    // sort the storm dataset in descending order
    let sorteddamages = data.sort(function (a, b){
        return b.Damage - a.Damage;
    });

    console.log(sorteddamages)


    //Slice out the top ten storms
    let slicedData = sorteddamages.slice(0, 10);
    //  .reverse();
    // let sortedDeath = slicedData.sort(function (a1,b1) {
    //     return b1.Deaths - a1.Deaths;
    // });



    // console.log(slicedData)
    let xresult = slicedData.map(a => a.NameYear);
    let yresult = slicedData.map(a => a.Damage);

    // descriptive text to give context to chart bars
    let barText = slicedData.map(a => a.AreasAffected);
    console.log(barText)

    //prepare xaxis for fatalities
    let y2result = slicedData.map(a => a.Deaths);
     console.log(y2result)

    let barText2 = slicedData.map(a => a.Deaths);
     console.log(barText2)

    // Trace1 for Damages 
    let trace61 = {
        x: xresult,
        y: yresult,
        text: barText,
        name: "Damage ($)",
        type: "bar"
        // orientation: "h"
    };

    // Trace2 for fatalities
    let trace62 = {
        x: xresult,
        y: y2result,
        // text: barText2,
        //text: reversedData.map(object => object.Name),
        name: "Fatalities",
        type: "bar",
        // orientation: "v",
        yaxis: 'y2'
    };

    let trace63 = {
        x: xresult,
        y: [0],
        type: 'bar',
        hoverinfo: 'none',
        showlegend: false
    };

    let trace64 = {
        x: xresult,
        y: [0],
        type: 'bar',
        hoverinfo: 'none',
        showlegend: false,
        yaxis: 'y2'
    };

    // Data array
    // `data` has already been defined, so we must choose a new name here:
    let traceData63 = [trace61, trace63, trace64, trace62];

    // Apply a title to the layout
    let layout = {
        title: {
            text: "Top 10 Hurricanes by Damages and Their Fatalities"
        },

        xaxis: {
            text: "Storm Name & Year"
        },
        yaxis: {
            text: "Damage ($)"
        },

        yaxis2: {
            text: "Fatalities",
            overlaying: 'y',
            side: 'right',
        },
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        },
        barmode: 'group'
    };

    // Render the plot to the div tag 

    Plotly.newPlot("cat3data", traceData63, layout);

});



