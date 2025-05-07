export async function getExplanation(text) {
  const res = await fetch("http://localhost:5000/api/explain", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
  return await res.json();
}

export async function getProgress() {
  const res = await fetch("http://localhost:5000/api/progress");
  return await res.json();
}
