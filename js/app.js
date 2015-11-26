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
  if($('#newCantidadgr').val().length == 0 || $('#newIngrediente').val().length == 0 )
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
})

})();
