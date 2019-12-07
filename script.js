$(document).ready(function () {

    var dateToday = $("#currentDay");
    var now = moment();
    dateToday.text(now.format("dddd, MMMM Do YYYY")); //shows current day in heading
    var hourNow = moment().format('LT')[0];

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
        for (var i = 0; i < Object.keys(todoObject).length; i++) {
            var todoText = "textarea." + todoTimes[i];
            $(todoText).val(todoObject[todoTimes[i]]);
        }
    }
    var times = Object.keys(todoObject);
    var todos = Object.values(todoObject);
    var hourNow = moment().format('LT').split(':')[0];
    var now = moment();
    var hourToCheckLate = (now.day() !== 0) ? 18 : 00;
    var dateToCheckLate = now.hour(hourToCheckLate).minute(00);
    var hourToCheckEarly = (now.day() !== 0) ? 08 : 00;
    var dateToCheckEarly = now.hour(hourToCheckEarly).minute(00);
    var t;
    if (!((moment().isAfter(dateToCheckLate)) && !(moment().isBefore(dateToCheckEarly)))) {
        for (t = 0; t < times.length; t++) {
            if (parseInt(times[t].substr(4, times.length - 2)) === parseInt(hourNow)) {
                var textClass = "textarea." + times[t] + "";
                $(textClass).addClass("present");
                break;
            };
        };
        t = t + 1;
        while (t < times.length) {
            var string = "textarea." + times[t] + "";
            $(string).addClass("future"); //this should turn the future hours green
            t++;
        };
    };
    $(".saveBtn").on("click", function () {
        var idText = "todo" + $(this).attr("id");
        var elementTodo = "textarea." + idText + "";
        var newTodo = $(elementTodo).val();
        todoObject[idText] = newTodo;
        var todoObjectStringify = JSON.stringify(todoObject);
        localStorage.setItem("todos", todoObjectStringify);
    });
});