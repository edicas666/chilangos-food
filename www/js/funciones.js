//Panel de control del usuario
var oculto = true;
function btnpanel(){
    var panel = document.getElementById("panelMaster");
    if(oculto){
        animacionpanel(0);
        document.getElementById("btnPanel").textContent = "<<";
        oculto = false;
    }else{
        animacionpanelr(120);
        document.getElementById("btnPanel").textContent = ">>";
        oculto = true;
    }
}

function animacionpanel(cont){
    if(cont<120){
        cont++;
        var panel = document.getElementById("panelMaster");
        panel.style.marginLeft = cont+"px";
        setTimeout(animacionpanel,5,cont);
    }
}

function animacionpanelr(cont){
    if(cont>0){
        cont--;
        var panel = document.getElementById("panelMaster");
        panel.style.marginLeft = cont+"px";
        setTimeout(animacionpanelr,5,cont);
    }
}
//Animación de vista principal
function clicklogo() {

    var menu = document.getElementById("imgm");
    var pedidos = document.getElementById("imgp");
    var promo = document.getElementById("imgpr");
    var visita = document.getElementById("imgv");
    
  
    menu.className = "col-xs-5 animated bounceIn retraso-2";
    pedidos.className = "col-xs-5 col-xs-offset-2 animated bounceIn retraso-2";
    promo.className = "col-xs-6 animated bounceIn retraso-2";
    visita.className = "col-xs-5 col-xs-offset-1 animated bounceIn retraso-2";
    
    menu.style.display = "block";
    pedidos.style.display = "block";
    promo.style.display = "block";
    visita.style.display = "block";
}

//Base de Datos
var conexion;

function inicializar(e){
        conexion = openDatabase('comida','1.0','Chilangos_Food',2*1024*1024);//2*1024*1024 = 2MB
        crearTablas();
        insertarProductos(1, "Hamburguesa", "../img/hamburguesa.png","Hamburguesa de arrachera", 25.00);
        insertarProductos(2, "Torta", "../img/torta.png","Torta de Queso, jamon y chorizo", 30.00);
        insertarProductos(3, "Alitas", "../img/alitas.png","Alitas adobadas con picante", 20.00);
        insertarProductos(4, "Costillitas", "../img/costillitas.png","Costillitas a la BBQ con picante", 40.00);
        insertarProductos(5, "Gordita", "../img/gordita.png","Gordita especial rellena de carnitas", 15.00);
}

function crearTablas(){
        conexion.transaction(
            function(bd){
                bd.executeSql(
                    "create table if not exists productos("+
                    "id_producto text primary key,"+
                    "nombre text,"+
                    "url_img,"+
                    "descripcion text,"+
                    "precio double)"
                );
            }
        );
        
        conexion.transaction(
            function(bd){
                bd.executeSql(
                    "create table if not exists ventas("+
                    "id_ventas text primary key,"+
                    "folio_pedido text,"+
                    "id_producto text,"+
                    "total double,"+
                    "fecha_venta txt)"
                );
            }
        );
        
        conexion.transaction(
            function(bd){
                bd.executeSql(
                    "create table if not exists usuarios("+
                    "id_usuario text primary key,"+
                    "password text,"+
                    "email text,"+
                    "fecha_registro text)"
                );
            }
        );
}

function insertarProductos(id,nombre,url,desc,precio){
        conexion.transaction(
            function(bd){
                bd.executeSql("insert into productos values(?,?,?,?,?)",[id,nombre,url,desc,precio],ok,error);
            }
        );
}

function ok(){
    //alert("La operación se ah realizado correctamente");
}

function error(){
    //alert("Ah ocurrido un error en la operación");
}

