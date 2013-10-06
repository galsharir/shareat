$(document).ready(function(){
  initSelectTime();
  $("#addSliceBtn").click(addSlice);
  $("#openCategoryPizza").click(function(){
    $("#categoryPizza").show();
  });
  $("#openCategoryChinese, #openCategoryMexican").click(function(){
    $("#categoryPizza").hide();
  });
});

function initSelectTime(){
  $("#addGroupTime").html("");
  var currentDate = new Date();
  var h = currentDate.getHours();
  var m = currentDate.getMinutes();
  if(m > 45){
    h++;
    m = 0;
  }
  else if(m > 30){
    m = 45;
  }
  else if(m > 15){
    m = 30;
  }
  else{
    m = 15;
  }
  for(var i=0; i<100; i++){
    $("#addGroupTime").append("<option>" + h + ":" + (m == 0 ? "00" : m) + "</option>");
    m += 15;
    if(m == 60){
      h++;
      if(h == 25){
        h = 1;
      }
      m = 0;
    }
  }
}

var toppings = new Array("Olives", "Peppers", "Peperoni", "Cheese");
function addSlice(){
  var amount = $("#sliceAmount").val();
  var binVec = new Array();
  var data = "";
  for(var i=0; i<toppings.length; i++){
    binVec[i] = $("#topping" + toppings[i]).is(":checked");
    data += binVec[i] ? "1" : "0";
  }
  var toppingsStr = "";
  var first = true;
  var useAnd = false;
  for(var i=binVec.length-1; i>=0; i--){
    if(binVec[i]){
      if(useAnd){
        toppingsStr = " and " + toppingsStr;
        useAnd = false;
      }
      else if(first){
        first = false;
        useAnd = true;
      }
      else{
        toppingsStr = ", " + toppingsStr;
      }
      toppingsStr = "<b>" + toppings[i] + "</b>" + toppingsStr;
    }
  }
  var n = $("#slices li").size();
  var rand = Math.random();
  if(first){
    alert("You must select at least one toping. ");
    return;
  }
  $("#slices").append("<li data='" + amount + "-" + data + "' randId='" + rand + "'><b>" + amount + "</b> slices with " + toppingsStr + " <a onclick='deleteOrder(" + rand + ")'>Cancel this order</a></li>");
  genPrev();
}

function deleteOrder(r){
  $("#slices li").filter(function(){
    return $(this).attr("randId") == r;
  }).remove();
  genPrev();
}

function genPrev(){
  var ht = "<div class='plate'>";
  var c = 0;
  
  $("#slices li").each(function(){
    var n = $(this).attr("data").split("-")[0];
    var bitVec = $(this).attr("data").split("-")[1];
    for(var i=0; i<n; i++){
      ht += "<div class='slice' style='background:url(./img/slice.png); -webkit-transform:rotate(" + (45*c) + "deg);'></div>";
      if(bitVec.charAt(1) == "1")
        ht += "<div class='slice' style='background:url(./img/peppers.png); -webkit-transform:rotate(" + (45*c) + "deg);'></div>";
      if(bitVec.charAt(2) == "1")
        ht += "<div class='slice' style='background:url(./img/peperoni.png); -webkit-transform:rotate(" + (45*c) + "deg);'></div>";
      if(bitVec.charAt(0) == "1")
        ht += "<div class='slice' style='background:url(./img/olives.png); -webkit-transform:rotate(" + (45*c) + "deg);'></div>";
      if(bitVec.charAt(3) == "1")
        ht += "<div class='slice' style='background:url(./img/cheese.png); -webkit-transform:rotate(" + (45*c) + "deg);'></div>";
      c++;
      if(c == 8){
        c = 0;
        ht += "</div>";
        ht += "<div class='plate'>";
      }
    }
  });
  
  ht += "</div>";
  $("#slicesPrev").html(ht);
}


$("#gfdjhsgfs").html("")
