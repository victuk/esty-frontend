const baseUrl = "http://localhost:5000/v1/";
// const baseUrl = "https://ticket-backend-ki4u.onrender.com/v1/";
// const baseUrl = "https://ticket-api-mug2.onrender.com/v1/"

const {getElementById, querySelector, querySelectorAll} = document;
const {log} = console;


function mainRoute(r) {
    return `${baseUrl}${r}`;
}

function securedRequest(securedReq) {
    if(securedReq == true) {
        return sessionStorage.getItem("token");
    } else {
        return null
    }
}

function handleError(error, errorMessage) {
    alert(errorMessage);
    console.log(error);
}

const req = {
    post: async function(url, body, isSecured = true, dataType = "json") {
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: securedRequest(isSecured)
                },
                body: JSON.stringify(body)
            });
            let data
            if(dataType == "json") {
                data = await res.json();
            } else if(dataType == "text") {
                data = await res.text();
            }
            return {
                status: res.status,
                statusText: res.statusText,
                data: data
            };
        } catch (error) {
            handleError(error, "Client Side Error!");
        }
    },
    get: async function(url, isSecured = true, dataType="json") {
        console.log(securedRequest(isSecured));
        try {
            const res = await fetch(url, {
                method: 'GET',
                headers:{
                    token: securedRequest(isSecured)
                }
            });
            let data;
            if(dataType == "json") {
                data = await res.json();
            } else if(dataType == "text") {
                data = await res.text();
            }
            return {
                status: res.status,
                statusText: res.statusText,
                data: data
            };
        } catch (error) {
            handleError(error, "Client Side Error!");
        }
    },
    put: async function(url, body, isSecured = true, dataType="json") {
        try {
            const res = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    token: securedRequest(isSecured)
                },
                body: JSON.stringify(body)
            });
            let data;
            if(dataType == "json") {
                data = await res.json();
            } else if(dataType == "text") {
                data = await res.text();
            }
            return {
                status: res.status,
                statusText: res.statusText,
                data: data
            };
        } catch (error) {
            handleError(error, "Client Side Error!");
        }
    },
    delete: async function(url, isSecured = true, dataType="json") {
        try {
            const res = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    token: securedRequest(isSecured)
                }
            });
            let data;
            if(dataType == "json") {
                data = await res.json();
            } else if(dataType == "text") {
                data = await res.text();
            }
            return {
                status: res.status,
                statusText: res.statusText,
                data: data
            };
        } catch (error) {
            handleError(error, "Client Side Error!");
        }
    }
}