var service = require("mcp_service");
var termSer = service.termSer;
var msgSer = service.msgSer;
var kvSer = service.kvSer;

var esut = require("easy_util");
var log = esut.log;
var digestUtil = esut.digestUtil;

var dc = require('mcp_db').dc;

var async = require('async');

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
        kvSer.getNotifyQueenId("Q0001", function(err, data){
            cb(err, data);
        });
    }
], function (err, data) {
    log.info(err);
    log.info(data);
});

