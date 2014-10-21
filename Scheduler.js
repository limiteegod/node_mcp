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

var sch = new Scheduler();
sch.start();