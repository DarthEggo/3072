var canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var HEIGHT = 400;
var WIDTH = 400;

var Keys = {};

var tileMap = [];
generate();

var tileSpace = 1;

var gridSize = 4;

var endCheck;

var gameEnd;

var lastChance = false;

var tileData = {
  3: "#a9a9a9",
  6: "#d2b48c",
  12: "#ADD8E6",
  24: "#CCCCFF",
  48: "#89CFF0",
  96: "#7FFFD4",
  192: "#90EE90",
  384: "#CBC3E3",
  768: "#800020",
  1536: "#A020F0",
  3072: "#8F00FF",
};
function generate() {
  //Creates an Array Matrix
  for(let x = 0; x < 4; x++) {
    let row = [];
    
    for(let y = 0; y < 4; y++) {
      var t = {
        x: x,
        y: y,
        tile: "empty",
      };
      row.push(t);
    }
    tileMap.push(row);
  } 
}
addTile();
addTile();

function renderTiles() {
  ctx.clearRect(0,0,WIDTH,HEIGHT);
  ctx.fillStyle = "#FFFEF7";
  ctx.fillRect(0,0,WIDTH,HEIGHT);
  for(let x = 0; x < gridSize; x++) {
    for(let y = 0; y < gridSize; y++) {
      ctx.fillStyle = "#E1D9D1"; 
      if(tileMap[x][y].tile != "empty") {
        ctx.fillStyle = tileData[tileMap[x][y].tile];
      }
      
      ctx.fillRect(x * 100, y * 100, WIDTH / gridSize - tileSpace, HEIGHT /gridSize - tileSpace);
      if(tileMap[x][y].tile != "empty") {
	//Shows the Number on the Tile
        ctx.fillStyle = "black";
	ctx.font = "40px Arial";
        ctx.fillText(tileMap[x][y].tile,x * 100 + WIDTH / 10, y * 100 + HEIGHT / 6.5);
	ctx.fillStyle = "white";
	ctx.font = "38px Arial";
	ctx.fillText(tileMap[x][y].tile,x * 100 + WIDTH / 10 + 0.5, y * 100 + HEIGHT / 6.5 - 0.5);
      }
    }
  } 
}
update();

function update() {
  renderTiles();
  playerInput();
  requestAnimationFrame(update);
}

function gameEnd() {
  endCheck = true;
  for(let x = 0; x < 4; x++) {
    for(let y = 0; y < 4; y++) {
      if(tileMap[x][y].tile == "empty") {
        endCheck = false;
        break;
      }
    }
    if(!endCheck) {
      gameEnd = false;
      break;
    }
  } 
  if(endCheck) {
		alert("you lost :(");
    gameEnd = true;
  }
}

function addTile() {
	//stops from adding a new tile if there is only one tile left
	  lastChance = false;
	  var randomX = rng(gridSize);
	  var randomY = rng(gridSize);
	  if(tileMap[randomX][randomY].tile == "empty") {
	    tileMap[randomX][randomY].tile = 3;
	  }
	  else {
	    addTile()
	  }
	}




function playerInput() {
  if(Keys['a']) {
    moveTiles(-1,0);
    Keys['a'] = false;
    addTile();
  } 
  if(Keys['d']) {
    moveTiles(1,0);
    Keys['d'] = false;
    addTile();
  }
  if(Keys['w']) {
    moveTiles(0,-1);
    Keys['w'] = false;
    addTile();
  }
  if(Keys['s']) {
    moveTiles(0,1);
    Keys['s'] = false;
    addTile();
  }
  
    
  
}

function moveTiles(h,v) {
  for(let x = 0; x < gridSize; x++) {
    for(let y = 0; y < gridSize; y++) {
      if(tileMap[x][y].tile != "empty") {
      	   let curTile = tileMap[x][y];
      	   tileMove(x,y,h,v);
      	}
      }
    }
  }

  function tileMove(x,y,h,v) { 
    let newX = x + h;
    let newY = y + v;
    
    //ends function if the tile has reaches the side. 
    if(newX > 3 || newY > 3 || newX < 0 || newY < 0) {}
    //ends function if it runs into another tile, and if it's the same number then merge
    else if(tileMap[newX][newY].tile != "empty") {
     if(tileMap[newX][newY].tile == tileMap[x][y].tile) {
       tileMap[newX][newY].tile = tileMap[newX][newY].tile * 2;
       tileMap[x][y].tile = "empty";
     }
    }

    else {
      tileMap[newX][newY].tile = tileMap[x][y].tile;
      tileMap[x][y].tile = "empty";
      ctx.fillStyle = tileData[tileMap[x][y].tile];
      ctx.fillRect(x * 100, y * 100, WIDTH / gridSize - tileSpace, HEIGHT /gridSize - tileSpace);
      //Recursive
      tileMove(newX,newY,h,v);
    }
  }
  


function rng(max) {
  return Math.floor(Math.random() * max);
}

addEventListener("keydown", function(e) {
    Keys[e.key] = true;
  }
);

addEventListener("keyup", function(e) {
    Keys[e.key] = false;
  }
);
