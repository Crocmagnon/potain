"use strict";

const GAME_NOT_STARTED = 0;
const GAME_STARTED = 1;
const GAME_WON = 2;
const GAME_LOST = 3;

let gameState = GAME_NOT_STARTED;

let zones = undefined;
let endTimeout = undefined;
let roundTimeout = undefined;
let timeBetween = 2000;
const MIN_TIME_BETWEEN = 1000;
const ACCELERATION = 100;

let score = 0;

(function () {
    zones = document.getElementsByClassName("zone");
    for (const zone of zones) {
        zone.addEventListener("click", event => {
            if (gameState !== GAME_STARTED) {
                return;
            }
            if (event.target.classList.contains("inactive")) {
                gameState = GAME_LOST;
                end();
            } else {
                event.target.style.transition = "";
                event.target.classList.remove("fade-out");
                event.target.classList.add("inactive");
                increment();
            }
        })
    }
})();

function start() {
    document.getElementsByTagName("button")[0].disabled = true;
    gameState = GAME_STARTED;
    endTimeout = setTimeout(end, 30_000);
    roundTimeout = setTimeout(round, 1);
}

function round() {
    if (gameState !== GAME_STARTED) {
        end();
        return;
    }

    let zone = zones[Math.floor(Math.random() * zones.length)];
    zone.classList.remove("inactive");
    setTimeout(function () {
        zone.style.transition = `background-color ${timeBetween-(MIN_TIME_BETWEEN / 2)}ms`;
        zone.classList.add("fade-out");
    }, MIN_TIME_BETWEEN / 2);
    let zoneTimeout = setTimeout(() => {
        if (!zone.classList.contains("inactive")) {
            console.log("lost because didn't click fast enough", zone.id);
            gameState = GAME_LOST;
            end();
        }
    }, timeBetween);
    zone.addEventListener("click", () => {clearTimeout(zoneTimeout)})

    // Recursive call
    timeBetween -= ACCELERATION;
    if (timeBetween <= MIN_TIME_BETWEEN) {timeBetween = MIN_TIME_BETWEEN;}
    roundTimeout = setTimeout(round, timeBetween);
}

function end() {
    clearTimeout(roundTimeout);
    clearTimeout(endTimeout);
    if (gameState === GAME_STARTED) {
        gameState = GAME_WON;
        document.getElementsByClassName("success stamp")[0].classList.remove("hidden");
    } else if (gameState === GAME_LOST) {
        document.getElementsByClassName("failure stamp")[0].classList.remove("hidden");
    }
}

function increment() {
    score++;
    document.getElementById("score").innerText = score.toString();
}
