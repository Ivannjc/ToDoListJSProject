
let currentItemId;
let currentItem;
// to hide the buttons for edit use
hideEditState();
refreshToDoList();
$('document').ready(function () {
    $('.add-task-btn').click(function (e) {
        let task = $('#task_input-field').val();
        // check is the input field empty
        if (task !== '') {
            let taskLists;
            // Check if any item in localStorage
            if (localStorage.getItem('taskLists') === null) {
                taskLists = [];
            } else {
                taskLists = JSON.parse(localStorage.getItem('taskLists'));
            }
            // add new task into Task List
            taskLists.push(task);
            // set localStorage
            localStorage.setItem('taskLists', JSON.stringify(taskLists));
            $('#task_input-field').val('');
            refreshToDoList();
            // prevent form to be submitted
            e.preventDefault();
        } else {
            alert('Type something leh');
        }

    });
    // Click on edit item icon
    $('.collection').on('click', function (e) {
        let taskLists;
        if (localStorage.getItem('taskLists') === null) {
            taskLists = [];
        } else {
            taskLists = JSON.parse(localStorage.getItem('taskLists'));
        }
        if (e.target.classList.contains('edit-item')) {
            currentItemId = e.target.parentNode.parentNode.id;
            currentItem = taskLists[currentItemId];
            console.log(currentItem);
            $('#task_input-field').val(currentItem);
            showEditState();
        }
        // console.log(e.target.parentNode.parentNode.id);
    });
    // Update Button
    $('.update-btn').click(function (e) {
        let taskLists;
        if (localStorage.getItem('taskLists') === null) {
            taskLists = [];
        } else {
            taskLists = JSON.parse(localStorage.getItem('taskLists'));
        }
        // set new value to current item
        taskLists[currentItemId] = $('#task_input-field').val();
        localStorage.setItem('taskLists', JSON.stringify(taskLists));
        console.log(taskLists);
        $('#task_input-field').val('');
        refreshToDoList();
        hideEditState();
        e.preventDefault();
    });
    // Delete Button
    $('.delete-btn').click(function (e) {
        let taskLists;
        if (localStorage.getItem('taskLists') === null) {
            taskLists = [];
        } else {
            taskLists = JSON.parse(localStorage.getItem('taskLists'));
        }
        // remove currentItem from array
        taskLists.splice(currentItemId, 1);
        localStorage.setItem('taskLists', JSON.stringify(taskLists));
        console.log(taskLists);
        $('#task_input-field').val('');
        hideEditState();
        refreshToDoList();
        e.preventDefault();
    });
    // Back Button
    $('.back-btn').click(function () {
        $('#task_input-field').val('');
        hideEditState();
    });

    $('.clear-all-tasks').click(function () {
        localStorage.clear();
        refreshToDoList();
    });


});
// hide update, delete, and back button
function hideEditState() {
    document.querySelector('.update-btn').style.display = 'none';
    document.querySelector('.delete-btn').style.display = 'none';
    document.querySelector('.back-btn').style.display = 'none';
    document.querySelector('.add-task-btn').style.display = 'inline';
}

// show update, delete, and back button
function showEditState() {
    document.querySelector('.update-btn').style.display = 'inline';
    document.querySelector('.delete-btn').style.display = 'inline';
    document.querySelector('.back-btn').style.display = 'inline';
    document.querySelector('.add-task-btn').style.display = 'none';
}

function refreshToDoList() {
    let taskLists;
    if (localStorage.getItem('taskLists') === null) {
        taskLists = [];
    } else {
        taskLists = JSON.parse(localStorage.getItem('taskLists'));
    }
    $('.collection').empty();
    taskLists.forEach(function (array, index) {
        $('.collection').append(`
            <li class="collection-item" id="${index}" >
                ${array}
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>
            </li>`);
    });
}