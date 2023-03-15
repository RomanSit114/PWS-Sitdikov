const btn = document.querySelector('.button-test');

width = window.screen.width;
height = window.screen.height;

btn.addEventListener('click', () => {

  window.alert(`Ширина: ${width}, длина: ${height}`);
 
});
