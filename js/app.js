'use strict';
(function(){
  var mailInfo = {
    cssValid:{
      'border': '2px solid rgb(25, 203, 91)',
      'color': 'rgb(25, 203, 91)',
      'font-weight': 'bold'
    },
    cssError:{
      'border': '2px solid rgb(213, 48, 19)',
      'color': 'rgb(213, 48, 19)',
      'font-weight': 'bold'
    },
    cssDefault:{
      'border': '1px solid #ddd',
      'color': '#ddd',
      'font-weight': 'normal'
    },
    valido: false
  };

  //Funcion para aplicar los estilos de la lista al objeto pasado como primer parametro
  var addEstilo = function(item, estilos){
    for(var est in estilos)
      item.style[est] = estilos[est];
  };


//Formulario

/*
* Introduce un ingrediente nuevo a la lista y activa el evento de borrar de la lista
*/

$(".label-newIngred").click(function(){
  if($('#newCantidadgr').val().length === 0 || $('#newIngrediente').val().length == 0 )
    alert('Introduce todos los campos');
  else{
    var list = "<li class='ingrediente' name='ingrediente[]'>" + $('#newIngrediente').val()  + "     -" + $('#newCantidadgr').val()  +"gr "+ "<span class='delete'>X</span></li>";
    $("#lista-ingredientes").append(list);
    $("li.ingrediente:last-child>.delete").click(function() {
      $(this).parent().fadeOut(function(){
        $(this).remove();
      });
    });
}
});


//Validar correo electronico
var validarMail = function (email) {
    var regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
    return regex.test(email);
};

//Comprobar si el correo es correcto y cambiar estilos del input
$('#newCorreo').on("keydown blur", function(){
  if($(this).val().length === 0){
    addEstilo(this, mailInfo.cssDefault);
  }else{
    if(validarMail($(this).val())){
      addEstilo(this, mailInfo.cssValid);
      mailInfo.valido = true;
    }
    else{
      addEstilo(this, mailInfo.cssError);
      mailInfo.valido = false;
    }
  }
});

//Validar el envio del formulario
$('#formulario').on("submit", function(){
  return mailInfo.valido;
});

//Cierra el buscador
  $('.modal-nueva').on("click", function(e){
    if(e.target != this) return;
    $(this).css('display', 'none');
  });


  $('#btn-nueva').on("click", function(){
    $('.modal-nueva').css('display', 'block');
  });
/*==============================================================================
*========================  BUSCADOR ============================================
*==============================================================================*/

var select = $('#buscador-select');


//Cambia el valor del placeholder del buscador
select.on("change", function(){
  $('.buscador-titulo').attr('placeholder', 'Buscar la receta por ' + this.value + ' aquí...').blur();
});



//Cierra el buscador
  $('.buscador').on("click", function(e){
    if(e.target != this) return;
    $(this).css('display', 'none');
  });

  $('.buscador-close').on("click", function(){
    $('.buscador').css('display', 'none');
  });
//Hace visible el buscador
$('#btn-buscador').on("click", function(){
  $('.buscador').css('display', 'block');
});



//AJAX


$('.buscador-titulo').keyup(function(){
  var campoBusqueda = $('#campo-buscador').val();
  var miRegEx = new RegExp(campoBusqueda, "i");
  $.get('./datos.xml', function(data){
    var out = '<ul class="buscador-live">';
    $(data).find('recetas').find('receta').each(function(i){
      if($(this).find(document.getElementById('buscador-select').value).text().search(miRegEx) != -1){
        out += '<li>';
        out += '<img src="'+ $(this).find('imagen').text() +'" alt="" width="30px" height="30px">';
        out += '<h3>' + $(this).find('titulo').text() + '</h3>';
        out += '<p>' + $(this).find('descripcion').text() + '</p>';
        out += '</li>';
      }
    });
    out += '</ul>';
    $('#actualizar').html(out);
  });
});


})();//Fin
