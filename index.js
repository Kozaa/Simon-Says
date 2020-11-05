"use strict";
var startBtn = document.querySelector(".btn");
var tiles = document.querySelectorAll(".tile");
var fails = document.querySelectorAll(".fail");
var round = document.querySelector(".score");
var body = document.body;
var gameState = {
    started: false,
    round: 0,
    fails: 0,
    currentSequence: null,
};
var getRandomSequence = function (iterations) {
    var helperArr = [];
    for (var i = 0; i < iterations; i++) {
        var number = Math.floor(Math.random() * 4);
        helperArr.push(number);
    }
    gameState.currentSequence = helperArr;
    return helperArr; // 0 - 3
};
var mainGameLoop = function (round) {
    console.log("started");
    startBtn.classList.add("hidden");
    body.classList.add("animateBackground");
    gameState.started = true;
    getRandomSequence(round + 1);
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};
startBtn.addEventListener("click", function () { return mainGameLoop(gameState.round); });
