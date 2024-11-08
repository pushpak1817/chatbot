const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 512,
      temperature: 0,
    });
    // Sending the response directly
    res.send(completion.data.choices[0].text);
  } catch (error) {
    console.error("Error creating completion:", error);
    res.status(500).send("Internal Server Error");
  }
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
