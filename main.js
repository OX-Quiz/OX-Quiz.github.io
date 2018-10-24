let database = {};

$(document).on("ready", function () {
    console.log("Building Database");
    $.each(questions, function (key, val) {
        let dbKey = "";
        let next = true;
        const question = val.q;
        for (let i = 0; i < question.length && dbKey.length < 7; i++) {
            const c = question.charAt(i).toLowerCase();
            if (c.match(/[0-9a-zA-Z']/i)) {
                if (next) {
                    dbKey += c;
                    next = false;
                }
            } else {
                next = true;
            }
        }
        for (let i = 0; i < dbKey.length; i++) {
            let key = dbKey.substr(0, i + 1);

            if (!database.hasOwnProperty(key)) {
                database[key] = [];
            }
            if (database[key].length < 5) {
                database[key].push(val);
            }
        }
    });
    console.log("Database is ready");

    const answerbar = $("#answerbar")[0];
    $("#question").on("keyup", function () {
        answerbar.innerHTML = "";
        if (database.hasOwnProperty(this.value)) {
            let list = database[this.value];
            for (let i = 0; i < list.length; i++) {
                answerbar.innerHTML += buildAnswer(list[i]);
            }
        }
    });
});

function buildAnswer(item) {
    return "<div class='card" + (item.b === 1 ? " O" : " X") + "'>"
        + "<div class='quiz'>QUIZ</div>"
        + "<div class='category'>" + item.c + "</div>"
        + "<div class='question'>" + item.q + "</div>"
        + "<div class='answer'>" + item.a + "</div>"
        + "<div class='result'></div>"
        + "</div>";
}
