var Vector = function (components) {
  var ts = {}.toString;
  
  if(ts.call(components) !== '[object Array]') 
    throw 'Incorrect argument type, expected argument of type: Array';
  
  this.components = components;
};

Vector.prototype.add      = function(vector){
  if(this.components.length !== vector.components.length) 
    throw 'Vector component lengths are not equal.';
  
  return new Vector(this.components.map(
    function(item, index){
      return item+vector.components[index];
    })
  )
}

Vector.prototype.subtract = function(vector){
  if(this.components.length !== vector.components.length) 
    throw 'Vector component lengths are not equal.';
  
  return new Vector(this.components.map(
    function(item, index){
      return item-vector.components[index];
    })
  )
}

Vector.prototype.dot      = function(vector){
  if(this.components.length !== vector.components.length) 
    throw 'Vector component lengths are not equal.';
  
  return this.components.map(
    function(item, index){
      return item*vector.components[index];
    }).reduce(
    function(prev, current){
      return prev+current;
    })
}

Vector.prototype.norm     = function(){
  return Math.sqrt(this.components.map(function(item){
    return Math.pow(item, 2);
  }).reduce(function(prev, current){
    return prev+current;
  }));
}

Vector.prototype.equals   = function(vector){
  var equals = true;
  
  for(var i = 0, l = this.components.length; i < l; i++){
    if(this.components[i] !== vector.components[i]) {
      equals = false;
      break;
    }
  }
  
  return equals;
}

Vector.prototype.toString = function(){
  return '('+this.components.join(',')+')';
}