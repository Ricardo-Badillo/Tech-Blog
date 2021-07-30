document.querySelector("#signup").addEventListener("click", async (e) => {
  e.preventDefault();
  const name = document.querySelector("#signupusername").value;
  const password = document.querySelector("#signuppassword").value;

  const response = await fetch("/api/user", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      name,
      password,
    }),
  });

  if (response.ok) {
    window.location.assign("/dashboard");
  }
});