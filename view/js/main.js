let gridX, gridY, ticks, dominio, real, imaginario, width, height, margin, svg, xAxis, yAxis, xScale, yScale = null;
$(document).ready(function () {
  dominio = 100;
  //  obtener el tamaño del contenedor
  width = Math.trunc($("svg").width());
  height = Math.trunc($("svg").height());
  $("svg").attr("width", width)
    .attr("height", height);
  // definir el margin en terminos de em
  margin = {
    top: 40,
    bottom: 40,
    left: 40,
    right: 40
  };



  drawGraph();

  $(window).resize(function () {
    //  obtener el tamaño del contenedor
    width = Math.trunc($("svg").width());
    height = Math.trunc($("svg").height());
    $("svg").attr("width", width)
      .attr("height", height);
    updateGraph();
  });

});// DOM on LOAD


function drawGraph() {
  var Fakewidth = 0;
  var Fakeheight = 0;
  var Fakemargin = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  };
  // Crear el contenedor SVG
  svg = d3.select("svg").append("svg")
    .attr("width", Fakewidth)
    .attr("height", Fakeheight);


  xAxis = d3.scaleLinear()
    .domain([-dominio, dominio])
    .range([Fakemargin.left, Fakewidth - Fakemargin.right]);

  yAxis = d3.scaleLinear()
    .domain([-dominio, dominio])
    .range([Fakeheight - Fakemargin.bottom, Fakemargin.top]);

  xScale = d3.axisBottom(xAxis)
    .ticks(0, "s");
  yScale = d3.axisLeft(yAxis)
    .ticks(0, "s");

  gridX = [];
  gridY = [];
  for (var i = 0; i < 2; i++) {
    gridX.push(
      svg.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", 0)
        .attr("stroke", "gray")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "1, 1")
        .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")
    );
    gridY.push(
      svg.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", 0)
        .attr("stroke", "gray")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "1, 1")
        .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")
    );
  }

  // Seleccionar y aplicar los ejes
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")
    .call(d3.axisBottom(xAxis));
  svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")
    .call(d3.axisLeft(yAxis));


  $("svg").css("opacity", "1")
    .css("visibility", "visible")
    .css("transition", "opacity 0.5s ease-in-out");

  updateGraph();

}// drawGraph

function updateGraph() {
  svg.attr("width", width)
    .attr("height", height);

  xAxis = d3.scaleLinear()
    .domain([-dominio, dominio])
    .range([margin.left, width - margin.right]);

  yAxis = d3.scaleLinear()
    .domain([-dominio, dominio])
    .range([height - margin.bottom, margin.top]);

  modifyScale();

  updateGrid();

  // Seleccionar y aplicar la transición al eje x
  svg.select(".x.axis")
    .transition()
    .duration(1000)
    .attr("transform", "translate(0," + (height / 2) + ")")
    .call(xScale);

  // Seleccionar y aplicar la transición al eje y
  svg.select(".y.axis")
    .transition()
    .duration(1000)
    .attr("transform", "translate(" + width / 2 + ",0)")
    .call(yScale);

}


function modifyScale() {
  ticks = 0;
  switch (true) {
    case (width >= 0 && width < 768):
      ticks = 4;
      break;
    case (width >= 768 && width < 992):
      ticks = 10;
      break;
    default:
      ticks = 20;
  }// switch
  xScale = d3.axisBottom(xAxis)
    .ticks(ticks, "s");
  yScale = d3.axisLeft(yAxis)
    .ticks(ticks, "s");
}// modifyScale

function updateGrid() {
  if (ticks <= gridX.length) {
    for (var i = 0; i < gridX.length; i++) {
      gridX[i]
        .transition()
        .duration(1000)
        .attr("y1", i * ((height - margin.left - margin.right) / ticks))
        .attr("x2", width - margin.right - margin.left)
        .attr("y2", i * (height - margin.left - margin.right) / ticks)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      gridY[i]
        .transition()
        .duration(1000)
        .attr("x1", i * ((width - margin.top - margin.bottom) / ticks))
        .attr("x2", i * ((width - margin.top - margin.bottom) / ticks))
        .attr("y2", height - margin.top - margin.bottom)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    }
    for (var i = ticks + 1; i < gridX.length; i++) {
      // eliminar el elemento del DOM almacenado en la posición i
      gridX[i].remove();
      gridY[i].remove();
      // eliminar el elemento del arreglo
      gridX.splice(i, 1);
      gridY.splice(i, 1);
    }
  } else {
    for (var i = 0; i < gridX.length; i++) {
      gridX[i]
        .transition()
        .duration(1000)
        .attr("y1", i * ((height - margin.left - margin.right) / ticks))
        .attr("x2", width - margin.right - margin.left)
        .attr("y2", i * (height - margin.left - margin.right) / ticks)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      gridY[i]
        .transition()
        .duration(1000)
        .attr("x1", i * ((width - margin.top - margin.bottom) / ticks))
        .attr("x2", i * ((width - margin.top - margin.bottom) / ticks))
        .attr("y2", height - margin.top - margin.bottom)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    }
    for (var i = gridX.length; i < ticks + 1; i++) {
      gridX.push(
        svg.append("line")
          .attr("class", "grid-line")
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", 0)
          .attr("y2", 0)
          .attr("stroke", "gray")
          .attr("stroke-width", 1)
          .attr("stroke-dasharray", "1, 1")
          .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")
      );
      gridY.push(
        svg.append("line")
          .attr("class", "grid-line")
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", 0)
          .attr("y2", 0)
          .attr("stroke", "gray")
          .attr("stroke-width", 1)
          .attr("stroke-dasharray", "1, 1")
          .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")
      );

      gridX[i]
        .transition()
        .duration(1000)
        .attr("y1", i * ((height - margin.left - margin.right) / ticks))
        .attr("x2", width - margin.right - margin.left)
        .attr("y2", i * (height - margin.left - margin.right) / ticks)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      gridY[i]
        .transition()
        .duration(1000)
        .attr("x1", i * ((width - margin.top - margin.bottom) / ticks))
        .attr("x2", i * ((width - margin.top - margin.bottom) / ticks))
        .attr("y2", height - margin.top - margin.bottom)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    }
  }
}
