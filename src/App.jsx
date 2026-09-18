async function askAssistant() {
  if (!message.trim()) return;

  const text = message.trim();

  setChat((prev) => [
    ...prev,
    {
      role: "user",
      text,
    },
  ]);

  setMessage("");

  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `
You are the AI Revenue Assistant inside LeakLeans.

LeakLeans is an AI Revenue Leak Detector.
Help businesses understand revenue leakage, missed follow-ups,
customer journeys, sales problems and recovery actions.

Answer clearly and practically.
User question:
${text}
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "AI request failed");
    }

    setChat((prev) => [
      ...prev,
      {
        role: "ai",
        text: data.text,
      },
    ]);
  } catch (error) {
    setChat((prev) => [
      ...prev,
      {
        role: "ai",
        text: "Sorry, I could not connect to the AI right now.",
      },
    ]);

    console.error(error);
  }
}