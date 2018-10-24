$(document).on("ready", function () {
    $("#question").on("keyup", function() {
        $("#answerbar")[0].innerHTML = "";
        if (database.hasOwnProperty(this.value)) {
            let list = database[this.value];
            var inner = "";
            for (let i = 0; i < list.length; i++) {
                inner += buildAnswer(list[i]);
            }
            $("#answerbar")[0].innerHTML = inner;
        }
    });

    $.each(questions, function (key, val) {
        var dbKey = "";
        var next = true;
        const question = val.q;
        for (let i = 0; i < question.length && dbKey.length < 5; i++) {
            const c = question.charAt(i).toLowerCase();
            if (c.match(/[a-zA-Z]/i)) {
                if (next) {
                    dbKey += c;
                    next = false;
                }
            } else {
                next = true;
            }
        }
        if (!database.hasOwnProperty(dbKey)) {
            database[dbKey] = [];
        }
        database[dbKey].push(val);
    })
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
