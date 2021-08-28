const wbm = require("wbm");
const xlsxFile = require("read-excel-file/node");
require("dotenv").config();

const myPhoneNumber = process.env.MY_PHONE_NUMBER || "";
let contactArr = [];
xlsxFile("./contacts.xlsx").then((rows) => {
  //remove first item
  rows.shift();
  rows.forEach((col) => {
    col.forEach((data) => {
      contactArr.push(data);
    });
  });
});

wbm
  .start()
  .then(async () => {
    const phones = contactArr;

    const message = `My new number is ${myPhoneNumber}`;
    await wbm.send(phones, message);
    await wbm.end();
  })
  .catch((err) => console.log(err));
