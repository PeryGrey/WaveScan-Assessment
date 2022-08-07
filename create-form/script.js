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
        if (Number(scanDimensionsX.value) > 1 && !scanDimensionsY.classList.contains('wrong-textbox')) {
          console.log('Case1');
          em2.classList.remove('opacity');
          em2.classList.add('hide');
          em3.classList.remove('opacity');
          em3.classList.add('hide');
        }
        else if (Number(scanDimensionsX.value) > 1 && scanDimensionsY.classList.contains('wrong-textbox')) {
          console.log('Case2');

          em2.classList.add('opacity');
          em2.classList.remove('hide');
          em3.classList.remove('opacity');
          em3.classList.remove('hide');
        }
        break;

      case scanDimensionsY:
        if (Number(scanDimensionsY.value) > 1 && !scanDimensionsX.classList.contains('wrong-textbox')) {
          console.log('Case3');

          em3.classList.remove('opacity');
          em3.classList.add('hide');
          em2.classList.remove('opacity');
          em2.classList.add('hide');
        }
        else if (Number(scanDimensionsY.value) > 1 && scanDimensionsY.classList.contains('wrong-textbox')) {
          console.log('Case4');
          em3.classList.add('opacity');
          em3.classList.remove('hide');
          em2.classList.remove('opacity');
          em2.classList.remove('hide');
        }

        // else if (Number(scanDimensionsY.value) > 1 && scanDimensionsY.classList.contains('wrong-textbox')) {

        // }

        break;

      case scannerFrequency:
        if (Number(scannerFrequency.value) >= 1) {
          em4.classList.add('hide');
        }

        if ((String(scannerFrequency.value).split('.')[1]?.length) <= 1 || String(scannerFrequency.value).split('.')[1] == undefined) {
          em5.classList.add('hide');
        }
        break;
    }

    if (em2.classList.contains('opacity') && em3.classList.contains('opacity')) {
      em2.classList.remove('opacity');
      em3.classList.add('opacity');

      em2.classList.add('hide');
      em3.classList.add('hide');
    }
  }

  // correct = 0, wrong input
  else if (!correct) {
    tick.classList.add('opacity');
    el.classList.remove('correct-textbox');


  }
}

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
  if (Number(scanDimensionsX.value) > 1) {
    individualCorrect(tickX, scanDimensionsX, 1);
  }
  else {
    individualCorrect(tickX, scanDimensionsX, 0);
  }
})

scanDimensionsY.addEventListener('input', function () {
  if (Number(scanDimensionsY.value) > 1) {
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

const individualCheck = (el) => {
  // if ()
  el.classList.add('wrong-textbox');
}

const checkWrong = () => {

  if (projectName.value.length < 3) {
    individualCheck(projectName);
    em0.classList.remove('hide');
  }

  if (!scanningMode.value) {
    individualCheck(scanningModeBox);
    em1.classList.remove('hide');
  }

  if (Number(scanDimensionsX.value) < 1 && Number(scanDimensionsY.value) > 1) {
    individualCheck(scanDimensionsX);
    em2.classList.remove('opacity');
    em2.classList.remove('hide');
    em3.classList.add('opacity');
    em3.classList.remove('hide');

  }

  if (Number(scanDimensionsY.value) < 1 && Number(scanDimensionsX.value) > 1) {
    individualCheck(scanDimensionsY);
    em3.classList.remove('opacity');
    em3.classList.remove('hide');
    em2.classList.add('opacity');
    em2.classList.remove('hide');

  }

  if (Number(scanDimensionsY.value) < 1 && Number(scanDimensionsX.value) < 1) {
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

      if (data) {
        // xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
        // xhttp.setRequestHeader('Access-Control-Allow-Credentials', 'true');
        xhttp.setRequestHeader('Content-Type', 'application/json');

      }

      xhttp.onload = () => {
        if (xhttp.status >= 400) {
          reject(xhttp.response);
          checkWrong();
        } else {
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



