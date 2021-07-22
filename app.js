function dropdown() {
  var menu = d3.select("#selDataset");
  d3.json("samples.json").then((data) => {
    var sampledata = data.names;
    sampledata.forEach((sample) => {
      menu
        .append("option").text(sample).property("value", sample);
    });
    buildtable(sampledata[0]),
    buildcharts(sampledata[0])
  });
}
dropdown()

function buildtable(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(x => x.id == sample);
    var filtereddata = resultArray[0];
    var table = d3.select("#sample-metadata");
    table.html("");
    console.log(filtereddata)

    Object.entries(filtereddata).forEach(function ([key, value]) {
      console.log(key, value);
      var row = table.append("tr");
      row.append("td").html(key)
      row.append('td').html(value)
    });
  });
}
function buildcharts(sample) {
  d3.json("samples.json").then((data) => {
    var chartsdata = data.samples;
    var resultArray = chartsdata.filter(x => x.id == sample);
    var filtereddata = resultArray[0];

    var xvalue = filtereddata.otu_ids
    var yvalue = filtereddata.sample_values
    var zvalue = filtereddata.otu_labels

    var trace1 = {
      y: xvalue.slice(0, 10).map(x => `OTU ${x}`).reverse(),
      x: yvalue.slice(0, 10).reverse(),
      text: zvalue.slice(0, 10).reverse(),
      type: "bar", orientation: "h"
    };

    var data = [trace1];

    var layout = {
      title: "Top 10 Bacteria Cultures Found",
    };

    Plotly.newPlot("bar", data, layout);

  // Bubble Chart

  var trace2 = {
    x: xvalue,
    y: yvalue,
    text: zvalue,
    mode: "markers", 
    marker: {
      size: yvalue,color:xvalue
    }
  };

  var data2 = [trace2];

  var layout2 = {
    title: "Bacteria Cultures Per Sample",
    xaxis: { title: "OTU ID"}
  };

  Plotly.newPlot("bubble", data2, layout2);
})
};

function optionChanged(newid) {
  buildtable(newid)
  buildcharts(newid)
};