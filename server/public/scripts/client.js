console.log('js');

$(document).ready(onReady);

function onReady(){
    getToDoList();
    $('#submit-btn').on('click', addToDoList);
    $(document).on('click', '#confirmDelete', deleteFromToDoList);
    $(document).on('click', '.complete-btn', completeToDoList);
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
    // inputCheck();
    let startDateTime = new Date().toLocaleString();
    let newTaskInput = {
        priority: $('.priorityInput').val(),
        adventurer: $('.adventurerInput').val(),
        location: $('.locationInput').val(),
        details: $('.detailsInput').val(),
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

//  GENERATE
function generateToDoList(tasks){
    console.log('In Generate Function');
    $('#priorityInput').val('');
    $('#adventurerInput').val('');
    $('#locationInput').val('');
    $('#detailsInput').val('');
    $('#tableBody').empty();
    for(let currentTask of tasks) {
        if(currentTask.complete === false) {
            newRowFormat(currentTask);
        }
        else if(currentTask.complete === true) {
            completedRowFormat(currentTask);
            colorComplete(currentTask.id);
        }
    }
}

//  NEW ROW FORMAT
function newRowFormat(currentTask){
    let detailId = -(currentTask.id);
    let deleteId = (currentTask.id)+0.5;
    $('#tableBody').append(`
        <tr data-id=${currentTask.id} id=${currentTask.id} class="${currentTask.priority}">
            <td>${currentTask.priority}</td>
            <td>${currentTask.adventurer}</td>
            <td>${currentTask.location}</td>
            <td>
                <section>
                    <button type="button" class="nes-btn is-warning" onclick="document.getElementById(${detailId}).showModal();">
                        Click Me!
                    </button>
                    <dialog class="nes-dialog" id=${detailId}>
                        <form method="dialog">
                            <p class="title">${currentTask.adventurer}</p>
                            <p>${currentTask.details}</p>
                            <menu class="dialog-menu">
                                <button class="nes-btn is-primary">Confirm</button>
                            </menu>
                        </form>
                    </dialog>
                </section>
            </td>
            <td>${currentTask.start}</td>
            <td>${currentTask.finish}</td>
            <td>
                <button type="button" class="nes-btn complete-btn is-success">COMPLETE</button>
            </td>
            <td>
                <section>
                    <button type="button" class="nes-btn delete-btn is-error" onclick="document.getElementById(${deleteId}).showModal();">
                        DELETE
                    </button>
                    <dialog class="nes-dialog" id=${deleteId}>
                        <form method="dialog">
                            <p class="title">DELETE</p>
                            <p>Alert: Action is permamnent.</p>
                            <menu class="dialog-menu">
                                <button class="nes-btn">Cancel</button>
                                <button class="nes-btn is-primary" id="confirmDelete">Confirm</button>
                            </menu>
                        </form>
                    </dialog>
                </section>
            </td>
        </tr>
    `);
}

// COMPLETED ROW FORMAT
function completedRowFormat(currentTask){
    let detailId = -(currentTask.id);
    let deleteId = (currentTask.id)+0.5;
    $('#tableBody').append(`
        <tr data-id=${currentTask.id} id=${currentTask.id} class="${currentTask.priority}">
            <td>${currentTask.priority}</td>
            <td>${currentTask.adventurer}</td>
            <td>${currentTask.location}</td>
            <td>
                <section>
                    <button type="button" class="nes-btn is-disabled" onclick="document.getElementById(${detailId}).showModal();">
                        Click Me!
                    </button>
                    <dialog class="nes-dialog" id=${detailId}>
                        <form method="dialog">
                            <p class="title">${currentTask.adventurer}</p>
                            <p>${currentTask.details}</p>
                            <menu class="dialog-menu">
                                <button class="nes-btn is-primary">Confirm</button>
                            </menu>
                        </form>
                    </dialog>
                </section>
            </td>
            <td>${currentTask.start}</td>
            <td>${currentTask.finish}</td>
            <td>
                <button type="button" class="nes-btn is-disabled">COMPLETE</button>
            </td>
            <td>
                <section>
                    <button type="button" class="nes-btn delete-btn is-error" onclick="document.getElementById(${deleteId}).showModal();">
                        DELETE
                    </button>
                    <dialog class="nes-dialog" id=${deleteId}>
                        <form method="dialog">
                            <p class="title">DELETE</p>
                            <p>Alert: Action is permamnent.</p>
                            <menu class="dialog-menu">
                                <button class="nes-btn">Cancel</button>
                                <button class="nes-btn is-primary" id="confirmDelete">Confirm</button>
                            </menu>
                        </form>
                    </dialog>
                </section>
            </td>
        </tr>
    `);
}

//  COMPLETE INDICATOR
function colorComplete(rowId){
    let targetRow = document.getElementById(rowId);
    targetRow.style.backgroundColor = 'black';
    targetRow.style.color = 'gray';
}

//  INPUT CHECK
// function inputCheck(){
//     let priority = $('.priorityInput').val();
//     let adventurer = $('.adventurerInput').val();
//     let location = $('.locationInput').val();
//     let details = $('.detailsInput').val();
//     if(!priority || !adventurer || !location || !details){

//         return;
//     }
//     onReady();
// }
