#include <GL/glut.h>
#include <math.h>

//π
#define PI 3.1415926

GLsizei ww = 500,wh = 500;
//图元
#define POINT 1
#define LINE 2
#define RECT 3
#define CIRCLE 4

//颜色
#define GREEN 5
#define RED 6
#define BLUE 7

//清除
#define CLEAR 8

float xm, ym, xmm, ymm, xmmm, ymmm;
//窗口重置
void reshape(GLsizei w, GLsizei h)
{
	   //设置矩阵用于投影变换
       glMatrixMode(GL_PROJECTION);
	   //初始化矩阵
       glLoadIdentity(); 
	   //进行正交投影
       glOrtho(0.0,(GLdouble)w, 0.0,(GLdouble)h, -1.0, 1.0);
	   //设置模型视图操作模式
       glMatrixMode(GL_MODELVIEW);
	   //初始化矩阵
       glLoadIdentity(); 
	   //截取图像
	   glViewport(0,0,w,h);
	   glClearColor(1.0, 1.0, 1.0, 1.0);
       glClear(GL_COLOR_BUFFER_BIT);
       glFlush();

       ww = w;
       wh = h; 
}
//同窗口重置同理
void init()
{	
    glViewport(0,0,ww,wh);
		
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity(); 
    glOrtho(0.0,(GLdouble) ww , 0.0,(GLdouble) wh , -1.0, 1.0);

    glClear(GL_COLOR_BUFFER_BIT);
    glFlush();    
}

//鼠标函数
int mouse(int button, int state, int x, int y) {
	//按下左键进行初始位置的确定
	if(button == GLUT_LEFT_BUTTON && state == GLUT_DOWN){
		xmmm = xmm = xm = x;
		ymmm = ymm = ym = wh - y;
	}
	//弹起左键确定最后鼠标位置
	if(button == GLUT_LEFT_BUTTON && state == GLUT_DOWN){
		xmmm = x;
		ymmm = wh - y;
	}
}

//画点函数
void point(int x, int y) {
	//设置大小
	glPointSize(5);
	glBegin(GL_POINTS);
		glVertex2d(xmmm, ymmm);
	glEnd();
	glFlush();
	//用于跟踪鼠标坐标变化
	xmmm = x;
	ymmm = wh - y;
}

//画线函数，同画点
void line(int x, int y){
	xmm = x;
    ymm = wh-y;
	glBegin(GL_LINES);
		glVertex2f(xm, ym);
		glVertex2f(xmm, ymm);
	glEnd();
	glFlush();
	xm = xmm;
	ym = ymm;
}



//画矩形函数，同画点
void rect(int x, int y) {
    xmm = x;
    ymm = wh - y;
    glBegin(GL_POLYGON);
		glVertex2f(xm, ym);
		glVertex2f(xmm ,ym);
		glVertex2f(xmm ,ymm);
		glVertex2f(xm, ymm);
	glEnd();
    glFlush();
}

//画圆函数，同画点
void circle (int x, int y){
	int R = sqrt((x - xmm)(x - xmm) + (y - ymm)(y - ymm));
	int i;
	glBegin(GL_POLYGON);
        for(i = 0; i < 200; i++) {
            glVertex2f(xmm + R*cos(2*PI/200*i), ymm + R*sin(2*PI/200*i)); 
        }    
    glEnd();
    glFlush();

}
// 菜单函数
void menu(int option){
	switch(option) {
		//选择图形
		case POINT :
			//跟踪鼠标函数
			glutMotionFunc(point);
			break;

		case LINE :
			glutMotionFunc(line);
			break;

		case RECT :
			glutMotionFunc(rect);
			break;
		
		case CIRCLE : 
			glutMotionFunc(circle);
			break;
		//清除画布
		case CLEAR :
			//同初始化画布
			glClear(GL_COLOR_BUFFER_BIT);
			glFlush();
			break;
		//设置颜色
		case RED : 
			glColor3f(255.0,0.0,0.0);
			break;

		case GREEN : 
			glColor3f(0.0,255.0,0.0);
			break;
		
		case BLUE :
			glColor3f(0.0,0.0,255.0);
			break;
	}
	//鼠标click事件回调函数
	glutMouseFunc(mouse);
};

//显示菜单函数
void showMenu () {
	int mainMenu,
		subMenuGRA,
		subMenuCOL;
	//二级菜单，图形
	subMenuGRA = glutCreateMenu(menu);
	glutAddMenuEntry("点", POINT);
	glutAddMenuEntry("线", LINE);
	glutAddMenuEntry("矩形", RECT);
	glutAddMenuEntry("圆", CIRCLE);
	//二级菜单，颜色
	subMenuCOL = glutCreateMenu(menu);
	glutAddMenuEntry("绿色", GREEN);
	glutAddMenuEntry("红色", RED);
	glutAddMenuEntry("蓝色", BLUE);
	//一级菜单
	mainMenu = glutCreateMenu(menu);
	glutAddSubMenu("图形", subMenuGRA);
	glutAddSubMenu("颜色", subMenuCOL);
	glutAddMenuEntry("清除", CLEAR);

	glutAttachMenu(GLUT_RIGHT_BUTTON);
}

void display () {}

//主函数。用于建立窗口和将各种回调函数进行注册
int main(int argv, char ** argc) {
	glutInit(&argv, argc);
	glClear(GL_COLOR_BUFFER_BIT);
	glutInitDisplayMode(GLUT_SINGLE | GLUT_RGB);
	glutInitWindowSize(ww,wh);
	glutInitWindowPosition(500,500);
	glutCreateWindow("画板");

	init();
	
	glutReshapeFunc(reshape);
	showMenu();
	glutDisplayFunc(display);

	glutMainLoop();
}
