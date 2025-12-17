const phoneInput = document.querySelector('#phone_input')
const phoneBtn = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regex = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/;

console.log(phoneResult);
phoneBtn.addEventListener('click', () => {
    if(phoneInput.value.match(regex)){
        phoneResult.style.color = 'green';
        phoneResult.textContent = 'COOl'
    }else{
        phoneResult.style.color = 'red';
        phoneResult.textContent = 'NOT COOl'
    }
})


const tabBlocks = document.querySelectorAll('.tab_content_block');
const tabItems = document.querySelector('.tab_content_items');
const tabs = document.querySelectorAll('.tab_content_item');

const hideBlocks = () => {
  tabBlocks.forEach(block => {
    block.style.display = 'none'
  })
  tabs.forEach(btn => {
    btn.classList.remove('tab_content_item_active');
  })
}

const showBlock = (index = 0) => {
  tabBlocks[index].style.display = 'block';
  tabs[index].classList.add('tab_content_item_active')
}


hideBlocks();
showBlock(0);

tabItems.addEventListener('click', (event) => {
  if(event.target.tagName.toLowerCase() === 'button'){
    tabs.forEach((item, index) => {
      if(event.target == item){
        hideBlocks();
        showBlock(index);
      }
    })
  }
})


let currentIndex = 0;

setInterval(() => {
  currentIndex++;
  if (currentIndex >= tabBlocks.length) {
    currentIndex = 0;
  }
  hideBlocks();
  showBlock(currentIndex);

}, 5000); 


const usdInput = document.querySelector('#usd');
const eurInput = document.querySelector('#eur');
const somInput = document.querySelector('#som');

const converter = (element) => {
  element.oninput = () => {
    const requester = new XMLHttpRequest();
    requester.open('GET', '../data/converter.json');
    requester.setRequestHeader('Content-Type', 'application/json');
    requester.send();

  requester.onload = () => {
    if (requester.status >= 200 && requester.status < 400) {
    const response = JSON.parse(requester.response);

    if (element.id === 'som') {
      usdInput.value = (element.value / response.usd).toFixed(2);
      eurInput.value = (element.value / response.eur).toFixed(2);
    }
    if (element.id === 'usd') {
      somInput.value = (element.value * response.usd).toFixed(2);
      eurInput.value = ((element.value * response.usd) / response.eur).toFixed(2);
    }
    if (element.id === 'eur') {
      somInput.value = (element.value * response.eur).toFixed(2);
      usdInput.value = ((element.value * response.eur) / response.usd).toFixed(2);
    }

    if (element.value === '') {
      usdInput.value = '';
      somInput.value = '';
      eurInput.value = '';
    }

    } else {
      console.error('error');
    }
    };
  };
};

converter(usdInput);
converter(eurInput);
converter(somInput);


const btnNext = document.querySelector('#btn-next');
const btnPrev = document.querySelector('#btn-prev');
const card = document.querySelector('.card');

let todoId = 1;

btnNext.addEventListener('click', () => {
  todoId = (todoId % 200) + 1;

  fetch(`https:jsonplaceholder.typicode.com/todos/${todoId}`)
    .then(response => response.json())
    .then(data => {
      const color = data.completed ? 'green' : 'red';

      card.style.borderColor = color;
      card.innerHTML = `
        <p>${data.id}</p>
        <p>${data.title}</p>
        <p style="color:${color}">
          ${data.completed ? 'true' : 'false'}
        </p>
      `;
    });
});

btnPrev.onclick = () => {
  todoId = (todoId + 198) % 200 + 1;

  fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
    .then(res => res.json())
    .then(data => {
      const color = data.completed ? 'green' : 'red';
      card.style.borderColor = color;
      card.innerHTML = `
        <p>${data.id}</p>
        <p>${data.title}</p>
        <p style="color:${color}">${data.completed}</p>
      `;
    });
};

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json()) 
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Ошибка при запросе:', error);
  });
