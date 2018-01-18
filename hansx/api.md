# api for hansx
## created by hanfeng 2016-4-16

1. login
url : '/login',
method : 'POST'
req : {
	name : 'han',
	password : '84366361'
},
res : {
    status : 0/1/3/4,
    value : 'err',success'/'pass err'/not exit'
}

2.add blogs
url : '/addBlogs',
method : 'POST',
req : {
    content : '666',
    classfiy : 'linux'
},
res : {
    status : 0/1,
    value : error/success
}

3.get all blogs
url : '/allBlogs',
method : 'GET',
req : {
    null
},
res : {
   status : 0/1/2,
    value : error/success/null data
    data : [
        content : 'faf',
        time : '20',
        classfiy : 'linux'
    ]
}
4.get a blogs
url : '/blogs',
method : 'GET',
req : {
    _id : '0121030200.0'_
},
res : {
     status : 0/1,
    value : error/success
    data : [
        content : 'faf',
        time : '20',
        classfiy : 'linux'
    ]
}