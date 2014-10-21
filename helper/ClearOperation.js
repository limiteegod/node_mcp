var async = require('async');
var esut = require('easy_util');
var constants = require('mcp_constants');
var dc = require('mcp_db').dc;
var log = esut.log;
var userType = constants.userType;

var addOperation = function()
{
    async.waterfall([
        function(cb){
            dc.init(function(err){
                cb(err);
            });
        },
        function(cb){
            var operationTable = dc.main.get("operation");
            operationTable.drop(function(err, data){
                cb(null);
            });
        },
        function(cb)
        {
            var operationTable = dc.main.get("operation");
            operationTable.create(function(err, data){
                cb(err);
            });
        },
        function(cb){
            var table = dc.main.get("customer");
            table.drop(function(err, data){
                cb(null);
            });
        },
        function(cb)
        {
            var table = dc.main.get("customer");
            table.create(function(err, data){
                cb(err);
            });
        },
        function(cb)
        {
            var table = dc.main.get("customer");
            table.save({id:"admin", password:"123456", type:userType.ADMINISTRATOR}, [], function(err, data){
                cb(err);
            });
        },
        function(cb)
        {
            var operationTable = dc.main.get("operation");
            operationTable.save({userType:userType.ADMINISTRATOR, id:'ADMIN_GAME', name:'游戏管理', url:'', hasChildren:1}, [], function(err, data){
                operationTable.save({userType:userType.ADMINISTRATOR, id:'ADMIN_LIST_GAME', parent:'ADMIN_GAME', name:'游戏列表', url:'game_list.html', hasChildren:0}, [], function(err, data){
                });
                operationTable.save({userType:userType.ADMINISTRATOR, id:'ADMIN_LIST_TERM', parent:'ADMIN_GAME', name:'期次列表', url:'term_list.html', hasChildren:0}, [], function(err, data){
                });
            });
            operationTable.save({userType:userType.ADMINISTRATOR, id:'ADMIN_MSG', name:'消息管理', url:'', hasChildren:1}, [], function(err, data){
                operationTable.save({userType:userType.ADMINISTRATOR, id:'ADMIN_LIST_MSG', parent:'ADMIN_MSG', name:'消息列表', url:'msg_list.html', hasChildren:0}, [], function(err, data){
                });
                operationTable.save({userType:userType.ADMINISTRATOR, id:'ADMIN_LIST_TERM_MSG', parent:'ADMIN_MSG', name:'期次消息', url:'term_msgList.html', hasChildren:0}, [], function(err, data){
                });
            });
            operationTable.save({userType:userType.ADMINISTRATOR, id:'ADMIN_SALE', name:'销售管理', url:'', hasChildren:1}, [], function(err, data){
                operationTable.save({userType:userType.ADMINISTRATOR, id:'ADMIN_LIST_ORDER', parent:'ADMIN_SALE', name:'订单列表', url:'order_list.html', hasChildren:0}, [], function(err, data){
                });
                operationTable.save({userType:userType.ADMINISTRATOR, id:'ADMIN_LIST_TICKET', parent:'ADMIN_SALE', name:'票据列表', url:'ticket_list.html', hasChildren:0}, [], function(err, data){
                });
            });
            operationTable.save({userType:userType.ADMINISTRATOR, id:'ADMIN_STATION', name:'机构管理', url:'', hasChildren:1}, [], function(err, data){
                operationTable.save({userType:userType.ADMINISTRATOR, id:'ADMIN_LIST_STATION', parent:'ADMIN_STATION', name:'机构列表', url:'station_list.html', hasChildren:0}, [], function(err, data){
                });
            });
            operationTable.save({userType:userType.ADMINISTRATOR, id:'ADMIN_ACCOUNT', name:'账户管理', url:'', hasChildren:1}, [], function(err, data){
                operationTable.save({userType:userType.ADMINISTRATOR, id:'ADMIN_LIST_MONEYLOG', parent:'ADMIN_ACCOUNT', name:'账户流水', url:'moneylog_list.html', hasChildren:0}, [], function(err, data){
                });
                operationTable.save({userType:userType.ADMINISTRATOR, id:'ADMIN_LIST_ACCOUNTCFG', parent:'ADMIN_ACCOUNT', name:'系统科目', url:'moneylog_subjectList.html', hasChildren:0}, [], function(err, data){
                });
            });
            cb(null, "success");
        }
    ], function (err, result) {
        log.info(err);
        log.info("end...........");
    });
};

addOperation();