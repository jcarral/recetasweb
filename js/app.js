'use strict';
(function(){
  var mailInfo = {
    cssValido:{
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
  var imgValida = false, ingValidos = false, procValido = false;

  var cssError = {'border': '2px solid red','background': 'rgba(247, 167, 177, 0.23)','color': 'red'};
  var cssDefault = {'border': '1px solid black', 'background': 'white', 'color': 'black'};

  //Funcion para aplicar los estilos de la lista al objeto pasado como primer parametro
  var addEstilo = function(item, estilos){
    for(var est in estilos)
      item.style[est] = estilos[est];
  };


  /*==============================================================================
  *========================  FORMULARIO ============================================
  *==============================================================================*/

/*
* Introduce un ingrediente nuevo a la lista y activa el evento de borrar de la lista
*/
var addLista = function(){
  if($('#newCantidadgr').val().length === 0 || $('#newIngrediente').val().length === 0)
    alert('Introduce todos los campos');
  else{
    var list = "<li class='ingrediente'>" + $('#newIngrediente').val()  + "     -" + $('#newCantidadgr').val()  +"gr "+ "<span class='delete'>X</span><input type='hidden' name='ingrediente[]' value='"+$('#newIngrediente').val() +"'</li>";
    $("#lista-ingredientes").append(list);
    $("li.ingrediente:last-child>.delete").click(function() {
      $(this).parent().fadeOut(function(){
        $(this).remove();
      });
    });
}
};

$(".label-newIngred").click(addLista);

$('#newIngrediente').keypress(function(e){
  if(e.keyCode === 13){
    e.preventDefault();
    addLista();
  }
});

//Validar ingredientes

var validarIngredientes = function(){

  if($('#lista-ingredientes li').length > 0){
    addEstilo($('#newIngrediente')[0], cssDefault);
    addEstilo($('#newCantidadgr')[0], cssDefault);
    ingValidos = true;
  }else{
    addEstilo($('#newIngrediente')[0], cssError);
    addEstilo($('#newCantidadgr')[0], cssError);
    ingValidos = false;
  }
};
// Validar elaboración
var validarPreparacion = function(){

  if($('#nueva-preparacion').val().length >100){
    addEstilo($('#nueva-preparacion')[0], cssDefault);
    procValido = true;
  }else{
    addEstilo($('#nueva-preparacion')[0], cssError);
    procValido = false;

  }
};

//Validar imagen
var validarImagen = function(){

  if($('#newImg').val().match(/\.(jpeg|jpg|gif|png)$/) !== null){
    addEstilo($('#newImg')[0], cssDefault);
    imgValida = true;
  }else{
    addEstilo($('#newImg')[0], cssError);
    imgValida = false;
  }

};

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
      addEstilo(this, mailInfo.cssValido);
      mailInfo.valido = true;
    }
    else{
      addEstilo(this, mailInfo.cssError);
      mailInfo.valido = false;
    }
  }
});

//Validar el envio del formulario
$('#formulario').on("submit", function(e){

  validarIngredientes();
  validarImagen();
  validarPreparacion();
  if(!(procValido && imgValida && ingValidos && mailInfo.valido)
      && ($('#newIngrediente').is(':focus') || !$('#newCantidadgr').is(':focus'))){
    e.preventDefault();
    alert("Por favor rellena todos los campos!");
    return false;
  }


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

//Busca una receta y actualiza en vivo usando ajax
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

/*==============================================================================
*===========================  INDEX ============================================
*==============================================================================*/
var RECETAS_PP = 12; //Numero máximo de recetas a mostrar por página
var index_recetas_pp = 0;
var num_recetas;

var cargarUltimas = function(){
  var limite = index_recetas_pp + RECETAS_PP;
  $.get('./datos.xml', function(data){
    var s_recetas = "";
    var xml_recetas = $($(data).find('recetas').find('receta').get().reverse());
    num_recetas = $(data).find("recetas").find('receta').length;
    xml_recetas.each(function(i) {
      if(i>=index_recetas_pp){
      s_recetas += "<a href='./receta.php?id=" + $(this).attr('id') + "' class='contenedor'>";
      s_recetas += "<img src='" + $(this).find('imagen').text() + "' height='200px' width='200px' alt=''>";
      s_recetas += "<div class='contenedor-up'>"+ $(this).find('titulo').text()+"</div></a>";
    }
    if(i>=index_recetas_pp + RECETAS_PP-1)
      return false;

    });
    $('#ultimas-recetas').html(s_recetas);
  });
};

cargarUltimas();

$('#prev').click(function(){
  if(index_recetas_pp>=RECETAS_PP){
    index_recetas_pp -= RECETAS_PP;
    cargarUltimas();
  }
});

$('#next').click(function(){
  index_recetas_pp += RECETAS_PP;
  cargarUltimas();
});


/*==============================================================================
*========================  SUGERENCIAS ============================================
*==============================================================================*/
$.get('./datos.xml', function(data){
  var xml_recetas = $(data).find('recetas').find('receta');
  var s_sugerencias = "";
  var first= Math.floor(Math.random() * ($(data).find("recetas").find('receta').length-4));
  var last = first+4;
  var index = 0;
  xml_recetas.each(function(){

    if(index>first){

      s_sugerencias += "<a href='./receta.php?id=" + $(this).attr('id') + "'><li>";
      s_sugerencias += "<img src='" + $(this).find('imagen').text() +"' alt='' height='150px' width='200px'/>";
      s_sugerencias += "</li></a>";
    }
    if(index>=last){
     return false;
    }
  index++;

  });
  $('#sugerencias').html(s_sugerencias);
});

/*==============================================================================
*========================  COMENTARIOS ============================================
*==============================================================================*/

$('#form-coment').on("submit", function(e){

  if($('#comentario-usuario').val().length === 0 || $('#comentario-text').val().length === 0){
    alert('Campos incorrectos');
    e.preventDefault();
    if($('#comentario-usuario').val().length === 0)
      addEstilo($('#comentario-usuario')[0], cssError);
    else
      addEstilo($('#comentario-usuario')[0], cssDefault);

    if($('#comentario-text').val().length === 0)
      addEstilo($('#comentario-text')[0], cssError);
    else
      addEstilo($('#comentario-text')[0], cssDefault);

    return false;
  }
});
})();//Fin
