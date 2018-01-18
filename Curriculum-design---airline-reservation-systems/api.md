1.login
url : '/login',
type : POST,
req : {
    name : '',
    pass : ''
},
res : {
    status : 0/1/2/3,
    value : ok/not exist/pass is err/other err
}

2.get all flights
url : '/flights',
type : 'GET',
req : {},
res : {
	status : 0/1,
	value : flights/err
}

3.change flights
url : '/flights/update',
type : 'POST',
req : {
    number: '',
    time: '',
    amount: '',
    last: '',
    moneny: ''
},
res : {
	status : 0/1,
	value : ok/err
}
