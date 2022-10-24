const death_url = "./../static/js/storms.json";

d3.json(death_url).then(function (data) {

    // sort the storm deaths dataset in descending order
    let sorteddeaths = data.sort(function (a, b) {
        return b.Deaths - a.Deaths;
    });

    // console.log(sorteddeaths)

    //Slice out the top ten storms
    let slicedData = sorteddeaths.slice(0, 10).reverse();


    // console.log(slicedData)
    let xresult = slicedData.map(a => a.NameYear);
    let yresult = slicedData.map(a => a.Deaths);

    // descriptive text to give context to chart bars
    let barText = slicedData.map(a => a.AreasAffected);
    // console.log(barText)

    // Trace for Fatalities
    let trace7 = {
        y: xresult,
        x: yresult,
        text: barText,
        name: "Fatalities by Hurricane",
        type: "bar",
        orientation: "h"
    };

    // Data array
    let traceData7 = [trace7];

    // Apply a title to the layout
    let layout = {
        title: {
            text: "Top 10 Hurricanes by Fatalities"
        },
        xaxis: {
            text: "Storm Name & Year"
        },

        yaxis: {
            text: "Fatalities"
        },

        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        }
    };

    // Render the plot to the div tag with id "plot"
  
    Plotly.newPlot("cat2data", traceData7, layout);


});
