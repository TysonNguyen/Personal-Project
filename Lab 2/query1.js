var row_max, col_max;

function Cell(bomb_id, mine, exposed, adCount) {
  (this.bid = bomb_id),
    (this.is_mine = mine),
    (this.is_exposed = exposed),
    (this.adjacent_count = adCount);
}
var games = [
  {
    diffculty: "Easy",
    num_mines: 10,
    row_max: 10,
    col_max: 10
  },
  {
    diffculty: "Medium",
    num_mines: 40,
    row_max: 18,
    col_max: 18
  },
  {
    diffculty: "Hard",
    num_mines: 99,
    row_max: 24,
    col_max: 24
  }
]
var startGame = false;
var iX, iY, gm;
var showedBomb,
  totalBombExposed = 0;
window.onload = function () {
  console.clear();
  var toAppend = document.createElement("div");
  toAppend.setAttribute("id", "minefield");
  document.getElementById("outside").appendChild(toAppend);
  document.querySelector("#NewGame").addEventListener("click", NewGame);
  document.querySelector("#Difficulty").addEventListener("change", NewGame);
  NewGame();
};

function NewGame() {
  console.clear();
  totalBombExposed = 0;
  row_max = parseInt(document.getElementById("Difficulty").value);
  col_max = parseInt(document.getElementById("Difficulty").value);
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

  startGame = false;
}

function NewGrid() {
  buttons = "";
  buttons += `<div style="grid-template-columns:repeat(${col_max},30px); grid-template-rows: repeat(${row_max},30px); width:${
    row_max * 30
  }px">`;
  for (let i = 0; i < row_max; i++) {
    cells[i] = [];
    for (let j = 0; j < col_max; j++) {
      cells[i][j] = new Cell(`r_${i}_c_${j}`, false, false, 0);
      buttons += `<button class="mine" value="${cells[i][j].bid}" id="${cells[i][j].bid}""></button>`;
    }
  }
  buttons += `</div>`;
  document.getElementById("minefield").innerHTML = buttons;
  BindGrid();
}
function Show() {
  if (cells[iX][iY].adjacent_count == 0 && !cells[iX][iY].is_mine)
    CheckCell(iX, iY, cells[iX][iY]);
  if (cells[iX][iY].adjacent_count > 0 && !cells[iX][iY].is_mine) {
    document.querySelector(`#r_${iX}_c_${iY}`).innerHTML =
      cells[iX][iY].adjacent_count;
    document.querySelector(`#r_${iX}_c_${iY}`).style.backgroundColor = "green";
  }
  if (cells[iX][iY].is_mine) {
    document.querySelector(
      `#r_${iX}_c_${iY}`
    ).innerHTML = `<img src="./lab2-boom.png" alt="" style="width: 20px;height: 20px;" >`;
    document.querySelector("#lost-screen").style.display = "block";
  }
}
function ShowGrid() {
  totalBombExposed += showedBomb;
  console.log(totalBombExposed);
  if (totalBombExposed == num_mines) {
    document.querySelector("#win-screen").style.display = "block";
  }
}
function ProccessClick(event) {
  if (!startGame) {
    Begin();
    startGame = true;
  }
  var currentSplit = this.value.split("_");
  iX = currentSplit[1];
  iY = currentSplit[3];
  if (event.shiftKey) {
    if (cells[iX][iY].is_mine) {
      showedBomb = 1;
      document.querySelector(
        `#r_${iX}_c_${iY}`
      ).innerHTML = `<img src="./flag.jpg" alt="" style="width: 20px;height: 20px;" >`;
      ShowGrid();
      console.log("You have click with shiftKey");
    } else if (!cells[iX][iY].is_mine) {
      document.querySelector(
        `#r_${iX}_c_${iY}`
      ).innerHTML = `<img src="./flag.jpg" alt="" style="width: 20px;height: 20px;" >`;
    }
  } else {
    Show();
  }

  cells[iX][iY].is_exposed = true;
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
      console.log(document.querySelector(`#r_${r}_c_${c}`));
      i++;
    }
  }
}

function CountAdjacent() {
  for (var i = 0; i < row_max; i++) {
    for (var j = 0; j < col_max; j++) {
      if (cells[i][j].is_mine) {
        Around(i + 1, j); //Down
        Around(i - 1, j); //Up
        Around(i, j + 1); //Right
        Around(i, j - 1); //Left
        Around(i + 1, j + 1); //Down Right
        Around(i + 1, j - 1); //Down Left
        Around(i - 1, j + 1); //Up Right
        Around(i - 1, j - 1); //Down Right
      }
    }
  }
}
function CheckCell(i, j) {
  if (i >= 0 && i < row_max && j >= 0 && j < col_max) {
    if (cells[i][j].is_mine == false && cells[i][j].is_exposed == false) {
      if (cells[i][j].adjacent_count == 0) {
        document.querySelector(`#r_${i}_c_${j}`).style.backgroundColor =
          "white";
        cells[i][j].is_exposed = true;
        CheckCell(parseInt(i) + 1, j);
        CheckCell(parseInt(i) - 1, j);
        CheckCell(i, parseInt(j) + 1);
        CheckCell(i, parseInt(j) - 1);
        CheckCell(parseInt(i) + 1, parseInt(j) + 1);
        CheckCell(parseInt(i) - 1, parseInt(j) + 1);
        CheckCell(parseInt(i) - 1, parseInt(j) - 1);
        CheckCell(parseInt(i) + 1, parseInt(j) - 1);
      }
      if (cells[i][j].adjacent_count > 0) {
        document.querySelector(`#r_${i}_c_${j}`).innerHTML =
          cells[i][j].adjacent_count;
        document.querySelector(`#r_${i}_c_${j}`).style.backgroundColor =
          "green";
      }
    }
  }
}

function Around(iX, iY) {
  if (iX <= row_max - 1 && iX >= 0) {
    if (iY <= col_max - 1 && iY >= 0) {
      cells[iX][iY].adjacent_count = cells[iX][iY].adjacent_count + 1;
    }
  }
}

function Begin() {
  RandomCells();
  CountAdjacent();
}
