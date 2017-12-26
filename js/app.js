let game = {
    e: {
        playerScore: document.getElementById('p1S'),
        computerScore: document.getElementById('compS'),
        rock: document.getElementById("r"),
        paper: document.getElementById("p"),
        scissors: document.getElementById("s"),
        resultWrapper: document.getElementById("result-wrapper"),
        result: document.getElementById("result"),
        reset: document.getElementById("reset-btn"),
    },
    currentPlayerScore: 0,
    currentComputerScore: 0,
};

game.getComputerChoice = () => {
    /* Will return the computers choice */ 
    let computerChoices  = ["r", "p", "s"];
    
    return computerChoices[Math.floor(Math.random() * computerChoices.length)];
};

game.Game = (playerChoice) => {
    /* Switch statement with the player choice and computer choice */
    let computerChoice = game.getComputerChoice();
    
    switch (playerChoice + computerChoice) {
        /* Winning Possibilities */
        case "rs": 
        case "sp": 
        case "pr":
            game.e.result.innerHTML = `Opponent Chose ${game.convertReadable(computerChoice)}, You Win!`;
            game.e.resultWrapper.style.display = "block";
            game.update("player", playerChoice);
            game.reset();
            break;

        /* Losing Possiblities */
        case "rp":
        case "ps":
        case "sr":
            game.e.result.innerHTML = `Opponent Chose ${game.convertReadable(computerChoice)}, You Lose!`;
            game.e.resultWrapper.style.display = "block";
            game.update("computer", playerChoice);
            game.reset();
            break;

        /* Draw */
        case "rr":
        case "pp":
        case "ss":
            game.e.result.innerHTML = `Opponent Chose ${game.convertReadable(computerChoice)}, It's a Draw!`;
            game.e.resultWrapper.style.display = "block";
            game.reset();
            break;
    }
};

game.convertReadable = (choice) => {
    return (choice == "r") ? "rock"
           : choice == "p" ? "paper"
           : choice == "s" ? "scissors"
           : "error";
};  

// game.hideResult = () => {
//     setTimeout(() => {
//         game.e.resultWrapper.style.display = "none";
//     }, 2000);
// };

game.setPointerEvents = (type) => {
    for (let gc of document.querySelectorAll('.gcicon')) {
        gc.style.pointerEvents = type;
    }
};

game.update = (victor, playerChoice) => {
    game.setPointerEvents("none");
    if (victor === "player") {
        /* Update Score */
        game.currentPlayerScore++;
        game.e.playerScore.innerHTML = game.currentPlayerScore;

        /* Update Border Colour */
        game.updateBorder("green", playerChoice);

    } else {
        game.currentComputerScore++;
        game.e.computerScore.innerHTML = game.currentComputerScore;

        game.updateBorder("crimson", playerChoice);
    }
};

game.updateBorder = (color, playerChoice) => {
        if (playerChoice == "r") {
            game.e.rock.style.borderColor = color;
        } else if (playerChoice == "p") {
            game.e.paper.style.borderColor = color;
        } else if (playerChoice == "s") {
            game.e.scissors.style.borderColor = color;
        } else {
            throw new Error();
        }
};

game.reset = () => {
    setTimeout(() => {
        game.e.resultWrapper.style.display = "none";

        for (let gc of document.querySelectorAll('.gcicon')) {
            gc.style.borderColor = "white";
        }

        game.setPointerEvents("");
    }, 1500);
};

game.addListeners = () => {
    /* Each gcicon will run the Game function passing in the letter */
    game.e.rock.addEventListener("click", () => {
        game.Game("r");
    });

    game.e.paper.addEventListener("click", () => {
        game.Game("p");
    });

    game.e.scissors.addEventListener("click", () => {
        game.Game("s");
    });

    game.e.reset.addEventListener("click", () => {
        game.currentComputerScore = 0;
        game.currentPlayerScore = 0;

        game.e.playerScore.innerHTML = 0;
        game.e.computerScore.innerHTML = 0;
    });
};

game.init = () => {
    game.addListeners();
};

game.init();


/* Remove the animated class from the icons after 1 second after the window loads */

window.addEventListener("load", () => {
    setTimeout(() => {
        let gameicons = document.querySelectorAll('.gcicon');
        
        for (let gc of gameicons) {
            gc.classList.remove('animated');
        }
    }, 1000);
});