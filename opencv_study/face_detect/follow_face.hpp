//opencv
#include <opencv2/core/core.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/objdetect/objdetect.hpp>
#include <opencv2/videoio/videoio.hpp>
#include <opencv2/imgproc.hpp>
//c++
#include <iostream>
#include <string>
#include <vector>

using namespace cv;
using namespace std;

int face_camera(const string &path);
void detect_face(CascadeClassifier &face, Mat *frame);

//-----------------------[打开摄像头，监测人脸并识别]------------------
int face_camera(const string &path)
{
    Mat frame;                                     //save the frame from camera
    VideoCapture capture;                          //capture video from camera
    CascadeClassifier face;                         //the object that load face_cascade
    if (!face.load(path))
    {
        cerr << "can't load face xml data!" << endl;
        return false;
    }

    capture.open(0);                                //open the camera
    if (!capture.isOpened())
    {
        cerr << "can't open camera" << endl;
        return false;
    }

    while (capture.read(frame))
    {
        if (frame.empty())
        {
            cerr << "cant't read from camera" << endl;
            return false;
        }
        detect_face(face, &frame);
        char c = (char)waitKey(10);
        if (c == 'q' || c == 'c')
        {
            break;
        }
    }
    return 0;
}
//------------------------[给人脸加上框]---------------------------
void detect_face(CascadeClassifier &face, Mat *frame)
{
    vector<Rect> faces;                              //the rect to circle face
    Mat frame_gray;                                 //get the frame_gray from frame
    cvtColor(*frame, frame_gray, COLOR_RGB2GRAY);
    equalizeHist(frame_gray, frame_gray);

    //detect the face
    face.detectMultiScale(frame_gray, faces, 1.2, 3, 0, Size(30, 30));

    for (size_t i = 0; i < faces.size(); i++)
    {
        rectangle(*frame, faces[i], Scalar(0, 255, 0));
    }
    imshow("face_detect", *frame);
}
