document.querySelector("#login").addEventListener("click", async (e) => {
  e.preventDefault();
  const name = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  const response = await fetch("/api/user/login", {
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