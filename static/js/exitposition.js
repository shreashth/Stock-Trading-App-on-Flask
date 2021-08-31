

function squareoff(squareoff_id) {
  
  let order_no = Number(squareoff_id.slice(9))
  
  console.log(order_no);
  console.log(position[order_no]);
  
      
  
        
        var headers = {
        'Content-Type':'application/json',
        'Accept':'application/json',
        'x-session-token': `${sessionToken}`

      };
      
  
          requestBody={
      "userId": "DS45765",        
      "positionSquareOffRequestList": [
        {
          
          "exchange":  `${position[order_no].exchange}`,
          "symbolName": `${position[order_no].tradingSymbol}`,
          "productType": `${position[order_no].productCode}`,
          "netQuantity": `${position[order_no].netQuantity}`,
          "transactionType": `${position[order_no].transactionType}`
        }
      ]
    }
      console.log(requestBody);  
        
      $.ajax({
        url: 'https://api.stocknote.com/position/squareOff',
        method: 'post',
        data: JSON.stringify(requestBody),
        headers: headers,
        success: function(data) {
          console.log(JSON.stringify(data));
        },
        error : function(error){
          console.log(error);
        }
      }).done(function(data) {

  let bookprofitmessage = document.getElementById('bookprofitmessage');
        
    bookprofitmessage.innerHTML += ` <div class="alert alert-success alert-dismissible fade show" role="alert"><center>
                                   Your order  for&nbsp; ${position[order_no].tradingSymbol}&nbsp; has successfully been squared Off.
                                </center><button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>`
                                
         setTimeout(function () {
            bookprofitmessage.innerHTML = "";
          },30000)                            

      }).catch(function () {
        
  let bookprofitmessage = document.getElementById('bookprofitmessage');
        
    bookprofitmessage.innerHTML += ` <div class="alert alert-danger alert-dismissible fade show" role="alert"><center>
                                   Your order  for&nbsp; ${position[order_no].tradingSymbol}&nbsp; could not been squared Off.
                                </center><button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>`
                                
         setTimeout(function () {
            bookprofitmessage.innerHTML = "";
          },30000)                            
        
      })

  
}








$('#exitallorder').on('click',exitallorder)

function exitallorder() {
  
  $('.squareOff').click();
  
}

$(document).ready(function(){


let profitmtm=0;
let mtmvalue;


function printprofitmtm(profitmtm) {
  document.getElementById('profitmtmhtml').innerHTML = 'Max Profit   : &nbsp; ' +  profitmtm;
}




profitmtm = Number(localStorage.getItem('Take_Profit'))
  // document.getElementById('profitmtmhtml').innerHTML = 'Max Profit   : &nbsp; ' +  profitmtm;
  printprofitmtm(profitmtm);

$('#profitvalue').on('keyup',function(input){
  
  if(input.keyCode === 13){
    
    profitmtm = Number($('#profitvalue').val())
    
    if(profitmtm/1 || profitmtm===0){
    
    document.getElementById('profitvalue').value = "";
    
    $.ajax({
            data : {
              Take_Profit: profitmtm,
            },
            type : 'POST',
            url : '/maxprofit'
          })
          .done(function(data) {

            console.log(data);
          

          })
    
    
    printprofitmtm(profitmtm);
  }
}
    
  
  
  // document.getElementById('profitmtmhtml').innerHTML = 'Max Profit   : &nbsp; ' +  profitmtm;


  
})








function bookprofit(){
   mtmvalue = Number($('#mtm').val());
  
 if((profitmtm <= mtmvalue) && profitmtm != 0){
   console.log('orderexecuted ')
  
  exitallorder();
  profitmtm = 0;
  // document.getElementById('profitmtmhtml').innerHTML = 'Max Profit   :  &nbsp; ' + profitmtm;
  printprofitmtm(profitmtm);

}

}


  
  
  
  


  setInterval(function(){
     console.log(profitmtm, mtmvalue);

  bookprofit();
},500)




})
