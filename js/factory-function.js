function Registration(stored) {
  var reg = "";
  var regList = {};

  if (stored) {
    for (let i = 0; i < stored.length; i++){
      let current = stored[i];
      regList[current] = 0;
    }
  }

  function setReg(num) {
    if(regList[num] === undefined && (num.startsWith('CA') ||
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
    return Object.keys(regList);
  }

  function filterByTown(town) {
    let regs = Object.keys(regList);

    if(town === 'all')
      return regs;

    let result = regs.filter(function(reg){
      return reg.startsWith(town);
    });
    location.hash = town;
    return result;
  }

  return {
    reg: setReg,
    regNumber: getReg,
    registrations: getRegMap,
    filterBy: filterByTown
  }
}
