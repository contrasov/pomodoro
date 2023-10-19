document.addEventListener("DOMContentLoaded", function () {
    const pomodoroBtn = document.querySelector(".pomodoro-btn");
    const timerElement = document.getElementById("timer");

    function setPomodoroTime() {
        const minutes = 25;
        timerElement.textContent = `${minutes}:00`;
    }

    pomodoroBtn.addEventListener("click", setPomodoroTime);
});

document.addEventListener("DOMContentLoaded", function () {
    const pequenaPausaBtn = document.querySelector(".pequena-pausa-btn");
    const timerElement = document.getElementById("timer");

    function setPequenaPausaTime() {
        const minutes = 5;
        timerElement.textContent = `0${minutes}:00`;
    }

    pequenaPausaBtn.addEventListener("click", setPequenaPausaTime);
});

document.addEventListener("DOMContentLoaded", function () {
    const longaPausaBtn = document.querySelector(".pausa-longa-btn");
    const timerElement = document.getElementById("timer");

    function setLongaPausaTime() {
        const minutes = 10;
        timerElement.textContent = `${minutes}:00`;
    }

    longaPausaBtn.addEventListener("click", setLongaPausaTime);
});

document.addEventListener("DOMContentLoaded", function() {
    const icon = document.getElementById("icon-r");
    let audio; 

    icon.addEventListener("click", function() {
        if (!audio) {
            audio = new Audio("/src/songs/chuva.mp3");
            audio.volume = 0.01; 
            audio.loop = true;
        }

        if (audio.paused) {
            audio.play();
            icon.classList.add("active2"); // Adicione a classe "active" para definir o estilo de fundo branco
        } else {
            audio.pause();
            icon.classList.remove("active2"); // Remova a classe "active" para restaurar o estilo original
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const icon = document.getElementById("icon-k");
    let audio; 

    icon.addEventListener("click", function() {
        if (!audio) {
            audio = new Audio("/src/songs/teclado.mp3");
            audio.volume = 0.02; 
            audio.loop = true;
        }

        if (audio.paused) {
            audio.play();
            icon.classList.add("active"); // Adicione a classe "active" para definir o estilo de fundo branco
        } else {
            audio.pause();
            icon.classList.remove("active"); // Remova a classe "active" para restaurar o estilo original
        }
    });
});



document.addEventListener("DOMContentLoaded", function() {
    const icon = document.getElementById("icon");
    const menu = document.getElementById("menu");
    const carousel = document.querySelector(".carousel");

    icon.addEventListener("click", function() {
        if (menu.style.display === "block") {
            menu.style.display = "none"; // Fecha o menu
            icon.classList.remove("active3");
        } else {
            menu.style.display = "block"; // Abre o menu
            icon.classList.add("active3");

            $(carousel).slick({
                slidesToShow: 1,
                arrows: true, 
            });
        }
    });
});



//////////////////////Contagem Regressiva//////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
    const startBtn = document.querySelector(".start-btn");
    const pomodoroBtn = document.querySelector(".pomodoro-btn");
    const pequenaPausaBtn = document.querySelector(".pequena-pausa-btn");
    const longaPausaBtn = document.querySelector(".pausa-longa-btn");
    const timerElement = document.getElementById("timer");
    let timerInterval;
    let isRunning = false;

    function resetButtonStyles() {
        pomodoroBtn.classList.remove("selected");
        pequenaPausaBtn.classList.remove("selected");
        longaPausaBtn.classList.remove("selected");
        
        // Adicione a classe "not-selected" a todos os botões
        pomodoroBtn.classList.add("not-selected");
        pequenaPausaBtn.classList.add("not-selected");
        longaPausaBtn.classList.add("not-selected");
    }

    function setPomodoroTime() {
        resetButtonStyles();
        pomodoroBtn.classList.remove("not-selected");
        pomodoroBtn.classList.add("selected");

        const minutes = 25;
        timerElement.textContent = `${minutes}:00`;
    }

    function setPequenaPausaTime() {
        resetButtonStyles();
        pequenaPausaBtn.classList.remove("not-selected");
        pequenaPausaBtn.classList.add("selected");

        const minutes = 5;
        timerElement.textContent = `0${minutes}:00`;
    }

    function setLongaPausaTime() {
        resetButtonStyles();
        longaPausaBtn.classList.remove("not-selected");
        longaPausaBtn.classList.add("selected");

        const minutes = 10;
        timerElement.textContent = `${minutes}:00`;
    }

    pomodoroBtn.addEventListener("click", setPomodoroTime);
    pequenaPausaBtn.addEventListener("click", setPequenaPausaTime);
    longaPausaBtn.addEventListener("click", setLongaPausaTime);

    startBtn.addEventListener("click", function () {
        if (!isRunning) {
            const timerText = timerElement.textContent;
            const [minutes, seconds] = timerText.split(":").map(Number);
            const totalTimeInSeconds = minutes * 60 + seconds;

            if (totalTimeInSeconds > 0) {
                startTimer(totalTimeInSeconds);
                startBtn.textContent = "PAUSAR";
                isRunning = true;
            }
        } else {
            clearInterval(timerInterval);
            startBtn.textContent = "CONTINUAR";
            isRunning = false;
        }
    });

    function startTimer(totalTimeInSeconds) {
        let remainingTime = totalTimeInSeconds;

        timerInterval = setInterval(function () {
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;
            timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            remainingTime--;

            if (remainingTime < 0) {
                clearInterval(timerInterval);
                timerElement.textContent = "00:00";
                startBtn.textContent = "INICIAR";
                isRunning = false;

                const alarmSound = new Audio('/src/songs/1.mp3');
                alarmSound.play();
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
        startBtn.textContent = "INICIAR";
        isRunning = false;
    }

    pomodoroBtn.addEventListener("click", function () {
        stopTimer();
        timerElement.textContent = "25:00";
    });

    pequenaPausaBtn.addEventListener("click", function () {
        stopTimer();
        timerElement.textContent = "05:00";
    });

    longaPausaBtn.addEventListener("click", function () {
        stopTimer();
        timerElement.textContent = "10:00";
    });
});
