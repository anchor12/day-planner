$(document).ready(function () {

    var dateToday = $("#currentDay");
    var now = moment();
    dateToday.text(now.format("dddd, MMMM Do YYYY")); //shows current day in heading
    

    if (localStorage.getItem("todos") === null) { //checks if there is a list of todos in local storage already
        var todoObject = { //creates todo object in local storage if non existent
            todo9am: '',

            todo10am: '',

            todo11am: '',

            todo12pm: '',

            todo1pm: '',

            todo2pm: '',

            todo3pm: '',

            todo4pm: '',

            todo5pm: ''
        };
    }
    else {
        var todoObject = JSON.parse(localStorage.getItem("todos")); //gets todos from local storage
        var todoTimes = Object.keys(todoObject);
        for (var i=0; i< Object.keys(todoObject).length; i++) {
            var todoText = "textarea." + todoTimes[i];
            $(todoText).val(todoObject[todoTimes[i]]);
        }

    }

    $(".saveBtn").on("click", function () {

        var idText = "todo" + $(this).attr("id");
        var elementTodo = "textarea." + idText + "";
        var newTodo = $(elementTodo).val();
        todoObject[idText] = newTodo;
        var todoObjectStringify = JSON.stringify(todoObject);
        localStorage.setItem("todos", todoObjectStringify);


    });


});