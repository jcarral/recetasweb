(function(){
console.log("uy");
var menuIcon = $('#menuimg');
var menuImg = function(){
  menuIcon.attr('src', "./images/" + this.id + ".png");
};
  $('#home').hover(menuImg);
  $('#add').hover(menuImg);
  $('#aleatorio').hover(menuImg);
  $('#busqavz').hover(menuImg);

$('#menu').each(function(){
  $(this).mouseleave(function(){
    menuIcon.attr('src', './images/menuicon.png');
  });
});
})();
