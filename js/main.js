// Dios mio me salve, la cantidad de pelos de la cabeza que he perdido con este proyecto. 
//Horas que  no voy a recuperar de mi vida: 24h.

class GeneradorContraseña {
    constructor() {
        this.caracteres = {
            letras: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
            numeros: "0123456789",
            caracteresEspeciales: "!@#$%^&*()-_=+[]{}|;:,.<>?"
        };
    }
      
    generarContraseña(length) {
        const contraseña = [];
        for (let i = 0; i < length; i++) {
            const tipoDeCaracter = Math.floor(Math.random() * 3);
            let letra;
            switch (tipoDeCaracter) {
              case 0:
                letra = this.caracteres.letras.charAt(Math.floor(Math.random() * this.caracteres.letras.length));
                break;
              case 1:
                letra = this.caracteres.numeros.charAt(Math.floor(Math.random() * this.caracteres.numeros.length));
                break;
              case 2:
                letra = this.caracteres.caracteresEspeciales.charAt(Math.floor(Math.random() * this.caracteres.caracteresEspeciales.length));
                break;
            }
            contraseña.push(letra);
        }
        return contraseña.join("");
    }
}
    
const contraseñaElMaster = new GeneradorContraseña();
    
function generarContraseña(length) {
    const contraseña = contraseñaElMaster.generarContraseña(parseInt(length));
    return contraseña;
}

function validadorDeContraseña(length) {
    if (length < 1 || length > 20 || isNaN(length)) {
        document.getElementById('mostrarContraseña').innerText = "La longitud de la contraseña debe ser mayor a cero y menor o igual a 20. Solo se aceptan valores numericos.";
        return false;
    }
    return true;
}

function generarYMostrarContraseña() {
    const length = parseInt(document.getElementById('tamañoDeCotraseña').value);
    if (validadorDeContraseña(length)) {
        const contraseña = generarContraseña(length);
        document.getElementById('mostrarContraseña').innerText = `La contraseña generada es: ${contraseña}`;
        guardarContraseña(contraseña);
        actualizarListaContraseñas();
    }
}

function guardarContraseña(contraseña) {
    let contraseñas = JSON.parse(localStorage.getItem('contraseñasGeneradas')) || [];
    contraseñas.push(contraseña);
    localStorage.setItem('contraseñasGeneradas', JSON.stringify(contraseñas));
}

function actualizarListaContraseñas() {
    const listaContraseñas = document.getElementById('listaContraseñas');
    listaContraseñas.innerHTML = '';
    const contraseñas = JSON.parse(localStorage.getItem('contraseñasGeneradas')) || [];
    contraseñas.forEach(contraseña => {
        const li = document.createElement('li');
        li.textContent = contraseña;
        listaContraseñas.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', actualizarListaContraseñas);