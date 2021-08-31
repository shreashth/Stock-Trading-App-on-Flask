


$(document).ready(function(){
  
  
  for(let j=1; j<4; j++){
  $(`#ordertype${j}`).on('change',function(){
    
    var selectedOrdertype = $(`#ordertype${j}`+' option:selected')
    
    if(selectedOrdertype.text()==='Market'){
      
      $(`#price${j}`).value = '';
      $(`#price${j}`).attr('disabled',true)
    }else {
      $(`#price${j}`).attr('disabled',false)
    }
  })}



  
  document.getElementById('exchange').addEventListener('click',function(){
  
    
    var selectedExchangetype = $(`#exchange`+' option:selected')
    
    if(selectedExchangetype.text()==='NSE'){
      // console.log('hello3');
    symboldata.innerHTML = ''
      $(`#index`).attr('disabled',true)
      $(`#expiry`).attr('disabled',true)
      $(`#optiontype`).attr('disabled',true)
      $(`#strikeprice`).attr('disabled',true)
    }else {
      $(`#index`).attr('disabled',false)
      $(`#expiry`).attr('disabled',false)
      $(`#optiontype`).attr('disabled',false)
      $(`#strikeprice`).attr('disabled',false)
    }
  })




















  
  $('#orderForm').on('submit', function(event) {

    let zero = JSON.stringify(orderblockobjectarray)  

      $.ajax({
              data : {
                order :  zero ,
                Max_Profit: $('#maxprofit').val(),
                Max_Loss : $('#maxloss').val(),
                Profit_Percentage:$('#profitpercentage').val()  
              },
              type : 'POST',
              url : '/addorder'
            })
            .done(function(data) {

      				console.log(data);
              data1 = JSON.parse(data)
              console.log(data1);

            })

            console.log(maxprofit.value);
              resetallorderblock()  


})
})


