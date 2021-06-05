let counter = new Set();
const MAX_DIFFS = 7;
const foundDisplay = [];

(function () {
    const found = document.getElementById("found");
    for (let i = 0; i < MAX_DIFFS; i++) {
        const li = document.createElement("li");
        foundDisplay.push(li);
        found.appendChild(li);
    }
})();

function zone(name) {
    if (!counter.has(name)) {
        const content = document.createTextNode(name);
        const li = foundDisplay[counter.size];
        li.appendChild(content);
        counter.add(name);
    }
    displayCounter();
}

function displayCounter() {
    if (counter.size >= MAX_DIFFS) {
        win();
    }
    document.getElementById("counter").innerText = String(counter.size);
}
