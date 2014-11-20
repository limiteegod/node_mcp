var esf = require("mcp_esf").esf;


var gameGrades = [1300,600,1900,7800,54000,9000,2600,900,6500,13000,19500,117900];
var gl = esf.gl(gameGrades.length);
gl.setBonus(gameGrades);

var check = esf.check();
check.setDrawNum("01|02|03|04|05");
check.setGl(gl);

console.log(check.count2101({number:'01,02,03'}));
console.log(check.count2200({number:'01,02;02,05;06,07'}));
console.log(check.count2201({number:'01,02,03,04,05'}));
console.log(check.count2202({number:'01$02,04'}));
