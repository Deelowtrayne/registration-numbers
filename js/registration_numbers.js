// registration number input elements
var inputElem = document.querySelector('.regNumber');
var btnAdd = document.querySelector('.submit-reg');
// display element
var displayElem = document.querySelector('.display-area');

function Registration(storedData) {
  var reg = "";
  var regList = {}

  function setReg(num) {
    if (num.startsWith('CA') || num.startsWith('CJ') || num.startsWith('CK') || num.startsWith('CL'))
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
  if (enteredReg == "") {
    document.querySelector('.alert').innerHTML = "Please enter a valid registration number";
    return;
  }
  // empty the alert element
  document.querySelector('.alert').innerHTML = "";

  registration.reg(enteredReg);
  registration.mapRegs();
  localStorage.setItem('Registrations', JSON.stringify(registration.registrations()));
  // generate list item for
  createElem(registration.regNumber());
}

btnAdd.addEventListener('click', processRegistrations);
window.addEventListener('load', function() {
  let town = document.querySelector('.town-select').value;
  console.log(town);
  let regs = Object.keys(storedRegs);
  if (regs.length > 0) {
    for (let i = 0; i < regs.length; i++) {
      createElem(regs[i]);
    }
  }
});
