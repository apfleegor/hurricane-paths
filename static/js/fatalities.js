const most_damagecausing_url= "./../static/js/storms.json";

d3.json(most_damagecausing_url).then(function(data) {

    // sort the storm dataset in descending order
    let sorteddamages = data.sort(function(a, b) {
            return b.Damage - a.Damage;
          });
          
    console.log(sorteddamages)
    
        
    //Slice out the top ten storms
    let slicedData = sorteddamages.slice(0, 10);
    
    
        console.log(slicedData)
        let xresult = slicedData.map(a => a.NameYear);
        let yresult = slicedData.map(a => a.Damage);

        // descriptive text to give context to chart bars
    let barText = slicedData.map(a => a.Deaths);
    console.log(barText)

    let y2result = slicedData.map(a => a.Deaths);
    console.log(y2result)

    // Trace for Fatalities
    let trace8 = {
        x: xresult,
        y: y2result,
        text: barText,
        name: "Fatalities by Hurricane",
        type: "bar",
        orientation: "v"
    };
       // Data array
       let traceData8 = [trace8];

       // Apply a title to the layout
       let layout = {
           title: {
               text: "Top 10 Hurricanes by Damages with their fatalities"
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
     
       Plotly.newPlot("cat4data", traceData8, layout);
   
   
   });
   