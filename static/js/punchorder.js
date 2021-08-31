let z;

$(document).ready(function(){

orderForm.addEventListener('submit', punchorder)




function punchorder() {

    console.log(orderblockobjectarray);
    
  
    
    for(orderrequest of orderblockobjectarray){
    
        var headers = {
          'Content-Type':'application/json',
          'Accept':'application/json',
          'x-session-token': `${sessionToken}`
    
        };
    
        $.ajax({
          url: 'https://api.stocknote.com/order/placeOrder',
          method: 'post',
          data: JSON.stringify(orderrequest),
          headers: headers,
          success: function(data) {
            console.log(JSON.stringify(data));
            console.log(data);
          },
          error : function(error){
            console.log(error);
          }
        }).done(function (data) {
        
          if(data.status === 'Success'){  
          
          let message = document.getElementById('message');
          
          message.innerHTML += ` <div class="alert alert-success alert-dismissible fade show" role="alert"><center>
                                     Your order  for&nbsp; ${data.orderDetails.tradingSymbol}&nbsp; has successfully been placed!
                                  </center><button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>`
                                  
           setTimeout(function () {
              message.innerHTML = "";
            },30000)                        
          }
          
          if(data.exchangeOrderStatus === 'REJECTED'){
            
            let message = document.getElementById('message');
            
            message.innerHTML += ` <div class="alert alert-danger alert-dismissible fade show" role="alert"><center>
                                      
                                    ${data.rejectionReason}  
                                    </center><button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                    </div>`
                                    
             setTimeout(function () {
                message.innerHTML = "";
              },30000)            
            
          }
          
          
          
          
          
          
          
          
          
          
        }).catch(function (error) {
          console.log(error.responseText);
          
          let message = document.getElementById('message');
          
          message.innerHTML += ` <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                     Your order for &nbsp;${orderrequest.symbolName}&nbsp; could not be placed! 
                                     <span style="margin-left:100px"> ${error.responseText}</span>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>`
                                  
          setTimeout(function () {
            message.innerHTML = "";
          },30000)                        
          
    
     })
    }
    
    
    
    
    
    
    
    
    
    
    
  
  }



  
})