var dbPool = require('./DbPool.js');
var dateUtil = require('../util/DateUtil.js');

var DbCurser = function(table, baseSql){
    var self = this;
    self.table = table;
    self.baseSql = baseSql;
};

DbCurser.prototype.limit = function(start, size)
{
    var self = this;
    var sql = " limit " + start + "," + size;
    self.baseSql += sql;
    return self;
};

DbCurser.prototype.sort = function(data)
{
    var self = this;
    var count = 0;
    var sql = " order by ";
    for(var key in data)
    {
        if(count > 0)
        {
            sql += ",";
        }
        if(data[key] > 0)
        {
            sql += key;
        }
        else
        {
            sql += key + " desc";
        }
        count++;
    }
    if(count > 0)
    {
        self.baseSql += sql;
    }
};

DbCurser.prototype.toArray = function(cb)
{
    var self = this;
    console.log(self.baseSql);
    var conn = self.table.getDb().getConn();
    if(self.table.engine == 'mysql')
    {
        conn.query(self.baseSql, function(err, rows, fields) {
            if (err) throw err;
            if(cb != undefined)
            {
                cb(err, rows);
            }
        });
    }
    else if(self.table.engine == 'oracle')
    {
        conn.execute(self.baseSql, [], function(err, results) {
            if(err)
            {
                cb(err, results);
            }
            else
            {
                for(var key in results)
                {
                    dateUtil.oracleObj(results[key]);
                }
                cb(err, results);
            }
        });
    }
    else
    {
        throw new Error("unsurpoted engine.");
    }
};

module.exports = DbCurser;