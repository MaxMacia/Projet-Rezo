const stringUrlId = document.location.search;
const urlSearchParams = new URLSearchParams(stringUrlId);
const urlUserId = urlSearchParams.get("id");

loadConfig()
.then(data => {
    const config = data;
    fetch(`${config.host}${config.port}/api/auth/${urlUserId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${getToken()}`
        }
    })
    .then(res => res.json()
    .then(result => {
        document.querySelector('header img').setAttribute('src', `${result.ppUrl}`);
        document.querySelector('header figcaption').innerHTML = `${result.identifier}`;
    }))
    .catch(error => {
        console.dir(error);
        document.querySelector("header").innerHTML = `<h3 id="errorMsg">Une erreur est survenue, 
                                    veuillez nous excuser pour le désagrément.</h3>`;
    });
})
.catch(error => {
    console.dir(error);
    document.querySelector("header").innerHTML = `<h3 id="errorMsg">Une erreur est survenue, 
                                veuillez nous excuser pour le désagrément.</h3>`;
});

loadConfig()
.then(data => {
    const config = data;
    fetch(`${config.host}${config.port}/api/messages`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${getToken()}`
        }
    })
    .then(data => data.json())
    .then(messages => {
        for (let message of messages) {
            loadConfig()
            .then(data => {
                const config = data;
                fetch(`${config.host}${config.port}/api/auth/${message.userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${getToken()}`
                    }
                })
                .then(data => data.json())
                .then(user => {
                    let elt = document.createElement('div');
                    elt.setAttribute('id', 'message');
                    elt.innerHTML = `<img id="image-pp" src="${user.ppUrl}">
                                    <div id="message-block">
                                        <div id="user-identifier">${user.identifier}</div>
                                        <div id="message-body">
                                            ${message.content}
                                        </div>
                                    </div>`;
                    document.getElementById('message-list').prepend(elt);
                })
                .catch();
            })
            .catch();     
        }
    })
    .catch();
})
.catch();

document.querySelector('#form-message-list input[type="submit"]').addEventListener('click', event => {
    event.preventDefault();
    let input = document.querySelector('#form-message-list textarea');
   if (input.reportValidity()) {
    const request = {
        userId: urlUserId,
        content: input.value
    };
    loadConfig()
    .then(data => {
        const config =data;
        fetch(`${config.host}${config.port}/api/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${getToken()}`
            },
            body: JSON.stringify(request)
        })
        .then(res => res.json())
        .then(result => {
            input.value = "";
            loadConfig()
            .then(data => {
                const config = data;
                fetch(`${config.host}${config.port}/api/messages/${result}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${getToken()}`
                    }
                })
                .then(data => data.json())
                .then(message => {
                    loadConfig()
                    .then(data => {
                        const config = data;
                        fetch(`${config.host}${config.port}/api/auth/${message.userId}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `bearer ${getToken()}`
                            }
                        })
                        .then(data => data.json())
                        .then(user => {
                            let elt = document.createElement('div');
                            elt.setAttribute('id', 'message');
                            elt.innerHTML = `<img id="image-pp" src="${user.ppUrl}">
                                            <div id="message-block">
                                                <div id="user-identifier">${user.identifier}</div>
                                                <div id="message-body">
                                                    ${message.content}
                                                </div>
                                            </div>`;
                            document.getElementById('message-list').prepend(elt);
                        })
                        .catch();
                    })
                    .catch();
                })
                .catch();
            })
            .catch();
        })
        .catch();
    })
    .catch();
   }
});