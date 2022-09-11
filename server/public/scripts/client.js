console.log('js');

$(document).ready(onReady);

function onReady(){
    getToDoList();
    $('#submit-btn').on('click', addToDoList);
    $(document).on('click', '.delete-btn', deleteFromToDoList);
    $(document).on('click', '.complete-btn', completeToDoList);
    $(document).on('click', '.complete-btn', colorComplete);
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
    let startDateTime = new Date().toLocaleString();
    let newTaskInput = {
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

//  PUT - COMPLETE
function completeToDoList(){
    console.log('In PUT Route (COMPLETE)');
    let idToComplete = $(this).closest('tr').data("id");
    $.ajax({
        method: 'PUT',
        url: `/todo/${idToComplete}`
    }).then((completeRes) => {
        console.log('The PUT (COMPLETE) /todo was successful:', completeRes);
        getToDoList();
    }).catch((error) => {
        console.log('The PUT (COMPLETE) /todo was unsuccessful:', error);
    });
}

//  PUT - EDIT


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
            <tr data-id=${currentTask.id} id=${currentTask.id}>
                <td>${currentTask.priority}</td>
                <td>${currentTask.owner}</td>
                <td>${currentTask.task}</td>
                <td>${currentTask.details}</td>
                <td>${currentTask.start}</td>
                <td>${currentTask.finish}</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button type="button" class="btn complete-btn btn-success">COMPLETE</button>
                        
                        <button type="button" class="btn delete-btn btn-danger">DELETE</button>
                    </div>
                </td>
            </tr>
        `);
    }
}

//  COMPLETE INDICATOR
function colorComplete(){
    let targetRow = document.getElementById($(this).closest('tr').data("id"));
    targetRow.style.backgroundColor = 'purple';
}

// function colorComplete(){
//     console.log('in color function:', $(this).closest('tr').data("id"));
//     let targetRow = $(this).closest('tr').data("id");
//     console.log(targetRow);
//     let focus = document.getElementById(targetRow);
//     focus.style.backgroundColor = 'gray';
// }