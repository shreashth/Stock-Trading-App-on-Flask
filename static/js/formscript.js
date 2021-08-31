
function  baseorderblockreset(){
  // $(document).ready(function(){
    // $("#add").click(function () {
          // $("#baseorderblock").replaceWith(function () {
          //   console.log(baseorderblockdata[0]);
          //   return baseorderblockdata[0];
          // });
          // baseorderblock.innerHTML = baseorderblockdata;
          
      // location.reload();
      // console.log('hi');
    // });
  // });
}



let add = document.getElementById('add');

let baseorderblock = document.getElementById('baseorderblock');

let orderblock1 = document.getElementById('orderblock1');

let orderblock2 = document.getElementById('orderblock2');

let orderblock3 = document.getElementById('orderblock3');



let  baseorderblockdata, orderblock1data ,orderblock2data , orderblock3data ;




do {
     baseorderblockdata  = baseorderblock.innerHTML;   
     orderblock1data     = orderblock1.innerHTML;     
     orderblock2data     = orderblock2.innerHTML;     
     orderblock3data     = orderblock3.innerHTML;
     

} while (false);




function addproduct() {
  
if(exchange1.value.length === 0){
exchange1.value = exchange.value;
 symbol1.value = symbol.value ;
 price1.value = mktprice.value;
 

}else if (exchange2.value.length === 0) {
  exchange2.value = exchange.value;
   symbol2.value = symbol.value ;
   price2.value = mktprice.value;

}else if (exchange3.value.length === 0) {
  exchange3.value = exchange.value;
   symbol3.value = symbol.value ;
   price3.value = mktprice.value;

}
baseorderblockreset();

}




function clearorderblock(id){
  
  if(id === trash1){
    orderblock1.innerHTML = orderblock1data;
    
  }else if (id === trash2) {
    orderblock2.innerHTML = orderblock2data;
    
  }else if (id === trash3) {
    orderblock3.innerHTML = orderblock3data;
    
  }
}

function resetallorderblock(){
  orderblock1.innerHTML = orderblock1data;
  orderblock2.innerHTML = orderblock2data;
  orderblock3.innerHTML = orderblock3data;
  maxprofit.value = "";
  maxloss.value = "";
  profitpercentage.value = "";
}






