var CronJob = require("cron").CronJob;
var async = require('async');
var moment = require("moment");
var dc = require('mcp_db').dc;
var prop = require('mcp_config').prop;


var esut = require("easy_util");
var log = esut.log;
var dateUtil = esut.dateUtil;

var mcpUtil = require("mcp_util");
var notifyUtil = mcpUtil.notifyUtil;

var Notify = function(){};

/**
 *
 */
Notify.prototype.start = function()
{
    var self = this;
    async.waterfall([
        function(cb)
        {
            dc.init(function(err){
                cb(err);
            });
        },
        //start msg hanled
        function(cb)
        {
            self.sendNotify();
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

Notify.prototype.sendNotify = function()
{
    var self = this;
    self.sendJob = new CronJob('*/10 * * * * *', function () {
        self.sendUntilEmpty();
    });
    self.sendJob.start();
}

/**
 * 发送消息，直到为空
 */
Notify.prototype.sendUntilEmpty = function()
{
    var self = this;
    var table = dc.mg.get("notifyqueen");
    async.waterfall([
        //从队列中取消息
        function(cb)
        {
            table.findAndRemove({}, {}, [], function(err, data){
                if(err)
                {
                    cb(err);
                    return;
                }
                if(!data)
                {
                    cb("no msg to send...");
                    return;
                }
                cb(null, data);
            });
        },
        //发送消息
        function(data, cb)
        {
            var msg = {};
            msg.content = data.content;
            msg.id = data._id;
            msg.type = data.type;
            msg.createTime = dateUtil.toString(data.createTime);

            var options = {
                hostname: data.ip,
                port: data.port,
                path: data.path,
                method: 'POST'
            };

            var key = data.key;

            log.info(msg);
            self.sendMsg(options, key, msg, 0, function(err, data){
                cb(err, data);
            });
        }
    ], function (err, result) {
        if(err)
        {
            log.info(err);
        }
        else
        {
            self.sendUntilEmpty();
        }
    });
}

/**
 * 发送单个消息
 */
Notify.prototype.sendMsg = function(options, key, msg, tryCount, cb)
{
    var self = this;
    notifyUtil.send(options, "3des", key, "N01", msg, function(err, data){
        if(err)
        {
            tryCount++;
            if(tryCount >= 3)
            {
                cb(err, data);
            }
            else
            {
                self.sendMsg(options, key, msg, tryCount, cb);
            }
        }
        else
        {
            cb(err, data);
        }
    });
}


var notify = new Notify();
notify.start();