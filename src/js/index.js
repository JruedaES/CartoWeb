var datos = [];

let JSON = [];

const userAction = async () => {
   const response = await fetch('http://127.0.0.1:5500/src/api/servers.json');
   data = await response.json();
   JSON = await data;
   select = document.getElementById('selecetMapaBase');

   for (let i = 0; i <= JSON.length - 1; i++) {
      let opt = document.createElement('option');
      opt.value = JSON[i].code;
      opt.innerHTML = JSON[i].name;
      select.appendChild(opt);

   }

   if (datos.length > 0) {
      for (let i = 0; i <= datos.length - 1; i++) {
         let opt = document.createElement('option');
         opt.value = datos[i].code;
         opt.innerHTML = datos[i].name;
         select.appendChild(opt);

      }
   }

}

userAction();





$(function () {
   var index = {

      inicio: function () {
         index.recargar();
      },
      recargar: function () {
         index.mostrarmodal();

      },
      mostrarmodal : function (){
         $modal_mapa = document.getElementById('modal_mapa');

         $modal_mapa.addEventListener('click', async()=>{

            const { value: formValues } = await Swal.fire({
               title: 'Agregar nueva Capa',
               html:
               ' <div class="mb-3">'+
               '<Label>Nombre</label>'+
                 '<input id="swal-input1" class="swal2-input">' +
                 '</div>'+
                 ' <div class="mb-3">'+
                 '<Label>Ruta</label>'+
                 '<input id="swal-input2" class="swal2-input">'+
                 '</div>'+
                 ' <div class="mb-3">'+
                 '<Label>Z Minimo</label>'+
                 '<input id="swal-input3" class="swal2-input">'+
                 '</div>'+
                 ' <div class="mb-3">'+
                 '<Label>Z Maximo</label>'+
                 '<input id="swal-input4" class="swal2-input">'+
                 '</div>',
               focusConfirm: false,
               preConfirm: () => {
                 return {
                  "code": datos.length + 100,
                  "name": document.getElementById('swal-input1').value,
                  "route": document.getElementById('swal-input2').value,
                  "minZoom": document.getElementById('swal-input3').value,
                  "maxZoom":   document.getElementById('swal-input4').value,
                 }
               }
             });

           datos.push(formValues);
            alert('Agregado!');
            document.querySelector("#selecetMapaBase").innerHTML = '';
            userAction();

             
         })
      }
   };
$(document).ready(function () {
   index.inicio();
});
});