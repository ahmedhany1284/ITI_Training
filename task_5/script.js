// document.addEventListener("DOMContentLoaded", function () {
//     document.querySelector("button.btn-success").addEventListener("click", SaveStudent);
//     document.querySelector("button.btn-primary").addEventListener("click", ShowStudents);
//     Clear();
// });

function SaveStudent() {
    var Id = document.getElementById("ID").value;
    var Name = document.getElementById("Name").value;
    var Age = document.getElementById("Age").value;
    var Gender = document.querySelector("input[name='Gender']:checked").value;
    var City = document.getElementById("City").value;

    var data = {
        Id,
        Name,
        Age,
        Gender,
        City,
    };

    var xhr = new XMLHttpRequest();

    if (Id === "") {
        // ADD
        xhr.open("POST", "https://iti-task-5a266-default-rtdb.firebaseio.com/student.json");
    } else {
        // UPDATE
        xhr.open("PATCH", `https://iti-task-5a266-default-rtdb.firebaseio.com/student/${Id}/.json`);
    }

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log("Data saved/updated");
                Clear();
                ShowStudents();
            }
        }
    };
}

function Clear() {
    document.getElementById("ID").value = "";
    document.getElementById("Name").value = "";
    document.getElementById("Age").value = "";
    document.querySelector("input[name='Gender']:checked").checked = false;
    document.getElementById("City").value = "";
    editStudentId = null; 
}

function ShowStudents() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://iti-task-5a266-default-rtdb.firebaseio.com/student.json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            var tableBody = document.querySelector("#StudentData>tbody");
            tableBody.innerHTML = "";

            for (let std in data) {
                var row = `<tr>
                    <td>${std}</td>
                    <td>${data[std].Name}</td>
                    <td>${data[std].Age}</td>
                    <td>${data[std].Gender}</td>
                    <td>${data[std].City}</td>
                    <td>
                        <button class="btn btn-warning" onclick="SetValueToUpdate('${std}', '${data[std].Name}', '${data[std].Age}', '${data[std].Gender}', '${data[std].City}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger" onclick="deleteStudent('${std}')">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>`;

                tableBody.innerHTML += row;
            }
        }
    };

    xhr.send();
}



function deleteStudent(studentId) {
    if (confirm("Are you sure you want to delete this student?")) {
        const xhr = new XMLHttpRequest();
        xhr.open("DELETE", `https://iti-task-5a266-default-rtdb.firebaseio.com/student/${studentId}.json`);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log("Student deleted");
                    ShowStudents();
                } else {
                    console.error("Error deleting student:", xhr.status, xhr.statusText);
                }
            }
        };

        xhr.send();
    }
}



let editStudentId = null; // Global variable to store the ID of the student being edited

function SetValueToUpdate(id, name, age, gender, city) {
    editStudentId = id;

    document.getElementById("ID").value = id;
    document.getElementById("Name").value = name;
    document.getElementById("Age").value = age;
    
    if (gender === "Male") {
        document.getElementById("Male").checked = true;
    } else if (gender === "Female") {
        document.getElementById("Female").checked = true;
    }
    
    document.getElementById("City").value = city;
}

function UpdateStudent() {
    if (!editStudentId) {
        alert("Please select a student to edit.");
        return;
    }

    const id = document.getElementById("ID").value;
    const name = document.getElementById("Name").value;
    const age = document.getElementById("Age").value;
    const gender = document.querySelector("input[name='Gender']:checked").value;
    const city = document.getElementById("City").value;

    const data = {
        ID: id,
        Name: name,
        Age: age,
        Gender: gender,
        City: city,
    };

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `https://iti-task-5a266-default-rtdb.firebaseio.com/student/${editStudentId}.json`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log("Student updated");
                Clear();
                editStudentId = null; // Reset the editStudentId
                ShowStudents();
            } else {
                console.error("Error updating student:", xhr.status, xhr.statusText);
            }
        }
    };
}