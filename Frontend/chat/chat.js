const token = localStorage.getItem("access_token");
const socket = io('http://localhost:3000', { auth: { token } });
const userDoc = JSON.parse(atob(token.split(".")[1]));
const myID = userDoc.sub;

if (!token || isTokenExpired(token)) {
    logout();
}

function isTokenExpired(token) {
    return userDoc.exp * 1000 < Date.now();
}

function logout() {

    localStorage.removeItem("access_token");
    window.location.href = "../login/login.html";
}

async function getMessages() {
    const senderID = myID;
    const receiverID = document.getElementById("receiverID").value;

    if (!senderID || !receiverID) {
        alert("IDS Required")
    }
    else {
        try {
            const response = await fetch
                ("http://localhost:3000/message",
                    {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            senderID,
                            receiverID,
                        }),
                    });

            const data = await response.json();
            const chat = document.getElementById("chat");

            if (response.ok) {

                chat.innerHTML = "";

                data.forEach(message => {

                    const p = document.createElement("p");

                    const time = new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                    });

                    p.innerHTML = `
                    ${message.messageBody}
                    <br>
                    <small>${time}</small>
                `;

                    if (message.senderID === senderID) {

                        p.classList.add("sent");
                        chat.appendChild(p);
                    }
                    else {

                        p.classList.add("received");
                        chat.appendChild(p);
                    }

                    p.style.cursor = "pointer";
                    p.ondblclick = () => {

                        let MID = message._id;
                        deleteMessage(MID);
                    };
                    
                });
            }
            else {
                console.error(error);
                alert("Couldnt get messages.");
            }
        } catch (error) {
            console.error(error);
            alert("Unable to connect to the server.");
        }

    }
}

async function getUsers() {

    const response = await fetch("http://localhost:3000/message/users", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    const users = await response.json();

    let userList = document.getElementById("listOfUsers");

    users.forEach(user => {

        const p = document.createElement("p");
        if (user.fullname == userDoc.fullname) {
            p.textContent = `${user.fullname} (You)`;
            p.style.cursor = "pointer";

        } else {
            p.textContent = user.fullname;
            p.style.cursor = "pointer";
        }
        p.onclick = () => {

            document.getElementById("receiverID").value = user._id;
            document.getElementById("receiverName").innerText = user.fullname;
            getMessages();
        };

        userList.appendChild(p);
    });
}

function appendMessageToChat(message, outgoing) {
    const chat = document.getElementById("chat");
    const p = document.createElement("p");
    const time = new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    p.innerHTML = `
        ${message.messageBody}
        <br>
        <small>${time}</small>
    `;

    if (outgoing) {
        p.classList.add("sent");
        chat.appendChild(p);

    } else {
        p.classList.add("received");
        chat.appendChild(p);

    }

}

async function sendMessage() {

    const senderID = myID;
    const receiverID = document.getElementById("receiverID").value;
    const messageBody = document.getElementById("newMessage").value;
    if (!senderID || !receiverID || !messageBody) {
        alert("All fields Required")
    }
    else {
        try {
            const response = await fetch(`http://localhost:3000/message/${senderID}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    receiverID,
                    messageBody
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("message sent successfully:");
                getMessages()

            } else {
                alert(data.message || "message failed");
            }
        } catch (error) {
            console.error(error);
            alert("Unable to connect to the server.");
        }
    }
}



async function loadCurrentUser() {
    document.getElementById("myName").innerText= userDoc.fullname;

    if (socket.connected) {
        socket.emit('joinRoom', { userID: userDoc.sub });
    }
}

socket.on('connect', () => {
    if (myID) {
        socket.emit('joinRoom', { userID: myID });
    }
});

socket.on('newMessage', (message) => {
    const currentReceiver = document.getElementById("receiverID")
        ? document.getElementById("receiverID").value
        : null;

    if (message.receiverID === myID && message.senderID === currentReceiver) {
        appendMessageToChat(message, false);
    }
    if (message.senderID === myID && message.receiverID === currentReceiver) {
        appendMessageToChat(message, true);
    }
});

async function deleteMessage(MID) {

    try {
        const response = await fetch(`http://localhost:3000/message/${MID}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },

        });

        const data = await response.json();

        if (response.ok) {
            alert("message DELETED successfully:");
            getMessages()

        } else {
            alert(data.message || "message delete    failed");
        }
    }
    catch (error) {
        console.error(error);
        alert("Unable to connect to the server.");
    }
}

async function deleteUser() {
    try {
        const response = await fetch(`http://localhost:3000/users/${myID}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },

        });

        const data = await response.json();

        if (response.ok) {
            alert("userDELETED successfully:");
            logout()

        } else {
            alert(data.message || "user delete    failed");
        }
    }
    catch (error) {
        console.error(error);
        alert("Unable to connect to the server.");
    }
}
function updateShow() {
    const updateForm = document.getElementById('updateUserForm');
    const toogle = document.getElementById('btnUpdateShow');

    if (!updateForm.hidden) {
        updateForm.hidden = true;
        toogle.innerText = "Show  Update  Account Form";
    } else {
        updateForm.hidden = false;
        toogle.innerText = "Hide  Update  Account Form";
    }

}
function cancel() {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const email = document.getElementById("email");
    const fullname = document.getElementById("fullname");
    const updateForm = document.getElementById('updateUserForm');
    const toogle = document.getElementById('btnUpdateShow');

    username.value = "";
    password.value = "";
    email.value = "";
    fullname.value = "";

    updateForm.hidden = true;
    toogle.innerText = "Show  Update  Account Form";


}

async function updateUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const fullname = document.getElementById("fullname").value;
    const body = {};

    if (username) body.username = username;
    if (password) body.password = password;
    if (email) body.email = email;
    if (fullname) body.fullname = fullname;

    try {
        const response = await fetch(`http://localhost:3000/users/${myID}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Update User successful:");
            cancel();


        } else {
            alert(data.message || "Update User failed");
        }
    } catch (error) {
        console.error(error);
        alert("Unable to connect to the server.");
    }
}


window.onload = async () => {
    await loadCurrentUser();
    await getUsers();
};