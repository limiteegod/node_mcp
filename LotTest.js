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

LotTest.prototype.lotT06 = function()
{
    var self = this;
    var bodyNode = {};
    var orderNode = {outerId:digestUtil.createUUID(), amount:1200};
    var ticketsNode = [{gameCode:'T06', termCode:"2014001", bType:'00', amount:400, pType:'01',
        multiple:1, number:'1,2,3,4;1,2,3,4', outerId:digestUtil.createUUID()},
    {gameCode:'T06', termCode:"2014001", bType:'00', amount:200, pType:'01',
            multiple:1, number:'1,3,4,5', outerId:digestUtil.createUUID()},
    {gameCode:'T06', termCode:"2014001", bType:'00', amount:400, pType:'01',
        multiple:1, number:'1,2,3,4;1,2,3,4', outerId:digestUtil.createUUID()},
    {gameCode:'T06', termCode:"2014001", bType:'00', amount:200, pType:'01',
        multiple:1, number:'1,3,4,6', outerId:digestUtil.createUUID()}];
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
        }
    });
};

var lotTest = new LotTest();
var count = 0;
while(count < 1)
{
    lotTest.lotT06();
    count++;
}
