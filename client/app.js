const form = document.getElementById("idea-form");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const topic = document.getElementById("topic").value.trim();
  const niche = document.getElementById("niche").value;

  if (!topic || !niche) return;

  loading.classList.remove("hidden");
  errorDiv.classList.add("hidden");
  resultDiv.innerHTML = "";

  try {
    const res = await fetch("http://localhost:5000/api/ideas/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, niche }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Something went wrong");

    const ideaHtml = `
      <div class="idea-card">
        <p><strong>Reel Idea:</strong> ${data.idea}</p>
      </div>
    `;
    resultDiv.innerHTML = ideaHtml;
  } catch (err) {
    errorDiv.textContent = "❌ Failed to generate idea. Please try again.";
    errorDiv.classList.remove("hidden");
  } finally {
    loading.classList.add("hidden");
  }
});
