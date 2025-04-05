function togglePassword() {
    const password = document.getElementById("password");
    password.type = password.type === "password" ? "text" : "password";
  }
  
  // Toggle dark mode
  document.getElementById("darkModeToggle").addEventListener("change", function () {
    document.body.classList.toggle("dark");
  });
  
  // Toggle between Login and Signup
  document.getElementById("toggle-link").addEventListener("click", function (e) {
    e.preventDefault();
  
    const title = document.getElementById("form-title");
    const nameField = document.getElementById("name-field");
    const submitBtn = document.querySelector(".btn");
    const toggleText = document.querySelector(".toggle-text");
    
    const isLogin = title.textContent === "Login";
  
    if (isLogin) {
      title.textContent = "Sign Up";
      nameField.classList.remove("hidden");
      submitBtn.textContent = "Sign Up";
      toggleText.innerHTML = `Already have an account? <a href="#" id="toggle-link">Login</a>`;
    } else {
      title.textContent = "Login";
      nameField.classList.add("hidden");
      submitBtn.textContent = "Login";
      toggleText.innerHTML = `Don't have an account? <a href="#" id="toggle-link">Sign Up</a>`;
    }
  
    // Rebind toggle-link event (since innerHTML re-renders DOM)
    document.getElementById("toggle-link").addEventListener("click", arguments.callee);
  });
  
  // Validation on form submit
  document.getElementById("auth-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const name = document.getElementById("name").value.trim();
    const errorMsg = document.getElementById("error-message");
    const isSignup = document.getElementById("form-title").textContent === "Sign Up";
  
    // Simple Validation
    if (!email || !password || (isSignup && !name)) {
      errorMsg.textContent = "Please fill in all fields.";
      return;
    }
  
    // Mock logic
    if (isSignup) {
      errorMsg.textContent = "Account created successfully!";
    } else {
      const correctEmail = "user@example.com";
      const correctPassword = "password123";
  
      if (email === correctEmail && password === correctPassword) {
        errorMsg.textContent = "";
        window.location.href = "welcome.html";
      } else {
        errorMsg.textContent = "Invalid email or password!";
      }
    }
  });
  