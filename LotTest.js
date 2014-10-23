var platInterUtil = require('mcp_util').platInterUtil;
var esut = require("easy_util");
var log = esut.log;
var digestUtil = esut.digestUtil;

var LotTest = function(){
    var self = this;
    self.userId = 'Q0001';
    self.userType = "CHANNEL";
    self.key = 'cad6011f5f174a359d9a36e06aada07e';
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
    var orderNode = {amount:200};
    var ticketsNode = [{gameCode:'T06', termCode:"2014001", bType:'00', amount:200, pType:'01',
        multiple:1, number:'', outerId:digestUtil.createUUID()}];
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
            log.info(backMsgNode);
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
