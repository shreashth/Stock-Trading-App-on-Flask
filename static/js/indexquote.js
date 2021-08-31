$(document).ready(function(){
  sessionToken = localStorage.getItem('sessionToken')
  
  // BANKNIFTY QUOTE
  setInterval(function(){
    // console.log(sessionToken);
    var headers = {
    'Accept':'application/json',
    'x-session-token':`${sessionToken}`

  };

  $.ajax({
    url: 'https://api.stocknote.com/quote/indexQuote?indexName=nifty bank',
    method: 'get',

    headers: headers,
    success: function(data) {
      // console.log(data);
      // console.log(JSON.stringify(data));
    },
    error : function(error){
      // console.log(error);
    }

}).done(function(data){
  // console.log(data);
  // console.log(data.closeValue);
  let netchange = Math.floor(data.spotPrice - data.closeValue);
  
  let percentagechange = (netchange/data.closeValue*100).toFixed(2)+'%';
  
  document.getElementById('bankniftyquote').innerText= data.spotPrice + " | "+ netchange + " | " + percentagechange;
  
  if(netchange>0){
    document.getElementById('bankniftyquote').style.color = 'limegreen';
  }
  else if (netchange<0) {
    document.getElementById('bankniftyquote').style.color = 'red';
    
  }

})

},1500)

  
  
  
  
// NIFTY QUOTE
setInterval(function(){
  // console.log(sessionToken);
  var headers = {
  'Accept':'application/json',
  'x-session-token':`${sessionToken}`

};

$.ajax({
  url: 'https://api.stocknote.com/quote/indexQuote?indexName=nifty 50',
  method: 'get',

  headers: headers,
  success: function(data) {
    // console.log(data);
    // console.log(JSON.stringify(data));
  },
  error : function(error){
    // console.log(error);
  }

}).done(function(data){
// console.log(data);
// console.log(data.spotPrice);
let netchange = Math.floor(data.spotPrice - data.closeValue);

let percentagechange = (netchange/data.closeValue*100).toFixed(2)+'%';

document.getElementById('niftyquote').innerText= data.spotPrice + " | "+ netchange + " | " + percentagechange ;

if(netchange>0){
  document.getElementById('niftyquote').style.color = 'limegreen';
}
else if (netchange<0) {
  document.getElementById('niftyquote').style.color = 'red';
  
}




})

},2000)  
  
  
  
  
  
})
