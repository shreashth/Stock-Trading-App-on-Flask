position;


$(document).ready(function(){

 console.log('hello closed position');
 
 
 setInterval(function(){   
   
   var headers = {
   'Accept':'application/json',
   'x-session-token': `${sessionToken}`
 
 };
 
 $.ajax({
   url: 'https://api.stocknote.com/position/getPositions?positionType=NET',
   method: 'get',
 
   headers: headers,
   success: function(data) {
     // console.log(JSON.stringify(data));
   },
   error : function(error){
     // console.log(error);
     // console.log(error.status);
       document.getElementById('closedpositionretrievemessage').innerHTML = error.responseJSON.statusMessage;
   }
 }).done(function(data) {
 
   position = data.positionDetails;
   console.log(data);    
   document.getElementById('closedpositionretrievemessage').innerHTML = data.statusMessage;
   console.log(data.positionDetails);
   document.getElementById('closedhtml').innerHTML = "";
   let p = 1;
   
   for(let k=0; k<data.positionDetails.length; k++){
     
     if(Number(data.positionDetails[k].netQuantity) == 0){
       
       
     
    
     
     let  closedorder =      `
                           <tr>
                           <td>${p}</td>
                           <td>${data.positionDetails[k].exchange}</td>      
                           <td>${data.positionDetails[k].tradingSymbol}</td>      
                           <td>${data.positionDetails[k].transactionType}</td>      
                           <td>${data.positionDetails[k].productCode}</td>      
                           <td>${data.positionDetails[k].averageBuyPrice}</td>      
                           <td>${data.positionDetails[k].averageSellPrice}</td>      
                           <td>&emsp;${data.positionDetails[k].netQuantity}</td>   
                           <td>${data.positionDetails[k].expiryDate}</td> 
                           <td>${data.positionDetails[k].lastTradedPrice}</td>   
                           <td>${data.positionDetails[k].netPositionValue}</td>
                            <td><button class="btn btn-dark btn-msf my--1 btn-sm squareOff" onclick=squareoff(this.id) id="squareoff${k}" >Square Off</button></td>
                           </tr>
                           <br>
                           `

                         
       
      
          p += 1;
          
          document.getElementById('closedhtml').innerHTML += closedorder      
         
       }        
                                      
                                                
   }  
    
     
     
   
 })
 
 
},1500)
 
 
 

// setInterval(function(){
//   console.clear();
// },60000)

 
 
 
 
 })
 

 
