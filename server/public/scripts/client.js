console.log('js');

$(document).ready(onReady);

function onReady(){
    getToDoList();
    $('#submit-btn').on('click', addToDoList);
    $(document).on('click', '.delete-btn', deleteFromToDoList);
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
function deleteFromToDoList(){
    console.log('In DELETE Route');
    let idToDelete = $(this).closest('tr').data("id");
    $.ajax({
        method: 'DELETE',
        url: `/todo/${idToDelete}`
    }).then((deleteRes) => {
        console.log('The DELETE /todo was successful:', deleteRes);
        getToDoList();
    }).catch((error) => {
        console.log('The DELETE /todo was unsuccessful:', error);
    });
}

//  PUT - EDIT


//  PUT - COMPLETE


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
                        <button type="button" class="btn complete-btn btn-success">COMPLETE</button>
                        <button type="button" class="btn edit-btn btn-warning">EDIT</button>
                        <button type="button" class="btn delete-btn btn-danger">DELETE</button>
                    </div>
                </td>
            </tr>
        `);
    }
}