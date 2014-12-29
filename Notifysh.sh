#!/bin/sh
#notifysh.sh
#启动通知系统
#启动方式 sh notifysh.sh start [参数 dev test run] 分别表示启动开发模式，测试模式，和生产模式
#停止方式 sh notifysh.sh stop

usage()
{
        echo "usage: `basename $0` start|stop process name"
}
OPT=$1
PROCESSID=$2
notifyValue=`ps -ef|grep Notify.js|grep -v grep|awk '{print $2}'`
if [ $# -eq 0 ]; then
        usage
        exit 1
fi
case $OPT in
        start|Start) echo "Starting.....$PROCESSID"
             nohup node Notify.js target=$PROCESSID > /data/mcplog/notify.log 2>&1 &
             echo "Start Scheduler.js success"
        ;;
        stop|Stop) echo "Stopping.....$PROCESSID"
               if [ ${#notifyValue} -ne 0 ]; then
                 kill -9  `ps -ef|grep Notify.js|grep -v grep|awk '{print $2}'`
                 echo "Start Notify.js success"
              else
                 echo "You cannot repeat stop"
              fi
        ;;
        *)usage
        ;;
esac
