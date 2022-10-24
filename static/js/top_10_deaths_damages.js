const most_fatalities_url = "./../static/js/storms.json";

d3.json(most_fatalities_url).then(function (data) {

    // sort the storm dataset in descending order
    let sortedfatalities = data.sort(function (a, b) {
        return b.Deaths - a.Deaths;
    });

    console.log(sortedfatalities)


    //Slice out the top ten storms
    let slicedData = sortedfatalities.slice(0, 10);


    console.log(slicedData)
    let xresult = slicedData.map(a => a.NameYear);
    let yresult = slicedData.map(a => a.Deaths);

    // descriptive text to give context to chart bars
    let barText = slicedData.map(a => a.AreasAffected);
    console.log(barText)

    //prepare xaxis for fatalities
    let y2result = slicedData.map(a => a.Damage);
    console.log(y2result)

    let barText2 = slicedData.map(a => a.Damage);
    console.log(barText2)

    // Trace1 for Damages 
    let trace81 = {
        x: xresult,
        y: y2result,
        // text: barText2,
        name: "Damage ($)",
        type: "bar",
        yaxis: 'y2',

    };

    // Trace2 for fatalities
    let trace82 = {
        x: xresult,
        y: yresult,
        text: barText,
        name: "Fatalities",
        type: "bar",
        yaxis: 'y'
    };

    let trace83 = {
        x: xresult,
        y: [0],
        type: 'bar',
        hoverinfo: 'none',
        showlegend: false
    };

    let trace84 = {
        x: xresult,
        y: [0],
        type: 'bar',
        hoverinfo: 'none',
        showlegend: false,
        yaxis: 'y2'

    };

    // Data array
    let traceData83 = [trace81, trace83, trace84, trace82];

    // Apply a title to the layout
    let layout = {
        title: {
            text: "Top 10 Hurricanes by Fatalities compared to the damage they caused"
        },

        xaxis: {
            text: "Storm Name & Year"
        },
        yaxis: {
            text: "Fatalities"
        },

        yaxis2: {
            text: "Damage ($)",
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

    Plotly.newPlot("cat4data", traceData83, layout);
});
