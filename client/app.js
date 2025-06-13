const form = document.getElementById("idea-form");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const resultDiv = document.getElementById("result");
const generateBtn = document.getElementById("generate-btn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const topic = document.getElementById("topic").value.trim();
  const niche = document.getElementById("niche").value;

  if (!topic || !niche) return;

  // UI States: hide button, show loading
  generateBtn.classList.add("hidden");
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

    const ideaPoints = data.idea
      .split("* ")
      .filter(Boolean)
      .map((point) => `<li>${point.replace(/\*\*/g, "").trim()}</li>`)
      .join("");

    const hashtags = Array.isArray(data.hashtags)
      ? data.hashtags.join(", ")
      : data.hashtags;

    const ideaHtml = `
      <div class="idea-card">
        <h3>Reel Idea</h3>
        <p><strong>Ideas:</strong>${ideaPoints}</p>
        <p><strong>Caption:</strong> ${data.caption}</p>
        <p><strong>Hashtags:</strong> ${hashtags}</p>
        <p><strong>Hook:</strong> ${data.hook}</p>
      </div>
    `;
    resultDiv.innerHTML = ideaHtml;
  } catch (err) {
    console.error(err);
    errorDiv.textContent = "Failed to generate idea. Please try again.";
    errorDiv.classList.remove("hidden");
  } finally {
    // Show button again, hide loading
    loading.classList.add("hidden");
    generateBtn.classList.remove("hidden");
  }
});
