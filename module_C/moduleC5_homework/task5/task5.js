let value_1 = document.querySelector('.input_value_1');
let value_2 = document.querySelector('.input_value_2');

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

let button = document.querySelector(".form__submit");
let resultNode = document.querySelector('.output_pictures');
let lastRequest = JSON.parse(localStorage.getItem('lastRequest'));

function displayResult(apiData) {
  let cards = '';

  if ((value_1.value >= 1 && value_1.value <= 10 && !isNaN(value_1.value)) && (value_2.value >= 1 && value_2.value <= 10 && !isNaN(value_2.value))){
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

    // Сохраняем данные в localStorage
    let requestData = {page: value_1.value, limit: value_2.value, data: apiData};
    localStorage.setItem('lastRequest', JSON.stringify(requestData));
  } else if ((value_1.value >= 1 && value_1.value <= 10  && !isNaN(value_1.value)) && (value_2.value <= 1 || value_2.value >= 10  || isNaN(value_2.value))){
    let cardBlock=`
      <div class="card">
        <p>Лимит вне диапазона от 1 до 10</p>
      </div>
    `;
    cards = cards + cardBlock;
  }
  
  else if ((value_1.value <= 1 || value_1.value >= 10 || isNaN(value_1.value)) && (value_2.value >= 1 && value_2.value <= 10 && !isNaN(value_2.value))){
    let cardBlock=`
      <div class="card">
        <p>Номер страницы вне диапазона от 1 до 10</p>
      </div>
    `;
    cards = cards + cardBlock;
  }
  
  else {
    let cardBlock=`
      <div class="card">
        <p>Номер страницы и лимит вне диапазона от 1 до 10</p>
      </div>
    `;
    cards = cards + cardBlock;
  }

  resultNode.innerHTML = cards;
}

// Если есть последний успешный запрос, то загружаем его результат
if (lastRequest) {
  value_1.value = lastRequest.page;
  value_2.value = lastRequest.limit;
  displayResult(lastRequest.data);
}

button.onclick = function () {
  useRequest(`https://picsum.photos/v2/list?page=${value_1.value}&limit=${value_2.value}`, displayResult);
}
