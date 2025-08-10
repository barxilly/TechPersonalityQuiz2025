const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
const PORT = process.env.PORT || 1969;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.post("/data", (req, res) => {
  const data = req.headers.sentdata;
  if (!data) {
    return res.status(400).json({ error: "Missing data" });
  }
  let datajson;
  try {
    datajson = JSON.parse(data);
  } catch (err) {
    return res.status(400).json({ error: "Invalid JSON in data" });
  }

  const ip = req.headers["cf-connecting-ip"];
  if (!ip) {
    return res.status(400).json({ error: "Missing IP address" });
  }

  const answers = datajson.answers;
  const final = datajson.final;

  if (typeof answers === "undefined" || answers === null) {
    console.error("Missing answers in data:", datajson);
    return res.status(400).json({ error: "Missing answers" });
  }
  if (!Array.isArray(answers) && typeof answers !== "number") {
    console.error("Invalid answers type in data:", datajson);
    return res.status(400).json({ error: "Invalid answers type" });
  }

  if (typeof final === "undefined" || final === null) {
    console.error("Missing final in data:", datajson);
    return res.status(400).json({ error: "Missing final" });
  }
  if (typeof final !== "string" && typeof final !== "number") {
    console.error("Invalid final type in data:", datajson);
    return res.status(400).json({ error: "Invalid final type" });
  }

  if (!fs.existsSync("data.json")) {
    fs.writeFileSync("data.json", JSON.stringify({}));
  }

  const existingData = JSON.parse(fs.readFileSync("data.json", "utf8"));

  existingData[ip] = { answers, final };

  fs.writeFileSync("data.json", JSON.stringify(existingData));

  res.status(200).json({ message: "Data received", data: datajson });
});

app.get("/data", (req, res) => {
    // Return a count of how many times each answer shows up, and a count of how many times each final shows up

    const existingData = JSON.parse(fs.readFileSync("data.json", "utf8"));
    const answerCounts = {};
    const finalCounts = {};

    for (const key in existingData) {
        const entry = existingData[key];
        const answer = entry.answers;
        const final = entry.final;

        // Count answers
        if (Array.isArray(answer)) {
            answer.forEach(ans => {
                answerCounts[ans] = (answerCounts[ans] || 0) + 1;
            });
        } else {
            answerCounts[answer] = (answerCounts[answer] || 0) + 1;
        }

        // Count finals
        finalCounts[final] = (finalCounts[final] || 0) + 1;
    }

    res.status(200).json({ answerCount: answerCounts, finalCount: finalCounts });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
