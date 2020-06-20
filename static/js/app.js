var currentSelection= 940;
var currentIndex;

// Function to handle changes in the dropdown menu selection
function optionChanged() {
    var dropDownMenu = d3.select("#selDataset");
    currentSelection = parseInt(dropDownMenu.property("value"));
    // Log the new dropdown menu value to the console
    console.log(`New Value Selected: ${currentSelection}`);
    console.log(currentSelection);
};


// Read the sample data from "samples.json"
d3.json("../../data/samples.json").then((data) => {

    // console.log(data);

    var names = data.names;
    var metadata = data.metadata;
    var samples = data.samples;
    console.log(names);
    console.log(metadata);
    console.log(samples);
    
    // Dropdown menu
    // Select the drop down menu
    var dropDownMenu = d3.select("#selDataset");
    //  Append a drop down menu option for each name
    names.forEach((name) => {
        var menuOption = dropDownMenu.append("option");
        menuOption.text(`${name}`);
        // console.log(menuOption.text());
    });
    
    // -------------------------------------------
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

    // Function to create the bar chart
    function createBarChart() {
        // Trace for bar chart
        var traceBar = {
            x: sampleValues,
            y: otuIds,
            type: "bar",
            orientation: "h",
            // labels: otuLabels
        };
        // data
        var barChartData = [traceBar];
        // Apply the group bar mode to the layout
        var layout = {
            title: `Sample: ${filteredMeta[0].id}`,
        };
        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar", barChartData, layout);
    };
    createBarChart()


    // Select the demographic info div
    var demoInfo = d3.select("#sample-metadata");
    //Append the demographic data to the div

    // NEED TO REPLACE metadata[0] WITH THE CURRENT SELECTION'S INDEX
    var sampleInfo = metadata[0];
    console.log(sampleInfo);
    for (const [key, value] of Object.entries(sampleInfo)) {
        console.log(key, value);
        paragraph = demoInfo.append("p");
        paragraph.text(`${key}:${value}`)
    }

    var dropDownMenu = d3.select("#selDataset");
    dropDownMenu.on("change", createBarChart());
// Handle errors
}).catch(function(error) {
    console.log(error);
});


/* Odds and ends
---------------------------------------------------------
--------------------------------------------------------- */

// function updateDemo(sampleIndex) {
//     var demoInfo = d3.select("#sample-metadata");
//     var sampleInfo = metadata[sampleIndex];
//     console.log(sampleInfo);
//     for (const [key, value] of Object.entries(sampleInfo)) {
//         console.log(key, value);
//         paragraph = demoInfo.append("p");
//         paragraph.text(`${key}:${value}`)
//     }
// };   
// // Select the demographic info div
//     var demoInfo = d3.select("#sample-metadata");
//     //Append the demographic data to the div

//     // NEED TO REPLACE metadata[0] WITH THE CURRENT SELECTION'S INDEX
//     var sampleInfo = metadata[0];
//     console.log(sampleInfo);
//     for (const [key, value] of Object.entries(sampleInfo)) {
//         console.log(key, value);
//         paragraph = demoInfo.append("p");
//         paragraph.text(`${key}:${value}`)
//     }

    // var metaIds = metadata.map(meta => meta.id);
    // currentIndex = metaIds.indexOf(currentSelection);


    // console.log(`Current Index: ${currentIndex}`);
    // var idToMeta = metadata.map(metaId => metadata.id === parseInt(currentSelection));
    // console.log(`Metas to Ids: ${metaIds}`);
    // console.log(`Ids to metas: ${idToMeta}`);

    // metadata.forEach((sample) => {
    //     if (sample.id === currentSelection) {
    //         currentIndex = metadata.indexOf(sample)
    //         console.log(`Current Index: ${currentIndex}`);
    //     };