var isTransform = false;
var v1IsRectangular = true;
var v2IsRectangular = true;
var r1Val,
  img1Val,
  angle1Val,
  r2Val,
  img2Val,
  angle2Val = "";
$(document).ready(function () {
  stratView();
  addingButtonActions();
});

function addingButtonActions() {
  $("#resultado").click(function () {
    if (!validateInputs()) {
      return;
    }
    // validar si el input es rectangular o polar
    if (v1IsRectangular) {
      transformRectangularToPolar(r1Val, img1Val);
    } else {
      transformPolarToRectangular(r1Val, angle1Val);
    }
  });

  $("#btn-sum").click(function () {
    if (!validateInputs()) {
      return;
    }
    addVectors();
  });

  $("#btn-min").click(function () {
    if (!validateInputs()) {
      return;
    }
    subVector();
  });

  $("#btn-mul").click(function () {
    if (!validateInputs()) {
      return;
    }
    mulVector();
  });

  $("#btn-div").click(function () {
    if (!validateInputs()) {
      return;
    }
    divVector();
  });
}

function transformRectangularToPolar(realVal, imgVal) {
  // calcular el angulo con los valores realVal e imgVal
  var angle = math.atan2(imgVal, realVal);
  // convertir a grados
  angle = math.round(math.multiply(angle, 180 / math.pi), 3);
  // truncar a 3 decimales
  angle = math.round(angle, 3);
  var num = math.sqrt(
    math.add(math.square(realVal), math.square(imgVal))
  );
  // truncar a 3 decimales
  num = math.round(num, 3);
  $("#resPolar").val(num + " ∠ " + angle + "°");
}

function transformPolarToRectangular(num, angleVal) {
  // angulo viene en grados
  // convertir a radianes
  angleVal = math.round(math.multiply(angleVal, math.pi / 180), 3);
  // calcular la parte real
  var real = math.multiply(num, math.cos(angleVal));
  // calcular la parte imaginaria
  var img = math.multiply(num, math.sin(angleVal));
  // truncar a 3 decimales
  real = math.round(real, 3);
  img = math.round(img, 3);
  $("#resRectangular").val(real + " + " + img + "j");
}

function addVectors() {
  var real1,
    img1,
    real2,
    img2,
    realRes,
    imgRes,
    numRes,
    angleRes = 0;
  // pasar los 2 vectores a rectangular
  real1 = r1Val;
  img1 = img1Val;
  real2 = r2Val;
  img2 = img2Val;
  if (!v1IsRectangular) {
    // convertir a radianes el angulo
    var angle1 = math.round(math.multiply(angle1Val, math.pi / 180), 3);
    real1 = r1Val * math.cos(angle1);
    img1 = r1Val * math.sin(angle1);
  }
  if (!v2IsRectangular) {
    // convertir a radianes el angulo
    var angle2 = math.round(math.multiply(angle2Val, math.pi / 180), 3);
    real2 = r2Val * math.cos(angle2);
    img2 = r2Val * math.sin(angle2);
  }
  // sumar los vectores
  realRes = math.add(real1, real2);
  imgRes = math.add(img1, img2);
  // obtener la forma polar del resultado
  numRes = math.sqrt(math.add(math.square(realRes), math.square(imgRes)));
  angleRes = math.atan2(imgRes, realRes);
  // convertir a grados
  angleRes = math.round(math.multiply(angleRes, 180 / math.pi), 3);
  // truncar a 3 decimales
  realRes = math.round(realRes, 3);
  imgRes = math.round(imgRes, 3);
  numRes = math.round(numRes, 3);
  angleRes = math.round(angleRes, 3);
  // mostrar el resultado
  $("#resPolar").val(numRes + " ∠ " + angleRes + "°");
  $("#resRectangular").val(realRes + " + " + imgRes + "j");
}

function subVector() {
  var real1,
    img1,
    real2,
    img2,
    realRes,
    imgRes,
    numRes,
    angleRes = 0;
  real1 = r1Val;
  img1 = img1Val;
  real2 = r2Val;
  img2 = img2Val;
  // pasar los 2 vectores a rectangular
  if (!v1IsRectangular) {
    // convertir a radianes el angulo
    var angle1 = math.round(math.multiply(angle1Val, math.pi / 180), 3);
    real1 = r1Val * math.cos(angle1);
    img1 = r1Val * math.sin(angle1);
  }
  if (!v2IsRectangular) {
    // convertir a radianes el angulo
    var angle2 = math.round(math.multiply(angle2Val, math.pi / 180), 3);
    real2 = r2Val * math.cos(angle2);
    img2 = r2Val * math.sin(angle2);
  }
  // restar los vectores
  realRes = math.subtract(real1, real2);
  imgRes = math.subtract(img1, img2);
  // obtener la forma polar del resultado
  numRes = math.sqrt(math.add(math.square(realRes), math.square(imgRes)));
  angleRes = math.atan2(imgRes, realRes);
  // convertir a grados
  angleRes = math.round(math.multiply(angleRes, 180 / math.pi), 3);
  // truncar a 3 decimales
  realRes = math.round(realRes, 3);
  imgRes = math.round(imgRes, 3);
  numRes = math.round(numRes, 3);
  angleRes = math.round(angleRes, 3);
  // mostrar el resultado
  $("#resPolar").val(numRes + " ∠ " + angleRes + "°");
  $("#resRectangular").val(realRes + " + " + imgRes + "j");
}

function mulVector() {
  var real1,
    img1,
    real2,
    img2,
    realRes,
    imgRes,
    numRes,
    angleRes = 0;
  real1 = r1Val;
  img1 = img1Val;
  real2 = r2Val;
  img2 = img2Val;
  // pasar los 2 vectores a rectangular
  if (!v1IsRectangular) {
    // convertir a radianes el angulo
    var angle1 = math.round(math.multiply(angle1Val, math.pi / 180), 3);
    real1 = r1Val * math.cos(angle1);
    img1 = r1Val * math.sin(angle1);
  }
  if (!v2IsRectangular) {
    // convertir a radianes el angulo
    var angle2 = math.round(math.multiply(angle2Val, math.pi / 180), 3);
    real2 = r2Val * math.cos(angle2);
    img2 = r2Val * math.sin(angle2);
  }
  // multiplicar los vectores
  realRes = math.multiply(real1, real2) - math.multiply(img1, img2);
  imgRes = math.multiply(real1, img2) + math.multiply(img1, real2);
  // obtener la forma polar del resultado
  numRes = math.sqrt(math.add(math.square(realRes), math.square(imgRes)));
  angleRes = math.atan2(imgRes, realRes);
  // convertir a grados
  angleRes = math.round(math.multiply(angleRes, 180 / math.pi), 3);
  // truncar a 3 decimales
  realRes = math.round(realRes, 3);
  imgRes = math.round(imgRes, 3);
  numRes = math.round(numRes, 3);
  angleRes = math.round(angleRes, 3);
  // mostrar el resultado
  $("#resPolar").val(numRes + " ∠ " + angleRes + "°");
  $("#resRectangular").val(realRes + " + " + imgRes + "j");
}

function divVector() {
  var real1,
    img1,
    real2,
    img2,
    realRes,
    imgRes,
    numRes,
    angleRes = 0;
  real1 = r1Val;
  img1 = img1Val;
  real2 = r2Val;
  img2 = img2Val;
  // pasar los 2 vectores a rectangular
  if (!v1IsRectangular) {
    // convertir a radianes el angulo
    var angle1 = math.round(math.multiply(angle1Val, math.pi / 180), 3);
    real1 = r1Val * math.cos(angle1);
    img1 = r1Val * math.sin(angle1);
  }
  if (!v2IsRectangular) {
    // convertir a radianes el angulo
    var angle2 = math.round(math.multiply(angle2Val, math.pi / 180), 3);
    real2 = r2Val * math.cos(angle2);
    img2 = r2Val * math.sin(angle2);
  }
  // dividir lel numero complejo
  var divisor = math.square(real2) + math.square(img2);
  console.log(divisor);
  if (divisor == 0) {
    mostartTooltip("No se puede dividir entre 0", "#r2");
    return;
  }
  realRes = math.multiply(real1, real2) + math.multiply(img1, img2);
  console.log(realRes);
  realRes = realRes / divisor;
  imgRes = math.multiply(img1, real2) - math.multiply(real1, img2);
  console.log(imgRes);
  imgRes = imgRes / divisor;
  // obtener la forma polar del resultado
  numRes = math.sqrt(math.add(math.square(realRes), math.square(imgRes)));
  angleRes = math.atan2(imgRes, realRes);
  // convertir a grados
  angleRes = math.round(math.multiply(angleRes, 180 / math.pi), 3);
  // truncar a 3 decimales
  realRes = math.round(realRes, 3);
  imgRes = math.round(imgRes, 3);
  numRes = math.round(numRes, 3);
  angleRes = math.round(angleRes, 3);
  // mostrar el resultado
  $("#resPolar").val(numRes + " ∠ " + angleRes + "°");
  $("#resRectangular").val(realRes + " + " + imgRes + "j");
}

