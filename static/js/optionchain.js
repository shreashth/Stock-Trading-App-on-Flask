

$(document).ready(function(){


$('#symbol').on('keyup',function(input){

if((index.value ==='OPTIDX' || index.value === 'FUTIDX') && exchange.value === 'NFO' && input.keyCode === 13){
  
      var headers = {
      'Accept':'application/json',
      'x-session-token': `${sessionToken}`

    };

    $.ajax({
      url: `https://api.stocknote.com/option/optionChain?searchSymbolName=${symbol.value}`,
      method: 'get',

      headers: headers,
      success: function(data) {
        // console.log(JSON.stringify(data));
      },
      error : function(error){
        console.log(error);
        
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
      
      let message = document.getElementById('message');
            
        message.innerHTML += ` <div class="alert alert-success alert-dismissible fade show" role="alert"><center>
                                      ${data.statusMessage}
                                    </center><button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                    </div>`
                                    
             setTimeout(function () {
              message.innerHTML = "";
            },15000)             
      
      console.log(data);

    if(data.status === 'Success'){

    
      $.ajax({
              data : {
                Optionchain : JSON.stringify(data.optionChainDetails),
              },
              type : 'POST',
              url : '/addoptionchain'
            })
            .done(function() {
              
              
              
              let optionchainarray ;  
                      
              function optiondetails(symbol,expiry,strikeprice, optiontype){
                
                // console.log(optionchainarray);
                
                // console.log(symbol,expiry,strikeprice,optiontype);
                      
              // console.log(option);
              // let optiontradingsymbol = option;
              for(optiondata of optionchainarray){
                // console.log(optiondata);
                
                if( optiondata.expiryDate === expiry && optiondata.strikePrice === strikeprice && optiondata.optionType === optiontype){
                  
                  // console.log(optiondata);
                  document.getElementById('symbol').value = optiondata.tradingSymbol
                  document.getElementById('mktprice').value = optiondata.lastTradedPrice
                  
                  // console.log(optiondata.tradingSymbol)
                  // console.log(optiondata.lastTradedPrice);
                  
                  
                }
                
                
                
              }
              
              
              
              
              
              
              
              
              //   for(optiondata of optionchainarray){
              // 
              //     if(optiondata.tradingSymbol === `${optiontradingsymbol}`){
              // 
              //     // console.log(optiondata);  
              //     document.getElementById('expiry').value = optiondata.expiryDate
              //     document.getElementById('optiontype').value = optiondata.optionType
              //     document.getElementById('strikeprice').value = Math.floor(optiondata.strikePrice)
              //     document.getElementById('mktprice').value = Math.floor(optiondata.lastTradedPrice);
              //     }
                // }
              }
          
              const search = document.getElementById('symbol')
              
              const searchSymbol = async searchText => {

                console.log(search.value);
                
                const res = await fetch('/static/jsondata/optionchain.json');
                // 
                 const optionchain = await res.json();
                 
                 optionchainarray = optionchain;
                 
                 // console.log(optionchainarray);
                
                let option = optionchain.filter(options => {
              
                  const regex = new RegExp(`^${searchText}`,'gi');    
                  return options.underLyingSymbol.match(regex)
                      
                })
                
                
                if(searchText.length === 0){
                  option = [];  
                  let symboldata = document.getElementById('symboldata'); 
                  symboldata.innerHTML = ''  
                }
              
                 outputHTML(option); 
                // console.log(option);
              }  
              
              const outputHTML = option => {
                if(option.length > 0){
                    
                  const html = option.map(match =>
                    `<li class="list-group-item link-class">${match.underLyingSymbol}</li>`
                          
                  ).join('\n');
              
                  // console.log(html);
                  symboldata.innerHTML = html;
                }
              }
              
              
              $('#symboldata').on('click','li',function() {
                
                var click_text = $(this).text();
                
                // $('#symbol').val(click_text)
                symbol.value = click_text;
                symboldata.innerHTML = ''
              
                // optiondetails(click_text)
                
              })
              
                
          search.addEventListener('input',() => searchSymbol(search.value))
              // search.addEventListener('keyup',() => searchSymbol(search.value))
            
                
        
        
        
        
        
                
          const expirysearch = document.getElementById('expiry')
          
          expirysearch.addEventListener('input',() => searchExpiry(expiry.value))
          
          const searchExpiry = async expirysearchtext =>{
            
            let expiryoption = optionchainarray.filter(options => {
          
              const regex = new RegExp(`^${expirysearchtext}`,'gi');    
              return options.expiryDate.match(regex)
                  
            })
            
            if(expirysearchtext.length === 0){
              expiryoption = [];  
              let expirydata = document.getElementById('expirydata'); 
              expirydata.innerHTML = ''  
            }
          
             outputexpiryHTML(expiryoption); 
            // console.log(option);
          }
            
          const outputexpiryHTML = expiryoption => {
            
            if(expiryoption.length > 0){
                
              const expiryhtml = expiryoption.map(match =>
                `<li class="list-group-item link-class">${match.expiryDate}</li>`
                      
              ).join('\n');
          
              // console.log(html);
              expirydata.innerHTML = expiryhtml;
            }
          }
               
          $('#expirydata').on('click','li',function() {
            
            var click_text = $(this).text();
            
            // $('#symbol').val(click_text)
            expiry.value = click_text;
            
            optiondetails(symbol.value, expiry.value, strikeprice.value, optiontype.value)
            
            expirydata.innerHTML = ''
          
            // optiondetails(click_text)
          
            
          })      
          
          
          
          
          
                
                
          const strikepricesearch = document.getElementById('strikeprice')
          
          strikepricesearch.addEventListener('input',() => searchStrikePrice(strikeprice.value))
          
          const searchStrikePrice = async strikepricesearchtext =>{
            
            let strikepriceoption = optionchainarray.filter(options => {
          
              const regex = new RegExp(`^${strikepricesearchtext}`,'gi');    
              return options.strikePrice.match(regex)
                  
            })
            
            if(strikepricesearchtext.length === 0){
                strikepriceoption = [];  
              let strikepricedata = document.getElementById('strikepricedata'); 
              strikepricedata.innerHTML = ''  
            }
          
             outputstrikepriceHTML(strikepriceoption); 
            // console.log(option);
          }
            
          const outputstrikepriceHTML = strikepriceoption => {
            if(strikepriceoption.length > 0){
                
              const strikepricehtml = strikepriceoption.map(match =>
                `<li class="list-group-item link-class">${match.strikePrice}</li>`
                      
              ).join('\n');
          
              // console.log(html);
              strikepricedata.innerHTML = strikepricehtml;
            }
          }
               
          $('#strikepricedata').on('click','li',function() {
            
            var click_text = $(this).text();
            
            // $('#symbol').val(click_text)
            strikeprice.value = click_text;
            
            optiondetails(symbol.value, expiry.value, strikeprice.value, optiontype.value)
              
              
            strikepricedata.innerHTML = ''
          
            // optiondetails(click_text)
          
            
          })  
          
          $('#optiontype').on('click',function(){
            
              optiondetails(symbol.value, expiry.value, strikeprice.value, optiontype.value)
          })          
                
                     
  
                     
              
              
            })

    }})
}


})





// setInterval(function(){
//   console.clear();
// },60000)

// let symbolhtml = document.getElementById('symbolhtml');






})

// window.addEventListener('mouseup', function(event){
// 
// let symbolhtml = document.getElementById('symbolhtml');
// 
// if(event.target != symbolhtml && event.target.parentNode != symbolhtml){
//   symbolhtml.style.display = 'none';
// }
// 
// })

