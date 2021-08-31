$(document).ready(function(){
  
  sessionToken = localStorage.getItem('sessionToken')
  
  $('#samcologout').on('click',function(){
    
    
      var headers = {
        'Accept':'application/json',
        'x-session-token': `${sessionToken}`

      };

      $.ajax({
        url: 'https://api.stocknote.com/logout',
        method: 'delete',

        headers: headers,
        success: function(data) {
          // console.log(JSON.stringify(data));
        },
        error : function(error){
          console.log(error);
        }
      }).done(function(data){
        
        let logoutmessage = document.getElementById('logoutmessage')
        
        logoutmessage.innerHTML =   `<div class="alert alert-success alert-dismissible fade show" role="alert"><center>
                           You have successfully been logged out.
                        </center><button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div> `
        
      
                                    
             setTimeout(function () {
                logout.innerHTML = "";
              },30000)                          
        
        
        
      })

    
    
    
    
    
    
  })
  
  
  
  
})