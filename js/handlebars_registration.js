const ADD_BTN = document.querySelector('.add-btn');
const INPUT_ELEM = document.querySelector('.reg-number');
var clearBtn2 = document.querySelector('.clear-btn2');
var townElem2 = document.querySelector('.town-select2');
//
let templateSource = document.querySelector('.registration-template').innerHTML;
const REG_TEMPLATE = Handlebars.compile(templateSource);
const DISPLAY_ELEM = document.querySelector('#display-area');

var storedRegs2 = localStorage.getItem('HB-Registrations') ? JSON.parse(localStorage.getItem('HB-Registrations')) : {};
let newRegistration = Registration(storedRegs2);


function addNew() {
  let enteredReg = INPUT_ELEM.value.trim();
  INPUT_ELEM.value = "";
  if (newRegistration.reg(enteredReg)) {
    // else empty the alert element, set update local storage
    document.querySelector('.alert2').innerHTML = "";
    localStorage.setItem('HB-Registrations', JSON.stringify(newRegistration.registrations()));
    // generate list item for display
    DISPLAY_ELEM.innerHTML = REG_TEMPLATE({
      regList: newRegistration.registrations(),
      reg_number: newRegistration.regNumber()
    });
  } else {
    document.querySelector('.alert2').innerHTML = "Please enter a valid registration number";
  }
}

function updateHandlebarsDisplay(tag) {
  let regs = Object.keys(storedRegs);
  let output = [];
  // check if there is data in the local storage
  if (regs.length < 1)
    return;

  displayElem.innerHTML = "";

  if (regs.length > 0 && tag == 'CA') {
    for (let i = 0; i < regs.length; i++) {
      if (regs[i].startsWith('CA') && regs[i].charAt(2) != 'W')
        output.push(regs[i]);
    }
  } else if (regs.length > 0) {
    for (let i = 0; i < regs.length; i++) {
      if (regs[i].startsWith(tag))
        output.push(regs[i]);
    }
  } else if (regs.length > 0 && tag == 'all') {
    return regs;
  }

  return output;
}

function filterByTown(town) {
  location.hash = town;
  townElem.value = location.hash.substr(1);
  switch (town) {
    case 'all': updateDisplay('all'); break;
    case 'cape-town': updateDisplay('CA'); break;
    case 'paarl': updateDisplay('CJ');  break;
    case 'george': updateDisplay('CAW'); break;
    case 'stellenbosch': updateDisplay('CL'); break;
    default: displayElem.innerHTML = location.hash.substr(1) + " is not a valid town.";
      break;
  }
}



function handlebarsClearAll() {
  localStorage.removeItem('HB-Registrations');
  townElem2.value = 'all'
  INPUT_ELEM.value = "";
  location.hash = "";
  DISPLAY_ELEM.innerHTML = "";
  document.querySelector('.alert2').innerHTML = "";
}

ADD_BTN.addEventListener('click', addNew);
clearBtn2.addEventListener('click', handlebarsClearAll);
townElem2.addEventListener('change', function() {
  console.log(filterBy(townElem2.value));
  DISPLAY_ELEM.innerHTML = REG_TEMPLATE({
    regList: filterBy(townElem2.value)
  });
});

//
window.addEventListener('DOMContentLoaded', function() {
  DISPLAY_ELEM.innerHTML = REG_TEMPLATE({
    regList: newRegistration.registrations()
  });
})
