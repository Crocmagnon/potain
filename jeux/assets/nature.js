const MAX_LEAVES = 1000;
let counter = MAX_LEAVES;

function loadLeaves() {
    for (let i = 0; i < MAX_LEAVES; i++) {
        const img = document.createElement("img");
        const moquette = document.getElementById("moquette");
        const id = Math.floor(Math.random() * 3) + 1;
        img.src = `images/feuille-${id}.png`;
        img.classList.add("hidden");
        img.addEventListener("mouseover", disappear);
        const maxTop = moquette.height - img.height;
        const maxLeft = moquette.width - img.width;
        const top = Math.floor(Math.random() * maxTop);
        const left = Math.floor(Math.random() * maxLeft);
        const angle = Math.floor(Math.random() * 360);
        img.style = `position: absolute; top: ${top}px; left: ${left}px; transform: rotate(${angle}deg);`;
        img.classList.remove("hidden");
        moquette.parentElement.appendChild(img);
    }
}

function disappear() {
    this.remove();
    counter--;
    if (counter <= 0) {
        counter = 0;
        win();
    }
}

loadLeaves();
