const menu = document.getElementById("menu");
const indicador = document.getElementById("indicador");
const secciones = document.querySelectorAll(".seccion");

let tamañoIndicador = menu.querySelector("a").offsetWidth;
indicador.style.width = tamañoIndicador + "px";

let indexSeccionActiva;

//observer
const observer = new IntersectionObserver(
  (entradas, observer) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        //Obtenemos cual es la seccion que esta entrando en pantalla.
        //console.log(`La entrada ${entrada.target.id} esta intersectando`);

        //Creamos un arreglo con la secciones y luewgo otbteemos el index de la seccion que esya en pantalla.
        indexSeccionActiva = [...secciones].indexOf(entrada.target);
        indicador.style.transform = `translateX(${
          tamañoIndicador * indexSeccionActiva
        }px)`;
      }
    });
  },
  {
    rootMargin: ".80px 0px 0px 0px",
    threshold: 0.2,
  }
);

//Agregamos un observador para el hero.
observer.observe(document.getElementById('hero'));


//Asignamos un observador a cada una de las secciones
secciones.forEach((seccion) => observer.observe(seccion));

//Agregamos un evento para indicar cuando la pantalla cambie de tamañao.
const onResize = () => {
  //calculamos el nuevo tamaño que deberia tener el indicador.
  tamañoIndicador = menu.querySelector("a").offsetWidth;

  //cambiamos el tamaño del indicador.
  indicador.style.width = `${tamañoIndicador}px`;

  //volvemos a posicionar el indicador
  indicador.style.transform = `translateX(${
    tamañoIndicador * indexSeccionActiva
  }px)`;
};

window.addEventListener("resize", onResize);
