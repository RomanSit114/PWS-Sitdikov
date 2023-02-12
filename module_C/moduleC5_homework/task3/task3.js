function useRequest(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  
  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    } else {
      let result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
    }
  };
  
  xhr.onerror = function() {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };
  
  xhr.send();
}

let inputIn = document.querySelector('.label__input');
let button = document.querySelector(".form__submit");
let resultNode = document.querySelector('.output_pictures');

function displayResult(apiData) {
  let cards = '';
  if (1 <= num && num <= 10){
    apiData.forEach(item => {
    let cardBlock=`
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
        <p>${item.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
  });
  } else {
    let cardBlock=`
      <div class="card">
        <p>число вне диапазона от 1 до 10</p>
      </div>
    `;
    cards = cards + cardBlock;
  }
  
  resultNode.innerHTML = cards;
}

button.onclick = function () {
  num = Number(inputIn.value);
    useRequest(`https://picsum.photos/v2/list?limit=${num}`, displayResult);
}
