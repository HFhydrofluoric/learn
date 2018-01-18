#include <stdio.h>
#include "sqlite3.h"
#include "head.h"

int main()
{
    int num = 16;
    //登录
    login();
    //菜单
    while (num == 16 || num == 25)
    {
        num = menu();
    }
    //选择&执行
    //choose(num);
}
