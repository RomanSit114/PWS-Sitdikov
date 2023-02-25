const btn = document.querySelector('.form__submit');
let resultNode = document.querySelector('.output_pictures');

btn.addEventListener('click', () => {
    let value_1 = Number(document.querySelector('.input_value_1').value);
    let value_2 = Number(document.querySelector('.input_value_2').value);

    if ((value_1 >= 100 && value_1 <= 300) && (value_2 >= 100 && value_2 <= 300)) {
        fetch(`https://picsum.photos/${value_1}/${value_2}`)
            .then((response) => {
                resultNode.innerHTML = "";//необходимо для того, чтобы при повторном запросе новая картинка не наслаивалась на предыдущую
                const img = document.createElement('img');
                img.src = response.url;
                resultNode.appendChild(img);
            })
            .catch(() => { console.log('error') });
    } else {
        resultNode.innerHTML = 'Число НЕ находится в диапазоне от 100 до 300';
    }
})
