document.getElementById("signup-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const firstName = document.getElementById("firstname-input").value.trim();
    const email = document.getElementById("email-input").value.trim();
    const trn = document.getElementById("trn-input").value.trim();
    const age = parseInt(document.getElementById("age-input").value);
    const password = document.getElementById("password-input").value;
    const repeatPassword = document.getElementById("repeat-password-input").value;

    const trnRegex = /^\d{9}$/;
    if (!trnRegex.test(trn)) {
        alert("TRN must be exactly 9 digits.");
        return;
    }

    if (isNaN(age) || age < 18 || age > 120) {
        alert("Age must be between 18 and 120.");
        return;
    }

    if (password !== repeatPassword) {
        alert("Passwords do not match.");
        return;
    }

    const user = {
        firstName,
        email,
        trn,
        age,
        password
    };

    let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    const duplicate = users.some(u => u.trn === trn);
    if (duplicate) {
        alert("A user with this TRN already exists.");
        return;
    }

    users.push(user);
    localStorage.setItem("registeredUsers", JSON.stringify(users));

    alert("Registration successful!");
    document.getElementById("signup-form").reset();
});
