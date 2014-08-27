/*
	------------------------------
	MAIN SUDOKU DEFINITION
	------------------------------
*/

var Sudoku = function(puzzle){
	var self = this;

	this.attempts = 0;
	this.coords = [];

	puzzle.forEach(function(line, y){
		var y = y;
		line.forEach(function(item, x){
			self.coords.push(new SudokuCoordinate(x, y, item));
		});
	});

	this.lines	= {
		horizontal: [],
		vertical: []
	};

	this.grids	= {};

	return this;
}

Sudoku.prototype.generateReferences = function(){
	var c = this.coords;

	//Horizontal Lines
	for(var i = 0; i < 9; i++){
		var coords = [];

		for(var j = 0; j < 9; j++){
			coords.push(this.getCoordinate(j,i));
		}

		this.lines.horizontal.push(new SudokuCoordinateCollection(coords));	
	}

	//Vertical Lines
	for(var i = 0; i < 9; i++){
		var coords = [];

		for(var j = 0; j < 9; j++){
			coords.push(this.getCoordinate(i,j));
		}

		this.lines.vertical.push(new SudokuCoordinateCollection(coords));	
	}

	//Grids
	this.grids =  {
		tl: this.generateGrid(this.getCoordinate(0,0)),
		tm: this.generateGrid(this.getCoordinate(3,0)),
		tr: this.generateGrid(this.getCoordinate(6,0)),
		ml: this.generateGrid(this.getCoordinate(0,3)),
		mm: this.generateGrid(this.getCoordinate(3,3)),
		mr: this.generateGrid(this.getCoordinate(6,3)),
		bl: this.generateGrid(this.getCoordinate(0,6)),
		bm: this.generateGrid(this.getCoordinate(3,6)),
		br: this.generateGrid(this.getCoordinate(6,6))
	};
	
}

Sudoku.prototype.generateGrid = function(startCoordinate){
	var s = startCoordinate;

	return new SudokuCoordinateCollection([
		this.getCoordinate(s.x, s.y),
		this.getCoordinate(s.x+1, s.y),
		this.getCoordinate(s.x+2, s.y),
		this.getCoordinate(s.x, s.y+1),
		this.getCoordinate(s.x+1, s.y+1),
		this.getCoordinate(s.x+2, s.y+1),
		this.getCoordinate(s.x, s.y+2),
		this.getCoordinate(s.x+1, s.y+2),
		this.getCoordinate(s.x+2, s.y+2)
	]); 
}

Sudoku.prototype.solveRoutine = function(){
	this.attempts++;
	//Check attempts count to prevent infinite loops
	if(this.attempts >= 500) throw 'Solve Routine called more than 500 times, aborting.';

	//Calculate Coordinate Collection Required's
	this.calculatePossibleCollectionValues();

	//Use Coordinate Collection Required's to calculate coordinate possibles
	this.calculatePossibleCoordinateValues();

	//Set possibles with length of 1 ^
	this.solveImmediatePossibles();
	//else
	
	//Set unique possibles ^

	//else

	//Check for unique remainders with elimination, set if found ^
	this.lines.horizontal.forEach(function(collection){
		collection.eliminationCheck();
	});

	this.lines.vertical.forEach(function(collection){
		collection.eliminationCheck();
	});

	for(var i in this.grids){
		if(this.grids.hasOwnProperty(i)) {
			this.grids[i].eliminationCheck();
		}
	}

	//else

	//Check if puzzle is solved
	if(!this.isSolved()) this.solveRoutine();

}

Sudoku.prototype.isSolved = function(){
	var solved = true;

	this.lines.horizontal.forEach(function(line){
		line.coordinates.forEach(function(item){
			if(item.value === 0) solved = false;
		})
	})

	return solved;
}

Sudoku.prototype.solution = function(){
	var print = [];
	
	this.lines.horizontal.forEach(function(line){
		var addTo = [];

		line.coordinates.forEach(function(item){
			addTo.push(item.value);
		})

		print.push(addTo);
	})

	return print;
}

Sudoku.prototype.solveImmediatePossibles = function(){
  for(var i = 0, l = this.coords.length; i < l; i++){
		var coord = this.coords[i];

		if(coord.possible.length === 1) coord.setValue(coord.possible[0]);
	}
}

