var
  width, height, margin,
  svg,
  xAxis, yAxis,
  xScale, yScale,
  gridX, gridY,
  vectorX, vectorY = null;

var ticksX, ticksY,
  xDom, yDom,
  real, imaginario,
  side = 0;
var vectors = [];
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

  updateDom();

  // Actuaizar los vectores
  for (var i = 0; i < vectors.length; i++) {
    updateVector(i);
  }

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
    .duration(700)
    .attr("transform", "translate(0," + (height / 2) + ")")
    .call(xScale);

  // Seleccionar y aplicar la transición al eje y
  svg.select(".y.axis")
    .transition()
    .duration(700)
    .attr("transform", "translate(" + width / 2 + ",0)")
    .call(yScale);
}

function updateSclae() {
  // cambiar los ticks segun el dominio
  if (xDom <= 5) {
    ticksX = xDom * 2;
  } else {
    ticksX = 10;
  }

  if (yDom <= 5) {
    ticksY = yDom * 2;
  } else {
    ticksY = 10;
  }

  var tickStepX = (2 * xDom) / ticksX;
  var tickStepY = (2 * yDom) / ticksY;
  //forzar la escala a utilizar los ticks
  xScale = d3.axisBottom(xAxis)
    .ticks(ticksX)
    .tickValues(d3.range(-xDom, xDom + tickStepX, tickStepX))
    .tickFormat(function (d) {
      return d === 0 ? "" : d;
    });
  // Dentro de la función modifyScale()
  yScale = d3.axisLeft(yAxis)
    .ticks(ticksY)
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
  drawGridX();
  drawGridY();
}

function drawGridX() {
  if (ticksX <= gridX.length) {
    for (var i = 0; i < gridX.length; i++) {
      gridX[i]
        .transition()
        .duration(700)
        .attr("y1", i * ((height - margin.left - margin.right) / ticksX))
        .attr("x2", width - margin.right - margin.left)
        .attr("y2", i * (height - margin.left - margin.right) / ticksX)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      gridY[i]
        .transition()
        .duration(700)
        .attr("x1", i * ((width - margin.top - margin.bottom) / ticksX))
        .attr("x2", i * ((width - margin.top - margin.bottom) / ticksX))
        .attr("y2", height - margin.top - margin.bottom)

        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    }
    // Eliminar elementos extra
    gridX.splice(ticksX + 1, gridX.length - ticksX).forEach(function (el) {
      el.remove();
    });
    gridY.splice(ticksX + 1, gridY.length - ticksX).forEach(function (el) {
      el.remove();
    });
  } else {
    for (var i = 0; i < gridX.length; i++) {
      gridX[i]
        .transition()
        .duration(700)
        .attr("y1", i * ((height - margin.left - margin.right) / ticksX))
        .attr("x2", width - margin.right - margin.left)
        .attr("y2", i * (height - margin.left - margin.right) / ticksX)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      gridY[i]
        .transition()
        .duration(700)
        .attr("x1", i * ((width - margin.top - margin.bottom) / ticksX))
        .attr("x2", i * ((width - margin.top - margin.bottom) / ticksX))
        .attr("y2", height - margin.top - margin.bottom)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    }
    for (var i = gridX.length; i < ticksX + 1; i++) {
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
        .duration(700)
        .attr("y1", i * ((height - margin.left - margin.right) / ticksX))
        .attr("x2", width - margin.right - margin.left)
        .attr("y2", i * (height - margin.left - margin.right) / ticksX)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      gridY[i]
        .transition()
        .duration(700)
        .attr("x1", i * ((width - margin.top - margin.bottom) / ticksX))
        .attr("x2", i * ((width - margin.top - margin.bottom) / ticksX))
        .attr("y2", height - margin.top - margin.bottom)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    }
  }
}

function drawGridY() {
  if (ticksY <= gridX.length) {
    for (var i = 0; i < gridX.length; i++) {
      gridX[i]
        .transition()
        .duration(700)
        .attr("y1", i * ((height - margin.left - margin.right) / ticksY))
        .attr("x2", width - margin.right - margin.left)
        .attr("y2", i * (height - margin.left - margin.right) / ticksY)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      gridY[i]
        .transition()
        .duration(700)
        .attr("x1", i * ((width - margin.top - margin.bottom) / ticksY))
        .attr("x2", i * ((width - margin.top - margin.bottom) / ticksY))
        .attr("y2", height - margin.top - margin.bottom)

        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    }
    // Eliminar elementos extra
    gridX.splice(ticksY + 1, gridX.length - ticksY).forEach(function (el) {
      el.remove();
    });
    gridY.splice(ticksY + 1, gridY.length - ticksY).forEach(function (el) {
      el.remove();
    });
  } else {
    for (var i = 0; i < gridX.length; i++) {
      gridX[i]
        .transition()
        .duration(700)
        .attr("y1", i * ((height - margin.left - margin.right) / ticksY))
        .attr("x2", width - margin.right - margin.left)
        .attr("y2", i * (height - margin.left - margin.right) / ticksY)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      gridY[i]
        .transition()
        .duration(700)
        .attr("x1", i * ((width - margin.top - margin.bottom) / ticksY))
        .attr("x2", i * ((width - margin.top - margin.bottom) / ticksY))
        .attr("y2", height - margin.top - margin.bottom)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    }
    for (var i = gridX.length; i < ticksY + 1; i++) {
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
        .duration(700)
        .attr("y1", i * ((height - margin.left - margin.right) / ticksY))
        .attr("x2", width - margin.right - margin.left)
        .attr("y2", i * (height - margin.left - margin.right) / ticksY)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      gridY[i]
        .transition()
        .duration(700)
        .attr("x1", i * ((width - margin.top - margin.bottom) / ticksY))
        .attr("x2", i * ((width - margin.top - margin.bottom) / ticksY))
        .attr("y2", height - margin.top - margin.bottom)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    }
  }
}

