const token = localStorage.getItem("access_token");
if (!token) {
    // User isn't logged in
    window.location.href = "login.html";
}

async function verifyUser() {

   
}

async function getMessages()
{
const response = await fetch("http://localhost:3000/messages", {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
    },
});

const messages = await response.json();

const msgList = document.getElementById("listofUsers");

msgList.innerHTML = "";

messages.forEach(message => {
    const li = document.createElement("li");
    li.textContent = message.messageBody;
    msgList.appendChild(li);
});

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

    const userList = document.getElementById("listofUsers");

    userList.innerHTML = "";

    users.forEach(user => {
        const li = document.createElement("li");
        li.textContent = `${user.username}: ${user._id}`;
        userList.appendChild(li);
    });
}

async function send() {
    const receiverID = document.getElementById("receiver").value;
    const messageBody = document.getElementById("password").value;
    const senderID = document.getElementById("myID").value;

    try {
        const response = await fetch(`http://localhost:3000/message${senderID}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                receiverID,
                messageBody,
                senderID
            }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log("message sent successfully:", data);

         
        } else {
            alert(data.message || "message failed");
        }
    } catch (error) {
        console.error(error);
        alert("Unable to connect to the server.");
    }
}