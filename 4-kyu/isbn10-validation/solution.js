function validISBN10(isbn) {
  var isbn  = isbn.split(''),
      total = 0;
  
  if(isbn.length !== 10) return false;
  
  isbn.forEach(function(item, index){
    if(item === 'X' && index === 9) item = 10;

    total += item*(index+1);
  });
  
  return total%11 === 0;
}