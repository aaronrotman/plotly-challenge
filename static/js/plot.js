// ------------------------------------------------------------------------
// Function to run on page load
function init() {
//     getData();
    createDropdown();
    updatePlotly();
    
};
// ------------------------------------------------------------------------
// Call updatePlotly when a change takes place
d3.selectAll("#selDataset").on("Change", updatePlotly);

// ------------------------------------------------------------------------
// Retrieve the data from the json file
// function getData() {
//     // Read the json data
//     d3.json("../../data/samples.json").then((data) => {
        
//         var names = data.names;
//         var metadata = data.metadata;
//         var samples = data.samples;
//         // console.log(`Names ${names}`);
//         // console.log(`Metadata ${metadata}`);
//         // console.log(`Samples ${samples}`);
//     });
// };
// ------------------------------------------------------------------------
// Function to update the plots
function updatePlotly() {
    d3.json("./data/samples.json").then((data) => {
        var metadata = data.metadata;
        var samples = data.samples;
    
        var dropDownMenu = d3.select("#selDataset");
        currentSelection = parseInt(dropDownMenu.property("value"));
        // Filter Metadata
        function filterMeta(metaId) {
            return metaId.id === currentSelection;
        }
        // Use filter() to pass the function as its argument
        var filteredMeta = metadata.filter(filterMeta);
        console.log(filteredMeta[0]);
        
        // Filter sample data
        function filterSample(sampleId) {
            return parseInt(sampleId.id) === currentSelection;
        }
        var filteredSample = samples.filter(filterSample);
        console.log(filteredSample[0]);
        
        // Sample values 
        var sampleValues = filteredSample[0].sample_values.slice(0, 10);
        console.log(`Sample Values: ${sampleValues}`);
        // Otu ids  
        var otuIds = filteredSample[0].otu_ids.slice(0, 10);
        console.log(`OTU Ids: ${otuIds}`);
        // Otu labels
        var otuLabels = filteredSample[0].otu_labels.slice(0, 10);
        console.log(`OTU Labels: ${otuLabels}`);

        // Update the metadata
        // Select the demographic info div
        var demoInfo = d3.select("#sample-metadata");
        // Clear the html in demoInfo
        demoInfo.html("");
        //Append the demographic data to the div
        var sampleInfo = filteredMeta[0];
        console.log(sampleInfo);
        for (const [key, value] of Object.entries(sampleInfo)) {
            console.log(key, value);
            paragraph = demoInfo.append("p");
            paragraph.text(`${key}:${value}`)
        };

        // Create a pie chart from the current selection
        // Trace for pie chart
        var tracePie = {
            values: sampleValues,
            labels: otuIds,
            type: "pie",
            hoverinfo: otuLabels
            // labels: otuLabels
        };
        
        var pieChartData = [tracePie];
        var pieLayout = {
            title: `Sample: ${filteredMeta[0].id}`,
        };
        // Render the plot to the div tag with id "pie"
        Plotly.newPlot("pie", pieChartData, pieLayout);

        // Create a bubble chart from the current selection
        // Trace for bubble chart
        var traceBubble = {
            x: otuIds,
            y: sampleValues,
            mode: 'markers',
            marker: {
                size: sampleValues
            }

        };
        
        var bubbleChartData = [traceBubble];
        var bubbleLayout = {
            title: `Sample: ${filteredMeta[0].id}`,
        };
        // Render the plot to the div tag with id "pie"
        Plotly.newPlot("bubble", bubbleChartData, bubbleLayout);
    });


};
// ------------------------------------------------------------------------

function createDropdown() {
    // Read the json data
    d3.json("./data/samples.json").then((data) => {
        
        var names = data.names;
        // Dropdown menu
        // Select the drop down menu
        var dropDownMenu = d3.select("#selDataset");
        //  Append a drop down menu option for each name
        names.forEach((name) => {
            var menuOption = dropDownMenu.append("option");
            menuOption.text(`${name}`);
            // console.log(menuOption.text());
        });
        var currentSelection = parseInt(dropDownMenu.property("value"));
        console.log(`Current Selection: ${currentSelection}`);
        return currentSelection;
    });
};
// ------------------------------------------------------------------------
// Call the init() function
init();
// ------------------------------------------------------------------------
