'use strict';

const card = document.querySelector('.card');
const projectName = document.querySelector('#project-name');
const scanningMode = document.querySelector('#scan-mode');
const scanningModeBox = document.querySelector('.chevron-down-input');
const chevronIcon = document.querySelector('.chevron-down');
const scanDimensionsX = document.querySelector('#dimension-x');
const scanDimensionsY = document.querySelector('#dimension-y');
const scannerFrequency = document.querySelector('#frequency');
const submitBtn = document.querySelector('.submit');

// correct input ticks
const tickP = document.querySelector('#proj-tick');
const tickS = document.querySelector('#scan-tick');
const tickX = document.querySelector('#x-tick');
const tickY = document.querySelector('#y-tick');
const tickF = document.querySelector('#freq-tick');

//to get error messages
const em0 = document.querySelector('#em0');
const em1 = document.querySelector('#em1');
const em2 = document.querySelector('#em2');
const em3 = document.querySelector('#em3');
const em4 = document.querySelector('#em4');
const em5 = document.querySelector('#em5');

// function to add correct tick icons, and remove error messages and error styling when valid inputs are entered
const individualCorrect = (tick, el, correct) => {

  // correct = 1, correct input
  if (correct) {
    tick.classList.remove('opacity');
    el.classList.add('correct-textbox');
    el.classList.remove('wrong-textbox');

    switch (el) {
      case projectName:
        em0.classList.add('hide');
        break;

      case scanningMode:
        em1.classList.add('hide');
        break;

      case scanDimensionsX:
        // when dimension x value and dimension y value are valid
        if (Number(scanDimensionsX.value) > 1 && Number.isInteger(Number(scanDimensionsX.value)) && !scanDimensionsY.classList.contains('wrong-textbox')) {
          em2.classList.remove('opacity');
          em2.classList.add('hide');
          em3.classList.remove('opacity');
          em3.classList.add('hide');
        }
        // when dimension x value is valid but dimension y value is invalid
        else if (Number(scanDimensionsX.value) > 1 && Number.isInteger(Number(scanDimensionsX.value)) && scanDimensionsY.classList.contains('wrong-textbox')) {
          em2.classList.add('opacity');
          em2.classList.remove('hide');
          em3.classList.remove('opacity');
          em3.classList.remove('hide');
        }
        break;

      case scanDimensionsY:
        // when dimension x value and dimension y value are valid
        if (Number(scanDimensionsY.value) > 1 && Number.isInteger(Number(scanDimensionsY.value)) && !scanDimensionsX.classList.contains('wrong-textbox')) {
          em3.classList.remove('opacity');
          em3.classList.add('hide');
          em2.classList.remove('opacity');
          em2.classList.add('hide');
        }
        // when dimension y value is valid but dimension x value is invalid
        else if (Number(scanDimensionsY.value) > 1 && Number.isInteger(Number(scanDimensionsY.value)) && scanDimensionsX.classList.contains('wrong-textbox')) {
          em3.classList.add('opacity');
          em3.classList.remove('hide');
          em2.classList.remove('opacity');
          em2.classList.remove('hide');
        }
        break;

      case scannerFrequency:
        // when frequency > 1
        if (Number(scannerFrequency.value) >= 1) {
          em4.classList.add('hide');
        }
        // when frequency has less than 2 
        if ((String(scannerFrequency.value).split('.')[1]?.length) <= 1 || String(scannerFrequency.value).split('.')[1] == undefined) {
          em5.classList.add('hide');
        }
        break;
    }

    // hide error messages when both dimension inputs are valid
    if (em2.classList.contains('opacity') && em3.classList.contains('opacity')) {
      em2.classList.add('hide');
      em2.classList.remove('opacity');
      em3.classList.add('hide');
      em3.classList.remove('opacity');
    }
  }

  // correct = 0, wrong input
  else if (!correct) {
    tick.classList.add('opacity');
    el.classList.remove('correct-textbox');
  }
}

// update error messages or add ticks when inputs are valid
projectName.addEventListener('input', function () {
  if (projectName.value.length >= 3) {
    individualCorrect(tickP, projectName, 1);
  }
  else {
    individualCorrect(tickP, projectName, 0);
  }
})

scanningMode.addEventListener('click', function () {
  if (scanningMode.value) {
    individualCorrect(tickS, scanningMode, 1);
    scanningModeBox.classList.remove('wrong-textbox')
    chevronIcon.classList.add('hide');

  }
  else {
    individualCorrect(tickS, scanningMode, 0);
    chevronIcon.classList.remove('hide');
  }
})

