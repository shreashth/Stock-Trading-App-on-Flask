$(document).ready(function(){
  
let  sessionToken;
  
  setInterval(function(){    
     sessionToken = localStorage.getItem('sessionToken')
  
        // document.getElementById('profilesessionTokenhtml').innerText = 'Session Token is : '+sessionToken;
  },5000)
  

  
  
  
  
 setInterval(function getlimit(){  
    
  
  var headers = {
  'Accept':'application/json',
  'x-session-token': `${sessionToken}`

};

$.ajax({
  url: 'https://api.stocknote.com/limit/getLimits',
  method: 'get',

  headers: headers,
  success: function(data) {
    // console.log(JSON.stringify(data));
  },
  error : function(error){
    // console.log(error);
  }
}).done(function (data) {
  
  // console.log(data);
  
  // console.log(data.equityLimit);
  
  let h = data.equityLimit;
  
  let Equity_Gross_Available_Margin= h.grossAvailableMargin;
  
  let Equity_Margin_used= h.marginUsed;
  
  let Equity_Net_Available_Margin= h.netAvailableMargin;

 let Equity_Pay_In_Today = h.payInToday;
 
 let EquityMargintable = 
 
 `
  <td>Gross Available Margin :  ${Equity_Gross_Available_Margin} </td>
  <td>Margin Used :  ${Equity_Margin_used} </td>
  <td>Net Available Margin :  ${Equity_Net_Available_Margin} </td>
  <td>Pay In Today :  ${Equity_Pay_In_Today} </td>
 
 `
  
  document.getElementById('equitymargin').innerHTML = EquityMargintable
  
  document.getElementById('profilesessionTokenhtml').innerHTML = data.statusMessage;
  
}).catch(function(error){
  document.getElementById('profilesessionTokenhtml').innerHTML =error.responseJSON.statusMessage;
})


},5000)  
  


//   setInterval(function () {
// 
//   console.clear()  
// },60000)
  

  
})