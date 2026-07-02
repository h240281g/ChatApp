
async function createUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const fullname= document.getElementById("fullname").value;
    try {
        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                fullname,
                email
            }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Create User successful:");
            gotoLog()

        } else {
            alert(data.message || "Create User failed");
        }
    } catch (error) {
        console.error(error);
        alert("Unable to connect to the server.");
    }
}
function gotoLog(){
    window.location.href="login.html";

}