scanDimensionsX.addEventListener('input', function () {
  if (Number(scanDimensionsX.value) > 1 && Number.isInteger(Number(scanDimensionsX.value))) {
    individualCorrect(tickX, scanDimensionsX, 1);
  }
  else {
    individualCorrect(tickX, scanDimensionsX, 0);
  }
})

scanDimensionsY.addEventListener('input', function () {
  if (Number(scanDimensionsY.value) > 1 && Number.isInteger(Number(scanDimensionsY.value))) {
    individualCorrect(tickY, scanDimensionsY, 1);
  }
  else {
    individualCorrect(tickY, scanDimensionsY, 0);
  }
})

scannerFrequency.addEventListener('input', function () {
  if (
    (Number(scannerFrequency.value) > 1)
    &&
    ((String(scannerFrequency.value).split('.')[1]?.length < 2) || (String(scannerFrequency.value).split('.')[1]) == undefined)) {
    individualCorrect(tickF, scannerFrequency, 1);
  }
  else {
    individualCorrect(tickF, scannerFrequency, 0);
  }
})

// add invalid input style to input field
const individualCheck = (el) => {
  el.classList.add('wrong-textbox');
}

// check if inputs are wrong and add invalid input style to input field
const checkWrong = () => {

  if (projectName.value.length < 3) {
    individualCheck(projectName);
    em0.classList.remove('hide');
  }

  if (!scanningMode.value) {
    individualCheck(scanningModeBox);
    em1.classList.remove('hide');
  }

  if ((Number(scanDimensionsX.value) < 1 || !Number.isInteger(Number(scanDimensionsX.value))) && (Number(scanDimensionsY.value) > 1 && Number.isInteger(Number(scanDimensionsY.value)))) {

    individualCheck(scanDimensionsX);
    em2.classList.remove('opacity');
    em2.classList.remove('hide');
    em3.classList.add('opacity');
    em3.classList.remove('hide');
  }

  if ((Number(scanDimensionsY.value) < 1 || !Number.isInteger(Number(scanDimensionsY.value))) && (Number(scanDimensionsX.value) > 1) && Number.isInteger(Number(scanDimensionsX.value))) {

    individualCheck(scanDimensionsY);
    em3.classList.remove('opacity');
    em3.classList.remove('hide');
    em2.classList.add('opacity');
    em2.classList.remove('hide');
  }

  if ((Number(scanDimensionsX.value) < 1 || !Number.isInteger(Number(scanDimensionsX.value))) && (Number(scanDimensionsY.value) < 1 || !Number.isInteger(Number(scanDimensionsY.value)))) {
    individualCheck(scanDimensionsX);
    individualCheck(scanDimensionsY);
    em2?.classList.remove('hide');
    em2?.classList.remove('opacity');
    em3?.classList.remove('hide');
    em3?.classList.remove('opacity');
  }

  if (Number(scannerFrequency.value) < 1) {
    individualCheck(scannerFrequency);
    em4.classList.remove('hide');
  }

  if ((String(scannerFrequency.value).split('.')[1]?.length) > 1) {
    individualCheck(scannerFrequency);
    em5.classList.remove('hide');
  }
}

//send POST request to submit form inputs
// if status >= 400, stay on same page and display input that caused errors
// else, go to available scanner page
submitBtn.addEventListener('click', function (e) {
  e.preventDefault();

  let formInput = {
    projectName: String(projectName.value),
    scanningMode: scanningMode.options[scanningMode.selectedIndex].value,
    scanDimensionsX: Number(scanDimensionsX.value),
    scanDimensionsY: Number(scanDimensionsY.value),
    scannerFrequency: Number(scannerFrequency.value)
  };

  const sendHttpRequest = (method, url, data) => {
    const promise = new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      xhttp.open(method, url);
      xhttp.responseType = 'json';

      // I dont know how to fix the CORS error ;_;
      if (data) {
        // xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
        // xhttp.setRequestHeader('Access-Control-Allow-Credentials', 'true');
        xhttp.setRequestHeader('Content-Type', 'application/json');
      }

      xhttp.onload = () => {
        // if status >= 400, stay on same page and display input that caused errors
        if (xhttp.status >= 400) {
          reject(xhttp.response);
          checkWrong();
        }
        // else, go to available scanner page
        else {
          resolve(xhttp.response);
          location.href = "/scanner-page/scanner-page.html";
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



