console.log('js');

$(document).ready(onReady);

function onReady(){
    getToDoList();
    $('#submit-btn').on('click', addToDoList);
}

//  GET
function getToDoList(){
    console.log('In GET Route');
    $.ajax({
        method: 'GET',
        url: '/todo'
    }).then((getRes) => {
        console.log('The GET /todo was successful');
        generateToDoList(getRes);
    }).catch((error) => {
        console.log('The GET /todo was unsuccessful:', error);
    });
}

//  POST
function addToDoList(){
    console.log('In POST Route');
    const startDateTime = new Date().toLocaleString();
    const newTaskInput = {
        priority: $('#priorityInput').val(),
        owner: $('#ownerInput').val(),
        task: $('#taskInput').val(),
        details: $('#detailsInput').val(),
        start: startDateTime, 
        finish: null,
        complete: false
    }
    $.ajax({
        method: 'POST',
        url: '/todo',
        data: newTaskInput
    }).then((postRes) => {
        console.log('The POST /todo was successful:', postRes);
        getToDoList();
    }).catch((error) => {
        console.log('The POST /todo was unsuccessful:', error);
    });
}

//  DELETE


//  PUT


//  GENERATE
function generateToDoList(tasks){
    console.log('In Generate Function');
    $('#priorityInput').val('');
    $('#ownerInput').val('');
    $('#taskInput').val('');
    $('#detailsInput').val('');
    $('#tableBody').empty();
    for(let currentTask of tasks) {
        $('#tableBody').append(`
            <tr data-id=${currentTask.id}>
                <td>${currentTask.priority}</td>
                <td>${currentTask.owner}</td>
                <td>${currentTask.task}</td>
                <td>${currentTask.details}</td>
                <td>${currentTask.start}</td>
                <td>${currentTask.finish}</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button type="button" class="btn btn-success">COMPLETE</button>
                        <button type="button" class="btn btn-warning">EDIT</button>
                        <button type="button" class="btn btn-danger">DELETE</button>
                    </div>
                </td>
            </tr>
        `);
    }
}