#include "DanTuoNum.h"

DanTuoNum::DanTuoNum(char *pNum, int len)
{
       char *lotNumChar = pNum;
       bool preFlag = true;
       int preDanFlag = 0;
       int afterDanFlag = 0;
       int jcount = 0;
       int acount = 0;
       for(int i =0 ; i < len ; i++){
           char temp = pNum[i];
           if (preFlag)
           {
                if(temp == '|'){
                   preFlag = false;
                   continue;
                }else if(temp == '$')
                {
                  preDanFlag = jcount;
                }
                jcount ++;
           }else{
                if(temp == ';'){
                    continue;
                }else if(temp == '$'){
                   afterDanFlag = acount;
                }
                acount ++;
           }
       }

       if(preDanFlag > 0){
         IntArray* ia = new IntArray(16, lotNumChar, preDanFlag  , ','); //取出$之前的是胆码
         this->preDanArray = ia;
         IntArray* tuo = new IntArray(16, lotNumChar + preDanFlag +1  , jcount - preDanFlag -1 , ',');
         this->preTuoArray = tuo;
       }else{
         IntArray* ia = new IntArray(0);
         this->preDanArray = ia;
         IntArray* tuo = new IntArray(30, lotNumChar, jcount, ',');
         this->preTuoArray = tuo;
       }
       if(afterDanFlag > 0){
         IntArray* ia2 = new IntArray(16, lotNumChar, afterDanFlag , ','); //取出$之前的是胆码
         this->afterDanArray = ia2;
         IntArray* tuo2 = new IntArray(16, lotNumChar + afterDanFlag +1  , acount - afterDanFlag -1 , ',');
         this->afterTuoArray = tuo2;
       }else{
         IntArray* ia2 = new IntArray(0);
         this->afterDanArray = ia2;
         IntArray* tuo2 = new IntArray(30, lotNumChar, acount, ',');
         this->afterTuoArray = tuo2;
       }
}


IntArray* DanTuoNum::getPreDanArray(){
    return this->preDanArray;
}

IntArray* DanTuoNum::getPreTuoArray(){
    return this->preTuoArray;
}

IntArray* DanTuoNum::getAfterDanArray(){
    return this->afterDanArray;
}

IntArray* DanTuoNum::getAfterTuoArray(){
    return this->afterTuoArray;
}



DanTuoNum::~DanTuoNum()
{
    delete this->preDanArray;
    delete this->afterDanArray;
    delete this->preTuoArray;
    delete this->afterTuoArray;
}