let labyrintti;

let korkeus = 101;
let leveys = 101;

let korkeinNumero = 0;

let x = 1;
let y = 1;

let maaliX = 0;
let maaliY = 0;

let canvas = document.getElementById("canvas");
let piirra = canvas.getContext("2d");


let canvasSolunKoko = 9;
function nollaaCanvas() {
  canvas.width = leveys * canvasSolunKoko;
  canvas.height = korkeus * canvasSolunKoko;
  piirra.fillStyle = "black";
  piirra.fillRect(0, 0, canvas.width, canvas.height);
}

function taytaLabyrintti() {
  labyrintti = [];
  for(let k = 0; k < korkeus; k++) {
    labyrintti.push("s".repeat(leveys).split(""));
  } labyrintti[y][x] = 0;
}

function luoLabyrintti() {
  nollaaCanvas();
  let ajastin = setInterval(() => {
    for(let i = 0; i < 2; i++) {
      suunta = tarkistaTyhja();
      if(suunta == "vasen") {
        labyrintti[y][x - 1] = labyrintti[y][x] + 1;
        labyrintti[y][x - 2] = labyrintti[y][x] + 2;
        piirraCanvakselle(x, y, -2, 1, "gray");
        x -= 2; 
      } else if(suunta == "oikea") {
        labyrintti[y][x + 1] = labyrintti[y][x] + 1;
        labyrintti[y][x + 2] = labyrintti[y][x] + 2;
        piirraCanvakselle(x, y, 3, 1, "gray");
        x += 2; 
      } else if(suunta == "ylos") {
        labyrintti[y - 1][x] = labyrintti[y][x] + 1;
        labyrintti[y - 2][x] = labyrintti[y][x] + 2;
        piirraCanvakselle(x, y, 1, -2, "gray");
        y -= 2;
      } else if(suunta == "alas") {
        labyrintti[y + 1][x] = labyrintti[y][x] + 1;
        labyrintti[y + 2][x] = labyrintti[y][x] + 2;
        piirraCanvakselle(x, y, 1, 3, "gray");
        y += 2;
      } else {
        suunta = tarkistaTaaksepain();
  
        if(suunta == "vasen") {
          labyrintti[y][x] = "r"
          labyrintti[y][x - 1] = "r";
          piirraCanvakselle(x - 1, y, 2, 1, "white");
          x -= 2; 
        } else if(suunta == "oikea") {
          labyrintti[y][x] = "r";
          labyrintti[y][x + 1] = "r";
          piirraCanvakselle(x, y, 2, 1, "white");
          x += 2; 
        } else if(suunta == "ylos") {
          labyrintti[y][x] = "r";
          labyrintti[y - 1][x] = "r";
          piirraCanvakselle(x, y + 1, 1, -2, "white");
          y -= 2;
        } else if(suunta == "alas") {
          labyrintti[y][x] = "r";
          labyrintti[y + 1][x] = "r";
          piirraCanvakselle(x, y, 1, 2, "white");
          y += 2;
        } else {
          piirraCanvakselle(x, y, 1, 1, "white");
          clearInterval(ajastin);
        }
      }
  
      if(labyrintti[y][x] > korkeinNumero && (x == 1 || x == leveys - 1 || y == 1 || y == korkeus - 1)) {
        if(labyrintti[maaliY][maaliX] == "r") piirraCanvakselle(maaliX, maaliY, 1, 1, "white");
        else piirraCanvakselle(maaliX, maaliY, 1, 1, "gray");
        maaliX = x;
        maaliY = y;
        korkeinNumero = labyrintti[y][x];
        // piirraCanvakselle(x, y, 1, 1, "red");
      }
  
      piirraCanvakselle(maaliX, maaliY, 1, 1, "red");
    }
  }, 0);
}

function luoLabyrinttiForLoop() {
  nollaaCanvas();

  while(true) {
    for(let i = 0; i < 100; i++) {
      suunta = tarkistaTyhja();
      if(suunta == "vasen") {
        labyrintti[y][x - 1] = labyrintti[y][x] + 1;
        labyrintti[y][x - 2] = labyrintti[y][x] + 2;
        piirraCanvakselle(x, y, -2, 1, "white");
        x -= 2; 
      } else if(suunta == "oikea") {
        labyrintti[y][x + 1] = labyrintti[y][x] + 1;
        labyrintti[y][x + 2] = labyrintti[y][x] + 2;
        piirraCanvakselle(x, y, 3, 1, "white");
        x += 2; 
      } else if(suunta == "ylos") {
        labyrintti[y - 1][x] = labyrintti[y][x] + 1;
        labyrintti[y - 2][x] = labyrintti[y][x] + 2;
        piirraCanvakselle(x, y, 1, -2, "white");
        y -= 2;
      } else if(suunta == "alas") {
        labyrintti[y + 1][x] = labyrintti[y][x] + 1;
        labyrintti[y + 2][x] = labyrintti[y][x] + 2;
        piirraCanvakselle(x, y, 1, 3, "white");
        y += 2;
      } else {
        suunta = tarkistaTaaksepain();
  
        if(suunta == "vasen") {
          labyrintti[y][x] = "r"
          labyrintti[y][x - 1] = "r";
          x -= 2; 
        } else if(suunta == "oikea") {
          labyrintti[y][x] = "r";
          labyrintti[y][x + 1] = "r";
          x += 2; 
        } else if(suunta == "ylos") {
          labyrintti[y][x] = "r";
          labyrintti[y - 1][x] = "r";
          y -= 2;
        } else if(suunta == "alas") {
          labyrintti[y][x] = "r";
          labyrintti[y + 1][x] = "r";
          y += 2;
        } else break;
      }
    }
  }
}

function tarkistaTyhja() {
  let suunta = [];
  if(x > 1) {
    if(labyrintti[y][x - 2] == "s") suunta.push("vasen");
  }
  if(x < leveys - 2) {
    if(labyrintti[y][x + 2] == "s") suunta.push("oikea");
  }
  if(y > 1) {
    if(labyrintti[y - 2][x] == "s") suunta.push("ylos");
  }
  if(y < korkeus - 2) {
    if(labyrintti[y + 2][x] == "s") suunta.push("alas");
  }
  return suunta[Math.floor(Math.random() * suunta.length)];
}

function tarkistaTaaksepain() {
  if(x > 0) {
    if(labyrintti[y][x - 1] !== "s" && labyrintti[y][x - 1] !== "r") return "vasen";
  }
  if(x < leveys - 1) {
    if(labyrintti[y][x + 1] !== "s" && labyrintti[y][x + 1] !== "r") return "oikea";
  }
  if(y > 0) {
    if(labyrintti[y - 1][x] !== "s" && labyrintti[y - 1][x] !== "r") return "ylos";
  }
  if(y < korkeus - 1) {
    if(labyrintti[y + 1][x] !== "s" && labyrintti[y + 1][x] !== "r") return "alas";
  }
  return null;
}

function piirraCanvakselle(x1, y1, x2, y2, vari) {
  piirra.fillStyle = vari;
  piirra.fillRect(x1 * canvasSolunKoko, y1 * canvasSolunKoko, canvasSolunKoko * x2, canvasSolunKoko * y2);
}

taytaLabyrintti();
luoLabyrintti();