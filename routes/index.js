var express = require('express');
var router = express.Router();
const readline = require('readline');
const { promisify } = require('util');

function getDateString(){
  const date = new Date();
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day =`${date.getDate()}`.padStart(2, '0');
  return `${day}-${month}-${year}`
}

function getTimeString() {
  const date = new Date();
  const hour =date.getHours(); 
  const min = date.getMinutes();
  const sec = date.getSeconds();
  return `[${hour}:${min}:${sec}]`
}



readline.Interface.prototype.question[promisify.custom] = function (prompt) {
  return new Promise(resolve =>
    readline.Interface.prototype.question.call(this, prompt, resolve),
  );
};
readline.Interface.prototype.questionAsync = promisify(
  readline.Interface.prototype.question,
);

(async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
 
  let n = await rl.questionAsync('Enter number of table present in the restaurant ');
  var availableTable = [];
  for (let i = 1; i <= n; i++) {
    availableTable.push(i);
  }

  console.log(`Date : ${getDateString()}  Time : ${getTimeString()}`);
  console.log("Available Table: " + availableTable);
  var quit = false;
  var bookedTables = [];
  var bookedTableswithTime = [];
  // console.log(`Date : ${getDateString()}`);
  while (true && !quit) {
    let enterLetter = await rl.questionAsync('Enter letter B to Book or C to Cancel or Q to Quit: ');
    if (enterLetter == 'B' || enterLetter == 'b') {
      console.log("Available Table: " + availableTable);
      let bookingTbNumber = await rl.questionAsync('Enter table number to book ');
      if (availableTable.includes(+bookingTbNumber)) {
        console.log(`Table number ${bookingTbNumber} is booked at ${getTimeString()}`);
        bookedTables.push(bookingTbNumber)
        bookedTableswithTime.push(`${bookingTbNumber} ${getTimeString()}`);
        console.log("Booked Tables " + bookedTableswithTime);
        var index = availableTable.indexOf(+bookingTbNumber);
        if (index > -1) {
          availableTable.splice(index, 1);
        }
        console.log("Available Tables: " + availableTable);
      } else {
        console.log("Table number is not available");
      }
    } else if (enterLetter == 'C' || enterLetter == 'c') {
      console.log("Booked Tables " + bookedTableswithTime);
      let cancellingTbNumber = await rl.questionAsync('Enter table number to cancel ');
      if (bookedTables.includes(cancellingTbNumber)) {
        console.log(`Table number ${cancellingTbNumber} is cancelled at ${getTimeString()}`);
        var index = bookedTables.indexOf(cancellingTbNumber);
        if (index > -1) {
          bookedTables.splice(index, 1);
          bookedTableswithTime.splice(index, 1);
        }
        console.log("Booked Tables: " + bookedTableswithTime);
        availableTable.push(cancellingTbNumber);
        console.log("Available Tables: " + availableTable);
      } else {
        console.log("Table number is not available");
      }
    } else if (enterLetter == 'Q' || enterLetter == 'q') {
      return quit = true;
    }
    else {
      console.log("Enter valid letter");
    }
  }

})()









module.exports = router;
