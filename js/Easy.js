let firstCard = null;
let secondCard = null;
let attempts = 0;
let timer;
let time = 0;
let timerStarted = false; // لم يبدأ بعد

const cardsData = [
    { icon: "./image/bee.webp", name: "bee" },
    { icon: "./image/Ant.webp", name: "Ant" },
    { icon: "./image/Butterfly.webp", name: "Butterfly" },
    { icon: "./image/Spider.webp", name: "Spider" }
    
];

const gameContainer = document.getElementById("card-grid");
const attemptsCount = document.getElementById("attempts");
const timerDisplay = document.getElementById("timer");
const resetButton = document.getElementById("reset");

function startTimer() {
    timer = setInterval(() => {
        time++;
        let minutes = String(Math.floor(time / 60)).padStart(2, '0');
        let seconds = String(time % 60).padStart(2, '0');
        timerDisplay.textContent = `${minutes}:${seconds}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function checkWin() {
    const matchedCards = document.querySelectorAll(".matched");
    if (matchedCards.length === cardsData.length * 2) {
        stopTimer();
        setTimeout(() => {
            alert(`Congratulations 🎉, you won the game after ${attempts} attempts and a time of ${timerDisplay.textContent} ⏱️`);
        }, 300);
    }
}

function setupBoard() {
    gameContainer.innerHTML = "";
    const allCards = [...cardsData, ...cardsData]
        .sort(() => 0.5 - Math.random());

    allCards.forEach(data => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.name = data.name;
        card.innerHTML = "?";

        card.addEventListener("click", () => {
            // بدء المؤقت عند أول كليك
            if (!timerStarted) {
                startTimer();
                timerStarted = true;
            }

            if (card.classList.contains("flipped") || card.classList.contains("matched")) return;

            card.classList.add("flipped");

            //  تمييز بين الصورة 
            if (data.icon.endsWith(".png") || data.icon.endsWith(".jpg") || data.icon.endsWith(".jpeg") || data.icon.endsWith(".webp")) {
                const img = document.createElement("img");
                img.src = data.icon;
                img.alt = data.name;
                img.style.width = "50px";
                img.style.height = "50px";
                card.innerHTML = "";
                card.appendChild(img);
            }

            if (!firstCard) {
                firstCard = card;
            } else {
                secondCard = card;
                attempts++;
                attemptsCount.textContent = attempts;

                if (firstCard.dataset.name === secondCard.dataset.name) {
                    firstCard.classList.add("matched");
                    secondCard.classList.add("matched");
                    firstCard = null;
                    secondCard = null;
                    checkWin();
                } else {
                    setTimeout(() => {
                        firstCard.classList.remove("flipped");
                        secondCard.classList.remove("flipped");
                        firstCard.textContent = "?";
                        secondCard.textContent = "?";
                        firstCard = null;
                        secondCard = null;
                    }, 800);
                }
            }
        });

        gameContainer.appendChild(card);
    });

    // إعادة تعيين الوقت والمحاولات
    stopTimer();
    time = 0;
    timerDisplay.textContent = "00:00";
    timerStarted = false;
    attempts = 0;
    attemptsCount.textContent = attempts;
}

resetButton.addEventListener("click", () => {
    setupBoard();
});

setupBoard();
