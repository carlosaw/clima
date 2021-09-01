document.querySelector('.busca').addEventListener('submit', async (e)=>{
  e.preventDefault();
  // Pega o que foi digitado
  let input = document.querySelector('#searchInput').value;

  if(input !== '') {
    showWarning('Carregando...');

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=5aa8f1ba8dacd427c441f0bc3d7ac4e6&units=metric&lang=pt_br`;

    let results = await fetch(url);// Faz requisição
    let json = await results.json();// Pega resultado e transforma em json

    if(json.cod === 200) {
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg
      });
    } else {
      clearInfo();// Limpa a tela
      showWarning('Não encontramos esta localização!');// Mostra aviso
    }
  } else {
    clearInfo();
  }
});

function clearInfo() {
  showWarning('');// Tira o Carregando...
  // Tira a div das informações
  document.querySelector('.resultado').style.display = 'none';
}

function showInfo(json) {
  showWarning('');// Tira o Carregando...

  // Mostra a cidade e o país
  document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
  // Mostra a temperatura
  document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
  // Mostra velocidade do vento
  document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
  // Mostra a imagem do sol ou nuvens
  document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
  // Mostra a direção do vento
  document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;
  //Mostra resultado
  document.querySelector('.resultado').style.display = 'block';
}

function showWarning(msg) {
  document.querySelector('.aviso').innerHTML = msg;
}