import "dotenv/config";

const response = await fetch(
  "https://api.mistral.ai/v1/chat/completions",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistral-small-latest",
      messages: [
        {
          role: "user",
          content: "Say hello",
        },
      ],
    }),
  }
);

console.log("Status:", response.status);
console.log(await response.text());