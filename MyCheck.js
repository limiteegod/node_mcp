//var ssq = require("ssq");
var feo = require("mcp_feo").feo;

/*
var gameGrades = [400000000, 100000000, 300000, 20000, 1000, 500];
var gl = ssq.gl(gameGrades.length);
gl.setBonus(gameGrades);
console.log(gl.getBonus(0));

var check = ssq.check();
check.setRedBall([9,14,17,18,21,25]);
check.setBlueBall(15);
check.setGl(gl);
console.log(check.count());

var ticket = {playTypeCode:'00', betTypeCode:'00', numbers:"09,14,17,18,21,25|15"};
var handle = 'count' + ticket.playTypeCode + ticket.betTypeCode;
console.log(check[handle](ticket.numbers));*/

var stringUtil = feo.stringUtil();
console.log(stringUtil.getIntArray("123,456,321"));

var gameGrades = [19700, 39500, 79100, 118700, 900, 7400, 59300, 475100];
var gl = feo.gl(gameGrades.length);
gl.setBonus(gameGrades);

var check = feo.check();
check.setDrawNum("1,2,3,4");
check.setGl(gl);

console.log(feo.getCharLen("1,2,3,4"));

console.log(feo.getCharLen("1,2"));

console.log(feo.getCharLen("4,2,3,4"));

console.log(feo.getCharLen("4,2,2,4"));

console.log(feo.getNumType("4,2,2,4"));

console.log(feo.getNumType("1,2,3,4"));

console.log(check.count0100({number:"1,2,3,4"}));

console.log(check.count0100({number:"1,2,3,4;1,2,3,4"}));

console.log(check.count0101({number:"1,2,3,4,5,6"}));

console.log(check.count0101({number:"2,3,4,5,6"}));

console.log(check.count0102({number:"2,3,4$5,6"}));

console.log(check.count0102({number:"1,2,3$4,5,6"}));


var check02 = feo.check();
check02.setDrawNum("1,2,4,4");
check02.setGl(gl);
console.log(check02.count0200({number:"1,2,4,4"}));
console.log(check02.count0201({number:"1,2,4"}));
console.log(check02.count0202({number:"1,2$4,5"}));


var check03 = feo.check();
check03.setDrawNum("2,2,4,4");
check03.setGl(gl);
console.log(check03.count0300({number:"2,2,4,4"}));
console.log(check03.count0301({number:"1,2,4"}));
console.log(check03.count0302({number:"1$2,4,5"}));
console.log(check03.count0302({number:"2$4,5"}));

var check04 = feo.check();
check04.setDrawNum("2,4,4,4");
check04.setGl(gl);
console.log(check04.count0400({number:"2,4,4,4;2,4,4,4"}));
console.log(check04.count0401({number:"1,2,4"}));
console.log(check04.count0402({number:"1$2,4,5"}));
console.log(check04.count0402({number:"2$4,5"}));


var check05 = feo.check();
check05.setDrawNum("2,4,4,4");
check05.setGl(gl);
console.log(check05.count0500({number:"2|_|_|_"}));

/*var start = new Date().getTime();
for(var i = 0; i < 1; i++)
{
    console.log(check.count0100({number:"1,2,3,4"}));
}
var end = new Date().getTime();
console.log(end - start);*/