Sudoku.prototype.getCoordinate = function(x,y){
	return this.coords[x+(y*9)];
}

Sudoku.prototype.getCoordinateMembers = function(x, y){
	var members = this.getCoordinate(x, y).memberOf();

	return [
		this.lines.horizontal[members.lines.horizontal],
		this.lines.vertical[members.lines.vertical],
		this.grids[members.grid]
	];
}

Sudoku.prototype.calculatePossibleCoordinateValues = function(){
	var self = this;

	this.coords.forEach(function(coord){
		if(coord.value === 0){
			var membersArray = self.getCoordinateMembers(coord.x, coord.y);
			coord.calcPossibles(membersArray);
		}
	})
}

Sudoku.prototype.calculatePossibleCollectionValues = function(){
	var self = this,
		calc = function(collection){
			collection.calcRequired();
		};


	this.lines.horizontal.forEach(calc);
	this.lines.vertical.forEach(calc);

	for(var i in this.grids){
		if(this.grids.hasOwnProperty(i)) this.grids[i].calcRequired();
	}
}

/*
	----------------------------
	SUDOKU COORDINATE DEFINITION
	----------------------------
*/

var SudokuCoordinate = function(x, y, value){
	this.value 		= value;
	this.x 			= x;
	this.y 			= y;
	this.possible 	= [];

	return this;
}

SudokuCoordinate.prototype.memberOf = function(){
	var p 		= {x: this.x, y: this.y},
		grid 	= {
			h: '',
			v: ''
		};

	if(p.x < 3) grid.h = 'l';
	if(p.x >= 3 && p.x < 6) grid.h = 'm';
	if(p.x >= 6) grid.h = 'r';

	if(p.y < 3) grid.v = 't';
	if(p.y >= 3 && p.y < 6) grid.v = 'm';
	if(p.y >= 6) grid.v = 'b';

	return {
		lines: {
			horizontal: p.y,
			vertical: p.x
		},
		grid: grid.v+grid.h
	}
}

SudokuCoordinate.prototype.crossReference = function(collection1, collection2, collection3){
	return collection1.required.filter(function(item){
		if(collection2.required.indexOf(item) !== -1) return item;
	}).filter(function(item){
		if(collection3.required.indexOf(item) !== -1) return item;
	})

	return result;
}

SudokuCoordinate.prototype.calcPossibles = function(membersArray){
	this.possible = this.crossReference(membersArray[0], membersArray[1], membersArray[2]);
}

SudokuCoordinate.prototype.setValue = function(value){
	this.value 		= value;
	this.possible 	= [];
}

/*
	----------------------------
	SUDOKU COORDINATE COLLECTION DEFINITION
	----------------------------
*/

var SudokuCoordinateCollection = function(coordinates){
	this.coordinates = coordinates;
	this.required 	 = [1,2,3,4,5,6,7,8,9];

	this.calcRequired();

	return this;
}

SudokuCoordinateCollection.prototype.calcRequired = function(){
	var self = this;

	this.coordinates.forEach(function(coordinate){
		if(coordinate.value > 0 && self.required.indexOf(coordinate.value) !== -1) self.required.splice(self.required.indexOf(coordinate.value), 1);	
	})
}

SudokuCoordinateCollection.prototype.eliminationCheck = function(){
	var eliminate = [];

	this.coordinates.forEach(function(coord){
		if(coord.possible.length === 2) eliminate.push(coord);
	});

	if(eliminate.length === 2) {
		if(this.eliminationArrayCheck(eliminate[0].possible, eliminate[1].possible)){
			this.coordinates.forEach(function(coord){
				var eliminatedPossible = coord.possible.filter(function(item){
					if(item !== eliminate[0][0] || item !== eliminate[0][1]) return item;
				});

				if(eliminatedPossible.length === 1) coord.setValue(eliminatedPossible[0]);
			})
		}
	}
}

SudokuCoordinateCollection.prototype.eliminationArrayCheck = function(arr1, arr2){
	if(arr1[0] === arr2[0] || arr1[0] === arr2[1] && arr1[1] === arr2[0] || arr1[1] === arr2[1]) 
		return true;
	else
		return false;
}

function sudoku(puzzle) {
  console.log(puzzle);
  var solver = new Sudoku(puzzle);
  
  solver.generateReferences();
  solver.solveRoutine();
  
  return solver.solution();
}