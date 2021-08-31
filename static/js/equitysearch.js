// $(document).ready(function(){


$('#symbol').on('keyup',function(input){

if( exchange.value === 'NSE' && input.keyCode === 13){
  
      var headers = {
      'Accept':'application/json',
      'x-session-token': `${sessionToken}`

    };

    $.ajax({
      url: `https://api.stocknote.com/quote/getQuote?symbolName=${symbol.value}`,
      method: 'get',

      headers: headers,
      success: function(data) {
        // console.log(JSON.stringify(data));
      },
      error : function(error){
        let message = document.getElementById('message');
              
          message.innerHTML += ` <div class="alert alert-danger alert-dismissible fade show" role="alert"><center>
                                        ${error.responseJSON.statusMessage}
                                      </center><button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                          <span aria-hidden="true">&times;</span>
                                        </button>
                                      </div>`
                                      
               setTimeout(function () {
                message.innerHTML = "";
              },15000)             
              
      }
    }).done(function (data) {
      
      console.log(data);
      console.log(data.lastTradedPrice);

    if(data.status === 'Success'){
        document.getElementById('symboldata').innerHTML = "";
      // for(let t=0; t<=50; t++){
      //   // console.log(option);
        document.getElementById('symboldata').innerHTML += `<li class="list-group-item link-class">${data.symbolName}</li>`;
        
        document.getElementById('mktprice').value = data.lastTradedPrice;
        data = data;
        
        $('#symboldata').on('click','li',function(data) {
          
          var click_text = $(this).text();
          // console.log(data);
          
          // $('#symbol').val(click_text)
          symbol.value = click_text;
            // document.getElementById('mktprice').value = data.lastTradedPrice;
          symboldata.innerHTML = ''
        
          
        })
      // 
      // }
    }
      if(data.status === 'Failure'){
        
        let message = document.getElementById('message');
              
          message.innerHTML += ` <div class="alert alert-danger alert-dismissible fade show" role="alert"><center>
                                        ${data.statusMessage}
                                      </center><button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                          <span aria-hidden="true">&times;</span>
                                        </button>
                                      </div>`
                                      
               setTimeout(function () {
                message.innerHTML = "";
              },15000)             
        
        
        
      }
  
  
  
  
  }).catch(function (error) {
      console.log(error);
      
      // $(`#symbol`).attr('data-live-search',false)
      // 
      // document.getElementById('symboldata').innerHTML = "";
      // 
      // document.getElementById('symboldata').innerHTML += `<option>No Script</option>`;
    
  })
}


})





// setInterval(function(){
//   console.clear();
// },60000)




// })