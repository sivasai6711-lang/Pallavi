document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = document.getElementById("form");
  const msg = document.getElementById("msg");

  msg.innerText = "⏳ Registering...";
  msg.style.color = "#555";

  const data = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    event: document.getElementById("event").value
  };

  try {
    const response = await fetch("https://chinni-krer.onrender.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error("Server error");
    }

    const result = await response.json();

    msg.innerText = "✅ " + (result.message || "Registration successful!");
    msg.style.color = "#4caf50";

    form.reset();

  } catch (error) {
    console.error("Error:", error);
    msg.innerText = "❌ Server connect కాలేదు లేదా backend sleep లో ఉంది";
    msg.style.color = "red";
  }
});