var async = require('async');
var esut = require('easy_util');
var constants = require('mcp_constants');
var dc = require('mcp_db').dc;
var log = esut.log;

var moment = require("moment");

var initTerm = function()
{
    async.waterfall([
        function(cb){
            dc.init(function(err){
                cb(err);
            });
        },
        function(cb)
        {
            var table = dc.main.get("term");
            var startDate = 20150101;
            var endDate = 20150119;
            var gameCode = 'T05';
            var rst = [];
            for(var curDate = startDate; curDate <= endDate; curDate++)
            {
                var startTimeStamp = moment(curDate + "000000", "YYYYMMDDHHmmss").valueOf();
                var gap = 60*60*1000;
                for(var i = 1; i < 25; i++)
                {
                    var start = startTimeStamp + (i - 1)*gap;
                    var end = startTimeStamp + i*gap;
                    var code = (curDate*100 + i) + "";
                    var nextCode = "";
                    if(i == 24)
                    {
                        nextCode += ((curDate+1)*100 + 1) + "";
                    }
                    else
                    {
                        nextCode += (curDate*100 + i + 1) + "";
                    }
                    var term = {gameCode:gameCode, code:code, nextCode:nextCode,
                        openTime:start, closeTime:end,
                        status:constants.termStatus.NOT_ON_SALE, wNum:""};
                    term.id = term.gameCode + "_" + term.code;
                    rst[rst.length] = term;
                }
            }
            log.info(rst);

            async.eachSeries(rst, function(term, callback) {
                table.save(term, {}, function(err, data){
                    callback(err);
                });
            }, function(err){
                cb(null);
            });
        },
        function(cb)
        {
            cb(null, "success");
        }
    ], function (err, result) {
        log.info(err);
        log.info("end...........");
    });
};

var initTermF04 = function()
{
    async.waterfall([
        function(cb){
            dc.init(function(err){
                cb(err);
            });
        },
        function(cb)
        {
            var table = dc.main.get("gamegrade");
            var gameCode = "F04";
            var now = moment("2015-01-14","YYYY-MM-DD");

            var end = now.add(5, 'day');

            for(var currDate = moment("2015-01-14","YYYY-MM-DD"); currDate <= end; currDate.add(1,'day')){
                var currDay = currDate.format("YYMMDD");
                log.info(currDay);
                for(var i = 1; i <= 73; i ++)
                {
                    var code = (currDay*1000)+i;
                    var lv1 = {gameCode:gameCode, termCode:code, level:1, name:"和值4", bonus:10000};
                    lv1.id = gameCode + "_" + code + "_" + lv1.level;
                    log.info(lv1);
                    table.save(lv1, [], function(err, data){});
                    var lv1 = {gameCode:gameCode, termCode:code, level:2, name:"和值5", bonus:5000};
                    lv1.id = gameCode + "_" + code + "_" + lv1.level;
                    table.save(lv1, [], function(err, data){});
                    var lv1 = {gameCode:gameCode, termCode:code, level:3, name:"和值6", bonus:3000};
                    lv1.id = gameCode + "_" + code + "_" + lv1.level;
                    table.save(lv1, [], function(err, data){});
                    var lv1 = {gameCode:gameCode, termCode:code, level:4, name:"和值7", bonus:2000};
                    lv1.id = gameCode + "_" + code + "_" + lv1.level;
                    table.save(lv1, [], function(err, data){});
                    var lv1 = {gameCode:gameCode, termCode:code, level:5, name:"和值8", bonus:1500};
                    lv1.id = gameCode + "_" + code + "_" + lv1.level;
                    table.save(lv1, [], function(err, data){});
                    var lv1 = {gameCode:gameCode, termCode:code, level:6, name:"和值9", bonus:1200};
                    lv1.id = gameCode + "_" + code + "_" + lv1.level;
                    table.save(lv1, [], function(err, data){});
                    var lv1 = {gameCode:gameCode, termCode:code, level:7, name:"和值10", bonus:1100};
                    lv1.id = gameCode + "_" + code + "_" + lv1.level;
                    table.save(lv1, [], function(err, data){});
                    var lv1 = {gameCode:gameCode, termCode:code, level:8, name:"和值11", bonus:1100};
                    lv1.id = gameCode + "_" + code + "_" + lv1.level;
                    table.save(lv1, [], function(err, data){});
                    var lv1 = {gameCode:gameCode, termCode:code, level:9, name:"和值12", bonus:1200};
                    lv1.id = gameCode + "_" + code + "_" + lv1.level;
                    table.save(lv1, [], function(err, data){});
                    var lv1 = {gameCode:gameCode, termCode:code, level:10, name:"和值13", bonus:1500};
                    lv1.id = gameCode + "_" + code + "_" + lv1.level;
                    table.save(lv1, [], function(err, data){});
                    var lv1 = {gameCode:gameCode, termCode:code, level:11, name:"和值14", bonus:2000};
                    lv1.id = gameCode + "_" + code + "_" + lv1.level;
                    table.save(lv1, [], function(err, data){});
                    var lv1 = {gameCode:gameCode, termCode:code, level:12, name:"和值15", bonus:3000};
                    lv1.id = gameCode + "_" + code + "_" + lv1.level;
                    table.save(lv1, [], function(err, data){});
                    var lv1 = {gameCode:gameCode, termCode:code, level:13, name:"和值16", bonus:5000};
                    lv1.id = gameCode + "_" + code + "_" + lv1.level;
                    table.save(lv1, [], function(err, data){});
                    var lv1 = {gameCode:gameCode, termCode:code, level:14, name:"和值17", bonus:10000};
                    lv1.id = gameCode + "_" + code + "_" + lv1.level;
                    table.save(lv1, [], function(err, data){});
                    var lv1 = {gameCode:gameCode, termCode:code, level:15, name:"三同号通选", bonus:5000};
                    lv1.id = gameCode + "_" + code + "_" + lv1.level;
                    table.save(lv1, [], function(err, data){});
                    var lv1 = {gameCode:gameCode, termCode:code, level:16, name:"三同号单选", bonus:30000};
                    lv1.id = gameCode + "_" + code + "_" + lv1.level;
                    table.save(lv1, [], function(err, data){});
                    var lv1 = {gameCode:gameCode, termCode:code, level:17, name:"二同号复选", bonus:2000};
                    lv1.id = gameCode + "_" + code + "_" + lv1.level;
                    table.save(lv1, [], function(err, data){});
                    var lv1 = {gameCode:gameCode, termCode:code, level:18, name:"二同号单选", bonus:10000};
                    lv1.id = gameCode + "_" + code + "_" + lv1.level;
                    table.save(lv1, [], function(err, data){});
                    var lv1 = {gameCode:gameCode, termCode:code, level:19, name:"三不同号", bonus:5000};
                    lv1.id = gameCode + "_" + code + "_" + lv1.level;
                    table.save(lv1, [], function(err, data){});
                    var lv1 = {gameCode:gameCode, termCode:code, level:20, name:"二不同号", bonus:1000};
                    lv1.id = gameCode + "_" + code + "_" + lv1.level;
                    table.save(lv1, [], function(err, data){});
                    var lv1 = {gameCode:gameCode, termCode:code, level:21, name:"三连号通选", bonus:1300};
                    lv1.id = gameCode + "_" + code + "_" + lv1.level;
                    table.save(lv1, [], function(err, data){});
                }
            }
        },
        function(cb)
        {
            cb(null, "success");
        }
    ], function (err, result) {
        log.info(err);
        log.info("end...........");
    });
};

initTermF04();

