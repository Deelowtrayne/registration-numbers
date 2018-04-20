// registration number input elements
var inputElem = document.querySelector('.regNumber');
var btnAdd = document.querySelector('.submit-reg');
var townElem = document.querySelector('.town-select');
// display element
var displayElem = document.querySelector('.display-area');

function Registration(storedData) {
  var reg = "";
  var regList = {}

  function setReg(num) {
    if (num.startsWith('CA') || num.startsWith('CJ') || num.startsWith('CAW') || num.startsWith('CL'))
      reg = num;
  }

  function regMap() {
    if (storedData)
      regList = storedData;

    if (regList[reg] == undefined)
      regList[reg] = 0;
  }

  function getReg() {
    return reg;
  }

  function getRegMap() {
    return regList;
  }

  return {
    reg: setReg,
    regNumber: getReg,
    registrations: getRegMap,
    mapRegs: regMap
  }
}
// Run this as soon as the page loads
let storedRegs = localStorage.getItem('Registrations') ? JSON.parse(localStorage.getItem('Registrations')) : {};
var registration = Registration(storedRegs);

function createElem(reg) {
  // generate list item for
  let li = document.createElement('li');
  li.textContent = reg;
  displayElem.appendChild(li);

}

function processRegistrations() {
  var enteredReg = inputElem.value.trim();
  inputElem.value = "";
  if (enteredReg == "" || (!enteredReg.startsWith('CA') && !enteredReg.startsWith('CJ') &&
      !enteredReg.startsWith('CAW') && !enteredReg.startsWith('CL'))) {
    document.querySelector('.alert').innerHTML = "Please enter a valid registration number";
    return;
  }
  // empty the alert element
  document.querySelector('.alert').innerHTML = "";

  registration.reg(enteredReg);
  registration.mapRegs();
  localStorage.setItem('Registrations', JSON.stringify(registration.registrations()));
  // generate list item for display
  createElem(registration.regNumber());
}

function filterBy(town) {
  //if (!town || town === 'allTowns')
  let regs = Object.keys(storedRegs);
  location.hash = town;
  townElem.value = location.hash.substr(1);
  switch (town) {
    case 'cape-town':
    case '#cape-town':
      displayElem.innerHTML = "";
      if (regs.length > 0) {
        for (let i = 0; i < regs.length; i++) {
          if (regs[i].startsWith('CA'))
            createElem(regs[i]);
        }
      }
      break;
    case 'paarl':
    case '#paarl':
      displayElem.innerHTML = "";
      if (regs.length > 0) {
        for (let i = 0; i < regs.length; i++) {
          if (regs[i].startsWith('CJ'))
            createElem(regs[i]);
        }
      }
      break;
    case 'george':
    case '#george':
      displayElem.innerHTML = "";
      if (regs.length > 0) {
        for (let i = 0; i < regs.length; i++) {
          if (regs[i].startsWith('CAW'))
            createElem(regs[i]);
        }
      }
      break;
    case 'stellenbosch':
    case '#stellenbosch':
      displayElem.innerHTML = "";
      if (regs.length > 0) {
        for (let i = 0; i < regs.length; i++) {
          if (regs[i].startsWith('CL'))
            createElem(regs[i]);
        }
      }
      break;
    case '':
    case 'all':
    case '#all':
      displayElem.innerHTML = "";
      if (regs.length > 0) {
        for (let i = 0; i < regs.length; i++) {
          createElem(regs[i]);
        }
      }
      break;
    default:
      displayElem.innerHTML = location.hash.substr(1) + " is not a valid town.";
      break;
  }
}

/*****************************************************
 *  LISTEN FOR BUTTON CLICKS AND ELEMENT STATE-CHANGE
 *****************************************************/

btnAdd.addEventListener('click', processRegistrations);

window.addEventListener('load', function() {

  if (location.hash !== '') {
    filterBy(location.hash);
  } else {
    filterBy(townElem.value);
  }
});

townElem.addEventListener('change', function() {
  filterBy(townElem.value);
})
