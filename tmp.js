var rst = {};
for(var i = 0; i < 17; i++)
{
    rst[i] = 0;
}
for(var i = 1; i < 9; i++)
{
    for(var j = 1; j < 9; j++)
    {
        var value = i - j;
        if(value < 0)
        {
            value = value*(-1);
        }
        rst[value] += 1;
    }
}

console.log(rst);