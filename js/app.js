//Variables
const btnEnviar = document.querySelector("#enviar");
const btnReset = document.querySelector("#resetBtn");
const formulario = document.querySelector("#enviar-mail");

//Variables para campos
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

const er = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


//EventListener
eventListeners();
function eventListeners(){
    // Cuando la app arranca
    document.addEventListener("DOMContentLoaded", iniciarApp);

    // Campos del formulario
    email.addEventListener("blur", validarFormulario); //blur lo chequea cuando salimos del campo
    asunto.addEventListener("blur", validarFormulario);
    mensaje.addEventListener("blur", validarFormulario);

    //Reinicia el formulario
    btnReset.addEventListener("click", resetearFormulario);

    //Enviar email
    formulario.addEventListener("submit", enviarEmail);

}

//Funciones
function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add("cursor-not-allowed" , "opacity-50")
   
}

//Valida formulario
function validarFormulario(e){
    if (e.target.value.length > 0){

        //elimina los errroes
        const error = document.querySelector("p.error");
        if(error){
            error.remove();
        }

        e.target.classList.remove("border", "border-red-500");
        e.target.classList.add("border", "border-green-500");       
    } else {
        e.target.classList.remove("border", "border-green-500");
        e.target.classList.add("border", "border-red-500"); 

        mostrarError("Todos los campos son obligatorios");
    }

    //tipo de formulario
    //console.log(e.target.type)
    //si es email
    if( e.target.type === "email" ) {
        // const resultado = e.target.value.indexOf("@"); //regular
        // console.log(resultado) //da -1 si no hay

        //expresion regular
        // const er =
        // /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        // LA LLEVO ARRIBA PARA HACERLA GLOBAL

        if( er.test ( e.target.value ) ){
             //elimina los errroes
            const error = document.querySelector("p.error");
            if(error){
            error.remove();
            }

            e.target.classList.remove("border", "border-red-500");
            e.target.classList.add("border", "border-green-500");
                   
        } else {
            e.target.classList.remove("border", "border-green-500");
            e.target.classList.add("border", "border-red-500"); 
            mostrarError("El email no es valido");
        }
    }
    if ( er.test ( email.value ) && asunto.value !== "" && mensaje.value !==""){
        console.log( "pasaste")
        btnEnviar.disabled = false;
        btnEnviar.classList.remove("cursor-not-allowed" , "opacity-50")
    } 
}


function mostrarError(mensaje){
    const mensajeError = document.createElement("p");
    mensajeError.textContent = mensaje;
    mensajeError.classList.add("border", "background-red-500", "background-color-100", "text-red-500", "p-3", "mt-5", "text-center", "error");

    const errores = document.querySelectorAll(".error");
    
    //que solo aparezca un cartel de error, 
    if(errores.length === 0 ){
        formulario.appendChild(mensajeError);
    }

}

//simular enviar mail
function enviarEmail(e){
    e.preventDefault();

    //mostrar el spinner
    const spinner = document.querySelector("#spinner");
    spinner.style.display="flex";
    
    //Despues de 3 seg ocultar spinner y mostrar el msj

    setTimeout(() => {
        spinner.style.display="none";

        //mensaje que se envió correctamente
        const parrafo = document.createElement("p");
        parrafo.textContent= "El mesaje se envió correctamente";
        parrafo.classList.add("text-center", "my-10", "p-2", "bg-green-500", "text-white", "font-bold")

        //inserta parrafo antes de spinner
        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove(); //Elimina el mensaje

            resetearFormulario();
        }, 5000)
    }, 3000);
}

//Funcion que resetea el form y la llamamos arriba
function resetearFormulario(){
    formulario.reset();

    iniciarApp(); //volvemos a iniciar
}