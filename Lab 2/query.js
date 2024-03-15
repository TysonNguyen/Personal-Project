var row_max, col_max;
var cells,
num_mines = 0;
var cell = { bid: "", is_mine: false, is_exposed: false, adjacent_count: 0 };
window.onload = function () {
  console.log("loaded");
  var toAppend = document.createElement("div");
  toAppend.setAttribute("id", "minefield");
  document.getElementById("outside").appendChild(toAppend);

  document.querySelector("#NewGame").addEventListener("click", NewGame);

  document.querySelector("#Difficulty").addEventListener("change", NewGame);
  NewGame();
};

function NewGame() {
  console.clear();
  row_max = parseInt(document.getElementById("Difficulty").value);
  col_max = row_max;
  switch (row_max) {
    case 10:
      num_mines = 10;
      break;
    case 18:
      num_mines = 40;
      break;
    case 24:
      num_mines = 99;
      break;
  }

  cells = [];
  NewGrid();
  RandomCells();
  CountAdjacent();
}

function Show() {}

function NewGrid() {
  console.log(`You have change to ${row_max}x${col_max}`);
  buttons = "";
  document.getElementById(
    "minefield"
  ).style.gridTemplateColumns = `repeat(${col_max},30px)`;
  document.getElementById(
    "minefield"
  ).style.gridTemplateRows = `repeat(${row_max},30px)`;

  for (let i = 0; i < row_max; i++) {
    cells[i] = [];
    for (let j = 0; j < col_max; j++) {
      cell = {
        bid: `r_${i}_c_${j}`,
        is_mine: false,
        is_exposed: false,
        adjacent_count: 0,
      };
      cells[i][j] = cell;
      buttons += `<button class="mine" value="${cells[i][j].bid}"></button>`;
    }
  }
  document.getElementById("minefield").innerHTML = buttons;
  BindGrid();
}
function ProccessClick() {
  for (let i = 0; i < row_max; i++)
    for (let j = 0; j < col_max; j++) {
      if (cells[i][j].bid == this.value) {
        //if (cells.adjacent_count > 0) {
        cells[i][j].is_exposed = true;
        console.log(cells[i][j]);
        if (cells[i][j].is_mine == true) {
          this.style.backgroundColor = "red";
        } else {
          this.innerHTML = cells[i][j].adjacent_count;
          this.style.backgroundColor = "green";
        }
        //} //else CheckCell(i, j);
      }
    }
}
function BindGrid() {
  const mines = document.querySelectorAll(".mine");
  for (let i = 0; i < mines.length; i++) {
    mines[i].addEventListener("click", ProccessClick);
  }
}

function RandomCells() {
  let i = 0;
  while (i < num_mines) {
    r = Math.floor(Math.random() * row_max);
    c = Math.floor(Math.random() * col_max);
    if (cells[r][c].is_mine == false) {
      cells[r][c].is_mine = true;
      i++;
    }
  }
}

function CountAdjacent() {
  for (var i = 0; i < row_max; i++) {
    for (var j = 0; j < col_max; j++) {
      if (!cells[i][j].is_mine) {
        console.log(cells[i][j]);
        cells[i + 1][j].adjacent_count++;
      }
    }
  }
}
function CheckCell(i, j) {}

function Around(iX, iY) {
  if (cells[iX][iY].is_mine && iX >= 0 && iY >=0) {
    return 1;
  } else return 0;
}
