// Created by Andrey 🐯

document.addEventListener('DOMContentLoaded', () => {
    // DataGame 
   
   const dataGame = {
     mediaScreen: [
       {
         point: window.matchMedia("(max-width: 340px)"),
         size: 17,
       },
       {
         point: window.matchMedia("(min-width: 340px) and (max-width: 360px)"),
         size: 18,
       },
       {
         point: window.matchMedia("(min-width: 360px) and (max-width: 375px)"),
         size: 19,
       },
       {
         point: window.matchMedia("(min-width: 375px) and (max-width: 390px)"),
         size: 20,
       },
       {
         point: window.matchMedia("(min-width: 390px)"),
         size: 21,
       },
     ],
     sizeBlock: null,
     columns: 12,
     rows: 24,
     nextColumns: 4,
     nextRows: 4,
     timeRotate: null,
     timeRight: null,
     timeDown: null,
     timeLeft: null,
     reqRotate: null,
     reqRight: null,
     reqDown: null,
     reqLeft: null,
     level: 1,
     lines: 0,
     score: 0,
     record: 0,
     points: [0, 100, 300, 700, 1500],
     cloneColor: "rgba(255, 255, 255, 0.2)",
     name: ["I", "J", "L", "O", "S", "Z", "T"],
     tetraminoes: {
       I: [
         [0, 1, 0, 0],
         [0, 1, 0, 0],
         [0, 1, 0, 0],
         [0, 1, 0, 0],
       ],
       J: [
         [0, 0, 1, 0],
         [0, 0, 1, 0],
         [0, 1, 1, 0],
         [0, 0, 0, 0],
       ],
       L: [
         [0, 1, 0, 0],
         [0, 1, 0, 0],
         [0, 1, 1, 0],
         [0, 0, 0, 0],
       ],
       O: [
         [0, 0, 0, 0],
         [0, 1, 1, 0],
         [0, 1, 1, 0],
         [0, 0, 0, 0],
       ],
       S: [
         [0, 1, 0, 0],
         [0, 1, 1, 0],
         [0, 0, 1, 0],
         [0, 0, 0, 0],
       ],
       Z: [
         [0, 0, 1, 0],
         [0, 1, 1, 0],
         [0, 1, 0, 0],
         [0, 0, 0, 0],
       ],
       T: [
         [0, 1, 0, 0],
         [0, 1, 1, 0],
         [0, 1, 0, 0],
         [0, 0, 0, 0],
       ],
     },
     colors: {
       I: "#ffff00",
       J: "#00ffff",
       L: "#00ff00",
       O: "#800080",
       S: "#ff7f00",
       Z: "#ff0000",
       T: "#0000ff",
     },
     moduleData: [
       {
         id: "start",
         title: "Tetris",
         desc: "Tetris is a timeless puzzle game that has fascinated players of all ages for decades!",
         btn: ["btn-info", "btn-start"],
         name: ["Info", "Start"],
       },
       {
         id: "play",
         title: "Tetris",
         desc: "Familiarize yourself with the game's control features and continue playing.",
         btn: ["btn-info", "btn-play"],
         name: ["Info", "Play"],
       },
       {
         id: "restart",
         title: "Tetris",
         desc: "Are you sure you want to start over?",
         btn: ["btn-cancel", "btn-restart"],
         name: ["Cancel", "Restart"],
       },
       {
         id: "repeat",
         title: "Tetris",
         desc: "You lost, do you want to repeat the game?",
         btn: ["btn-repeat"],
         name: ["Repeat"],
       },
       {
         id: "control",
         title: "Tetris",
         desc: "To play comfortably, choose which control suits you.",
         btn: ["btn-arrows", "btn-keyboard", "btn-touch"],
         name: ["Buttons", "Keyboard", "Touch"],
       },
     ],
     checkedStyle(cells) {
       return cells.filter((cell) => cell.classList.length > 0);
     },
     getRandomElement(arr) {
       return arr[Math.floor(Math.random() * arr.length)];
     },
     recalculatePositionToIndex(x, y) {
       return x * this.columns + y;
     },
     rotateMatrix(matrix) {
       const S = matrix.length;
       const newMatrix = [];
   
       for (let i = 0; i < S; i++) {
         newMatrix[i] = [];
         for (let j = 0; j < S; j++) {
           newMatrix[i][j] = matrix[S - j - 1][i];
         }
       }
   
       return newMatrix;
     },
     addClass: (elem, name) => elem.classList.add(name),
     removeClass: (elem, name) => elem.classList.remove(name),
   };
   
   // Class Tetris
   class Tetris {
     constructor(element, options) {
       this.el = element;
   
       if (!this.el) return;
   
       this.blockMeaning = this.el.querySelector(".block__meaning");
       this.blockScore = this.el.querySelector(".block__score");
       this.fieldGame = this.el.querySelector(".field-game");
       this.nextFieldEl = this.el.querySelector(".next-content");
   
       this.mediaScreen = options.mediaScreen;
       this.sizeBlock = options.sizeBlock;
   
       this.columns = options.columns;
       this.rows = options.rows;
   
       this.nextColumns = options.nextColumns;
       this.nextRows = options.nextRows;
   
       this.cells = this.columns * this.rows;
       this.nextCells = this.nextColumns * this.nextRows;
   
       this.timeRotate = options.timeRotate;
       this.timeRight = options.timeRight;
       this.timeDown = options.timeDown;
       this.timeLeft = options.timeLeft;
   
       this.reqRotate = options.reqRotate;
       this.reqRight = options.reqRight;
       this.reqDown = options.reqDown;
       this.reqLeft = options.reqLeft;
   
       this.level = options.level;
       this.lines = options.lines;
       this.score = options.score;
       this.record = options.record;
       this.points = options.points;
   
       this.tetraminoName = options.name;
       this.tetraminoCloneColor = options.cloneColor;
       this.tetraminoColor = options.colors;
       this.tetraminoes = options.tetraminoes;
       this.moduleData = options.moduleData;
   
       this.getRandomElement = options.getRandomElement;
       this.recalculatePositionToIndex = options.recalculatePositionToIndex;
       this.rotateMatrix = options.rotateMatrix;
   
       this.checkedStyle = options.checkedStyle;
       this.addClass = options.addClass;
       this.removeClass = options.removeClass;
   
       this.cloneField = null;
       this.tetramino = null;
       this.nextTetramino = null;
       this.hasTouchEvent = null;
       this.done = false;
       this.stopped = false;
       this.checkbox = true;
       this.isGameOver = false;
   
       this.sizeCellsFields();
       this.createFieldGame();
       this.init();
     }
   
     init() {
       this.done = true;
       this.stopped = false;
       this.generateCloneField();
       this.generateNextField();
       this.tetramino = this.generateTetramino();
       this.nextTetramino = this.generateTetramino();
       this.calculateClonePosition();
       this.createUpdatePanels(this.createBlockScore());
     }
   
     sizeCellsFields() {
       if (!this.sizeBlock) return;
   
       this.fieldGame.style.width = `${this.sizeBlock * this.columns}px`;
       this.fieldGame.style.height = `${this.sizeBlock * this.rows}px`;
   
       this.nextFieldEl.style.width = `${this.sizeBlock * this.nextColumns}px`;
       this.nextFieldEl.style.height = `${this.sizeBlock * this.nextRows}px`;
     }
   
     createFieldGame() {
       this.sizeGridTemplate(this.fieldGame, this.columns, this.rows);
       this.sizeGridTemplate(this.nextFieldEl, this.nextColumns, this.nextRows);
       this.createField();
       this.createNext();
     }
   
     createField() {
       Array.from(new Array(this.cells)).forEach(() =>
         this.fieldGame.append(document.createElement("div"))
       );
     }
   
     createNext() {
       Array.from(new Array(this.nextCells)).forEach(() =>
         this.nextFieldEl.append(document.createElement("div"))
       );
     }
   
     sizeGridTemplate(field, columns, rows) {
       field.style.gridTemplateColumns = `repeat(${columns}, auto)`;
       field.style.gridTemplateRows = `repeat(${rows}, auto)`;
     }
   
     generateCloneField() {
       this.cloneField = new Array(this.rows)
         .fill()
         .map(() => new Array(this.columns).fill(0));
     }
   
     generateNextField() {
       this.nextTetramino = new Array(this.nextRows)
         .fill()
         .map(() => new Array(this.nextColumns).fill(0));
     }
   
     generateTetramino() {
       const name = this.getRandomElement(this.tetraminoName);
       const matrix = this.tetraminoes[name];
   
       const column = this.columns / 2 - Math.floor(matrix.length / 2);
       const row = name === "I" ? -4 : -3;
   
       return {
         name,
         matrix,
         column,
         row,
         cloneColumn: column,
         cloneRow: row,
       };
     }
   
     changeTetramino() {
       this.tetramino = this.nextTetramino;
       this.nextTetramino = this.generateTetramino();
     }
   
     moveTetraminoDown() {
       this.tetramino.row += 1;
       if (!this.isValidPosition()) {
         this.tetramino.row -= 1;
         this.stopMove();
       }
     }
   
     dropTetrominoDown() {
       this.tetramino.row = this.tetramino.cloneRow;
       this.stopMove();
     }
   
     moveTetraminoLeft() {
       this.tetramino.column -= 1;
       if (!this.isValidPosition()) {
         this.tetramino.column += 1;
       } else {
         this.calculateClonePosition();
       }
     }
   
     moveTetraminoRight() {
       this.tetramino.column += 1;
       if (!this.isValidPosition()) {
         this.tetramino.column -= 1;
       } else {
         this.calculateClonePosition();
       }
     }
   
     rotateTetraminoCircle() {
       const oldMatrix = this.tetramino.matrix;
       const rotatedMatrix = this.rotateMatrix(this.tetramino.matrix);
       this.tetramino.matrix = rotatedMatrix;
   
       if (!this.isValidPosition()) {
         this.tetramino.matrix = oldMatrix;
       } else {
         this.calculateClonePosition();
       }
     }
   
     isValidPosition() {
       const { matrix } = this.tetramino;
       for (let x = 0; x < matrix.length; x++) {
         for (let y = 0; y < matrix.length; y++) {
           if (!matrix[x][y]) continue;
           if (this.isOutsideOfGameBoard(x, y)) return false;
           if (this.isCollides(x, y)) return false;
         }
       }
       return true;
     }
   
     isOutsideOfGameBoard(x, y) {
       const { row, column } = this.tetramino;
       return (
         column + y < 0 ||
         column + y >= this.columns ||
         row + x >= this.cloneField.length
       );
     }
   
     isCollides(x, y) {
       const { row, column } = this.tetramino;
       return this.cloneField[row + x]?.[column + y];
     }
   
     createBlockScore() {
       const levelEl = document.createElement("p");
       const lineEl = document.createElement("p");
       const scoreEl = document.createElement("p");
       const recordEl = document.createElement("p");
   
       this.blockMeaning.append(levelEl, lineEl);
       this.blockScore.append(scoreEl, recordEl);
   
       return () => {
         levelEl.innerHTML = `<span>Level:</span> ${this.level}`;
         lineEl.innerHTML = `<span>Lines:</span> ${this.lines}`;
         scoreEl.innerHTML = `<span>Score:</span> ${this.score}`;
         recordEl.innerHTML = `<span>Record:</span> ${this.record}`;
       };
     }
   
     calcScore(lines) {
       this.lines += lines;
       this.level = Math.floor(this.lines / 10) + 1;
       this.score += this.points[lines];
   
       if (this.score > this.record) {
         this.record = this.score;
       }
     }
   
     createUpdatePanels(showScore) {
       showScore();
       this.updatePanels = () => showScore();
     }
   
     stopMove() {
       const { row, column, matrix, name } = this.tetramino;
   
       for (let x = 0; x < matrix.length; x++) {
         for (let y = 0; y < matrix.length; y++) {
           if (!matrix[x][y]) continue;
           if (this.isOutsideOfTopBoard(x)) {
             this.stopped = true;
             this.isGameOver = true;
             return;
           }
   
           this.cloneField[row + x][column + y] = name;
         }
       }
   
       this.stopped = true;
       this.changeTetramino();
       const countRow = this.clearRow();
       this.calcScore(countRow);
       this.updatePanels(this.createBlockScore());
       this.calculateClonePosition();
     }
   
     isOutsideOfTopBoard(x) {
       return this.tetramino.row + x < 0;
     }
   
     animateTetramino() {
       const cells = document.querySelectorAll(".field-game>div");
       setTimeout(() => {
         this.checkedStyle([...cells]).forEach((cell, i) => {
           if (cell.classList.contains("clone")) return;
           setTimeout(() => this.addClass(cell, "animate-tetramino"), i * 2);
         });
       }, 100);
     }
   
     clearRow() {
       const rows = [];
   
       for (let i = this.rows - 1; i >= 0; i--) {
         let countBlock = 0;
   
         for (let j = 0; j < this.columns; j++) {
           if (this.cloneField[i][j] !== 0) {
             countBlock += 1;
           }
         }
   
         if (!countBlock) break;
         if (countBlock === this.columns) {
           rows.unshift(i);
           this.animateTetramino();
         }
       }
   
       rows.forEach((item) => {
         this.cloneField.splice(item, 1);
         this.cloneField.unshift(Array(this.columns).fill(0));
       });
   
       return rows.length;
     }
   
     calculateClonePosition() {
       const tetraminoRow = this.tetramino.row;
       this.tetramino.row++;
       while (this.isValidPosition()) {
         this.tetramino.row++;
       }
   
       this.tetramino.cloneRow = this.tetramino.row - 1;
       this.tetramino.cloneColumn = this.tetramino.column;
       this.tetramino.row = tetraminoRow;
     }
   }
   
   
   const tetris = new Tetris(document.querySelector(".wrap"), dataGame);
   
   // Main Game
   
   const body = document.body;
   const preloader = document.querySelector(".preloader");
   const innerWrap = document.querySelector(".inner-wrap");
   const blocks = document.querySelectorAll(".block");
   const blockStart = document.querySelector(".block__start");
   const blockControl = document.querySelector(".block__control");
   const blockPlay = document.querySelector(".block__play");
   const blockRestart = document.querySelector(".block__restart");
   const blockRepeat = document.querySelector(".block__repeat");
   const info = document.querySelector(".info");
   const wrap = document.querySelector(".wrap");
   const cells = document.querySelectorAll(".field-game>div");
   const nextCells = document.querySelectorAll(".next-content>div");
   const btnsGroup = document.querySelector(".btns-group");
   const btnsWrap = document.querySelector(".btns-wrap");
   const darkWrap = document.querySelector(".dark-wrap");
   const overlayWrap = document.querySelector(".overlay-wrap");
   
   let scatter = false;
   let requestID;
   let timeoutID;
   let hammer;
   
   const removeTetramino = () => {
     cells.forEach((cell) => {
       cell.removeAttribute("class");
       cell.removeAttribute("style");
     });
   
     addPlayField();
     addCloneTetramino();
     addTetramino();
     removeNextTetramino();
   };
   
   const addPlayField = () => {
     const { rows, columns } = tetris;
   
     for (let x = 0; x < rows; x++) {
       for (let y = 0; y < columns; y++) {
         if (!tetris.cloneField[x][y]) continue;
         const name = tetris.cloneField[x][y];
         const cellIdx = tetris.recalculatePositionToIndex(x, y);
         tetris.addClass(cells[cellIdx], "box-shadow");
         cells[cellIdx].style.backgroundColor = tetris.tetraminoColor[name];
       }
     }
   };
   
   const addCloneTetramino = () => {
     const { matrix, cloneColumn, cloneRow } = tetris.tetramino;
   
     for (let x = 0; x < matrix.length; x++) {
       for (let y = 0; y < matrix.length; y++) {
         if (!matrix[x][y]) continue;
         if (cloneRow + x < 0) continue;
         const cellIdx = tetris.recalculatePositionToIndex(
           x + cloneRow,
           y + cloneColumn
         );
         tetris.addClass(cells[cellIdx], "box-shadow");
         tetris.addClass(cells[cellIdx], "clone");
         cells[cellIdx].style.backgroundColor = tetris.tetraminoCloneColor;
       }
     }
   };
   
   const addTetramino = () => {
     const { name, matrix, column, row } = tetris.tetramino;
   
     for (let x = 0; x < matrix.length; x++) {
       for (let y = 0; y < matrix.length; y++) {
         if (!matrix[x][y]) continue;
         if (row + x < 0) continue;
         const cellIdx = tetris.recalculatePositionToIndex(x + row, y + column);
         tetris.addClass(cells[cellIdx], "box-shadow");
         cells[cellIdx].style.backgroundColor = tetris.tetraminoColor[name];
       }
     }
   };
   
   const removeNextTetramino = () => {
     nextCells.forEach((cell) => {
       cell.removeAttribute("class");
       cell.removeAttribute("style");
     });
   
     addNextTetramino();
   };
   
   const addNextTetramino = () => {
     const { name, matrix, column } = tetris.nextTetramino;
     const nextRow = -1;
   
     for (let x = 0; x < matrix.length; x++) {
       for (let y = 0; y < matrix.length; y++) {
         if (!matrix[x][y]) continue;
         const cellIdx = (x + nextRow) * tetris.nextColumns + (y + column);
         tetris.addClass(nextCells[cellIdx], "box-shadow");
         nextCells[cellIdx].style.backgroundColor = tetris.tetraminoColor[name];
       }
     }
   };
   
   const startLoop = () => {
     const time = 800 - 100 * tetris.level;
     timeoutID = setTimeout(
       () => (requestID = requestAnimationFrame(moveDown)),
       time > 100 ? time : 100
     );
   };
   
   const stopLoop = () => {
     cancelAnimationFrame(requestID);
     clearTimeout(timeoutID);
   };
   
   const gameOverAnimate = (cells) => {
     tetris.checkedStyle(cells).forEach((cell, i) => {
       setTimeout(() => tetris.addClass(cell, "animate-end"), i * 10);
       setTimeout(() => {
         cell.removeAttribute("class");
         cell.removeAttribute("style");
       }, i * 10 + 500);
     });
   };
   
   const createBtnsControl = (btn, name) => {
     if (btn === "btn-arrows" && !checkedTouch()) return;
     if (btn === "btn-keyboard" && checkedTouch()) return;
   
     return `
           <button class="${btn} block__btn btn-animated" type="button">
           <span></span>
         <span></span>
         <span></span>
         <span></span>
           ${name}
           </button>
       `;
   };
   
   const createBlock = ({ id, title, desc, btn, name }) => {
     const elemHtml = `
       <div class="block__result"></div>
          <div class="block__wrap">
               <h2 class="block__title title">${title}</h2>
               <p class="block__description">${desc}</p>
               <div class="block__btns--control">
                       ${Array.from(btn)
                 .map((item, i) => createBtnsControl(item, name[i]))
                 .join("")}
               </div>
             </div>
     `;
   
     const block = Array.from(blocks).find((item) => {
       const itemId = item.dataset.id;
       if (itemId !== id) return;
       return item;
     });
   
     block.textContent = "";
     block.insertAdjacentHTML("afterbegin", elemHtml);
   };
   
   const moduleBlock = (block) => {
     const id = block.dataset.id;
     tetris.moduleData.find((elem) => {
       if (elem.id !== id) return;
       createBlock(elem);
     });
   };
   
   const createModuleResult = (blockResult) => {
     const elemHtml = `
         <div class="block__content block__result--score">
           <p class="result-score">
             <span>Score: </span>${tetris.score}
           </p>
           <p class="result-record">
             <span>Record: </span>${tetris.record}
           </p>
       </div>
       `;
   
     if (!blockResult) return;
   
     blockResult.textContent = "";
     blockResult.insertAdjacentHTML("afterbegin", elemHtml);
   };
   
   const checkedTouch = () => {
     const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
       navigator.userAgent
     );
   
     return isMobile ? true : false;
   };
   
   const activeClassModule = () => {
     darkWrap.style.zIndex = 1;
     tetris.addClass(darkWrap, "dark");
     tetris.addClass(wrap, "blur");
   };
   
   const deactiveClassModule = () => {
     tetris.removeClass(darkWrap, "dark");
     tetris.removeClass(wrap, "blur");
     setTimeout(() => (darkWrap.style.zIndex = -1), 500);
   };
   
   const resetGame = () => {
     tetris.blockMeaning.textContent = "";
     tetris.blockScore.textContent = "";
     tetris.isGameOver = false;
   };
   
   const resetScore = () => {
     tetris.level = 1;
     tetris.lines = 0;
     tetris.score = 0;
   };
   
   const initRestart = () => {
     resetScore();
     resetGame();
     tetris.init();
     if (tetris.checkbox) {
       checkedTouch() ? startBtnsGame() : startKeyboardGame();
     } else {
       startTouchGame();
     }
   };
   
   const moveActions = () => {
     deactiveClassModule();
     setTimeout(startLoop, 500);
     if (tetris.checkbox) {
       checkedTouch() ? initBtns() : initKeyDown();
     } else {
       initTouch();
     }
   };
   
   const stopActions = () => {
     stopLoop();
     removeFullEvent();
     activeClassModule();
   };
   
   const resultBlocksModule = () => {
     document.querySelectorAll(".block__result").forEach((item) => {
       if (item.closest(".block__play")) {
         createModuleResult(item);
       }
       if (item.closest(".block__restart")) {
         createModuleResult(item);
       }
       if (item.closest(".block__control")) {
         createModuleResult(item);
       }
       if (item.closest(".block__repeat")) {
         createModuleResult(item);
       }
     });
   };
   
   const checkedGroupBtns = ({ target }) => {
     if (target.closest(".btn-pause")) {
       btnPauseGame();
       removeSideGroup();
       resultBlocksModule();
     }
   
     if (target.closest(".btn-restart")) {
       btnPrompt();
       removeSideGroup();
       resultBlocksModule();
     }
   
     if (target.closest(".btn-setting")) {
       btnSettingsControl();
       removeSideGroup();
       resultBlocksModule();
     }
   };
   
   const checkedWrapBtns = () => {
     if (checkedTouch()) {
       tetris.removeClass(btnsWrap, "hide");
       tetris.addClass(wrap, "add-animate");
       setTimeout(() => tetris.addClass(btnsWrap, "open"), 500);
     } else {
       tetris.removeClass(btnsWrap, "open");
       setTimeout(() => {
         tetris.addClass(btnsWrap, "hide");
         tetris.removeClass(wrap, "add-animate");
       }, 500);
     }
   };
   
   const playGame = () => {
     initControlGame();
     removeBtnControl();
     deactiveClassModule();
   };
   
   const startBtnsGame = () => {
     removeTouch();
     playGame();
     checkedWrapBtns();
     initBtns();
   };
   
   const startKeyboardGame = () => {
     removeTouch();
     playGame();
     initKeyDown();
   };
   
   const startTouchGame = () => {
     tetris.removeClass(btnsWrap, "open");
     setTimeout(() => {
       tetris.addClass(btnsWrap, "hide");
       tetris.removeClass(wrap, "add-animate");
     }, 500);
     removeWrapBtns();
     removeKeyboard();
     playGame();
     initTouch();
   };
   
   const checkedEventBtns = () => {
     Array.from(document.querySelectorAll(".block__btns--control")).forEach(
       (block) => {
         block.addEventListener("click", ({ target }) => {
           if (target.classList.contains("btn-info")) {
             btnInfoGame();
           }
   
           if (target.classList.contains("btn-start")) {
             btnControlGame();
           }
   
           if (target.classList.contains("btn-arrows")) {
             tetris.checkbox = true;
             startBtnsGame();
           }
   
           if (target.classList.contains("btn-keyboard")) {
             tetris.checkbox = true;
             startKeyboardGame();
           }
   
           if (target.classList.contains("btn-touch")) {
             tetris.checkbox = false;
             startTouchGame();
           }
         });
       }
     );
   };
   
   const closeInfoBtn = ({ target }) => {
     if (target.classList.contains("btn-close")) {
       scatterBtnControl();
   
       setTimeout(() => {
         tetris.removeClass(info, "open");
         tetris.removeClass(innerWrap, "hide");
   
         tetris.addClass(info, "hide");
         tetris.removeClass(innerWrap, "close");
       }, 500);
     }
   };
   
   const btnInfoGame = () => {
     scatterBtnControl();
   
     setTimeout(() => {
       tetris.removeClass(info, "hide");
       tetris.addClass(innerWrap, "close");
   
       tetris.addClass(info, "open");
       tetris.addClass(innerWrap, "hide");
     }, 500);
   };
   
   const scatterBtnControl = () => {
     tetris.addClass(overlayWrap, "scatter");
     setTimeout(() => tetris.removeClass(overlayWrap, "scatter"), 1000);
   };
   
   const removeBtnControl = () => {
     if (scatter) {
       scatterBtnControl();
       scatter = false;
   
       setTimeout(() => {
         tetris.removeClass(blockControl, "open");
         tetris.removeClass(wrap, "hide");
       }, 500);
     } else {
       tetris.removeClass(blockControl, "open");
       tetris.removeClass(wrap, "hide");
     }
   
     setTimeout(() => {
       tetris.addClass(blockControl, "hide");
       tetris.addClass(wrap, "open");
     }, 500);
   
     setTimeout(btnsSideGroup, 1000);
   };
   
   const btnControlGame = () => {
     scatter = true;
     scatterBtnControl();
   
     setTimeout(() => {
       tetris.removeClass(blockStart, "open");
       tetris.removeClass(blockControl, "hide");
   
       tetris.addClass(blockStart, "hide");
       tetris.addClass(blockControl, "open");
     }, 500);
   };
   
   const initModuleBlocks = () => {
     moduleBlock(blockStart);
     moduleBlock(blockControl);
     moduleBlock(blockPlay);
     moduleBlock(blockRestart);
     moduleBlock(blockRepeat);
   };
   
   const openModuleStart = () => {
     initModuleBlocks();
     initInfoBtn();
     tetris.removeClass(blockStart, "hide");
     setTimeout(() => {
       tetris.addClass(blockStart, "open");
     }, 1000);
   
     setTimeout(() => tetris.addClass(preloader, "close"), 1000);
     setTimeout(() => {
       preloader.style.zIndex = -1;
       tetris.addClass(preloader, "hide");
     }, 1500);
   
     checkedEventBtns();
   };
   
   const btnPlayGame = ({ target }) => {
     const btnPlay = document.querySelector(".btn-play");
   
     if (target.closest(".pause")) {
       tetris.removeClass(btnPlay, "pause");
       tetris.removeClass(blockPlay, "open");
   
       setTimeout(() => {
         tetris.addClass(blockPlay, "hide");
       }, 500);
   
       setTimeout(btnsSideGroup, 1000);
       moveActions();
     }
   };
   
   const btnPauseGame = () => {
     tetris.removeClass(blockPlay, "hide");
     const btnPlay = document.querySelector(".btn-play");
     tetris.addClass(btnPlay, "pause");
   
     setTimeout(() => {
       tetris.addClass(blockPlay, "open");
     }, 500);
   
     stopActions();
     btnPlay.addEventListener("click", btnPlayGame);
   };
   
   const cancelRestartGame = () => {
     tetris.removeClass(blockRestart, "open");
   
     setTimeout(() => {
       tetris.addClass(blockRestart, "hide");
     }, 500);
   
     setTimeout(btnsSideGroup, 1000);
     moveActions();
   };
   
   const btnRestartGame = () => {
     tetris.removeClass(blockRestart, "open");
     setTimeout(() => {
       tetris.addClass(blockRestart, "hide");
     }, 500);
     deactiveClassModule();
     gameOverAnimate([...cells]);
     gameOverAnimate([...nextCells]);
     const numberCells = tetris.checkedStyle([...cells]).length;
     setTimeout(() => {
       initRestart();
     }, numberCells * 10 + 500);
   };
   
   const btnPrompt = () => {
     tetris.removeClass(blockRestart, "hide");
   
     setTimeout(() => {
       tetris.addClass(blockRestart, "open");
     }, 500);
   
     stopActions();
     document
       .querySelector(".btn-restart")
       .addEventListener("click", btnRestartGame);
     document
       .querySelector(".btn-cancel")
       .addEventListener("click", cancelRestartGame);
   };
   
   const btnSettingsControl = () => {
     activeClassModule();
     tetris.removeClass(blockControl, "hide");
   
     setTimeout(() => {
       tetris.addClass(blockControl, "open");
     }, 500);
   
     stopLoop();
     removeFullEvent();
   };
   
   const btnRepeatGame = () => {
     tetris.removeClass(blockRepeat, "open");
     setTimeout(() => {
       tetris.addClass(blockRepeat, "hide");
       deactiveClassModule();
       initRestart();
     }, 500);
   };
   
   const blockGameOver = () => {
     activeClassModule();
     tetris.removeClass(blockRepeat, "hide");
   
     setTimeout(() => {
       tetris.addClass(blockRepeat, "open");
     }, 500);
   
     resultBlocksModule();
     document
       .querySelector(".btn-repeat")
       .addEventListener("click", btnRepeatGame);
   };
   
   const gameOver = () => {
     stopLoop();
     tetris.done = false;
     removeFullEvent();
     removeSideGroup();
     gameOverAnimate([...cells]);
     gameOverAnimate([...nextCells]);
     openModuleRepeat();
   };
   
   const openModuleRepeat = () => {
     const numberCells = tetris.checkedStyle([...cells]).length;
     setTimeout(blockGameOver, numberCells * 10 + 500);
   };
   
   const rotateСircle = () => {
     tetris.rotateTetraminoCircle();
     removeTetramino();
   };
   
   const moveRight = () => {
     tetris.moveTetraminoRight();
     removeTetramino();
   };
   
   const moveDown = () => {
     tetris.moveTetraminoDown();
     removeTetramino();
     stopLoop();
     startLoop();
   
     if (tetris.isGameOver) {
       gameOver();
     }
   };
   
   const dropDown = () => {
     tetris.dropTetrominoDown();
     removeTetramino();
     stopLoop();
     startLoop();
   
     if (tetris.isGameOver) {
       gameOver();
     }
   };
   
   const moveLeft = () => {
     tetris.moveTetraminoLeft();
     removeTetramino();
   };
   
   const onKeyDown = (event) => {
     const key = event.code;
     if (!tetris.done) return;
     switch (key) {
       case "ArrowUp":
         rotateСircle();
         break;
       case "ArrowRight":
         moveRight();
         break;
       case "ArrowDown":
         moveDown();
         break;
       case "Space":
         dropDown();
         break;
       case "ArrowLeft":
         moveLeft();
         break;
       default:
         return;
     }
   };
   
   const initTouch = () => {
     if (tetris.checkbox) return;
   
     document.addEventListener("dblclick", (event) => event.preventDefault());
   
     hammer = new Hammer(body);
     hammer.get("pan").set({ direction: Hammer.DIRECTION_ALL });
     hammer.get("swipe").set({ direction: Hammer.DIRECTION_ALL });
   
     const threshold = 30;
     let deltaX = 0;
     let deltaY = 0;
   
     hammer.on("panstart", () => {
       deltaX = 0;
       deltaY = 0;
     });
   
     hammer.on("panleft", (event) => {
       if (Math.abs(event.deltaX - deltaX) > threshold) {
         moveLeft();
         deltaX = event.deltaX;
         deltaY = event.deltaY;
       }
     });
   
     hammer.on("panright", (event) => {
       if (Math.abs(event.deltaX - deltaX) > threshold) {
         moveRight();
         deltaX = event.deltaX;
         deltaY = event.deltaY;
       }
     });
   
     hammer.on("pandown", (event) => {
       if (Math.abs(event.deltaY - deltaY) > threshold) {
         moveDown();
         deltaX = event.deltaX;
         deltaY = event.deltaY;
       }
     });
   
     hammer.on("swipedown", (event) => {
       dropDown();
     });
   
     hammer.on("tap", ({ target }) => {
       if (!target.closest(".btns-group")) {
         rotateСircle();
       }
     });
   };
   
   const stopMoveTetramino = () => {
     cancelAnimationFrame(tetris.reqRotate);
     clearTimeout(tetris.timeRotate);
     cancelAnimationFrame(tetris.reqRight);
     clearTimeout(tetris.timeRight);
     cancelAnimationFrame(tetris.reqDown);
     clearTimeout(tetris.timeDown);
     cancelAnimationFrame(tetris.reqLeft);
     clearTimeout(tetris.timeLeft);
   };
   
   const checkedStopped = () => {
     if (tetris.stopped) {
       stopMoveTetramino();
     }
   };
   
   const intervalRotate = () => {
     rotateСircle();
     tetris.timeRotate = setTimeout(
       () => (tetris.reqRotate = requestAnimationFrame(intervalRotate)),
       200
     );
     checkedStopped();
   };
   
   const intervalRight = () => {
     moveRight();
     tetris.timeRight = setTimeout(
       () => (tetris.reqRight = requestAnimationFrame(intervalRight)),
       140
     );
     checkedStopped();
   };
   
   const intervalDown = () => {
     moveDown();
     stopLoop();
     tetris.timeDown = setTimeout(
       () => (tetris.reqDown = requestAnimationFrame(intervalDown)),
       100
     );
     checkedStopped();
   };
   
   const intervalLeft = () => {
     moveLeft();
     tetris.timeLeft = setTimeout(
       () => (tetris.reqLeft = requestAnimationFrame(intervalLeft)),
       140
     );
     checkedStopped();
   };
   
   const checkedStartBtn = ({ target }) => {
     if (!tetris.checkbox || (!tetris.done && tetris.stopped)) return;
   
     tetris.stopped = false;
   
     if (target.closest(".btn-rotate")) {
       intervalRotate();
     }
   
     if (target.closest(".btn-right")) {
       intervalRight();
     }
   
     if (target.closest(".btn-down")) {
       intervalDown();
     }
   
     if (target.closest(".btn__drop--down")) {
       dropDown();
     }
   
     if (target.closest(".btn-left")) {
       intervalLeft();
     }
   };
   
   const checkedEndBtn = ({ target }) => {
     if (!tetris.checkbox || (!tetris.done && tetris.stopped)) return;
   
     if (target.closest(".btn-rotate")) {
       cancelAnimationFrame(tetris.reqRotate);
       clearTimeout(tetris.timeRotate);
     }
   
     if (target.closest(".btn-right")) {
       cancelAnimationFrame(tetris.reqRight);
       clearTimeout(tetris.timeRight);
     }
   
     if (target.closest(".btn-down")) {
       cancelAnimationFrame(tetris.reqDown);
       clearTimeout(tetris.timeDown);
       startLoop();
     }
   
     if (target.closest(".btn-left")) {
       cancelAnimationFrame(tetris.reqLeft);
       clearTimeout(tetris.timeLeft);
     }
   
     stopMoveTetramino();
   };
   
   const btnsSideGroup = () => {
     btnsGroup.addEventListener("click", checkedGroupBtns);
   };
   
   const removeSideGroup = () => {
     btnsGroup.removeEventListener("click", checkedGroupBtns);
   };
   
   const initKeyDown = () => {
     document.addEventListener("keydown", onKeyDown, { passive: true });
   };
   
   const initBtns = () => {
     btnsWrap.addEventListener("dblclick", (e) => e.preventDefault());
   
     btnsWrap.addEventListener("touchstart", checkedStartBtn, { passive: true });
     btnsWrap.addEventListener("touchend", checkedEndBtn, { passive: true });
   };
   
   const initInfoBtn = () => {
     info.addEventListener("click", closeInfoBtn);
   };
   
   const removeTouch = () => {
     if (!hammer) return;
     hammer.off("panstart panleft panright pandown swipedown tap");
   };
   
   const removeWrapBtns = () => {
     btnsWrap.removeEventListener("touchstart", checkedStartBtn);
     btnsWrap.removeEventListener("touchend", checkedEndBtn);
   };
   
   const removeKeyboard = () => {
     document.removeEventListener("keydown", onKeyDown);
   };
   
   const removeFullEvent = () => {
     removeTouch();
     removeWrapBtns();
     removeKeyboard();
   };
   
   const optimizationScreen = (point, size) => {
     if (point) {
       tetris.sizeBlock = size;
       tetris.sizeCellsFields();
     }
   };
   
   const eventChangeScreen = () => {
     tetris.mediaScreen.forEach((item) => {
       optimizationScreen(item.point.matches, item.size);
   
       item.point.addEventListener("change", (e) =>
         optimizationScreen(e.matches, item.size)
       );
     });
   };
   
   const initControlGame = () => {
     eventChangeScreen();
     removeTetramino();
     setTimeout(moveDown, 1000);
   };
   
    openModuleStart();
   
   });