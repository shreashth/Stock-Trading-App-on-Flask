let  sessionToken;

$(document).ready(function(){




setInterval(function(){    
   sessionToken = localStorage.getItem('sessionToken')
    // console.log(sessionToken);
    document.getElementById('sessionTokenhtml').innerText = 'Session Token is : '+sessionToken;
    
},5000)








})