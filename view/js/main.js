var
  width, height, margin,
  svg,
  xAxis, yAxis,
  xScale, yScale,
  gridX, gridY,
  vectorX, vectorY = null;

var ticks,
  xDom, yDom,
  real, imaginario,
  side = 0;
var vectors = [
  [{ x: 0, y: 0 }, { x: 0, y: 0 }, color = "red"],
  [{ x: 0, y: 0 }, { x: 0, y: 0 }, color = "blue"],
  [{ x: 0, y: 0 }, { x: 0, y: 0 }, color = "green"]
];
var vectorList = [];
// definir el margin en terminos de em
margin = {
  top: 40,
  bottom: 40,
  left: 40,
  right: 40
};

let isDelitingVectors = false;
$(document).ready(function () {

  // Establecer el tamaño del contenedor SVG
  initGraph();

  updateGraph();

  $(window).resize(function () {
    updateGraph();
  });

});// DOM on LOAD

function setScreensize() {
  width = Math.trunc($("#svgContainer").width());
  height = Math.trunc($("#svgContainer").height());
  side = Math.min(width, height);
  width = side;
  height = side;
  $("svg").attr("width", width).attr("height", height);
}

function initGraph() {
  setScreensize();

  // Crear el contenedor SVG
  svg = d3.select("svg").append("svg")
    .attr("width", 0)
    .attr("height", 0);


  updateDom();

  xAxis = d3.scaleLinear()
    .domain([-0, 0])
    .range([0, 0])
    .nice();

  yAxis = d3.scaleLinear()
    .domain([-0, 0])
    .range([0, 0]).
    nice();

  xScale = d3.axisBottom(xAxis)
    .ticks(0, "s");
  // eliminar el 0 del ejex
  xScale.tickFormat(function (d) {
    return d === 0 ? "" : d;
  });
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
  while (isDelitingVectors) {
    sleep(500).then(() => {
      updateGraph();
    });
    return;
  }

  setScreensize();


  svg.attr("width", width)
    .attr("height", height);

  xAxis = d3.scaleLinear()
    .domain([-xDom, xDom])
    .range([margin.left, width - margin.right]);

  yAxis = d3.scaleLinear()
    .domain([-yDom, yDom])
    .range([height - margin.bottom, margin.top]);

  updateSclae();

  drawGrid();

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

function updateSclae() {
  switch (true) {
    case (width >= 0 && width < 768):
      ticks = 10;
      break;
    default:
      ticks = 20;
  }// switch
  var tickStepX = (2 * xDom) / ticks;
  var tickStepY = (2 * yDom) / ticks;
  //forzar la escala a utilizar los ticks
  xScale = d3.axisBottom(xAxis)
    .ticks(ticks)
    .tickValues(d3.range(-xDom, xDom + tickStepX, tickStepX))
    .tickFormat(function (d) {
      return d === 0 ? "" : d;
    });
  // Dentro de la función modifyScale()
  yScale = d3.axisLeft(yAxis)
    .ticks(ticks)
    .tickValues(d3.range(-yDom, yDom + tickStepY, tickStepY))
    .tickFormat(function (d) {
      if (d === 0) {
        d3.select(this).attr("transform", "translate(5, 12.5)");
        return d3.format("")(d);
      }
      return d;
    });
}// modifyScale

function drawGrid() {
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
    // Eliminar elementos extra
    gridX.splice(ticks + 1, gridX.length - ticks).forEach(function (el) {
      el.remove();
    });
    gridY.splice(ticks + 1, gridY.length - ticks).forEach(function (el) {
      el.remove();
    });
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

function initVector(origin, end, color = "black") {
  return svg.append("line")
    .attr("class", "vector")
    .attr("x1", origin.x)
    .attr("y1", -origin.y)
    .attr("x2", end.x)
    .attr("y2", -end.y)
    .attr("stroke", color)
    .attr("stroke-width", 4)
    .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");
}

function updateVector(vector, origin, end) {
  if (vector === null || vector === undefined || origin === null || origin === undefined || end === null || end === undefined) {
    return;
  }
  // Ajustar las coordenadas en función del dominio
  var xScaleFactor = xDom === 0 ? 0 : (width - margin.left - margin.right) / (2 * xDom);
  var yScaleFactor = yDom === 0 ? 0 : (height - margin.top - margin.bottom) / (2 * yDom);

  vector
    .transition()
    .duration(1000)
    .attr("x1", origin.x * xScaleFactor)
    .attr("y1", -origin.y * yScaleFactor)
    .attr("x2", end.x * xScaleFactor)
    .attr("y2", -end.y * yScaleFactor)
    .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");
}

// recorrer los elementos del arreglo y ajustar el domino de la gráfica de los ejes
// al valor mayor de los elementos del arreglo
function updateDom() {
  var xMax = 0;
  var yMax = 0;
  for (var i = 0; i < vectors.length; i++) {
    if (Math.abs(vectors[i][0].x) > xMax) {
      xMax = Math.abs(vectors[i][0].x);
    }
    if (Math.abs(vectors[i][1].x) > xMax) {
      xMax = Math.abs(vectors[i][1].x);
    }
    if (Math.abs(vectors[i][0].y) > yMax) {
      yMax = Math.abs(vectors[i][0].y);
    }
    if (Math.abs(vectors[i][1].y) > yMax) {
      yMax = Math.abs(vectors[i][1].y);
    }
  }
  for (var i = 1; true; i *= 10) {
    // si el valor se sale del maximo del dominio actual
    // entonces se aumenta el dominio
    if (i * 10 < xMax) {
      continue;
    }
    // encontrar el numero mínimo multiplo del dominio que sea mayor al valor
    xDom = xMax % i === 0 ? xMax : xMax + (i - xMax % i);
    break;
  }
  for (var i = 1; true; i *= 10) {
    // si el valor se sale del maximo del dominio actual
    // entonces se aumenta el dominio
    if (i * 10 < yMax) {
      continue;
    }
    // encontrar el numero mínimo multiplo del dominio que sea mayor al valor
    yDom = yMax % i === 0 ? yMax : yMax + (i - yMax % i);
    break;
  }
}

function removeAllVectors() {
  if (vectorList.length == 0) {
    return;
  }
  isDelitingVectors = true;
  // reccorrer el vector de vectores y poner sus posiciones en 0,0 y actualizarlos despues eliminarlos
  for (var i = 0; i < vectorList.length; i++) {
    vectorList[i].transition()
      .duration(1000)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", 0);
  }
  sleep(1000).then(() => {
    for (var i = 0; i < vectorList.length; i++) {
      vectorList[i].remove();
    }
    vectorList = [];
  });
  isDelitingVectors = false;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}