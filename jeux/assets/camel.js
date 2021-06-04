let counter = new Set();
const MAX_DIFFS = 7;

function zone(name) {
    if (!counter.has(name)) {
        counter.add(name);
        const li = document.createElement("li");
        const content = document.createTextNode(name);
        li.appendChild(content);
        document.getElementById("found").appendChild(li);
    }
    displayCounter();
}

function displayCounter() {
    if (counter.size >= MAX_DIFFS) {
        win();
    }
    document.getElementById("counter").innerText = String(counter.size);
}
