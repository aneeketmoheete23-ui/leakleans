export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { prompt } = req.body || {};

    if (!prompt) {
      return res.status(400).json({
        error: "Prompt is required",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not configured in Vercel",
      });
    }

    const model = "gemini-3.8-flash";

    let lastError = null;

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: prompt,
                    },
                  ],
                },
              ],
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          const text =
            data?.candidates?.[0]?.content?.parts?.[0]?.text;

          if (text) {
            return res.status(200).json({
              text,
            });
          }

          lastError = "Gemini returned an empty response.";
        } else {
          lastError =
            data?.error?.message ||
            "Gemini request failed";

          console.error(
            `Gemini attempt ${attempt} failed:`,
            response.status,
            lastError
          );

          if (
            response.status !== 429 &&
            response.status !== 500 &&
            response.status !== 503
          ) {
            break;
          }
        }
      } catch (error) {
        lastError =
          error?.message ||
          "Network error";
      }

      if (attempt < 3) {
        await new Promise((resolve) =>
          setTimeout(resolve, attempt * 2000)
        );
      }
    }

    console.error(
      "Gemini final error:",
      lastError
    );

    return res.status(503).json({
      error:
        "AI service is temporarily busy. Please try again in a few seconds.",
    });
  } catch (error) {
    console.error(
      "Gemini server error:",
      error
    );

    return res.status(500).json({
      error:
        error?.message ||
        "Server error",
    });
  }
}