//랜덤번호 지정
//유저가 번호를 입력한다. 그리고 go라는 버튼을 누른다
//만약에 유저가 랜덤 번호를 맞추면, 맞췄습니다!
//랜덤 번호 < 유저번호 Down!
//랜덤 번호 > 유저번호 Up!
//Reset 버튼을 누르면 게임이 리셋된다.
// 5번의 기회를 다쓰면 게임이 끝난다. (더이상 추측불가, 버튼이 disable)
//유저가 1~100 범위 밖의 숫자를 입력하면 알려준다. 기회를 깍지 않는다.
//유저가 이미 입력한 숫자를 또 입력하면 알려준다. 기회를 깍지 않는다.

let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history=[]

playButton.addEventListener("click",play); //click되면 play라는 함수 실행시킴 ,play를 변수처럼 넘기기 위해 ()사용x
resetButton.addEventListener("click",reset);
userInput.addEventListener("focus",function(){userInput.value=""}); //단순,다른 곳에 안쓸 때, 이름없는 함수 사용

function pickRandomNum(){
    computerNum = Math.floor(Math.random()*100)+1; // 1~50까지로 하려면 *50으로 해준다. 
    console.log("정답",computerNum);
}
function play(){
    let userValue = userInput.value;

    if(userValue <1 || userValue > 100){
        resultArea.textContent="1과 100사이의 숫자를 입력하세요";
        return;
    }
    if (history.includes(userValue)){
        resultArea.textContent="이미 입력한 숫자입니다. 다른 숫자를 입력해주세요";
        return;
    }
    chances --;
    chanceArea.textContent=`남은 기회:${chances}번`;
    console.log("chance", chances);

    if (userValue < computerNum){
        resultArea.textContent = "Up!!";
    }
    else if (userValue > computerNum){
        resultArea.textContent = "Down!";
    }
    else {
        resultArea.textContent = ("맞췄습니다!!");
        gameOver = true;
    }
    history.push(userValue); //history에 저장
    

    if (chances < 1){
        gameOver=true;
    }
    if (gameOver == true){ //변수나 표현식을 사용할 때, 그 값이 참(true)으로 평가될 경우 조건이 충족->if (gameOver)로 대체가능
        playButton.disabled = true;
    }
}
function reset(){
    userInput.value = "";
    pickRandomNum();

    resultArea.textContent="결과값이 여기 나옵니다!";
}
pickRandomNum();
