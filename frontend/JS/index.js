
document.getElementById('signup').addEventListener('click', () => {
    document.getElementById('signup').setAttribute('class', 'selected');
    document.getElementById('login').removeAttribute('class', 'selected');
    let email = document.createElement('div');
    if (!document.getElementById('email')) {
        email.innerHTML = `
                            <label for="email">E-mail</label>
                            <input id="email" type="email" name="email" required>
                            `;
        document.getElementById('form').prepend(email);
        document.querySelector('#form input[type="submit"]').value = "S'enregister";
    }
})

document.getElementById('login').addEventListener('click', () => {
    document.getElementById('login').setAttribute('class', 'selected');
    document.getElementById('signup').removeAttribute('class', 'selected');
    document.getElementById('email').remove();
    document.querySelector('#form input[type="submit"]').value = "Connexion";
})

document.querySelector('#form input[type="submit"]').addEventListener("click", event => {
    event.preventDefault();
    const btn = document.querySelector('#form input[type="submit"]');
    let valid = true;
    for (let input of document.querySelectorAll('#form input')) {
        valid &= input.reportValidity();
        if (!valid) {
            break;
        }
    }
    if (valid) {
        const request = btn.value == "S'enregister" ? {
            email: `${document.getElementById('email').value}`,
            identifier: `${document.getElementById('id').value}`,
            password: `${document.getElementById('password').value}`
        } : {
            identifier: `${document.getElementById('id').value}`,
            password: `${document.getElementById('password').value}`
        };
        loadConfig()
        .then(data => {
            const config = data;
            fetch(`${config.host}${config.port}/api/auth/${btn.value == "S'enregister" ? "signup" : "login"}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            })
            .then(res => res.json())
            .then(result => {
                if (result.error) {
                    if (result.error.message) {
                        throw error = "Requête invalide"; 
                    }
                    throw error = result.error;
                }
                saveToken(result.token);
                location.href = `../HTML/message-list.html?id=${result.userId}`;
            })
            .catch(error => {
                console.dir(error);
                let errorElt = document.createElement("div");
                document.querySelector("#form").appendChild(errorElt);
                errorElt.innerHTML = `<h3 id="errorMsg">${error}</h3>`
            });
        })
        .catch(error => {
            console.dir(error);
            let errorElt = document.createElement("div");
            document.querySelector("#form").appendChild(errorElt);
            errorElt.innerHTML = `<h3 id="errorMsg">Une erreur est survenue, 
                                        veuillez nous excuser pour le désagrément.</h3>`
        });
    }
})