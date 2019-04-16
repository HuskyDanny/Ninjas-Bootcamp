// alternatives for var?
var rows, cols, playerActive, gameGoing, pivot0, pivot1;
pivot = false;

//Restart everything
const init = function() {
  rows = [[0, 0], [0, 0], [0, 0]];
  cols = [[0, 0], [0, 0], [0, 0]];
  playerActive = 0;
  gameGoing = true;
  document.querySelector(".p" + 0 + "bar").style.display = "block";
  document.querySelector(".p" + 1 + "bar").style.display = "none";
  document.querySelector(".w" + 1).style.display = "none";
  document.querySelector(".w" + 0).style.display = "none";

  let imgs = document.querySelector(".images");
  while (imgs) {
    imgs.parentNode.removeChild(imgs);
    imgs = document.querySelector(".images");
  }
};

// check the diagonal winning condition
const checkDiagonal = function() {
  if (!playerActive) {
    if (!pivot0) {
      return false;
    }
  }
  if (playerActive) {
    if (!pivot1) {
      return false;
    }
  }
  for (let i = 0; i < rows.length; i++) {
    if (rows[i][playerActive] <= 0) {
      return false;
    }
  }
  for (let i = 0; i < cols.length; i++) {
    if (cols[i][playerActive] <= 0) {
      return false;
    }
  }
  return true;
};

//Updating game score and check for winning condition
const algorithm = function(j, i) {
  if (j == 1 && i == 1 && playerActive === 1) {
    if (playerActive === 1) {
      pivot1 = true;
    }
    if (playerActive === 0) {
      pivot0 = true;
    }
  }
  rows[j][playerActive] += 1;
  cols[i][playerActive] += 1;
  console.log(cols);
  console.log(rows);
  console.log(pivot);
  if (
    rows[j][playerActive] === 3 ||
    cols[i][playerActive] === 3 ||
    checkDiagonal()
  ) {
    return true;
  } else {
    return false;
  }
};

// Listen and animate the playing process
const animate = function(index) {
  document.querySelector("#" + index).addEventListener("click", function() {
    if (gameGoing) {
      const i = index.slice(-1)[0];
      const j = index.slice(-2)[0];
      const oImg = document.createElement("img");
      oImg.setAttribute("src", "./imgs/piece-" + playerActive + ".png");
      oImg.setAttribute("height", "100%");
      oImg.setAttribute("class", "images");
      oImg.setAttribute("width", "100%");
      document.querySelector("#" + index).appendChild(oImg);
      if (algorithm(j, i)) {
        document.querySelector(".w" + playerActive).style.display = "block";
        gameGoing = false;
      } else {
        document.querySelector(".p" + playerActive + "bar").style.display =
          "none";
        playerActive = playerActive ? 0 : 1;
        document.querySelector(".p" + playerActive + "bar").style.display =
          "block";
      }
    }
  });
};

init();
// Listeners
animate("grid-00");
animate("grid-01");
animate("grid-02");
animate("grid-10");
animate("grid-11");
animate("grid-12");
animate("grid-20");
animate("grid-21");
animate("grid-22");
document.querySelector(".btn-restart").addEventListener("click", init);
