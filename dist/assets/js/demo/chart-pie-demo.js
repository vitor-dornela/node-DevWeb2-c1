Chart.defaults.global.defaultFontFamily="Nunito",Chart.defaults.global.defaultFontColor="#858796";var ctx=document.getElementById("myPieChart"),myPieChart=new Chart(ctx,{type:"doughnut",data:{labels:["Direct","Referral","Social"],datasets:[{data:[55,30,15],backgroundColor:["#4e73df","#1cc88a","#36b9cc"],hoverBackgroundColor:["#2e59d9","#17a673","#2c9faf"],hoverBorderColor:"rgba(234, 236, 244, 1)"}]},options:{maintainAspectRatio:!1,tooltips:{backgroundColor:"rgb(255,255,255)",bodyFontColor:"#858796",borderColor:"#dddfeb",borderWidth:1,xPadding:15,yPadding:15,displayColors:!1,caretPadding:10},legend:{display:!1},cutoutPercentage:80}});