function stratView() {
  toggleView();
  setV1Polar();

  $("#toggleV1").click(function () {
    toggleV1();
  });

  $("#toggleV2").click(function () {
    toggleV2();
  });

  $("#btn-calc").click(function () {
    if (isTransform) {
      toggleView();
    }
  });

  $("#btn-trans").click(function () {
    if (!isTransform) {
      toggleView();
    }
  });
}

function toggleView() {
  if (isTransform) {
    setV1Polar();
    setV2Polar();
    $("#numV2").show();
    $("#anguloV2").show();
    $("#imaginarioV2").hide();
    $("#imaginarioV1").hide();
    $("#V2").show();
    $("#cal-btn").show();
    $("#ansRectangular").show();
    $("#resultado").hide();
    $("#btn-calc").removeClass("btn-dark").addClass("btn-primary");
    $("#btn-trans").removeClass("btn-primary").addClass("btn-dark");
    $("#ansPolar").show();
    $("#ansRectangular").show();
  } else {
    setV1Polar();
    setV2Polar();
    $("#numV2").hide();
    $("#anguloV2").hide();
    $("#imaginarioV2").hide();
    $("#imaginarioV1").hide();
    $("#V2").hide();
    $("#cal-btn").hide();
    $("#ansRectangular").hide();
    $("#resultado").show();
    $("#btn-calc").removeClass("btn-primary").addClass("btn-dark");
    $("#btn-trans").removeClass("btn-dark").addClass("btn-primary");
    $("#ansPolar").hide();
    $("#ansRectangular").show();
  }
  // agregarle a los botnes .butons, a las respuestas .answ y a v1 y v2/
  // la clase popOutIn y cuando termine la animacion quitarla
  $(".butons").addClass("popOutIn").one("animationend", function () {
    $(".butons").removeClass("popOutIn");
  });
  $(".answ").addClass("popOutIn").one("animationend", function () {
    $(".answ").removeClass("popOutIn");
  });
  $("#V1").addClass("popOutIn").one("animationend", function () {
    $("#V1").removeClass("popOutIn");
  });
  $("#V2").addClass("popOutIn").one("animationend", function () {
    $("#V2").removeClass("popOutIn");
  });
  $("#resPolar").val("");
  $("#resRectangular").val("");
  isTransform = !isTransform;
}

function toggleV1() {
  // eliminar lo que sea que tenga el input
  $("#r1").val("");
  $("#img1").val("");
  $("#grado1").val("");
  $("#resPolar").val("");
  $("#resRectangular").val("");
  if (v1IsRectangular) {
    setV1Polar();
  } else {
    setV1Rectangular();
  }
  $("#V1").addClass("popOutIn")
    .one("animationend", function () {
      $("#V1").removeClass("popOutIn");
    });
}

function toggleV2() {
  // eliminar lo que sea que tenga el input
  $("#r2").val("");
  $("#img2").val("");
  $("#grado2").val("");
  if (v2IsRectangular) {
    setV2Polar();
  } else {
    setV2Rectangular();
  }
  $("#V2").addClass("popOutIn")
    .one("animationend", function () {
      $("#V2").removeClass("popOutIn");
    });
}

function setV1Polar() {
  $("#r1").attr("placeholder", "Amplitud");
  $("#addR1").text("A");
  $("#anguloV1").show();
  $("#imaginarioV1").hide();
  $("#toggleV1").text("Polar");
  if (isTransform) {
    $("#ansPolar").hide();
    $("#ansRectangular").show();
  }
  v1IsRectangular = false;
}

