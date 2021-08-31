$(document).ready(function(){
// console.log('hello');  

  let sessionToken;
  
  $('#samcologin').on('submit', function(event) {
    
    localStorage.clear();
    event.preventDefault()
    console.log('loginformsubmitted');
  
    var headers = {
    'Content-Type':'application/json',
    'Accept':'application/json'
  
  };
  
  requestBody={
  "userId": $('#inputUserID').val(),
  "password": $('#inputPassword').val(),
  "yob": Number($('#inputYOB').val())
}

console.log(requestBody);
  
  $.ajax({
    url: 'https://api.stocknote.com/login',
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

      console.log(data);
    
      console.log(data.status);
      
    sessionToken = data.sessionToken;
    
    let loginmessage = document.getElementById('loginmessage');
          
      loginmessage.innerHTML += ` <div class="alert alert-success alert-dismissible fade show" role="alert"><center>
                                    You have successfully been logged in !
                                  </center><button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>`
                                  
    
    
    
  
    
    
    // setInterval(function(){
     localStorage.setItem('sessionToken',sessionToken);
   // },5000)  
      console.log(sessionToken);
      
      
      if(data.status === 'Success'){
        window.location = 'index.html';
        
      }

    }).catch(function(error){
      
      let loginmessage = document.getElementById('loginmessage');
            
        loginmessage.innerHTML += ` <div class="alert alert-danger alert-dismissible fade show" role="alert"><center>
                                      Sorry you could not been logged in. Try again! &emsp;&emsp;&emsp;&emsp; ${error.responseText}
                                    </center><button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                    </div>`
                                    
        
    })
  
  

    
    
})


})    