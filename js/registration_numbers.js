// registration number input elements
var inputElem = document.querySelector('.regNumber');
var btnAdd = document.querySelector('.submit-btn');
var clearBtn = document.querySelector('.clear-btn');
var townElem = document.querySelector('.town-select');
// display element
var displayElem = document.querySelector('.display-area');

function Registration(storedData) {
  var reg = "";
  var regList = storedData || {};

  function setReg(num) {
    if(regList[num] === undefined && (num.startsWith('CA') || num.startsWith('CA') ||
        num.startsWith('CL') || num.startsWith('CJ') )){
      reg = num;
      regList[reg] = 0;
      return true;
    }
    return false;
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
    registrations: getRegMap
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

function updateDisplay(tag) {
  let regs = Object.keys(storedRegs);
  // check if there is data in the local storage
  if (regs.length < 1)
    return;

  displayElem.innerHTML = "";

  if (regs.length > 0 && tag == 'CA') {
    for (let i = 0; i < regs.length; i++) {
      if (regs[i].startsWith('CA') && regs[i].charAt(2) != 'W')
        createElem(regs[i]);
    }
  } else if (regs.length > 0 && tag == 'all') {
    for (let i = 0; i < regs.length; i++) {
      createElem(regs[i]);
    }
  } else if (regs.length > 0) {
    for (let i = 0; i < regs.length; i++) {
      if (regs[i].startsWith(tag))
        createElem(regs[i]);
    }
  }
}

function addRegistration() {
  var enteredReg = inputElem.value.trim();
  inputElem.value = "";
  if (registration.reg(enteredReg)) {
    // else empty the alert element, set update local storage
    document.querySelector('.alert').innerHTML = "";
    localStorage.setItem('Registrations', JSON.stringify(registration.registrations()));
    // generate list item for display
    createElem(registration.regNumber());
  } else {
    document.querySelector('.alert').innerHTML = "Please enter a valid registration number";
  }
}

function filterBy(town) {
  location.hash = town;
  townElem.value = location.hash.substr(1);
  switch (town) {
    case 'cape-town':
    case '#cape-town': updateDisplay('CA'); break;
    case 'paarl':
    case '#paarl': updateDisplay('CJ');  break;
    case 'george':
    case '#george': updateDisplay('CAW'); break;
    case 'stellenbosch':
    case '#stellenbosch': updateDisplay('CL'); break;
    case '':
    case 'all':
    case '#all': updateDisplay('all'); break;
    default: displayElem.innerHTML = location.hash.substr(1) + " is not a valid town.";
      break;
  }
}

function clearAll() {
  localStorage.clear();
  townElem.value = 'all'
  inputElem.value = "";
  location.hash = "";
  displayElem.innerHTML = "";
  document.querySelector('.alert').innerHTML = "";
}

/******************************************************
 *  LISTEN FOR BUTTON CLICKS AND ELEMENT STATE-CHANGE
 ******************************************************/

btnAdd.addEventListener('click', addRegistration);

window.addEventListener('load', function() {

  if (location.hash !== '') {
    filterBy(location.hash);
  } else {
    filterBy(townElem.value);
  }
});

townElem.addEventListener('change', function() {
  filterBy(townElem.value);
});

clearBtn.addEventListener('click', clearAll);
