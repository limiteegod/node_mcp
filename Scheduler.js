var CronJob = require("cron").CronJob;
var async = require('async');
var moment = require("moment");
var dc = require('mcp_db').dc;
var prop = require('mcp_config').prop;
var esut = require("easy_util");
var log = esut.log;
var digestUtil = esut.digestUtil;
var service = require("mcp_service");
var termSer = service.termSer;
var msgSer = service.msgSer;

var cons = require('mcp_constants');
var termStatus = cons.termStatus;
var msgStatus = cons.msgStatus;
var msgType = cons.msgType;

var Scheduler = function(){};

/**
 *
 */
Scheduler.prototype.start = function()
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
            self.checkOpen();
            self.checkClose();
            cb(null);
        },
        //start msg hanled
        function(cb)
        {
            self.checkHandled();
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
};

/**
 * 校验是否有需要开售的期次
 */
Scheduler.prototype.checkOpen = function()
{
    var self = this;
    self.openJob = new CronJob('*/10 * * * * *', function () {
        log.info("open job..................");
        termSer.findToOpen(function(err, term){
            if(err)
            {
                log.info(err);
            }
            else
            {
                msgSer.saveTerm(term, function(err, data){
                    if(err)
                    {
                        log.info(err);
                    }
                });
            }
        });
    });
    self.openJob.start();
};

/**
 * 校验停售期次
 **/
Scheduler.prototype.checkClose = function()
{
    var self = this;
    self.closeJob = new CronJob('*/10 * * * * *', function () {
        log.info("open job..................");
        termSer.findToClose(function(err, term){
            if(err)
            {
                log.info(err);
            }
            else
            {
                msgSer.saveTerm(term, function(err, data){
                    if(err)
                    {
                        log.info(err);
                    }
                });
            }
        });
    });
    self.closeJob.start();
};

/**
 * 处理已经处理的消息
 */
Scheduler.prototype.checkHandled = function()
{
    var self = this;
    self.checkHandledJob = new CronJob('*/5 * * * * *', function () {
        log.info("handling handled msg..................");
        var table = dc.mg_msg.get("msg");
        table.findAndModify({status:msgStatus.HANDLED}, {},
        {$set:{status:msgStatus.PRE_FINISH}}, [], function(err, data){
            if(err)
            {
                cb(err);
            }
            else
            {
                self.handleMsg(data, function(err){
                    log.info(err);
                });
            }
        });
    });
    self.checkHandledJob.start();
}

/**
 * 处理期次消息
 */
Scheduler.prototype.handleTermMsg = function(msg, dTerm, cb)
{
    log.info(dTerm);
    if(dTerm.status == termStatus.PRE_ON_SALE)
    {
        termSer.open(dTerm.termId, function(err){
            if(err)
            {
                log.info(err);
            }
            else
            {
                msgSer.updateStatus(msg._id, msgStatus.FINISHED, cb);
            }
        });
    }
    else if(dTerm.status == termStatus.END)
    {
        msgSer.updateStatus(msg._id, msgStatus.FINISHED, cb);
    }
}

/**
 * 处理消息
 */
Scheduler.prototype.handleMsg = function(msg, cb)
{
    var self = this;
    if(!msg)
    {
        cb(null);
        return;
    }
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

var sch = new Scheduler();
sch.start();