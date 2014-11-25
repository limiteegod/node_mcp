#include "DrawNum.h"


DrawNum::DrawNum(char *pNum, int len)
{
    int currlen = 0 ; //每个单式的长度
    char *lotNumChar = pNum;
    for(int ch = 0; ch < len ; ch++ ){
        char temp = lotNumChar[ch];
        if(temp == '|'){
            this->preArray = new IntArray(35, lotNumChar, currlen, ',');
            if(ch < len -1){
                lotNumChar = pNum + ch + 1;
            }
            currlen = 0;
        }else if(temp == ';' || ch == len -1 ){ //单式结束或者真正结束了
            if(ch == len -1 && temp != ';')
            currlen ++;

            this->afterArray = new IntArray(12, lotNumChar, currlen, ',');
            currlen = 0;
        }else{
            currlen ++;
        }
    }
}

IntArray* DrawNum::getPreArray(){
    return this->preArray;
}

IntArray* DrawNum::getAfterArray(){
    return this->afterArray;
}

DrawNum::~DrawNum()
{
    delete this->preArray;
    delete this->afterArray;
}