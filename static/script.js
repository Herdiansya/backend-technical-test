function register() {
  var username = document.getElementById("register-username").value;
  var email = document.getElementById("register-email").value;
  var password = document.getElementById("register-password").value;

  document.addEventListener("DOMContentLoaded", function () {
    const accessToken = sessionStorage.getItem("access_token");

    if (accessToken) {
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

      const accessToken = data.access_token;

      sessionStorage.setItem("access_token", accessToken);

      getResource();
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
}

function getResource() {
  const accessToken = sessionStorage.getItem("access_token");

  if (!accessToken) {
    console.error("Access token not found");

    window.location.href = "/";
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
  const accessToken = sessionStorage.getItem("access_token");

  if (accessToken) {
    sessionStorage.removeItem("access_token");
    alert("Logged out successfully");

    document.getElementById("login-form").classList.remove("hidden");
    document.getElementById("protected-resource").classList.add("hidden");
    document.getElementById("logout").classList.add("hidden");
  } else {
    console.warn("User is already logged out");
  }
}
