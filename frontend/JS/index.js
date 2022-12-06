document.getElementById('signup').addEventListener('click', () => {
    document.getElementById('signup').setAttribute('class', 'selected');
    document.getElementById('login').removeAttribute('class', 'selected');
    let email = document.createElement('div');
    if (!document.getElementById('email')) {
        email.setAttribute('id', 'email');
        email.innerHTML = `<div>
                                <label for="email">e-mail</label>
                                <input type="email" name="email">
                            </div>`;
        document.getElementById('form').prepend(email);
        document.getElementsByClassName('button')[0].value = "S'enregister";
    }
})

document.getElementById('login').addEventListener('click', () => {
    document.getElementById('login').setAttribute('class', 'selected');
    document.getElementById('signup').removeAttribute('class', 'selected');
    document.getElementById('email').remove();
    document.getElementsByClassName('button')[0].value = "Connexion";
})