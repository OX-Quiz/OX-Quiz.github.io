let database = {};
let takenKeys = {};

$(document).on("ready", function () {
    $("#question").on("keyup", function() {
        $("#answerbar")[0].innerHTML = "";
        if (database.hasOwnProperty(this.value)) {
            $("#answerbar")[0].innerHTML = buildAnswer(database[this.value]);
        }
    });

    $.each(questions, function (key, val) {
        var dbKey = "";
        var next = true;
        const question = val.q;
        for (let i = 0; i < question.length && dbKey.length < 7; i++) {
            const c = question.charAt(i).toLowerCase();
            if (c.match(/[a-zA-Z']/i)) {
                if (next) {
                    dbKey += c;
                    next = false;
                }
            } else {
                next = true;
            }
        }
        console.log("dbKey is: " + dbKey);
        for (let i = 0; i < dbKey.length; i++) {
            let key = dbKey.substr(0, i+1);

            if (takenKeys.hasOwnProperty(key)) {
                console.log(" - key " + key + " is taken and was removed");
            } else if (database.hasOwnProperty(key)) {
                console.log(" - key " + key + " is taken, remove entry");
                delete database[key];
                takenKeys[key] = 0;
            } else {
                console.log(" - key " + key + " registered");
                database[key] = val;
            }
        }
    });
    takenKeys = {};
});

function buildAnswer(item) {
    return "<div class='card" + (item.b === 1 ? " O":" X") + "'>"
         + "<div class='quiz'>QUIZ</div>"
         + "<div class='category'>" + item.c + "</div>"
         + "<div class='question'>" + item.q + "</div>"
         + "<div class='answer'>"   + item.a + "</div>"
         + "<div class='result'></div>"
         + "</div>";
}