function initVector(origin = { x: 0, y: 0 }, end = { x: 0, y: 0 }, color = "black") {
  // añaadir el vector al arreglo de vectores
  vectors.push([origin, end, color]);
  // añadir el vector a la lista de vectores
  vectorList.push(
    svg.append("line")
      .attr("class", "vector")
      .attr("x1", origin.x)
      .attr("y1", -origin.y)
      .attr("x2", end.x)
      .attr("y2", -end.y)
      .attr("stroke", color)
      .attr("stroke-width", 4)
      .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")
  );
}

function changeVector(pos, origin = { x: 0, y: 0 }, end = { x: 0, y: 0 }, color = null) {
  // verificar que el vector exista en vectors
  if (pos < 0 || pos >= vectors.length) {
    return;
  }
  // modificar el vector en vectors
  vectors[pos][0] = origin;
  vectors[pos][1] = end;
  if (color !== null) {
    vectors[pos][2] = color;
  }
  updateGraph();
}

function updateVector(pos) {
  // verificar que el vector exista en vectors
  if (pos < 0 || pos >= vectors.length) {
    return;
  }
  // conseguir los parametros del vector
  var origin = vectors[pos][0];
  var end = vectors[pos][1];
  var color = vectors[pos][2];

  // Ajustar las coordenadas en función del dominio
  var xScaleFactor = xDom === 0 ? 0 : (width - margin.left - margin.right) / (2 * xDom);
  var yScaleFactor = yDom === 0 ? 0 : (height - margin.top - margin.bottom) / (2 * yDom);

  vectorList[pos]
    .transition()
    .duration(700)
    .attr("x1", origin.x * xScaleFactor)
    .attr("y1", -origin.y * yScaleFactor)
    .attr("x2", end.x * xScaleFactor)
    .attr("y2", -end.y * yScaleFactor)
    .attr("stroke", color)
    .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");
}

function removeVector(pos) {
  // verificar que la posición exista en vectorList
  if (pos < 0 || pos >= vectors.length) {
    return;
  }
  vectors[pos][0] = { x: 0, y: 0 };
  vectors[pos][1] = { x: 0, y: 0 };
  // que la transición sea de 300ms easeSinInOut
  vectorList[pos].transition()
    .duration(500)
    .ease(d3.easeSinInOut)
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 0)
    .attr("y2", 0);

  updateGraph();
}

function removeAllVectors() {
  if (vectorList.length == 0) {
    return;
  }
  isDelitingVectors = true;
  // reccorrer el vector de vectores y poner sus posiciones en 0,0 y actualizarlos despues eliminarlos
  for (var i = 0; i < vectorList.length; i++) {
    removeVector(i);
  }
  sleep(500).then(() => {
    isDelitingVectors = false;
  });
}

function getVectorIs0(pos) {
  // verificar que la posición exista en vectorList
  if (pos < 0 || pos >= vectors.length) {
    return;
  }
  return vectors[pos][0].x === 0 && vectors[pos][0].y === 0 && vectors[pos][1].x === 0 && vectors[pos][1].y === 0;
}

// recorrer los elementos del arreglo y ajustar el domino de la gráfica de los ejes
// al valor mayor de los elementos del arreglo
function updateDom() {
  if (vectors.length === 0) {
    xDom = 1;
    yDom = 1;
    return;
  }
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
  if (xMax === 0) {
    xMax = 1;
  } else if (xMax <= 1) {
    xMax = 1;
  } else if (xMax <= 5) {
    xMax = 5;
  } else if (xMax <= 10) {
    xMax = 10;
  } else {
    xMax = siguienteDivisible10(xMax);
  }
  if (yMax === 0) {
    yMax = 1;
  } else if (yMax <= 1) {
    yMax = 1;
  } else if (yMax <= 5) {
    yMax = 5;
  } else if (yMax <= 10) {
    yMax = 10;
  } else {
    yMax = siguienteDivisible10(yMax);
  }
  max = Math.max(xMax, yMax);
  xDom = max;
  yDom = max;
}

// encontrar el siguiente numero divisible entre la potencia de 10 mas cercana
// ejemplo 28 -> 30,  100 -> 100,  1568 -> 2000
function siguienteDivisible10(n) {
  for (var i = 1; true; i++) {
    var potencia = Math.pow(10, i);
    if (n > potencia * 10) {
      continue;
    }

    for (var j = 1; j <= 10; j++) {
      if (n <= potencia * j) {
        return potencia * j;
      }
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}