var students = [];
var index = -1;

function reg() {
    var fullname = document.getElementById('name');
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var mess = document.getElementById('mess');

    if (email.value.includes('@') == false || email.value == '' ||
        fullname.value == '' ||
        password.value.length < 8 || password.value == '') mess.innerHTML += 'Incorrect data';
    else {
        var id = 0;
        for (let i = 0; i < students.length; i++) {
            if (id < students[i].id) id = students[i].id;
        }

        students.push({
            id: id + 1,
            fullname: fullname.value,
            email: email.value,
            password: password.value,
            delete: false,
        });
        localStorage.setItem('students', JSON.stringify(students));
        localStorage.setItem('index', students.length - 1);
        window.open('profile.html');
    }
}

function login() {
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var mess = document.getElementById('mess');

    if (email.value == '' ||
        password.value == '') mess.innerHTML += 'Incorrect data';
    else {
        var id = -1;
        for (let i = 0; i < students.length; i++) {
            if (password.value == students[i].password && email.value == students[i].email) id = i;
        }
        if (id == -1) mess.textContent = 'Incorrect login or password!';
        else {
            if (students[id].delete == true) mess.textContent = 'You are banned';
            else {
                index = id;
                localStorage.setItem('index', index);
                window.open('profile.html', '_self', false)
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.students == null) {
        localStorage.setItem('students', JSON.stringify([]));
        localStorage.setItem('index', JSON.stringify(-1));
    }

    students = JSON.parse(localStorage.students);
    index = Number(localStorage.index);

    var bool = false;
    for (let i = 0; i < students.length; i++) {
        if (students[i].email == 'admin@drive.kz') bool = true;
    }
    if (bool == false) {
        var id = 0;
        for (let i = 0; i < students.length; i++) {
            if (id < students[i].id) id = students[i].id;
        }

        students.push({
            id: id + 1,
            fullname: 'Admin',
            email: 'admin@drive.kz',
            password: 'admin1234',
            delete: false,
        });
        localStorage.setItem('students', JSON.stringify(students));
    }

    if (index != -1) {
        console.log(index);
        document.querySelector('ul.nav').children[document.querySelector('ul.nav').childElementCount - 1].firstChild.textContent = students[index].fullname;
        document.querySelector('ul.nav').children[document.querySelector('ul.nav').childElementCount - 2].style.display = 'none';
        document.querySelector('ul.nav').children[document.querySelector('ul.nav').childElementCount - 1].firstChild.href = 'profile.html';
        if (students[index].email == 'admin@drive.kz') {
            var a = document.createElement('a');
            a.href = 'admin.html';
            a.textContent = 'Manage'
            var li = document.createElement('li');
            li.appendChild(a);
            document.querySelector('ul.nav').appendChild(li);
        }
    }
});

function profile() {
    if (index != -1) {
        document.getElementById('name').textContent = students[index].fullname;
        document.getElementById('email').textContent = students[index].email;
        document.getElementById('password').textContent = students[index].password;
    }
}

function editprofile() {
    var mydata = document.getElementById('mydata');
    var fullname = document.getElementById('name');
    var email = document.getElementById('email');
    var password = document.getElementById('password');

    fullname.innerHTML = '';
    var inpN = document.createElement('input');
    inpN.placeholder = 'Fullname';
    fullname.appendChild(inpN);
    email.innerHTML = '';
    var inpE = document.createElement('input');
    inpE.type = 'email';
    inpE.placeholder = 'Email';
    email.appendChild(inpE);
    password.innerHTML = '';
    var inpP = document.createElement('input');
    inpP.placeholder = 'Password';
    password.appendChild(inpP);
    document.getElementById('manager').removeChild(document.getElementById('manager').children[0]);
    var btns = document.createElement('button');

    btns.className = 'btn-profile';
    btns.onclick = function() {
        if (inpE.value.includes('@') == false || inpE.value == '' ||
            inpN.value == '' ||
            inpP.value.length < 8 || inpP.value == '') return;
        students[index].fullname = inpN.value;
        students[index].email = inpE.value;
        students[index].password = inpP.value;
        localStorage.setItem('students', JSON.stringify(students));
        window.location.href = 'profile.html';
    }
    btns.textContent = 'Update';
    document.getElementById('manager').prepend(btns);
}

function manageStudents() {
    for (let i = 0; i < students.length; i++) {
        if (students[i].email != 'admin@drive.kz') {
            var tr = document.createElement('tr');
            var fullname = document.createElement('td');
            var email = document.createElement('td');
            var password = document.createElement('td');
            var del = document.createElement('td');
            var ban = document.createElement('td');
            var edit = document.createElement('td');
            var editbtn = document.createElement('button');
            var button = document.createElement('button');
            var banned = document.createElement('button');
            button.className = 'btn';
            editbtn.className = 'btn';
            banned.className = 'btn';
            button.textContent = 'Delete';
            editbtn.textContent = 'Edit';
            editbtn.onclick = function() {
                var parent = this.parentElement;
                parent.parentElement.children[0].innerHTML = '';
                var inputName = document.createElement('input');
                inputName.placeholder = 'Fullname';
                parent.parentElement.children[0].appendChild(inputName);
                parent.parentElement.children[1].innerHTML = '';
                var inputEmail = document.createElement('input');
                inputEmail.type = 'email';
                inputEmail.placeholder = 'Email';
                parent.parentElement.children[1].appendChild(inputEmail);
                parent.parentElement.children[2].innerHTML = '';
                var inputPass = document.createElement('input');
                inputPass.placeholder = 'Password';
                inputPass.type = 'password';
                parent.parentElement.children[2].appendChild(inputPass);
                parent.innerHTML = '';
                var btns = document.createElement('button');
                btns.className = 'btn';
                btns.textContent = 'Update';
                btns.onclick = function() {
                    if (inputEmail.value.includes('@') == false || inputEmail.value == '' ||
                        inputName.value == '' ||
                        inputPass.value.length < 8) return;
                    else {
                        students[i].fullname = inputName.value;
                        students[i].email = inputEmail.value;
                        students[i].password = inputPass.value;
                        localStorage.setItem('students', JSON.stringify(students));
                        window.location.href = 'admin.html';
                    }
                }
                parent.appendChild(btns);
            }
            banned.textContent = students[i].delete == false ? "Ban" : 'Unban';
            banned.onclick = function() {
                if (students[i].delete == true) students[i].delete = false;
                else students[i].delete = true;
                localStorage.setItem('students', JSON.stringify(students));
                window.location.href = 'admin.html';
            }
            button.onclick = function() {
                students.splice(i, 1);
                localStorage.setItem('students', JSON.stringify(students));
                window.location.href = 'admin.html';
            }
            edit.appendChild(editbtn);
            del.appendChild(button);
            ban.appendChild(banned);
            password.textContent = students[i].password;
            // password.id = 'p' + i;
            email.textContent = students[i].email;
            // email.id
            fullname.textContent = students[i].fullname;
            tr.appendChild(fullname);
            tr.appendChild(email);
            tr.appendChild(password);
            tr.appendChild(edit);
            tr.appendChild(del);
            tr.appendChild(ban);
            document.getElementById('students').appendChild(tr);
        }
    }
}