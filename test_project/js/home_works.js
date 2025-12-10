const gmailInput = document.querySelector('#gmail_input');
const gmailBtn = document.querySelector('#gmail_button');
const gmailResult = document.querySelector('#gmail_result');

const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //Здесь не только gmail.com можно ввести но и например mail.kg 

gmailBtn.addEventListener('click', () => {
    if(gmailInput.value.match(regex)){
        gmailResult.style.color = 'green';
        gmailResult.textContent = 'VALID';
    } else {
        gmailResult.style.color = 'red';
        gmailResult.textContent = 'INVALID';
    }
})



const childBlock = document.querySelector('.child_block');
const parentBlock = document.querySelector('.parent_block');

let moveLeft = 0;
let moveTop = 0;
let moveRight = 0;
let moveBottom = 0;



let offsetWidth = parentBlock.clientWidth - childBlock.offsetWidth;
let offsetHeight = parentBlock.clientHeight - childBlock.offsetHeight;

const move = () => {
    if(moveLeft < offsetWidth){
        moveLeft ++;
        childBlock.style.left = `${moveLeft}px`;
    }else if (moveLeft === offsetWidth && moveTop < offsetHeight){
        moveTop++;
        childBlock.style.top = `${moveTop}px`;
    }else if (moveTop === offsetHeight && moveRight < offsetWidth){
        moveRight++;
        childBlock.style.left = `${offsetWidth - moveRight}px`;
    }else if (moveRight === offsetWidth && moveBottom < offsetHeight){
        moveBottom++;
        childBlock.style.top = `${offsetHeight - moveBottom}px`;
    } else if (moveBottom === offsetHeight) {
        moveLeft = 0;
        moveTop = 0;
        moveRight = 0;
        moveBottom = 0;
    }
    requestAnimationFrame(move)
}

move();

const secondsBlock = document.querySelector("#seconds");
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const resetBtn = document.querySelector("#reset");

let seconds = 0;
let intervalId = null;

startBtn.addEventListener('click', ()=>{
    if(intervalId) return;
    intervalId = setInterval(() => {
        seconds++;
        secondsBlock.textContent = seconds;
    }, 1000)
})
stopBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;
})
resetBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;
    seconds = 0;
    secondsBlock.textContent = seconds;
})



const requester = new XMLHttpRequest();
requester.open("GET", "../data/characters.json");
requester.setRequestHeader("Content-type", "application/json");
requester.send();

requester.onload = () => {
    const data = JSON.parse(requester.response);
    console.log("JSON загружен:", data);

    const list = document.querySelector(".characters-list");

    data.forEach(person => {
        const card = document.createElement("div");
        card.classList.add("character-card");

        card.innerHTML = `
            <div class="character-photo">
                <img src="${person.photo}" alt="${person.name}">
            </div>
            <div class="character-info">
                <h3>${person.name}</h3>
                <p>Возраст: ${person.age}</p>
            </div>
        `;

        list.appendChild(card);
    });
};




const xhr = new XMLHttpRequest();
xhr.open('GET', './data/bio.json', true);
xhr.onload = function() {
    console.log(JSON.parse(xhr.responseText));
};
xhr.send();