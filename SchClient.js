var CronJob = require("cron").CronJob;
var async = require('async');
var moment = require("moment");
var dc = require('mcp_db').dc;
var prop = require('mcp_config').prop;
var esut = require("easy_util");
var log = esut.log;
var digestUtil = esut.digestUtil;
var termSer = require("mcp_service").termSer;

var cons = require('mcp_constants');
var termStatus = cons.termStatus;
var msgStatus = cons.msgStatus;
var msgType = cons.msgType;

var SchClient = function(){};

/**
 *
 */
SchClient.prototype.start = function()
{
    var self = this;
    async.waterfall([
        function(cb)
        {
            dc.init(function(err){
                cb(err);
            });
        },
        //start web
        function(cb)
        {
            self.handle();
            cb(null, "success");
        }
    ], function (err, result) {
        if(err)
        {
            log.info(err); // -> null
        }
        else
        {
            log.info(result); // -> 16
        }
    });
}

/**
 * 处理消息
 */
SchClient.prototype.handle = function()
{
    var self = this;
    self.openJob = new CronJob('*/10 * * * * *', function () {
        log.info("get mst to consumer..................");
        var msg = dc.mg_msg.getConn().collection("msg");
        msg.findAndModify({status:msgStatus.INIT}, {},
        {$set:{status:msgStatus.HANDLING}}, [], function(err, data){
            if(data)
            {
                self.handleMsg(data, function(err){
                    if(err)
                    {
                        log.info(err);
                    }
                });
            }
        });
    });
    self.openJob.start();
}

/**
 * 处理消息
 */
SchClient.prototype.handleTermMsg = function(msg, dTerm, cb)
{
    log.info(dTerm);
    if(dTerm.status == termStatus.PRE_ON_SALE)
    {
        var table = dc.mg_msg.get("msg");
        table.findAndModify({_id:msg._id}, {},
        {$set:{status:msgStatus.HANDLED}}, [], function(err, data){
            cb(err);
        });
    }
    else if(dTerm.status == termStatus.END)
    {
        var table = dc.mg_msg.get("msg");
        table.findAndModify({_id:msg._id}, {},
        {$set:{status:msgStatus.HANDLED}}, [], function(err, data){
            cb(err);
        });
    }
}

/**
 * 处理消息
 */
SchClient.prototype.handleMsg = function(msg, cb)
{
    var self = this;
    log.info(msg);
    if(msg.type == msgType.TERM)
    {
        var table = dc.mg_msg.get("detail_term");
        table.findOne({msgId:msg._id}, {}, [], function(err, dTerm){
            if(err)
            {
                cb(err);
            }
            else
            {
                self.handleTermMsg(msg, dTerm, cb);
            }
        });
    }
}

var schClient = new SchClient();
schClient.start();