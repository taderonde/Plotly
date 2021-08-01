
// specify file path of data
var filePath = "./samples.json"

// import json data and plot
function init() {
  
  d3.json(filePath).then(function(data) {

    var names = data.names
    var meta_data = data.metadata
    var sample_data = data.samples


    for (let i=0; i<names.length; i++) { 
    d3.select("#selDataset")
      .append("option")
      .attr("value", names[i])
      .text(names[i])
    }
    
    // filter data for selected id
    var samples_filtered = sample_data.filter(d => d.id === "940")
    var meta_data_filtered = meta_data.filter(d => d.id == "940")

    // map sample data for selected id
    var sample_values = samples_filtered.map(d => d.sample_values);
    var otu_ids = samples_filtered.map(d => d.otu_ids);
    var otu_ids_text = otu_ids[0].map(d => "OTU " + d); // added "OTU" to front of ids
    var otu_labels = samples_filtered.map(d => d.otu_labels);

    console.log(sample_values)
    console.log(otu_ids_text)
    console.log(otu_labels)

    // map meta data for selected id
    var id = meta_data_filtered.map(d => d.id);
    var ethnicity = meta_data_filtered.map(d => d.ethnicity);
    var gender = meta_data_filtered.map(d => d.gender);
    var age = meta_data_filtered.map(d => d.age);
    var location = meta_data_filtered.map(d => d.location);
    var bbtype = meta_data_filtered.map(d => d.bbtype);
    var wfreq = meta_data_filtered.map(d => d.wfreq);

    console.log(id);
    console.log(ethnicity);
    console.log(gender);
    console.log(age);
    console.log(location);
    console.log(bbtype);
    console.log(wfreq);

    // list meta data info in html
    d3.select("#sample-metadata")
      .append("p")
      .text(`ID: ${id}`)
      .append("p")
      .text(`Ethnicity: ${ethnicity}`)
      .append("p")
      .text(`Gender: ${gender}`)
      .append("p")
      .text(`Age: ${age}`)
      .append("p")
      .text(`Location: ${location}`)
      .append("p")
      .text(`BBType: ${bbtype}`)
      .append("p")
      .text(`WFreq: ${wfreq}`);

    // plot bar chart, slice for top 10 samples
    var trace0 = {
      y: otu_ids_text.slice(0,10),
      x: sample_values[0].slice(0,10),
      name: 'Test Samples',
      text: otu_labels[0].slice(0,10),
      orientation: 'h',
      type: 'bar',
      transforms: [{
        type: 'sort',
        target: 'x',
        order: 'ascending'
      }]
    };
    
    var data = [trace0];
    var layout = {
      title: "Top 10 Microbes for Test Subject",
      xaxis: { title: "Sample Values" },
      yaxis: { title: "OTU ID"}
    }
    Plotly.newPlot('bar', data, layout);

    // plot bubble chart for all samples
    var trace0 = {
      x: otu_ids[0],
      y: sample_values[0],
      name: 'Test Samples',
      text: otu_labels[0],
      mode: "markers",
      marker: {
        size: sample_values[0],
        sizeref: .05,
        sizemode: 'area',
        color: otu_ids[0],
        colorscale: "Earth"
      }
    };
    
    var data = [trace0];
    var layout = {
      title: "All Microbes for Test Subject",
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Sample Values"}
    }

    Plotly.newPlot('bubble', data, layout);


  });
};

// rereun on dropdown option change
function optionChanged() {
  var selected_option = d3.select("#selDataset").property("value");
  console.log(selected_option);

  d3.json(filePath).then(function(data) {

    var names = data.names
    var meta_data = data.metadata
    var sample_data = data.samples


    // filter data for selected id
    var samples_filtered = sample_data.filter(d => d.id === selected_option)
    var meta_data_filtered = meta_data.filter(d => d.id == selected_option)

    // map sample data for selected id
    var sample_values = samples_filtered.map(d => d.sample_values);
    var otu_ids = samples_filtered.map(d => d.otu_ids);
    var otu_ids_text = otu_ids[0].map(d => "OTU " + d); // added "OTU" to front of ids
    var otu_labels = samples_filtered.map(d => d.otu_labels);

    console.log(sample_values)
    console.log(otu_ids_text)
    console.log(otu_labels)

    // map meta data for selected id
    var id = meta_data_filtered.map(d => d.id);
    var ethnicity = meta_data_filtered.map(d => d.ethnicity);
    var gender = meta_data_filtered.map(d => d.gender);
    var age = meta_data_filtered.map(d => d.age);
    var location = meta_data_filtered.map(d => d.location);
    var bbtype = meta_data_filtered.map(d => d.bbtype);
    var wfreq = meta_data_filtered.map(d => d.wfreq);

    console.log(id);
    console.log(ethnicity);
    console.log(gender);
    console.log(age);
    console.log(location);
    console.log(bbtype);
    console.log(wfreq);

    // list meta data info in html
    d3.select("#sample-metadata").html("")
    d3.select("#sample-metadata")
      .append("p")
      .text(`ID: ${id}`)
      .append("p")
      .text(`Ethnicity: ${ethnicity}`)
      .append("p")
      .text(`Gender: ${gender}`)
      .append("p")
      .text(`Age: ${age}`)
      .append("p")
      .text(`Location: ${location}`)
      .append("p")
      .text(`BBType: ${bbtype}`)
      .append("p")
      .text(`WFreq: ${wfreq}`);

    // restyle bar chart with updated data
    Plotly.restyle("bar", "y", [otu_ids_text.slice(0,10)]);
    Plotly.restyle("bar", "x", [sample_values[0].slice(0,10)]);
    Plotly.restyle("bar", "text", [otu_labels[0].slice(0,10)]);
    
    // restyle bubble chart with updated data
    Plotly.restyle("bubble", "x", [otu_ids[0]]);
    Plotly.restyle("bubble", "y", [sample_values[0]]);
    Plotly.restyle("bubble", "text", [otu_labels[0]]);
    Plotly.restyle("bubble", "marker", [{
      size: sample_values[0],
      sizeref: .05,
      sizemode: 'area',
      color: otu_ids[0],
      colorscale: "Earth"
    }]);

  });
};

init()