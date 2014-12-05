var kt = require("mcp_kt").kt;

var util = require('mcp_util');
var mathUtil = util.mathUtil;


var gameGrades = [1300,600,1900,7800,54000,9000,2600,900,6500,13000,19500,117900];
var gl = kt.gl(gameGrades.length);
gl.setBonus(gameGrades);

var check = kt.check();
check.setDrawNum("01,02,03");
check.setGl(gl);

console.log(check.count0100({number:"01,02,05"}));
console.log(check.count0100({number:"01,02,05"}));
console.log(check.count0100({number:"01,02,05"}));
console.log(check.count0100({number:"01,02,05"}));