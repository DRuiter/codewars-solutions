function titleCase(title, minorWords) {
  function toLower(item){return item.toLowerCase();}
  
  var minorWords  = minorWords || '',
      titles  = title.split(' ').map(toLower),
      minors  = minorWords.split(' ').map(toLower);
  
  return titles.map(function(item, index){
    if(minors.indexOf(item) === -1 || index === 0) 
      return item.substr(0,1).toUpperCase()+item.substr(1);
    else
      return item;
  }).join(' ');
}