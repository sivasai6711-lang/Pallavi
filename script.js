document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const msg = document.getElementById("msg");
  msg.innerText = "⏳ Registering...";
  msg.style.color = "#555";

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    event: document.getElementById("event").value
  };

  try {
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    msg.innerText = "✅ " + result.message;
    msg.style.color = "#4caf50";

    document.getElementById("form").reset();

  } catch (error) {
    msg.innerText = "❌ Something went wrong!";
    msg.style.color = "red";
  }
});