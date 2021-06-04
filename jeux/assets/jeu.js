let timeout;

function win() {
    clearTimeout(timeout);
    document.querySelector(".failure").classList.add("hidden");
    document.querySelector(".success").classList.remove("hidden");
}

function lose() {
    clearTimeout(timeout);
    document.querySelector(".success").classList.add("hidden");
    let failure = document.querySelector(".failure");
    failure.classList.remove("hidden");
    timeout = setTimeout(() => {
        failure.classList.add("hidden");
    }, 5*1000);
}
