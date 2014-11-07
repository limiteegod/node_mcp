var async = require('async');

var platInterUtil = require('mcp_util').platInterUtil;
var esut = require("easy_util");
var log = esut.log;
var digestUtil = esut.digestUtil;

var LotTest = function(){
    var self = this;
    self.userId = 'Q0001';
    //self.userId = 'wangyi';
    self.userType = "CHANNEL";
    self.key = 'cad6011f5f174a359d9a36e06aada07e';
    //self.key = 'ce7b4b00379744c781f0544440be3978';
    self.cmd = 'CT03';
    self.digestType = "3des";
};

LotTest.prototype.lot = function(bodyNode, cb)
{
    var self = this;
    platInterUtil.get(self.userId, self.userType, self.digestType, self.key, self.cmd, bodyNode, cb);
};

LotTest.prototype.lotT06 = function(cb)
{
    var self = this;
    var bodyNode = {};
    var orderNode = {outerId:digestUtil.createUUID(), amount:27400};
    var ticketsNode = [
    {gameCode:'T06', termCode:"2014001", bType:'00', amount:600, pType:'00',
        multiple:1, number:'1,2,3,4;1,2,3,3;1,2,3,4', outerId:digestUtil.createUUID()},
    {gameCode:'T06', termCode:"2014001", bType:'00', amount:400, pType:'01',
        multiple:1, number:'1,2,3,4;1,2,3,4', outerId:digestUtil.createUUID()},
    {gameCode:'T06', termCode:"2014001", bType:'00', amount:200, pType:'01',
            multiple:1, number:'1,3,4,5', outerId:digestUtil.createUUID()},
    {gameCode:'T06', termCode:"2014001", bType:'01', amount:3000, pType:'01',
        multiple:3, number:'1,2,3,4,5', outerId:digestUtil.createUUID()},
    {gameCode:'T06', termCode:"2014001", bType:'02', amount:600, pType:'01',
        multiple:1, number:'1,2$3,4,5', outerId:digestUtil.createUUID()},
    {gameCode:'T06', termCode:"2014001", bType:'00', amount:400, pType:'02',
        multiple:1, number:'1,2,2,3;1,2,3,3', outerId:digestUtil.createUUID()},
    {gameCode:'T06', termCode:"2014001", bType:'01', amount:2400, pType:'02',
        multiple:1, number:'1,2,3,4', outerId:digestUtil.createUUID()},
    {gameCode:'T06', termCode:"2014001", bType:'02', amount:1200, pType:'02',
        multiple:1, number:'1,2$3,4', outerId:digestUtil.createUUID()},
    {gameCode:'T06', termCode:"2014001", bType:'00', amount:400, pType:'03',
        multiple:1, number:'1,1,2,2;2,2,3,3', outerId:digestUtil.createUUID()},
    {gameCode:'T06', termCode:"2014001", bType:'01', amount:600, pType:'03',
        multiple:1, number:'1,2,3', outerId:digestUtil.createUUID()},
    {gameCode:'T06', termCode:"2014001", bType:'02', amount:600, pType:'03',
        multiple:1, number:'1$2,3,4', outerId:digestUtil.createUUID()},
    {gameCode:'T06', termCode:"2014001", bType:'00', amount:400, pType:'04',
        multiple:1, number:'1,2,2,2;2,3,3,3', outerId:digestUtil.createUUID()},
    {gameCode:'T06', termCode:"2014001", bType:'01', amount:1200, pType:'04',
        multiple:1, number:'1,2,3', outerId:digestUtil.createUUID()},
    {gameCode:'T06', termCode:"2014001", bType:'02', amount:1200, pType:'04',
        multiple:1, number:'1$2,3,4', outerId:digestUtil.createUUID()},
    {gameCode:'T06', termCode:"2014001", bType:'00', amount:400, pType:'05',
        multiple:1, number:'1|_|_|_;2|_|_|_', outerId:digestUtil.createUUID()},
    {gameCode:'T06', termCode:"2014001", bType:'01', amount:800, pType:'05',
        multiple:1, number:'1,2,3|2|_|_', outerId:digestUtil.createUUID()},
    {gameCode:'T06', termCode:"2014001", bType:'00', amount:400, pType:'06',
        multiple:1, number:'1|_|3|_;2|_|2|_', outerId:digestUtil.createUUID()},
    {gameCode:'T06', termCode:"2014001", bType:'01', amount:2200, pType:'06',
        multiple:1, number:'1,2,3|2|1,4|_', outerId:digestUtil.createUUID()},
    {gameCode:'T06', termCode:"2014001", bType:'00', amount:400, pType:'07',
        multiple:1, number:'1|_|3|2;2|1|2|_', outerId:digestUtil.createUUID()},
    {gameCode:'T06', termCode:"2014001", bType:'01', amount:1200, pType:'07',
        multiple:1, number:'1,2,3|2|1,4|_', outerId:digestUtil.createUUID()},
    {gameCode:'T06', termCode:"2014001", bType:'00', amount:400, pType:'08',
        multiple:1, number:'1|4|3|2;2|1|2|1', outerId:digestUtil.createUUID()},
    {gameCode:'T06', termCode:"2014001", bType:'01', amount:2400, pType:'08',
        multiple:1, number:'1,2,3|2|1,4|2,3', outerId:digestUtil.createUUID()},
    {gameCode:'T06', termCode:"2014001", bType:'00', amount:600, pType:'08',
        multiple:1, number:'1|4|3|2;2|1|2|1;1|2|3|4', outerId:digestUtil.createUUID()},
    {gameCode:'T06', termCode:"2014001", bType:'01', amount:5400, pType:'08',
        multiple:1, number:'1,2,3|2|1,3,4|2,3,4', outerId:digestUtil.createUUID()}];
    orderNode.tickets = ticketsNode;
    bodyNode.order = orderNode;
    self.lot(bodyNode, function(err, backMsgNode){
        if(err)
        {
            log.info('err:' + err);
        }
        else
        {
            log.info('back:');
            var decodedBodyStr = digestUtil.check(backMsgNode.head, self.key, backMsgNode.body);
            log.info(decodedBodyStr);
            cb();
        }
    });
};

var lotTest = new LotTest();
var count = 0;
async.whilst(
    function() { return count < 10000},
    function(whileCb) {
        lotTest.lotT06(function(){
            count++;
            whileCb();
        });
    },
    function(err) {
        log.info(err);
    }
);