Number.prototype.twos = function(n) { 
  var bin         = Math.abs(this.valueOf()).toString(2),
      isNegative  = (this.valueOf() < 0);

  if(bin.length > n) return bin;
  
  if(isNegative)
    while(bin.length < n) bin = '1'+bin;
  else
    while(bin.length < n) bin = '0'+bin;

  return bin;
}