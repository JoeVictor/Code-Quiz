//selecting all required elements
const startBtnEl = document.querySelector(".start-btn button");
const infoBoxEl = document.querySelector(".info-box");
const exitBtnEl = infoBoxEl.querySelector(".buttons .quit");
const continueBtnEl = infoBoxEl.querySelector(".buttons .restart");
const quizBoxEl = document.querySelector(".quiz-box");
const resultBoxEl = document.querySelector(".result-box");
const optionList = document.querySelector(".option-list");
const timeText = document.querySelector(".timer .time-left");
const timeCount = document.querySelector(".timer .timer-sec");
const initialInput = document.querySelector("#initials");
const submitButton = document.querySelector("#submit-button");
const messageEl = document.querySelector("#message");
const userInitial = document.querySelector("#user-initial");
const scoreEl = document.querySelector("#user-score");

// Arrow function when the startBtn is clicked
startBtnEl.onclick = ()=>{
    infoBoxEl.classList.add("activeInfo"); //Show the info box
}

//If Exit Quiz is clicked
exitBtnEl.onclick = ()=>{
    infoBoxEl.classList.remove("activeInfo"); //hide info box
}

// if continue button is clicled 
continueBtnEl.onclick = ()=>{
    infoBoxEl.classList.remove("activeInfo"); // Hide the info box
    quizBoxEl.classList.add("activeQuiz"); //Show Quiz box
    showQuetions(0); //Calling show questions function
    queCounter(1); // Passing 1 parameter to the queCounter
    startTimer(60); // Calling startTimer function
}

let timeValue =  60; // Timer
let questionCount = 0;
let questionNumber = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = resultBoxEl.querySelector(".buttons .restart");
const quit_quiz = resultBoxEl.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quizBoxEl.classList.add("activeQuiz"); //show quiz box
    resultBoxEl.classList.remove("activeResult"); //hide result box
    timeValue = 60; 
    questionCount = 0;
    questionNumber = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(questionCount); //Calling the showQuestions function
    queCounter(questionNumber); // Passing the number to the queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function 
    timeText.textContent = "Time Left"; //Adding textcontent to timerText = "Time left"
    next_btn.classList.remove("show"); //hide the next button
}

// If Quit button is clicked.
quit_quiz.onclick = ()=>{
    window.location.reload(); //reloads the current window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// If Next button is clicked
next_btn.onclick = ()=>{
    if(questionCount < questions.length - 1){ // Checks if question count is less than total question length
        questionCount++; // Then increment the questionCount value
        questionNumber++; // Then increment the questionNumber value to select each of them one by one
        showQuetions(questionCount); 
        queCounter(questionNumber); // Passing the number value to the counter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); // Calling the startTimer function
        timeText.textContent = "Time Left"; // Adding some text content again
        next_btn.classList.remove("show"); //Hiding the next button
    }else{ // If  questionCount is less than -1
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
}

// Getting the questions and the options from the questions.js array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    // It creates a new span and div tag for the questions and options and pass the value using the index from the array.
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>' // Creating div and span tags for the different options using the index from the array.
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; // Adding the new span into the queTag
    optionList.innerHTML = option_tag; //Adding the new div into the optionTag

    
    const option = optionList.querySelectorAll(".option");

    // Making the options clickable and selective
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// Creating the icons for whether is it correct or not.
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

// if user clicks on an option function
function optionSelected(answer){ // Passing a argument for the optionSelected(this) which is now (answer)
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; // It gets what user selected based on the options
    let correcAns = questions[questionCount].answer; // It gets the correct answer from the array
    const allOptions = optionList.children.length; // Getting all of the options
    
    if(userAns == correcAns){ //if user answer is correct 
        userScore += 1; // Increases user's score by 1
        answer.classList.add("correct"); // Adding correct for the option chosen
        answer.insertAdjacentHTML("beforeend", tickIconTag); // Adding the tick icon for the correct answer
        console.log("Correct Answer"); // Loging the Correct Answer
        console.log("Your correct answers = " + userScore); // Loging the user's score
    }else{ // If the questions are incorrect
        timeValue = timeValue - 15; // subtracting the time by 15 every time the user gets a wrong answer.
        answer.classList.add("incorrect"); // Add incorrect for the option chosen
        answer.insertAdjacentHTML("beforeend", crossIconTag); // Adding the cross icon for the incorrect answer

        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){ // A for loop for the options
            if(optionList.children[i].textContent == correcAns){ //If option matches a correct answer, then adds some text content for it  
                optionList.children[i].setAttribute("class", "option correct"); // SetAttribute for the correct option
                optionList.children[i].insertAdjacentHTML("beforeend", tickIconTag); // Adds the icon for the correct
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        optionList.children[i].classList.add("disabled"); // Once user selected an option then disable all of the other options
    }
    next_btn.classList.add("show"); // Showing the next button after user selected an option.
}

function showResult(){
    infoBoxEl.classList.remove("activeInfo"); // Hides info box
    quizBoxEl.classList.remove("activeQuiz"); // Hides quiz box
    resultBoxEl.classList.add("activeResult"); // Shows the result box
    const scoreText = resultBoxEl.querySelector(".score_text");
    if (userScore > 3){ // if user scored more than 3 questions
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>Congratulations! You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  // Adding the text content from scoreTag
    }
    else if(userScore > 1){ // if user scored more than 1 question
        let scoreTag = '<span>You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 1 question
        let scoreTag = '<span>You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function displayMessage(type, message){
    messageEl.textContent = message; 
    messageEl.setAttribute("class", type);
}

function previousScore(){
    const initials = localStorage.getItem("initials"); // Getting the value of initials from localStorage
    const previousScore = localStorage.getItem("userScore"); // Getting the value of userScore from localStorage
    if(!initials || !previousScore){ //If it's not initials or user's score return
        return;
    }
    userInitial.textContent = initials; // Adding text content for initials value
    scoreEl.textContent = previousScore; // Adding text content for user's score value
}

submitButton.addEventListener("click", function(e){ // Event listener on submit button
    e.preventDefault(); // Preventing the page from reloading
    const initials = document.querySelector("#initials").value; // Storing the value of initials in a variable
    if(initials === ""){ 
        displayMessage("error", "Enter an availabe name");
    }else{
        displayMessage("name registered!");
        localStorage.setItem("initials", initials);
        localStorage.setItem("userScore", userScore);
        previousScore();
    }
});

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; // Adding text content for timeCount using the time vaule
        time--;  // Decrements the time value 
        if(time < 9){ // If time is less than 9 then add some text content to timeCount.
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ // If time is less than 0 then clear interval, add text content for timerText. 
            clearInterval(counter); 
            timeText.textContent = "Time Off"; 
            const allOptions = optionList.children.length; // Getting all of the children from options and storing them into a variable
            let correcAns = questions[questionCount].answer; // Getting the correct answer from the array
            for(i=0; i < allOptions; i++){
                if(optionList.children[i].textContent == correcAns){ // If an index from the array of options equals to the correct answer then...
                    optionList.children[i].setAttribute("class", "option correct"); // set a attribute class with value ''option-correct''
                    optionList.children[i].insertAdjacentHTML("beforeend", tickIconTag); // then adds the icon for the correct answer 
                    console.log("Time Off: Auto selected correct answer."); // Logs the correct answer
                }
            }
            for(i=0; i < allOptions; i++){
                optionList.children[i].classList.add("disabled"); // Once user selected an option then disable all of the other options 
            }
            next_btn.classList.add("show"); // Show the next button if user selected an option
        }
    }
}


function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  // Adding text content for bottomQuesCounter
}