function loadStreakGrid() {
    let grid = document.getElementById("streakGrid");
    grid.innerHTML = "";

    let today = new Date();
    let records = JSON.parse(localStorage.getItem("dailyRecords")) || [];

    for (let i = 29; i >= 0; i--) {
        let day = new Date();
        day.setDate(today.getDate() - i);

        let box = document.createElement("div");
        box.className = "day-box";

        let record = records.find(r => r.date === day.toDateString());

        if (record) {
            let length = record.content.length;

            if (length < 30) {
                box.classList.add("light");
            } else if (length < 80) {
                box.classList.add("medium");
            } else {
                box.classList.add("dark");
            }
        }
        box.title = day.toDateString() + (record ? " | Work done" : " | No work");


        grid.appendChild(box);
    }
}

let records = JSON.parse(localStorage.getItem("dailyRecords")) || [];

function saveProgress() {
    let text = document.getElementById("dailyInput").value;

    if (text.trim() === "") {
        alert("Please write something about today.");
        return;
    }

    let today = new Date().toDateString();

    records.push({
        date: today,
        content: text
    });

    localStorage.setItem("dailyRecords", JSON.stringify(records));
    loadStreakGrid();

    document.getElementById("dailyInput").value = "";

    displayRecords();
}

function displayRecords() {
    let container = document.getElementById("records");
    container.innerHTML = "";

    records.forEach((record, index) => {
        let div = document.createElement("div");
        div.className = "record";

        div.innerHTML = `
            <strong>${record.date}</strong><br>
            ${record.content}
            <br><br>
            <button onclick="deleteRecord(${index})">❌ Delete</button>
        `;

        container.appendChild(div);
    });
}
function deleteRecord(index) {
    records.splice(index, 1);
    localStorage.setItem("dailyRecords", JSON.stringify(records));
    displayRecords();
    loadStreakGrid();
}



displayRecords();
loadStreakGrid();

