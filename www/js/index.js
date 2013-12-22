var checkInterval;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        setCheckInterval();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function setCheckInterval() {
    checkTime();
    checkInterval = setInterval("checkTime()", 5000);
}

function getBeerOClockTime() {
    var now = new Date();
    var nextboc = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16);
    nextboc.setHours(nextboc.getHours() - 12); // beer o'clock has a duration of 12 hours

    var maxtry = 7;
    while (nextboc.getDay() != 0 && maxtry > 0) { // =friday
        nextboc.setDate(nextboc.getDate() + 1);
        maxtry -= 1;
    }

    nextboc.setHours(nextboc.getHours() + 12) // add 12 hours back

    return nextboc;
}

function checkTime() {
    
    var nextboc = getBeerOClockTime();

    if (getBeerOClockTime() <= new Date()) {
        $("#pnlNo").hide();
        $("#pnlYes").show();

        navigator.notification.beep(3);
        navigator.notification.vibrate(2000);
    } else {
        $("#pnlYes").hide();
        $("#pnlNo").show();

        var today = new Date();
        var diffMs = (nextboc - today); // milliseconds between now & Christmas
        var diffDays = Math.round(diffMs / 86400000); // days
        var diffHrs = Math.round((diffMs % 86400000) / 3600000); // hours
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
        var durationtxt = "";
        if (diffDays > 0) {
            durationtxt = diffDays + " " + (diffDays == 1 ? "day" : "days") + " - " + diffHrs + " hours";
        } else {
            durationtxt = diffHrs + " hours - " + diffMins + " minutes";
        }
        $("#pnlNo .title-timetogo").text(durationtxt);

    }
}

//function calculateDifferenceInDays(date1, date2) {
//    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
//    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
//    return diffDays;
//}
