// The constructor takes in an array of items and a integer indicating how many
// items fit within a single page
function PaginationHelper(collection, itemsPerPage){
  this.items        = collection;
  this.itemsPerPage = itemsPerPage;
}

// returns the number of items within the entire collection
PaginationHelper.prototype.itemCount = function() {
  return this.items.length;
}

// returns the number of pages
PaginationHelper.prototype.pageCount = function() {
  return Math.ceil(this.itemCount()/this.itemsPerPage);
}

// returns the number of items on the current page. page_index is zero based.
// this method should return -1 for pageIndex values that are out of range
PaginationHelper.prototype.pageItemCount = function(pageIndex) {
  pageIndex++;
  if(this.pageCount() > pageIndex) return this.itemsPerPage;
  if(this.pageCount() === pageIndex) return this.itemCount()%this.itemsPerPage;
  if(this.pageCount() < pageIndex) return -1;
}

// determines what page an item is on. Zero based indexes
// this method should return -1 for itemIndex values that are out of range
PaginationHelper.prototype.pageIndex = function(itemIndex) {
  if(this.itemCount() === 0) return -1;
  if(this.itemCount() > itemIndex) return Math.floor(itemIndex/this.itemsPerPage);
  if(this.itemCount() === itemIndex) return this.pageCount();
  if(this.itemCount() < itemIndex) return -1;
}