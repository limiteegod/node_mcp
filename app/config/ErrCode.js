var ErrCode = function()
{
    var self = this;
    self.E0000 = {repCode:"0000", description:"系统处理成功"};
    self.E0001 = {repCode:"0001", description:"校验签名失败"};
    self.E0002 = {repCode:"0002", description:"user not exists"};
    self.E0003 = {repCode:"0003", description:"wrong name or wrong password."};
    self.E0004 = {repCode:"0004", description:"message has expired"};
    self.E0005 = {repCode:"0005", description:"user not login"};
    self.E2003 = {repCode:'2003', description:'期次不存在'};
    self.E2035 = {repCode:"2035", description:"投注站不存在"};
    self.E0999 = {repCode:"0999", description:"系统内部错误"};
    self.E9999 = {repCode:"9999", description:"unhandled exception"};

    self.E2058 = {repCode:'2058', description:'JSON格式转换出错'};
    self.E2059 = {repCode:'2059', description:'系统繁忙'};
};
module.exports = new ErrCode();