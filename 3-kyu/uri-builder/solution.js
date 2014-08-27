function UriBuilder (uri) {
  this.uri = uri.split('?')[0];
  this.params = {};

  function cleanParam(param){
    if(!param.replace) return param;
    return param.replace(' ', '%20');
  }
  
  this.build = function(){
    var baseURI = this.uri,
        qs      = [],
        haveQS  = false;
    
    for(var i in this.params){
      haveQS = true;
      qs.push(i+'='+cleanParam(this.params[i]));
    }
   
    if(haveQS)
      return baseURI += '?'+qs.join('&');
    else 
      return baseURI;
  };
  
  //Parse URI on init
  var qs      = uri.split('?')[1],
      params  = qs.split('&');
  
  for(var i in params){
    var param = params[i].split('=')

    this.params[param[0]] = cleanParam(param[1]);
  }
  
  return this;
}