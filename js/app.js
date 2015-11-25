'use strict';
(function(){



//Formulario

/*
* Introduce un ingrediente nuevo a la lista y activa el evento de borrar de la lista
*/

$(".label-newIngred").click(function(){
  if($('#newCantidadgr').val().length == 0 || $('#newIngrediente').val().length == 0 )
    alert('Introduce todos los campos');
  else{
    var list = "<oli class='ingrediente' name='ingrediente[]'>" + $('#newIngrediente').val()  + "     -" + $('#newCantidadgr').val()  +"gr "+ "<span class='delete'>X</span></li>";
    $("#lista-ingredientes").append(list);
    $("li.ingrediente:last-child>.delete").click(function() {
      $(this).parent().fadeOut(function(){
        $(this).remove();
      });
    });
}
});

})();
