google.load("visualization", "1", {packages:["corechart"]});
      google.setOnLoadCallback(drawChart);
      function drawChart() {
var  caja1= document.getElementById('caja1').value
        var data = google.visualization.arrayToDataTable([
          ['Platillos', 'Pedidos por dia'],
          ['Tortas', parseInt( caja1)],
          ['Gorditas', 1],
          ['Alitas',  2],
          ['Pizza', 2],
          ['Hamburguers', 7]
        ]);

        var options = {
          title: 'Mis Platillos pedidos por día.'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }