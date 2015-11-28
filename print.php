<?php

$recetas = simplexml_load_file("datos.xml");
if(isset($_POST["submit"])){
  $id = count($recetas->children()); //No sé por que me saca los id's de 6 en 6
  $titulo = isset($_POST['titulo'])?$_POST['titulo']:'Receta sin titulo';
  $descripcion = isset($_POST['descripcion'])?$_POST["descripcion"]:" ";
  $autor = isset($_POST['usuario'])?$_POST["usuario"]:"Anónimo";
  $mail = isset($_POST['mail'])?$_POST["mail"]:" ";
  $tiempo = isset($_POST['calorias'])?$_POST['calorias']: "-";
  $personas = isset($_POST['personas'])?$_POST['personas']:'1';
  $imagen = isset($_POST['img'])?$_POST['img']:'./images/default.png';
  $calorias = isset($_POST['calorias'])?$_POST['calorias']:" - ";
  $texto = $_POST['nueva-preparacion-pasos'];
  switch ($_POST['tipo']) {
    case 1:
      $tipo = 'Primero';
      break;
    case 2:
      $tipo = 'Segundo';
      break;
    case 3:
      $tipo = 'Postre';
      break;
    case 4:
      $tipo = 'Bebida';
      break;
  }
  $ingredientes = $_POST['ingrediente'];
  $receta = $recetas->addChild('receta');
  $receta->addAttribute('id', $id);
  $receta->addChild('titulo', $titulo);
  $receta->addChild('descripcion', $descripcion);
  $receta->addChild('autor', $autor);
  $receta->addChild('mail', $mail);
  $lista_ingredientes = $receta->addChild('Ingredientes');
  foreach($ingredientes as $val){
    $lista_ingredientes->addChild('ingrediente', $val);
  }
  $receta->addChild('tiempo', $tiempo);
  $receta->addChild('personas', $personas);
  $recetas->addChild('imagen', $imagen);
  $recetas->addChild('calorias', $calorias);
  $recetas->addChild('tipo', $tipo);
  $recetas->addChild('texto', $texto);
  $recetas->addChild('comentarios');
  $recetas->asXML('datos.xml');


  header("Location: ./receta.php?id=$id");
}
 ?>



<pre>
  <?php print_r($_POST); ?>
</pre>
