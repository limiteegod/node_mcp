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

LotTest.prototype.lotT51 = function(cb){

    var self = this;
    var bodyNode = {};
    var orderNode = {outerId:digestUtil.createUUID(), amount:200};
    var ticketsNode = [
        {
            gameCode:'T51', pType:'06', bType:'21', amount:200,
            multiple:1, outerId:digestUtil.createUUID(),
            number:'02|201401011001|1@2.00;01|201401011002|1@3.150'
        }
    ]
    orderNode.tickets = ticketsNode;
    bodyNode.order = orderNode;
    self.lot(bodyNode, function(err, backMsgNode){
        if(err){
            log.info('err:' + err);
        }else{
            log.info("backMsgNode");
            var decodeBodyStr = digestUtil.check(backMsgNode.head, self.key, backMsgNode.body);
            log.info(decodeBodyStr);
            cb();
        }
    });
}

var lotTest = new LotTest();
var count = 0;
async.whilst(
    function() { return count < 1},
    function(whileCb) {
        lotTest.lotT51(function(){
            count++;
            whileCb();
        });
    },
    function(err) {
        log.info(err);
    }
);