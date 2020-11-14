/// <reference path="https://unpkg.com/vis-graph3d@6.0.0/standalone/esm/vis-graph3d.min.d.ts"/>

function draw() {
try {
      // compile the expression once
      expression = document.getElementById('eq').value
      expr = math.compile(expression)

      var data = null;
      // Create and populate a data table.
       data = new vis.DataSet();
      // create some nice looking data with sin/cos
      var counter = 0;
      var steps = +document.getElementById('stps').value;  // number of datapoints will be steps*steps
      var axisMin = +document.getElementById('bdyX1').value
      var axisMax = +document.getElementById('bdyX2').value +0.1;
      var axisStep = axisMax / steps;
      for (var x = axisMin; x < axisMax; x+=axisStep) {
         for (var y = axisMin; y < axisMax; y+=axisStep) {
           var value = expr.evaluate({x: x,y: y});
           data.add({id:counter++,x:x,y:y,z:value,style:value});
         }
      }
          // specify options
      var options = {
         style: 'surface',
         width: document.getElementById('plot').offsetWidth,
         height: '600px',
         showPerspective: true,
         showGrid: true,
         showShadow: false,
         keepAspectRatio: true,
         verticalRatio: 0.5,
         showLegend: true,
         tooltip: true,
       };
  
        // Instantiate our graph object.
        var container = document.getElementById('plot');
        graph = new vis.Graph3d(container, data, options);   

     //Printed in html
     document.getElementById("Values2")
     .innerHTML= "$"+ math.parse(expression).toTex({parenthesis: 'keep'}) + "$ "
                 + " from "+axisMin.toFixed(0)+" to "+axisMax.toFixed(0) +"<br>"
                 ;
    } //End of try function
  catch (err) {
    console.error(err)
    alert(err)
  }
}

document.getElementById('form').onsubmit = function (event) {
  event.preventDefault()
  draw()
  var HUB = MathJax.Hub;
  HUB.Queue(["Typeset", HUB, "Values2"]);
}

draw()