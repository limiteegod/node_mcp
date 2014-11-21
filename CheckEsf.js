var esf = require("mcp_esf").esf;

var util = require('mcp_util');
var mathUtil = util.mathUtil;


var gameGrades = [1300,600,1900,7800,54000,9000,2600,900,6500,13000,19500,117900];
var gl = esf.gl(gameGrades.length);
gl.setBonus(gameGrades);

var check = esf.check();
check.setDrawNum("01|02|03|04|05");
check.setGl(gl);

/*
console.log(check.count2101({number:'01,02,03'}));
console.log(check.count2200({number:'01,02;02,05;06,07'}));
console.log(check.count2201({number:'01,02,03,04,05'}));
console.log(check.count2202({number:'01$02,04,05'}));

console.log(check.count2300({number:'01,02,03;02,04,05;04,06,07'}));
console.log(check.count2301({number:'01,02,03,04,05'}));
console.log(check.count2302({number:'01,02$04,05'}));


console.log(check.count2400({number:'01,02,03,04;02,04,05,10;04,06,07,11'}));
console.log(check.count2401({number:'01,02,03,04,05,06,07,09'}));
console.log(check.count2402({number:'01,02,03$04,05,10,11'}));

console.log(check.count2500({number:'01,02,03,04,05;02,04,05,10,11;04,06,07,09,11'}));
console.log(check.count2501({number:'01,02,03,04,05,06,07,09'}));
console.log(check.count2502({number:'01$02,03,04,05,10,11'}));

console.log(check.count2600({number:'01,02,03,04,05,06;02,04,05,09,10,11;04,06,07,08,09,11'}));
console.log(check.count2601({number:'01,02,03,04,05,06,07,09,10'}));
console.log(check.count2602({number:'01,02,03$04,05,07,10,11'}));

console.log(check.count2700({number:'01,02,03,04,05,06,07;02,04,05,08,09,10,11;04,06,07,08,09,10,11'}));
console.log(check.count2701({number:'01,02,03,04,05,06,07,08,09,10'}));
console.log(check.count2702({number:'01,02,03$04,05,07,10,11'}));*/

console.log(check.count2800({number:'01,02,03,04,05,06,07,08;01,02,04,05,08,09,10,11;03,04,06,07,08,09,10,11'}));