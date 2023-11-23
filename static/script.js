function register() {
  var username = document.getElementById("register-username").value;
  var email = document.getElementById("register-email").value;
  var password = document.getElementById("register-password").value;

  document.addEventListener("DOMContentLoaded", function () {
    const accessToken = sessionStorage.getItem("access_token");

    if (accessToken) {
      // If an access token is found, force logout and show the login form
      logout();
    }
  });

  fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// function login() {
//   var username = document.getElementById("login-username").value;
//   var password = document.getElementById("login-password").value;

//   fetch("/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       username: username,
//       password: password,
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       alert(data.message);
//     });
//   // Store the access token in a secure way
// }

function login() {
  var username = document.getElementById("login-username").value;
  var password = document.getElementById("login-password").value;

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Invalid username or password");
      }
    })
    .then((data) => {
      alert(data.message);

      // Assuming the server responds with an 'access_token' field in the JSON data
      const accessToken = data.access_token;

      // Save the access token securely (you might use localStorage, sessionStorage, or cookies)
      // For simplicity, storing it in sessionStorage in this example
      sessionStorage.setItem("access_token", accessToken);

      // Call getResource() immediately after successful login
      getResource();
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
}

function getResource() {
  // Fetch the protected resource using the stored access token
  const accessToken = sessionStorage.getItem("access_token");

  if (!accessToken) {
    console.error("Access token not found");
    // If no access token is found, redirect to the login page
    window.location.href = "/"; // Update the URL to your login page
    return;
  }

  fetch("/protected", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Failed to get resource");
      }
    })
    .then((data) => {
      alert(data.message);
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
}

function logout() {
  // Check if the user is logged in
  const accessToken = sessionStorage.getItem("access_token");

  if (accessToken) {
    // Clear the stored access token
    sessionStorage.removeItem("access_token");
    alert("Logged out successfully");

    // Update the UI
    document.getElementById("login-form").classList.remove("hidden");
    document.getElementById("protected-resource").classList.add("hidden");
    document.getElementById("logout").classList.add("hidden");
  } else {
    // If the user is already logged out, you can handle it accordingly
    console.warn("User is already logged out");
  }
}
