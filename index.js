function esPrimo(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function mcd(a, b) {
  let r;
  while (b > 0) {
    r = a % b;
    a = b;
    b = r;
  }
  return a;
}

function encontrarE(phi) {
  let e = 2;
  while (e < phi) {
    if (mcd(e, phi) === 1) {
      break;
    }
    e++;
  }
  return e;
}

function encontrarD(e, phi) {
  let k = 1;
  let d;
  while (true) {
      d = Math.floor((1 + k * phi) / e);
      if ((d * e) % phi === 1) {
          break;
      }
      k++;
  }
  return d;
}


function encriptarRSA(mensaje, p, q) {
  const n = p * q;
  const phi = (p - 1) * (q - 1);
  const e = encontrarE(phi);
  const d = encontrarD(e, phi);

  const mensajeEncriptado = [];

  for (let i = 0; i < mensaje.length; i++) {
    const m = mensaje.charCodeAt(i);
    let cEncriptado = 1;
    for (let j = 0; j < e; j++) {
      cEncriptado = (cEncriptado * m) % n;
    }
    mensajeEncriptado.push(cEncriptado);
  }


  return mensajeEncriptado;
}

function desencriptarRSA(mensajeEncriptado, n, d) {
  const mensajeDesencriptado = [];

  for (let i = 0; i < mensajeEncriptado.length; i++) {
    const valorEncriptado = mensajeEncriptado[i];
    let valorDesencriptado = 1;

    for (let j = 0; j < d; j++) {
      valorDesencriptado = (valorDesencriptado * valorEncriptado) % n;
    }

    mensajeDesencriptado.push(valorDesencriptado);
  }

  let mensajeDesencriptadoStr = "";
  for (let i = 0; i < mensajeDesencriptado.length; i++) {
    mensajeDesencriptadoStr += String.fromCharCode(mensajeDesencriptado[i]);
  }

  return mensajeDesencriptadoStr;
}

function strToVector(mensajeEncriptadoStr) {
  const regex = /\s+/;
  const mensajeEncriptado = mensajeEncriptadoStr.split(regex).map(num => parseInt(num));
  return mensajeEncriptado;
}

function vectorToStr(mensajeEncriptado) {
  const mensajeEncriptadoStr = mensajeEncriptado.join(" ");
  return mensajeEncriptadoStr;
}

// Obtener los elementos del DOM
const mensajeInput = document.getElementById("mensaje");
const pInput = document.getElementById("p");
const qInput = document.getElementById("q");
const encriptarBtn = document.getElementById("encriptar-btn");
const desencriptarBtn = document.getElementById("desencriptar-btn");

// Función para encriptar el mensaje
function encriptar() {
  const p = parseInt(document.getElementById("p-value").value);
  const q = parseInt(document.getElementById("q-value").value);
  const mensaje = document.getElementById("mensaje-input").value;

  if (!esPrimo(p) || !esPrimo(q)) {
    alert("p y q deben ser números primos.");
    return;
  }

  const n = p * q;
  const phi = (p - 1) * (q - 1);
  const e = encontrarE(phi);
  const d = encontrarD(e, phi);

  const mensajeEncriptado = encriptarRSA(mensaje, n, e);

  document.getElementById("resultado-encriptado").style.display = "block";
  document.getElementById("n-value").textContent = `n: ${n}`;
  document.getElementById("phi-value").textContent = `phi: ${phi}`;
  document.getElementById("d-value").textContent = `d: ${d}`;
  document.getElementById("e-value").textContent = `e: ${e}`;
  document.getElementById("mensaje-encriptado").textContent =
    mensajeEncriptado.join(" ");
}

document.getElementById("encriptar-btn").addEventListener("click", encriptar);

// Función para desencriptar el mensaje
function desencriptar() {
  const n = parseInt(document.getElementById("n-value").value);
  const d = parseInt(document.getElementById("d-value").value);
  const mensajeEncriptadoStr = document.getElementById("mensaje-encriptado-input").value;
  const mensajeEncriptado = [parseInt(mensajeEncriptadoStr)];

  const mensajeDesencriptado = desencriptarRSA(mensajeEncriptado, n, d);
  document.getElementById("resultado-desencriptado").style.display = "block";
  document.getElementById("mensaje-desencriptado").textContent = mensajeDesencriptado;
}

document.getElementById("desencriptar-btn").addEventListener("click", desencriptar);



