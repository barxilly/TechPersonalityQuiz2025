import { Button, Center, Flex, MantineProvider, Space, Stack, Title } from "@mantine/core";
import "./App.css";
import "@mantine/core/styles.css";

type Personality = "arch" | "apple" | "hardcore" | "newb" | "broke" | "design" | "basic" | "vibecoder" | "rich"|"grandma";

function App() {
  let personalities: Record<Personality, number> = {
    "arch": 0, // Arch BTW
    "apple": 0, // Apple Greaser
    "hardcore": 0, // Hardcore Dev
    "newb": 0, // Newb
    "broke": 0, // Broke
    "design": 0, // Design Nut
    "basic": 0, // Basic User
    "vibecoder": 0, // AI slop coder
    "rich": 0, // Rich
    "grandma": 0, // Grandma
  };

  let questions = [
  {
    question: "How often do you code?",
    options: [
      { text: "Most hours of the day", score: ["arch", "hardcore"] },
      { text: "Just about every day", score: ["apple", "design"] },
      { text: "Sometimes, when I feel like it", score: ["basic", "vibecoder"] },
      { text: "Never", score: ["broke", "grandma"], skip: 5 },
    ],
  }, // Code Frequency
  {
    question: "What OS do you main for programming?",
    options: [
      { text: "Arch Linux", score: ["arch", "hardcore"] },
      { text: "macOS", score: ["apple", "design", "rich"] },
      { text: "Windows", score: ["basic", "newb"] },
      { text: "Whatever came with my laptop", score: ["broke", "grandma"] },
    ],
  }, // OS Preference
  {
    question: "What platform do you main for programming?",
    options: [
      { text: "Laptop", score: ["basic", "apple"] },
      { text: "Desktop", score: ["hardcore", "arch"] },
      { text: "Tablet", score: ["design", "vibecoder"] },
      { text: "Phone", score: ["newb", "grandma"] },
    ],
  }, // Platform Preference
  {
    question: "What is your preferred programming language?",
    options: [
      { text: "Python", score: ["basic", "newb"] },
      { text: "JavaScript", score: ["vibecoder", "design"] },
      { text: "C++", score: ["hardcore", "arch"] },
      { text: "Rust", score: ["arch", "hardcore", "rich"] },
    ],
  }, // Programming Language Preference
  {
    question: "How do you write code?",
    options: [
      { text: "v0 or Bolt, anything AI", score: ["vibecoder", "newb"] },
      { text: "Copilot-assisted", score: ["basic", "design"] },
      { text: "All by hand", score: ["hardcore", "arch"] },
      { text: "I don't write code", score: ["broke", "grandma"] },
    ],
  }, // Code Writing Method
  {
    question: "If you could have any phone, what would it be?",
    options: [
      { text: "iPhone", score: ["apple", "design", "rich"] },
      { text: "Google Pixel", score: ["basic", "hardcore"] },
      { text: "Samsung Galaxy", score: ["broke", "newb"] },
      { text: "Nothing Phone", score: ["arch", "design"] },
    ],
  }, // Phone Preference
  {
    question: "How do you listen to music?",
    options: [
      { text: "Spotify (free)", score: ["broke", "grandma"] },
      { text: "Spotify (premium)", score: ["basic", "rich"] },
      { text: "Apple Music", score: ["apple", "design", "rich"] },
      { text: "Playlist on YouTube", score: ["vibecoder", "broke"] },
    ],
  }, // Music Listening Method
  {
    question: "What browser do you use?",
    options: [
      { text: "Google Chrome", score: ["basic", "newb"] },
      { text: "Mozilla Firefox", score: ["hardcore", "arch"] },
      { text: "Safari", score: ["apple", "design", "rich"] },
      { text: "Edge", score: ["broke", "grandma"]}
    ]
  }, // Browser Preference
  {
    question: "Best design language?",
    options: [
      { text: "Minimalism", score: ["apple", "arch"] },
      { text: "Skeuomorphic", score: ["apple", "rich"] },
      { text: "Aero / Aqua", score: ["basic", "newb"] },
      { text: "Huh?", score: ["broke", "grandma"] }
    ]
  }, // Design Language Preference
  {
    question: "Which of these tech YouTubers do you watch the most?",
    options: [
      { text: "Linus Tech Tips", score: ["hardcore", "basic"] },
      { text: "MrWhoseTheBoss", score: ["basic", "newb"] },
      { text: "MKBHD", score: ["arch", "apple"] },
      { text: "HUH?!", score: ["grandma", "newb"] }
    ]
  }
];



  let currentQuestionIndex = 0;
  let currentQuestion = questions[currentQuestionIndex];
  let selectedOptions: string[][] = [];
  let totalQuestions = questions.length;

  window.onload = () => {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button, index) => {
      button.textContent = currentQuestion.options[index].text;
      button.onclick = () => {
        selectedOptions.push(currentQuestion.options[index].score);
        currentQuestionIndex++;
        if (currentQuestionIndex < totalQuestions) {
          currentQuestion = questions[currentQuestionIndex];
          updateUI();
        } else {
          calculateResults();
        }
      };
    }
    );
  };

  function updateUI() {
    const questionElement = document.querySelector("h2");
    if (!questionElement) {
      console.error("Question element not found");
      return;
    }
    questionElement.textContent = currentQuestion.question;

    const buttons = document.querySelectorAll("button");
    buttons.forEach((button, index) => {
      button.textContent = currentQuestion.options[index].text;
    });
  }

  function calculateResults() {
    selectedOptions.forEach(optionScores => {
      optionScores.forEach(score => {
        personalities[score as Personality] += 1;
      });
    });

    const personality = Object.keys(personalities).reduce((a, b) => personalities[a as Personality] > personalities[b as Personality] ? a : b);
    alert(`Your tech personality is: ${personality}`);
    console.log("Personality scores:", personalities);
    alert(`Certainty: ${personalities[personality as Personality] / totalQuestions * 100}%`);
  }

  return (
    <MantineProvider>
      <Center h="100vh">
        <Stack style={{ textAlign: "center" }}>
          <Title order={1}>Barxilly's Tech Personality Quiz 2</Title>
          <Title order={3}>New and Improved... or something along those lines.</Title>
          <Space h="xl" />
          <Title order={2}>{currentQuestion.question}</Title>
          <Flex>
            <Button id="op1"></Button>
            <Button id="op2"></Button>
            <Button id="op3"></Button>
            <Button id="op4"></Button>
          </Flex>
        </Stack>
      </Center>
    </MantineProvider>
  );
}

export default App;
