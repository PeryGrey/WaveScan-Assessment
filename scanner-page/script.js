'use strict';

const header = document.querySelector('.name');
const availScanner = document.querySelector('.avail-scanner');
const scannerNum = document.querySelector('.scanner-num');
const scannerAvail = document.querySelector('.scanner-avail');

var scannerNo = 0;
var scannerNoAvail = 0;

let xhttp = new XMLHttpRequest();

const getScannerInfo = (responseData) => {
  let html;

  responseData.forEach(function (data, i) {

    html = `
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

    // when scanner isAvailable == true, add "available" css style on status text, and increment available scanner count in header 
    if (data.isAvailable === 'true') {
      (scannerStatus.classList.add('available'));
      scannerNoAvail++;
    }
    // when scanner isAvailable != true, add "engaged" to status text and "disable-btn" css style on btn
    else {
      scannerStatus.classList.add('engaged');
      scannerBtn.classList.add('disable-btn');
    }
    // increment total scanner count in header
    scannerNo++;

  })
  // update scanner counts
  scannerNum.textContent = String(scannerNo)
  scannerAvail.textContent = String(scannerNoAvail)

  // error message if no scanners available at all
  if (!scannerNo) {
    availScanner.classList.add('hide');
    html = `<p class="error-message">
    No scanners available currently. Try again later.
    </p>`
    header.insertAdjacentHTML("beforeend", html)
    header.style.paddingBottom = 0;
  }
  // error message if all available scanners are engaged
  else if (!scannerNoAvail) {
    html = `<p class="error-message">
    No scanners available currently. Try again later.
    </p>`
    header.insertAdjacentHTML("beforeend", html);
  }
}

//send GET request to get scanner details
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
    getScannerInfo(responseData);
  });
};

getData();
