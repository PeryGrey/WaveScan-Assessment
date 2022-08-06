'use strict';

const card = document.querySelector('.card');


const projectName = document.querySelector('#project-name');
const scanningMode = document.querySelector('#scan-mode');
const scanDimensionsX = document.querySelector('#dimension-x');
const scanDimensionsY = document.querySelector('#dimension-y');
const scannerFrequency = document.querySelector('#frequency');
const submitBtn = document.querySelector('.submit');

const tickP = document.querySelector('#proj-tick');
const tickX = document.querySelector('#x-tick');
const tickY = document.querySelector('#y-tick');
const tickF = document.querySelector('#freq-tick');

projectName.addEventListener('input', function () {
  if (projectName.value.length >= 3)
    tickP.classList.remove('hide');
  else
    tickP.classList.add('hide');
})

scanDimensionsX.addEventListener('input', function () {
  if (Number(scanDimensionsX.value) > 0)
    tickX.classList.remove('hide');
  else
    tickX.classList.add('hide');
})

scanDimensionsY.addEventListener('input', function () {
  if (Number(scanDimensionsY.value) > 0)
    tickY.classList.remove('hide');
  else
    tickY.classList.add('hide');
})

scannerFrequency.addEventListener('input', function () {
  if (Number(scannerFrequency.value) > 0)
    tickF.classList.remove('hide');
  else
    tickF.classList.add('hide');
})

submitBtn.addEventListener('click', function (e) {
  e.preventDefault();

  let formInput = {
    projectName: String(projectName.value),
    scanningMode: scanningMode.options[scanningMode.selectedIndex].value,
    scanDimensionsX: Number(scanDimensionsX.value),
    scanDimensionsY: Number(scanDimensionsY.value),
    scannerFrequency: Number(scannerFrequency.value)
  }

  const sendHttpRequest = (method, url, data) => {
    const promise = new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      xhttp.open(method, url);

      xhttp.responseType = 'json';

      if (data) {
        xhttp.setRequestHeader('Content-Type', 'application/json');
      }

      xhttp.onload = () => {
        if (xhttp.status >= 400) {
          reject(xhttp.response);
          card.classList.add('bad-form');
        } else {
          resolve(xhttp.response);
          location.href = "/scanner-page/scanner-page.html"
        }
      };

      xhttp.onerror = () => {
        reject('Something went wrong');
      };

      xhttp.send(JSON.stringify(data));
    });
    return promise;
  };

  const sendData = () => {
    sendHttpRequest(
      'POST',
      'https://wavescan-internship.saurabhmudgal.repl.co/submitForm',
      formInput
    )
      .then((responseData) => {
        console.log(responseData);

      })
      .catch((err) => {
        console.log(err);
      });
  };

  sendData();



})



