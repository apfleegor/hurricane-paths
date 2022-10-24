

// FROM RYAN TUTORING: VARIABLE IS DECLARED OUTSIDE OF THE FUNCTION SO THAT THE VALUES FROM THE VARIBLE CAN BE USED IN THE BROWSER CONSOLE
// FOR CONTINUED DEVELOPMENT.
//const url= "distinctstormsjson.json";
const chuck_url= "./../static/js/storms.json";

var information

// THE FUNCTION BRINGS THE INFORMATION json INTO THE BROWSER FOR ONGOING USE 

d3.json(chuck_url).then(function(data) {

// sort the storm dataset in descending order
let sorteddamages = data.sort(function(a, b) {
        return b.Damage - a.Damage;
      });
      
// console.log(sorteddamages)

    
//Slice out the top ten storms
let slicedData = sorteddamages.slice(0, 10).reverse();


    // console.log(slicedData)
    let xresult = slicedData.map(a => a.NameYear);
    let yresult = slicedData.map(a => a.Damage);
    
    // descriptive text to give context to chart bars
    let barText = slicedData.map(a => a.AreasAffected);
    // console.log(barText)
    
    //prepare xaxis for fatalities
    let x2result = slicedData.map(a => a.Deaths);
    // console.log(x2result)

    // Trace1 for Damages ** NOTE THE REVERSAL OF X AND Y RESULTS for  Orientation: "h"
        let trace6 = {
        y: xresult,
        x: yresult,
        text: barText,
        name: "Damage ($) by Hurricane",
        type: "bar",
        orientation: "h"
        };

    // Trace2 for fatalities
    let trace2 = {
        y: x2result,
        x: yresult,
        //text: reversedData.map(object => object.Name),
        name: "Fatalities by Hurricane",
        type: "bar",
        orientation: "h"
        };

        // Data array
        // `data` has already been defined, so we must choose a new name here:
        let traceData6 = [trace6];

        // Apply a title to the layout
        let layout = {
            title:  {
                text: "Top 10 Hurricanes by Damages"
            },
            
            yaxis:  {
                text: "Damage ($)"
            },
            xaxis:  {
                text: "Storm Name & Year"
            },

            xaxis2:  {
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
        // Note that we use `traceData` here, not `data`
        Plotly.newPlot("catdata", traceData6, layout);

    



    
});

        