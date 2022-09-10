console.log('js');

$(document).ready(onReady);

function onReady(){
    getToDoList();
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
        generateToDoList(getRes);
    }).catch((error) => {
        console.log('The GET to /todo was unsuccessful:', error);
    })
}

//  POST

//  DELETE

//  PUT

//  GENERATE

function generateToDoList(tasks){
    console.log('In Generate Function');
    console.log(tasks);
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
        `)
    }
}