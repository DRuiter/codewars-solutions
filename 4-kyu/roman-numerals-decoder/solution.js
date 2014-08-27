function solution(roman){
  var map = {
    M: 1000,
    D: 500,
    C: 100,
    L: 50,
    X: 10,
    V: 5,
    I: 1
  },
  currentCalc = [],
  total = 0;
  
  roman
    .split('')
    .map(function(item){
      return map[item];
    })
    .forEach(function(item, index){
      if(index === 0) {
        currentCalc.push(item);
        return;
      }
      var lastCalc = currentCalc[currentCalc.length-1];
      if(item > lastCalc)
        currentCalc[currentCalc.length-1] = item - lastCalc;
      
      if(item <= lastCalc)
        currentCalc.push(item);
    });

  return currentCalc.reduce(function(p, c){
    return p+c;
  });
}