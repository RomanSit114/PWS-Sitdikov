// Определяем адрес WebSocket-сервера
const wsUri = "wss://echo-ws-service.herokuapp.com";
// Получаем ссылки на элементы HTML
const input = document.querySelector(".label__input");
const output = document.getElementById("output");
const btnOpen = document.querySelector('.j-btn-open');
const btnClose = document.querySelector('.j-btn-close');
const btnSend = document.querySelector('.j-btn-send');

let websocket;

// Функция для вывода сообщений на экран
function writeToScreen(message) {
    let pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
    output.appendChild(pre);
}
// Обработчик нажатия кнопки "Открыть соединение"
btnOpen.addEventListener('click', () => {
  // Создаем новое WebSocket-соединение
    websocket = new WebSocket(wsUri);
  // Устанавливаем обработчики событий
    websocket.onopen = function(evt) {
        writeToScreen("CONNECTED");
    };
    websocket.onclose = function(evt) {
        writeToScreen("DISCONNECTED");
    };
    websocket.onmessage = function(evt) {
        writeToScreen(
            '<span style="color: blue;">Сервер: ' + evt.data+'</span>'
        );
    };
    websocket.onerror = function(evt) {
        writeToScreen(
            '<span style="color: red;">ERROR:</span> ' + evt.data
        );
    };
});
// Обработчик нажатия кнопки "Закрыть соединение"
btnClose.addEventListener('click', () => {
    websocket.close();
    websocket = null;
});
// Обработчик нажатия кнопки "Отправить сообщение"
btnSend.addEventListener('click', () => {
  // Получаем текст сообщения из поля ввода и выводим его на экран
    const message = input.value;
    writeToScreen("Клиент: " + message);
  // Проверяем, что WebSocket-соединение определено и состояние соединения - WebSocket.OPEN
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      // Отправляем сообщение на сервер
        websocket.send(message);
    } else {
        writeToScreen('Сначала откройте соединение с сервером');
    }
});


const btnGeo = document.querySelector('.j-btn-geo');

// Функция, выводящая текст об ошибке
const error = () => {
    const message = 'Невозможно получить ваше местоположение';
    writeToScreen("Клиент: " + message);
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
// Формируем сообщение с геолокацией и отправляем его на сервер
    const message = `Широта: ${latitude} °, Долгота: ${longitude} °`;
    writeToScreen("Клиент: Геолокация");
    writeToScreen("<span style='color: blue;'>Сервер: https://www.openstreetmap.org/#map=18/" + latitude + "/" + longitude + "</span>");

}
// Обработчик нажатия кнопки "Геолокация"
btnGeo.addEventListener('click', () => {

    // Проверяем, что websocket определен и состояние соединения - WebSocket.OPEN
    if (!websocket || websocket.readyState !== WebSocket.OPEN) {
        writeToScreen('Сначала откройте соединение с сервером');
        return;
    }

    if (!navigator.geolocation) {
        writeToScreen('Geolocation не поддерживается вашим браузером');
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
});
