"use strict";

let draw = function (sd) {
    const activity = Math.ceil(sd);
    if (activity < 0) {
        $("#imageView").css("background-color", "gray");
        $("#textViewState").text("外出中");
    }
    else if (activity <= 4) {
        $("#imageView").css("background-color", "cornflowerblue");
        $("#textViewState").text("お休み中");
    }
    else if (activity <= 7) {
        $("#imageView").css("background-color", "yellowgreen");
        $("#textViewState").text("ゆっくり活動中");
    }
    else if (activity <= 10) {
        $("#imageView").css("background-color", "hotpink");
        $("#textViewState").text("元気に活動中！");
    }
    else {
        $("#imageView").css("background-color", "orangered");
        $("#textViewState").text("超元気！！！");
    }
};

const updateUI = function (data) {
    switch (data.state) {
        case "ENTER":
            $("#imageView").css("background-color", "yellowgreen");
            $("#textViewState").text("いま帰宅しました");
            break;
        case "DWELL":
            draw(data.sd);

            break;
        case "EXIT":
            $("#imageView").css("background-color", "gray");
            $("#textViewState").text("外出中");
            break;
        default:
    }
};

firebase.initializeApp(config);

const db = firebase.firestore();

db.collection("ibeacon")
    .orderBy("time", "asc")
    .onSnapshot(function (snapshot) {
        snapshot.docChanges.forEach(function (change) {
            if (change.type === "added") {
                console.log("added", change.doc.data());
                updateUI(change.doc.data());
            }
        });

    }, function (error) {
        alert(error);
    });