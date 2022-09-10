console.log('js');

$(document).ready(onReady);

function onReady(){
    generateToDoList();
    $('#submit-btn').on('click', getToDoList);
}

//  GET

function getToDoList(){
    console.log('In GET Route');
    $.ajax({
        method: 'GET',
        url: '/todo'
    }).then((getRes) => {
        console.log('The GET to /todo was successful:', getRes);
        generateToDoList();
    }).catch((error) => {
        console.log('The GET to /todo was unsuccessful:', error);
    })
}

//  POST

//  DELETE

//  PUT

//  GENERATE

function generateToDoList(){
    console.log('In Generate Function');
}