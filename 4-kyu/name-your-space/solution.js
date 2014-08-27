function namespace(root, path, value){
  var val       = undefined,
      rootPath  = root,
      path      = path.split('.');
  
  if(typeof(rootPath) === 'undefined') window[root] = {};
  
  path.forEach(function(item, index){    
    if(typeof(rootPath[item]) === 'undefined') rootPath[item] = {};
    
    if(index === path.length-1){
      if(value) //set 
        rootPath[item] = value;
      else //get
        val = rootPath[item];
    }
    
    rootPath = rootPath[item];
  });
  
  if(!value && val.length > 0) return val;
}