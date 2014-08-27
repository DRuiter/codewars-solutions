function pascalsTriangle(n) {
  var array     = [],
      lastLayer = [];
  
  function generateLayer(array){
    var layer = [],
        num   = array.length+1;
    
    if(num === 1) return [1];
    if(num === 2) return [1,1];
    
    for(var i = 0; i < num; i++){
      if(i === 0 || i === num-1) {
        layer.push(1);
        continue;
      }
      layer.push(array[i-1]+array[i]);
    }
    
    return layer;
  }
  
  for(var i = 0; i < n; i++){
    lastLayer = generateLayer(lastLayer);
    array.push(lastLayer);
  }

  return array.toString().split(',').map(function(item){return parseInt(item,10)});
}