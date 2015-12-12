function clicklogo() {

    var menu = document.getElementById("imgm");
    var pedidos = document.getElementById("imgp");
    var promo = document.getElementById("imgpr");
    var visita = document.getElementById("imgv");
    
  
    menu.className = "col-xs-4 animated bounceIn retraso-2";
    pedidos.className = "col-xs-4 col-xs-offset-4 animated bounceIn retraso-2";
    promo.className = "col-xs-4 animated bounceIn retraso-2";
    visita.className = "col-xs-4 col-xs-offset-4 animated bounceIn retraso-2";
    
    menu.style.display = "block";
    pedidos.style.display = "block";
    promo.style.display = "block";
    visita.style.display = "block";
}