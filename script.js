function game(){
    const actions = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    const userWinResults = ['scissorspaper', 'paperrock', 'rocklizard', 'lizardspock', 'spockscissors', 'rockscissors', 'scissorslizard', 'lizardpaper', 'paperspock', 'spockrock'];
    let userChoice = '';
    let compChoice = '';
    const userChoiceElement = document.querySelector('.game_play');
    const pickedElement = document.querySelector('.icon_picked');
    const userPickedElement = document.querySelector('.user_pick');
    const compPickElement = document.querySelector('.comp_pick');
    const resultElement = document.querySelector('.result');
    const resultTitleElement = resultElement.querySelector('.title');
    let currentScore = null;
    const scoreCountElement = document.querySelector('.score_number');
    window.addEventListener('load', () =>{
        retrieveScoreFromLocalStorage();

        document.querySelectorAll('.game_play .game_card').forEach(card =>{
            card.addEventListener('click', (ev) =>{
                userChoice = getUserChoice(ev.target);
                compChoice = getComputerChoice();

                startGame();
            })
        });

        resultElement.querySelector('button').addEventListener('click', tryAgain);
    })
    
    function startGame(){
    calculateWinner(userChoice, compChoice);
    userChoiceElement.classList.add('hidden');
    pickedElement.classList.remove('hidden');
    clearResultB4Append();
    buildChoiceElement(true, userChoice);
    buildChoiceElement(false, compChoice);
    
    }
    
    function getUserChoice(target){
    console.log(target);
    if(target.nodeName === 'IMG'){
        return target.parentElement.classList[1];
    }
    return target.classList[1];
    }
    
    function getComputerChoice(){
        return actions[Math.floor(Math.random()*5)];
    }

    function calculateWinner(user, comp){
        if(user === comp){
            resultTitleElement.innerText = 'Tie';
        }else if(getUserWinStatus(user + comp)){
            resultTitleElement.innerText = 'You win';
            calculateScore(1);
        }else{
            resultTitleElement.innerText = 'You lose';
            calculateScore(-1);
        }
    }
    function getUserWinStatus(result){
        return userWinResults.some(winStr => winStr === result);
    }

    function buildChoiceElement(isItUserElement, className){
       const el = document.createElement('div');
       el.classList = [`game_card ${className}`];
       el.innerHTML = `<img src="/rock-paper-scissors-master/rock-paper-scissors-master/images/icon-${className}.svg" alt="${className}">`;
       if(isItUserElement){
        userPickedElement.append(el);
       }else{
        compPickElement.append(el);
       }
    }

    function tryAgain(){
        userChoiceElement.classList.remove('hidden');
    pickedElement.classList.add('hidden');
    }

    function clearResultB4Append(){
        userPickedElement.innerHTML = "";
        compPickElement.innerHTML = "";
    }

    function calculateScore(roundResult){
        currentScore += roundResult;
        updateScoreBoard();
    }

    function retrieveScoreFromLocalStorage(){
        const score = window.localStorage.getItem('gameScore') || 0;
        currentScore = score;
        updateScoreBoard();
    }

    function updateScoreBoard(){
        scoreCountElement.innerHTML = currentScore;
        window.localStorage.setItem('gameScore', currentScore);
    }

    //work with modal
    const rulesBtn = document.querySelector('.rules_btn');
    const modalBg = document.querySelector('.modal_el');
    const modal = document.querySelector('.modal');

    rulesBtn.addEventListener('click', ()=>{
        modal.classList.add('active');
        modalBg.classList.add('active');
    });

    modalBg.addEventListener('click', (event) =>{
        if(event.target === modalBg){
            hideModal();
        }
    })
    document.querySelector('.close').addEventListener('click', hideModal);

    function hideModal(){
        modal.classList.remove('active');
        modalBg.classList.remove('active');
    }
}
game();