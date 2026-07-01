const token = localStorage.getItem("access_token");

if (!token || isTokenExpired(token)) {
    logout();
}

function isTokenExpired(token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
}

function logout() {

    localStorage.removeItem("access_token");
    window.location.href = "login.html";
}



async function getMessages() {
    const receiverID = document.getElementById("receiverID").value;
    const senderID = document.getElementById("myID").value;
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
            console.table(data)
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
                        p.style.color = "red";
                        p.style.textAlign = "right";
                        chat.appendChild(p);
                    }
                    else {
                        p.style.color = "black";
                        p.style.textAlign = "left";
                        chat.appendChild(p);
                    }

                    p.style.cursor = "pointer";
                    p.ondblclick = () => {
            
                       let MID= message._id;
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

        p.textContent = user.fullname;
        p.style.cursor = "pointer";
        p.onclick = () => {

            document.getElementById("receiverID").value = user._id;
            document.getElementById("receiverName").value = user.fullname;
            getMessages();
        };

        userList.appendChild(p);
    });
}

async function sendMessage() {

    const senderID = document.getElementById("myID").value;
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
                console.log("message sent successfully:");
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
    const payload = JSON.parse(atob(token.split(".")[1]));
    document.getElementById("myID").value = payload.sub;
    document.getElementById("myName").value = payload.username;
}

async function deleteMessage(MID)
{
console.log(MID)
}
window.onload = async () => {
    await loadCurrentUser();
    await getUsers();
};