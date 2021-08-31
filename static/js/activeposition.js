 position;


$(document).ready(function(){

  
  
  
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
        document.getElementById('positionretrievemessage').innerHTML = error.responseJSON.statusMessage;
    }
  }).done(function(data) {
  
    position = data.positionDetails;
    console.log(data);    
    document.getElementById('positionretrievemessage').innerHTML = data.statusMessage;
    console.log(data.positionDetails);
    document.getElementById('activehtml').innerHTML = "";
    
    let totalmtm = 0;
    let totalcapitalemployed = 0;
    let totalquantityavailable = 0;
    let profitandloss = 0;
    let l = 1;
    totalmtm = Number(totalmtm)
    
    for(let k=0; k<data.positionDetails.length; k++){
      
      if(Number(data.positionDetails[k].netQuantity) != 0){
        
        
      
       profitandloss = (data.positionDetails[k].lastTradedPrice - data.positionDetails[k].averagePrice)*(data.positionDetails[k].netQuantity)
      // console.log(data.positionDetails[k]);
      
      profitandloss = Number(profitandloss.toFixed(2))
      
      let  activeorder =      `
                            <tr>
                            <td>${l}</td>
                            <td>${data.positionDetails[k].exchange}</td>      
                            <td>${data.positionDetails[k].tradingSymbol}</td>      
                            <td>${data.positionDetails[k].transactionType}</td>      
                            <td>${data.positionDetails[k].productCode}</td>      
                            <td>${data.positionDetails[k].averageBuyPrice}</td>      
                            <td>${data.positionDetails[k].averageSellPrice}</td>      
                            <td>&emsp;${data.positionDetails[k].netQuantity}</td>   
                            <td>${data.positionDetails[k].expiryDate}</td> 
                            <td>${data.positionDetails[k].lastTradedPrice}</td>   
                            <td>${profitandloss}</td>
                             <td><button class="btn btn-dark btn-msf my--1 btn-sm squareOff" onclick=squareoff(this.id) id="squareoff${k}" >Square Off</button></td>
                            </tr>
                            <br>
                            `

                          
        
           l=l+1;
                  
           totalmtm += profitandloss;
           
           totalcapitalemployed += Number((data.positionDetails[k].averageBuyPrice)*(data.positionDetails[k].netQuantity))
           
           totalquantityavailable += Number(data.positionDetails[k].netQuantity)
           
           
           document.getElementById('activehtml').innerHTML += activeorder      
          
        }        
                                       
                                                 
    }  
      document.getElementById('mtm').value = totalmtm; 
      
      document.getElementById('netpositionsummary').innerHTML = 
      
      '&emsp;&emsp;&emsp;&emsp;&emsp;Net Capital Employed : ' + totalcapitalemployed + 
      
      '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Net Quantity Left in Position : ' + totalquantityavailable;
      
      

      
      
    
  })
  
  
},1500)
  
  
  

// setInterval(function(){
//   console.clear();
// },60000)

  
  
  
  
  })
  

  
