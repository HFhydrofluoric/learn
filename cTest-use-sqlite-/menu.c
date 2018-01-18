#include <stdio.h>

int menu()
{
    int flag = 0;
    int type = 0;
    printf("**************************************主菜单*****************************************\n");
    printf("（1）系统管理菜单\n");
    printf("（2）出入库管理菜单\n");
    do {
        printf("请输入1或2选择菜单：");
        scanf("%d", &flag);
        if (flag != 1 && flag != 2)
        {
            printf("输入格式错误，请重新输入\n");
        }
    } while (flag != 1 && flag != 2);
    if (flag == 1)
    {
        printf("系统管理菜单\n");
        printf("（1）增加物品信息\n");
        printf("（2）删除物品信息\n");
        printf("（3）查询物品信息\n");
        printf("（4）显示物品信息\n");
        printf("（5）更改密码\n");
        printf("（6）返回上层\n");
        printf("输入1-6的数字选择功能：");

    } else {
        printf("出入库管理菜单\n");
        printf("（1）物品出库\n");
        printf("（2）物品入库\n");
        printf("（3）库存物品信息\n");
        printf("（4）显示紧缺物品\n");
        printf("（5）返回上层\n");
    }
    type = flag * 10;
    do {
        printf("请输入编号数字选择菜单：");
        scanf("%d", &flag);
        if (flag < 1 || flag > 6)
        {
            printf("输入格式错误，请重新输入\n");
        }
    } while (flag < 1 || flag > 6);
    return (type + flag);
}
