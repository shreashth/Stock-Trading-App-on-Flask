// Validate Values
let validatearray=[];

function validate(){
  if(exchange1.value.length>0){
    validatearray.push(orderblock1.id);  
  }
  if(exchange2.value.length > 0 ){
    validatearray.push(orderblock2.id);
  }
  if(exchange3.value.length > 0){
    validatearray.push(orderblock3.id);
  }
}
// console.log(validatearray);



// 
// class finalorders{
//   constructor(orderblock1,orderblock2,orderblock2){
//     this.order1 = orderblock1;
//     this.order2 = orderblock2;
//     this.order3 = orderblock3;
//   }
// }
let i=0,elementx,orderblock1object,orderblock2object, orderblock3object,orderblockobjectarray;

function orderblockobject(){

  orderblockobjectarray=[];
  orderblockobjectarray.splice(0)

  for(elementx of validatearray){
    // console.log(element);
    // console.log(typeof(element));
    
    if(elementx === 'orderblock1'){    

    orderblock1object =           {
                          "exchange": exchange1.value,
                          "symbolName": symbol1.value,
                          "transactionType": buysell1.value,
                          "quantity": quantity1.value,
                          "orderType": ordertype1.value,
                          "productType" : product1.value,
                          "price": price1.value,
                          "priceType": "LTP",
                          "orderValidity": "DAY",
                          "afterMarketOrderFlag": "NO",
                        
                           

                        };
            orderblockobjectarray.push(orderblock1object);
}
    else  if(elementx === 'orderblock2'){    

      orderblock2object =  {
                            "exchange": exchange2.value,
                            "symbolName": symbol2.value,
                            "transactionType": buysell2.value,
                            "quantity": quantity2.value,
                            "orderType": ordertype2.value,                        
                            "productType" : product2.value,
                            "price": price2.value,
                            "priceType": "LTP",
                            "orderValidity": "DAY",
                            "afterMarketOrderFlag": "NO",
                              

                          };
              orderblockobjectarray.push(orderblock2object);            
      }

else if(elementx === 'orderblock3'){    

   orderblock3object =     {
                            "exchange": exchange3.value,
                            "symbolName": symbol3.value,
                            "transactionType": buysell3.value,
                            "quantity": quantity3.value,
                            "orderType": ordertype3.value,
                            "productType" : product3.value,
                            "price": price3.value,
                            "priceType": "LTP",
                            "orderValidity": "DAY",
                            "afterMarketOrderFlag": "NO",
                               

                          };
              orderblockobjectarray.push(orderblock3object);
}
}
return orderblockobjectarray;
}


let order=[];

let orderForm= document.getElementById('orderForm');

orderForm.addEventListener('submit', placeorder);

function placeorder(e){
  e.preventDefault()
  do{
    i++;
    validatearray.splice(0)
    
  }while(false);
  
  validate()
  
  orderblockobjectarray = orderblockobject();
  
  // console.log(orderblockobjectarray);
  if(validatearray.length>0){

  
  order[i]=new punchorder(orderblockobjectarray,maxprofit);
  
  // console.log(order[i]);
  order[i].makeorder();

}

}