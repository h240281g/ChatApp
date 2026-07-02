
async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            

            // Save the JWT if your backend returns one
          if (data.accessJwtToken) 
            {
            localStorage.setItem("access_token",data.accessJwtToken);
            window.location.href="../chat/chat.html";

            }else
            {
                alert("toke failed!");

            }

            alert("Login successful!");

        } else {
            alert("Login failed, wrong username or password ");
        }
    } catch (error) {
        console.error(error);
        alert("Unable to connect to the server.");
    }
}
function gotoSUP(){
    window.location.href="../signUp/signUp.html";

}