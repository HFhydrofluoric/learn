#include "follow_face.hpp"
#include <string>
#include <sstream>
int main (int argc, char *argv[])
{
    if (argc < 2)
    {
        cerr << "Usage is {main}{data.xml}" <<endl;
        return false;
    }
    //char to string
    stringstream tmp;
    string path;
    tmp << argv[1];
    tmp >> path;
    //in mac, my path is /usr/local/Cellar/opencv3/3.2.0/share/OpenCV/haarcascades/haarcascade_frontalface_alt.xml
    face_camera(path);
    return 0;
}
