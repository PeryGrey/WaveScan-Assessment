'use strict';

const availScanner = document.querySelector('.avail-scanner');
const scannerNum = document.querySelector('.scanner-num');

let xhttp = new XMLHttpRequest();

var scannerNo = 0;

const sendHttpRequest = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open(method, url);

    xhttp.responseType = 'json';

    xhttp.onload = () => {
      resolve(xhttp.response);
    };

    xhttp.send();
  });
  return promise;
};

const getData = () => {
  sendHttpRequest(
    'GET',
    'https://wavescan-internship.saurabhmudgal.repl.co/success'
  ).then((responseData) => {
    console.log(responseData);



    responseData.forEach(function (data, i) {

      const html = `
      <p class="scanner-name">${data.scannerName.split(' ')[0].replace(/([A-Z])/g, ' $1').trim()}</p>
      <p class="ip">${data.ipAddress}</p>
      <p class="speed">${data.scannerSpeed} m/s</p>
      <p id="status${i}">${(data.isAvailable) === 'true' ? 'Available' : 'Engaged'}</p>
      <button id="scanner-btn${i}"  class="btn" >Connect</button>
      <div class="row-border"></div>
      `;

      availScanner.insertAdjacentHTML("beforeend", html)

      let scannerStatus = document.querySelector(`#status${i}`);
      let scannerBtn = document.querySelector(`#scanner-btn${i}`);

      if (data.isAvailable === 'true')
        (scannerStatus.classList.add('available'))
      else {
        scannerStatus.classList.add('engaged');
        scannerBtn.classList.add('disable-btn');
      }

      scannerNo = i;

    })
    scannerNum.textContent = String(++scannerNo)
  });
};

getData();
