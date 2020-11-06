"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var startBtn = document.querySelector("#startGame");
var tryAgainBtn = document.querySelector("#tryAgain");
var gameOverModal = document.querySelector(".gameOver");
var tiles = document.querySelectorAll(".tile");
var fails = document.querySelectorAll(".fail");
var roundDisplay = document.querySelector(".round");
var body = document.body;
var gameState = {
    round: 0,
    fails: 0,
    currentSequence: [],
    userSequence: [],
    userTurn: false,
};
var getRandomSequence = function (iterations) {
    var helperArr = [];
    for (var i = 0; i < iterations; i++) {
        var number = Math.floor(Math.random() * 4);
        helperArr.push(number);
    }
    gameState.currentSequence = __spreadArrays(helperArr);
    gameState.userSequence = __spreadArrays(helperArr);
};
var sleep = function (ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
var flash = function (i) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tiles[i].style.backgroundColor = "var(--grey)";
                return [4 /*yield*/, sleep(500)];
            case 1:
                _a.sent();
                tiles[i].style.backgroundColor = "var(--yellow)";
                return [4 /*yield*/, sleep(500)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var playSequence = function (sequence) { return __awaiter(void 0, void 0, void 0, function () {
    var i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sleep(1000)];
            case 1:
                _a.sent();
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < sequence.length)) return [3 /*break*/, 5];
                return [4 /*yield*/, flash(sequence[i])];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5:
                gameState.userTurn = true;
                return [2 /*return*/];
        }
    });
}); };
tiles.forEach(function (tile) {
    tile.addEventListener("click", function () {
        if (!gameState.userTurn) {
            return;
        }
        var tileNumber = Number(tile.id[4]);
        flash(tileNumber);
        if (tileNumber === gameState.userSequence[0]) {
            gameState.userSequence.shift();
        }
        else if (gameState.fails < 3) {
            fails[gameState.fails].classList.add("failed");
            gameState.fails += 1;
            gameState.userSequence = __spreadArrays(gameState.currentSequence);
            playSequence(gameState.currentSequence);
        }
        else {
            console.log("game over");
            gameOverModal.classList.add("visible");
        }
        if (gameState.userSequence.length === 0) {
            gameState.userTurn = false;
            gameState.round += 1;
            roundDisplay.innerHTML = "Round: " + gameState.round;
            getRandomSequence(gameState.round);
            playSequence(gameState.currentSequence);
        }
    });
});
var gameStart = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                gameState.userTurn = false;
                gameState.round = 1;
                gameState.fails = 0;
                roundDisplay.innerHTML = "Round: " + gameState.round;
                startBtn.style.animation = "none";
                startBtn.classList.add("hidden");
                body.classList.add("animateBackground");
                return [4 /*yield*/, sleep(2000)];
            case 1:
                _a.sent();
                getRandomSequence(1);
                playSequence(gameState.currentSequence);
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
                return [2 /*return*/];
        }
    });
}); };
startBtn.addEventListener("click", function () { return gameStart(); });
tryAgainBtn.addEventListener("click", function () {
    fails.forEach(function (fail) { return fail.classList.remove("failed"); });
    gameOverModal.classList.remove("visible");
    gameStart();
});
