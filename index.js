const inquirer = require("inquirer");
const fs = require("fs");

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');


const employees = [];

function init() {
    console.log("Build your Team!")
    startHtml();
    addTeamMember();
}

function addTeamMember() {

    inquirer.prompt([
        {
            type: "input",
            message: "Enter team member's name: ",
            name: "name",
            validate: function (answer) {
                if (answer.length < 1) {
                    return console.log("A valid name is required.");
                }
                return true;
            }

        },
        {
            type: "list",
            message: "Select team member's role",
            choices: [
                "Engineer",
                "Intern",
                "Manager"
            ],
            name: "role"
        },
        {
            type: "input",
            message: "Enter team member's id: ",
            name: "id",
            validate: function (answer) {
                if (answer.length < 1) {
                    return console.log("A valid ID is required.");
                }
                return true;
            }
        },
        {
            type: "input",
            message: "Enter team member's email address: ",
            name: "email",
            validate: function (answer) {
                if (answer.length < 1) {
                    return console.log("A valid email is required.");
                }
                return true;
            }

        }])
        .then(function ({ name, role, id, email }) {
            let roleInfo = "";
            if (role === "Engineer") {
                roleInfo = "GitHub username";
            } else if (role === "Intern") {
                roleInfo = "school name";
            } else {
                roleInfo = "office phone number";
            }
            inquirer.prompt([{
                message: `Enter team member's ${roleInfo}`,
                name: "roleInfo"
            },
            {
                type: "list",
                message: "Would you like to add more team members?",
                choices: [
                    "yes",
                    "no"
                ],
                name: "moreMembers",
            }])
                .then(function ({ roleInfo, moreMembers }) {
                    let newMember;
                    if (role === "Engineer") {
                        newMember = new Engineer(name, id, email, roleInfo);
                    } else if (role === "Intern") {
                        newMember = new Intern(name, id, email, roleInfo);
                    } else {
                        newMember = new Manager(name, id, email, roleInfo);
                    }
                    employees.push(newMember);
                    addHtml(newMember)
                        .then(function () {
                            if (moreMembers === "yes") {
                                console.log("Add more team memebers!")
                                addTeamMember();

                            } else {
                                finishHtml();
                            }
                        });

                });
        });
}


function startHtml() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossorigin="anonymous"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="./style.css" />
    <title>Team Profile</title>
    <body>
    <nav class="navbar mb-5">
      <span class="navbar-brand mt-3 h1 w-100 text-center"><i class="bi bi-people-fill"></i>Team Profile</span>
    </nav>
        <div class="container">
            <div class="row">`;
    fs.writeFile("./dist/index.html", html, err => {
        if (err) {
            console.log(err);
        }

    });

}




function addHtml(member) {
    return new Promise(function (resolve, reject) {
        const name = member.getName();
        const role = member.getRole();
        const id = member.getId();
        const email = member.getEmail();
        let data = "";
        if (role === "Engineer") {
            const gitHub = member.getGithub();
            data = `
            <div class="col">
                <div class="card  mb-3" style="width: 18rem">
                    <h5 class="card-header">${name}<br /><i class="bi bi-wrench"></i><br />Engineer
                    </h5>
                    <ul class="list-group list-group-flush">
                       <li class="list-group-item"><i class="bi bi-person"></i>  ${id}</li>
                       <li class="list-group-item"><i class="bi-mailbox"></i>  ${email}</li>
                       <li class="list-group-item"><i class="bi-github" role="img" aria-label="GitHub"></i>  ${gitHub}</li>
                    </ul>
                </div>
            </div>`;
        } else if (role === "Intern") {
            const school = member.getSchool();
            data = `<div class="col">
            <div class="card mb-3" style="width: 18rem">
                <h5 class="card-header">${name}<br /><br />Intern</h5>
                <ul class="list-group list-group-flush">
                <li class="list-group-item"><i class="bi bi-person"></i>  ${id}</li>
                <li class="list-group-item"><i class="bi-mailbox"></i>  ${email}</li>
                    <li class="list-group-item">School ${school}</li>
                </ul>
            </div>
        </div>`;
        } else {
            const officePhone = member.getOfficeNumber();
            data = `<div class="col">
            <div class="card mb-3" style="width: 18rem">
                <h5 class="card-header">${name}<br /><br />Manager</h5>
                  <ul class="list-group list-group-flush">
                  <li class="list-group-item"><i class="bi bi-person"></i>  ${id}</li>
                  <li class="list-group-item"><i class="bi-mailbox"></i>  ${email}</li>
                    <li class="list-group-item">Office Phone ${officePhone}</li>
                  </ul>
            </div>
        </div>`
        }

        fs.appendFile("./dist/index.html", data, (err) => {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });


}

function finishHtml() {
    const html = ` </div>
    </div>
    
</body>
</html>`;

    fs.appendFile("./dist/index.html", html, (err) => {
        if (err) {
            console.log(err);
        };
    });
    console.log("Success! Your team profile has been generated!");
}

init();