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

var issueModel = require("mcp_issue").issueModel;
var master = require("mcp_msg").masterHandle;

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
            issueModel.prize(null, {gameCode:'T06', code:'2014001'}, function(err, data){
                cb(err);
            });
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

var sch = new Scheduler();
sch.start();