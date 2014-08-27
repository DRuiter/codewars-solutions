function stripUrlParams(url, paramsToStrip){
  
  //No QueryString, return
  if(url.indexOf('?') === -1) return url;
  
  var baseURL = url.split('?')[0]
      qs      = url.split('?')[1],
      paramStrings  = qs.split('&'),
      params  = [],
      paramsToStrip = paramsToStrip || [];
  
  for(var i = 0, l = paramStrings.length; i < l; i++){
    var paramString = paramStrings[i],
        paramArr    = paramString.split('='),
        param = {};
        
    //Strip Specified Params
    if(paramsToStrip.indexOf(paramArr[0]) !== -1) continue;
    
    //Strip Duplicates
    var cont = false;
    params.forEach(function(item){
      for(var c in item) if(c === paramArr[0]) cont = true;
    });
    
    if(cont) continue;
    
    //Push to buildarray
    param[paramArr[0]] = paramArr[1];
    params.push(param);
  }
  
  //Build URL
  if(params.length < 1) 
    return baseURL;
  else
    return baseURL+'?'+params.map(function(item){
      var string = '';
      for(var i in item) string += i+'='+item[i];
      
      return string;
    }).join('&');
}