function setV1Rectangular() {
  $("#r1").attr("placeholder", "Real");
  $("#addR1").text("R");
  $("#anguloV1").hide();
  $("#imaginarioV1").show();
  $("#toggleV1").text("Rectangular");
  if (isTransform) {
    $("#ansPolar").show();
    $("#ansRectangular").hide();
  }
  v1IsRectangular = true;
}

function setV2Polar() {
  $("#r2").attr("placeholder", "Amplitud");
  $("#addR2").text("A");
  $("#anguloV2").show();
  $("#imaginarioV2").hide();
  $("#toggleV2").text("Polar");
  v2IsRectangular = false;
}

function setV2Rectangular() {
  $("#r2").attr("placeholder", "Real");
  $("#addR2").text("R");
  $("#anguloV2").hide();
  $("#imaginarioV2").show();
  $("#toggleV2").text("Rectangular");
  v2IsRectangular = true;
}

function validateInputs() {
  var r1 = $("#r1");
  var img1 = $("#img1");
  var angle1 = $("#grado1");
  var r2 = $("#r2");
  var img2 = $("#img2");
  var angle2 = $("#grado2");

  // validar que los campos son visibles y si son visibles validar que no esten vacioes
  if ($("#numV1").is(":visible")) {
    if (r1.val() == "") {
      mostartTooltip("El número no puede estar vacio", "#r1");
      return false;
    } else {
      try {
        r1Val = math.evaluate($("#r1").val());
      } catch (error) {
        var errorMsg = "Error al evaluar la expresión: " + error;
        mostartTooltip(errorMsg, "#r1");
        return false;
      }
    }
  }

  if ($("#anguloV1").is(":visible")) {
    if (angle1.val() == "") {
      mostartTooltip("El ángulo no puede estar vacio", "#grado1");
      return false;
    } else {
      try {
        angle1Val = math.evaluate($("#grado1").val());
      } catch (error) {
        var errorMsg = "Error al evaluar la expresión: " + error;
        mostartTooltip(errorMsg, "#grado1");
        return false;
      }
    }
  }

  if ($("#imaginarioV1").is(":visible")) {
    if (img1.val() == "") {
      mostartTooltip("El número no puede estar vacio", "#img1");
      return false;
    } else {
      try {
        img1Val = math.evaluate($("#img1").val());
      } catch (error) {
        var errorMsg = "Error al evaluar la expresión: " + error;
        mostartTooltip(errorMsg, "#img1");
        return false;
      }
    }
  }

  if ($("#numV2").is(":visible")) {
    if (r2.val() == "") {
      mostartTooltip("El número no puede estar vacio", "#r2");
      return false;
    } else {
      try {
        r2Val = math.evaluate($("#r2").val());
      } catch (error) {
        var errorMsg = "Error al evaluar la expresión: " + error;
        mostartTooltip(errorMsg, "#r2");
        return false;
      }
    }
  }

  if ($("#anguloV2").is(":visible")) {
    if (angle2.val() == "") {
      mostartTooltip("El ángulo no puede estar vacio", "#grado2");
      return false;
    } else {
      try {
        angle2Val = math.evaluate($("#grado2").val());
      } catch (error) {
        var errorMsg = "Error al evaluar la expresión: " + error;
        mostartTooltip(errorMsg, "#grado2");
        return false;
      }
    }
  }

  if ($("#imaginarioV2").is(":visible")) {
    if (img2.val() == "") {
      mostartTooltip("El número no puede estar vacio", "#img2");
      return false;
    } else {
      try {
        img2Val = math.evaluate($("#img2").val());
      } catch (error) {
        var errorMsg = "Error al evaluar la expresión: " + error;
        mostartTooltip(errorMsg, "#img2");
        return false;
      }
    }
  }

  return true;
}

function mostartTooltip(message, toolTipId) {
  $(toolTipId).tooltip("dispose");
  // Agregar el tooltip
  $(toolTipId).tooltip({
    title: message,
    placement: "top",
    trigger: "manual",
  });
  // Mostrar el tooltip
  $(toolTipId).tooltip("show");

  sleep(2000).then(() => {
    // Ocultar el tooltip
    $(toolTipId).tooltip("hide");
    $(toolTipId).tooltip("dispose");
    toolTipId = "";
  });
}
