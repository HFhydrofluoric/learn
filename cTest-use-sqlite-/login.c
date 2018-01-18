#include <stdio.h>
#include "head.h"
#include <string.h>
#include "sqlite3.h"

int user_exist = 1;
int login_success = 0;
int get_user(void * data, int col_count, char ** col_values, char ** col_Name)
{
	user_exist = 0;
	return 0;
}
int login_sure(void *data, int col_count, char **col_values, char **col_Names)
{
	if (strcmp((char*)data,(char*)col_values[0]) == 0)
	{
		login_success = 1;
	}
	return 0;
}

int login()
{
    char name[15];
    char pswd[15];
	char pswdR[15];
	int flag = 0;
	int result;
	sqlite3 *user = 0;
	char *errmsg;
	// 数据库回调函数
	char *add_user;
	char *get_pswd;

    if (sqlite3_open("./db/cTest.db", &user) != SQLITE_OK)
	{
		printf("数据库连接失败");
		return 1;
	}
    result = sqlite3_exec(user, "create table if not exists users(ID integer primary key autoincrement, name varchar(15), pswd varchar(15))" , NULL, NULL, &errmsg);
	result = sqlite3_exec(user, "select * from users", get_user, NULL, &errmsg);
	if (user_exist)
    {
        printf("首次登录，请输入用户名注册：");
        scanf("%s", name);
		while (flag != 1)
		{
            printf("请输入密码：");
            scanf("%s", pswd);
            printf("请再次 输入密码：");
        	scanf("%s", pswdR);
			if (strcmp(pswd, pswdR) != 0)
			{
				flag = 0;
				printf("两次密码输入不一致，请重新输入");
			} else {
				flag = 1;
			}
		}
		add_user = sqlite3_mprintf("insert into users values(1,'%s', '%s')", name, pswd);
		sqlite3_exec(user, add_user, NULL, NULL, &errmsg);
    }
	printf("*****************************************登录*******************************************\n");
    while (!login_success)
	{
		printf("请输入用户名：");
    	scanf("%s", name);
    	printf("请输入密码：");
    	scanf("%s", pswd);
		get_pswd = sqlite3_mprintf("select pswd from users where name = '%s'", name);
		sqlite3_exec(user, get_pswd, login_sure, pswd, &errmsg);
		if (login_success == 0)
		{
			printf("用户不存在或者密码错误。请重新登录");
		}
	}
	printf("登录成功");
	sqlite3_close(user);

	return 0;
}