function consultarProductos(){
    conexion = openDatabase('comida','1.0','Chilangos_Food',2*1024*1024);
    conexion.transaction(
        function(bd){
            bd.executeSql(
                "select * from productos",[],
                function(bd,res){
                    var html = "";
                    var tam = res.rows.length;
                    for(var i=0;i<tam;i++){
                        html+="<!--Comienza-->"+
              "<div class='row' style='box-shadow: 0px 0px 10px black; width:100%; margin:0 auto; margin-top: 10px;"+ "margin-bottom: 10px;'>"+
                   "<input type='hidden' name='id_producto' value='"+res.rows.item(i).id_producto+"'>"+
                   "<h3 id='nombreP' style='margin-left:10px; margin-top:5px;'>"+res.rows.item(i).nombre+"</h3>"+
                   "<img src='"+res.rows.item(i).url_img+"' class='col-xs-5' width=100 height=100>"+
                   "<div class='col-xs-6'>"+
                       "<p>Precio: <span id='precioP'>"+res.rows.item(i).precio+"</span></p>"+
                       "<p id='descP' style='font-family: cursive;'>"+res.rows.item(i).descripcion+"</p>"+
                   "</div>"+
                   "<h4 class='col-xs-4'>Cantidad:</h4>"+
                   "<input name='cantidad_producto' required pattern='[0-9]{1}' maxlength='2' placeholder='5' type='tel' class='col-xs-2'"+ "style='margin-top:7px' value='0' required>"+
               "</div>"+
               "<hr>"+
               "<!--Termina-->";
                    }
                    
                    var con = document.getElementById("contenedorProductos");
                    con.innerHTML = "";
                    con.innerHTML = html;
                });
        });
}

function enviar_a_pedidos(id){
    if(escogioProducto()){
        var id = document.getElementsByName('id_producto');
        var cant = document.getElementsByName('cantidad_producto');
        var cadena ="";
         for(var i = 0; i<id.length;i++){
             for(var j = 0;j<parseInt(cant[i].value);j++){
                cadena += id[i].value.charAt(0)+"-";
             }
         }
        window.location = "../html/pedidos.html?x="+cadena.slice(0,cadena.length-1)+",";
    }else{
        alert('No has elegido nada');
    }
}

function escogioProducto(){
    var elementos = document.getElementsByName('cantidad_producto');
    for(var i = 0;i<elementos.length;i++){
        if(elementos[i].value != 0) return true;
    }
    return false;
}

function modificarUsuario(){
        var conexion = openDatabase('comida','1.0','Chilangos_Food',2*1024*1024);
        var found = false;
        conexion.transaction(
            function(bd){
                var idn2 = document.getElementById("nomIniN").value;
                bd.executeSql("Select * From usuarios where id_usuario = ?",
                    [idn2],
                    function(bd,res){
                        var tam = res.rows.length;
                        if(tam>0){
                            found = true;
                            alert('Ese nombre ya existe');
                        }
                    }
                );
            }
        );

        if(confirm("seguro?") && found==false){
            conexion.transaction(
                function(bd){
                    var id = document.getElementById("nomIni").value;
                    var pass = document.getElementById('contraIni').value;
                    var idn = document.getElementById("nomIniN").value;
                    var passn = document.getElementById('contraIniN').value;
                    var emailn = document.getElementById('emailIniN').value;
                    bd.executeSql(
                        "UPDATE usuarios SET id_usuario = ?, password = ?, email = ? WHERE id_usuario = ? and password = ?",[idn,passn,emailn,id,pass],ok,error);
                }
            );
        }
    location.reload();
}

function eliminarUsuario(id){
    var conexion = openDatabase('comida','1.0','Chilangos_Food',2*1024*1024);//2*1024*1024 = 2MB
    if(confirm("Seguro?")){
        conexion.transaction(
            function(bd){
                var idEl = document.getElementById("nomEli").value;
                var passEli = document.getElementById('contraEli').value;
                bd.executeSql("delete from usuarios where id_usuario = ? and password = ?",
                [idEl, passEli], function(){alert('Baja completa');}, function(){alert('Ah ocurrido un error');}
                );
                setTimeout(function(){window.location = "index.html";}, 500);
            }
        );
    }
}

//Crearcion de venta
function crearVenta(){
    conexion.transaction(
        function(bd){
            bd.executeSql("insert into ventas values(?,?,?,?,?)",["05","001","1.0",25.0,"25/12/2015"],function(){alert("yes")},function(){alert("no")});
        }
    );
}