class Login {    
    constructor() {
        this.users = {'pedromews':'senha', 'admin':'admin', 'pasta':'login123'};
    }

    login() {
        let isValid = false;

        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        
        for (const [key, value] of Object.entries(this.users)) {
            if (username == key && password == value) {
                
                location.href = 'index.html';
                isValid = true;
            }
            
        }
        
        if (!isValid) {
            alert('- Invalid username or password');
        }
    }

    validateUser() {

    }

    readUsers() {
        const myForm = document.getElementById("myForm");
        const csvFile = document.getElementById("csvFile");
        myForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const input = "accounts.csv";
            const reader = new FileReader();
            reader.onload = function (e) {
                const text = e.target.result;
                document.write(text);
            };
            reader.readAsText(input);
        }); 
    }
}

var login = new Login();