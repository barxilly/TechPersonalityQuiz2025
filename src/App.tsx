import {
  Button,
  Card,
  Center,
  Flex,
  Image,
  MantineProvider,
  Space,
  Stack,
  Title,
} from "@mantine/core";
import "./App.css";
import "@mantine/core/styles.css";

type Personality =
  | "arch"
  | "apple"
  | "hardcore"
  | "newb"
  | "broke"
  | "design"
  | "basic"
  | "vibecoder"
  | "rich"
  | "grandma";

function App() {
  let personalities: Record<Personality, number> = {
    arch: 0, // Arch BTW
    apple: 0, // Apple Greaser
    hardcore: 0, // Hardcore Dev
    newb: 0, // Newb
    broke: 0, // Broke
    design: 0, // Design Nut
    basic: 0, // Basic User
    vibecoder: 0, // AI slop coder
    rich: 0, // Rich
    grandma: 0, // Grandma
  };

  let questions = [
    // SKIP BLOCK START
    {
      question: "How often do you code?",
      options: [
        { text: "Most hours of the day", score: ["arch", "hardcore"] },
        { text: "Just about every day", score: ["apple", "design"] },
        {
          text: "Sometimes, when I feel like it",
          score: ["basic", "vibecoder"],
        },
        { text: "Never", score: ["broke", "grandma"], skip: 6 },
      ],
    },
    {
      question: "What OS do you main for programming?",
      options: [
        { text: "Arch Linux", score: ["arch", "hardcore"] },
        { text: "macOS", score: ["apple", "design", "rich"] },
        { text: "Windows", score: ["basic", "newb"] },
        { text: "Whatever came with my laptop", score: ["broke", "grandma"] },
      ],
    },
    {
      question: "What platform do you main for programming?",
      options: [
        { text: "Laptop", score: ["basic", "apple"] },
        { text: "Desktop", score: ["hardcore", "arch"] },
        { text: "Tablet", score: ["design", "vibecoder"] },
        { text: "Phone", score: ["newb", "grandma"] },
      ],
    },
    {
      question: "What is your preferred programming language?",
      options: [
        { text: "Python", score: ["basic", "newb"] },
        { text: "JavaScript", score: ["vibecoder", "design"] },
        { text: "C++", score: ["hardcore", "arch"] },
        { text: "Rust", score: ["arch", "hardcore", "rich"] },
      ],
    },
    {
      question: "How do you write code?",
      options: [
        { text: "v0 or Bolt, anything AI", score: ["vibecoder", "newb"] },
        { text: "Copilot-assisted", score: ["basic", "design"] },
        { text: "All by hand", score: ["hardcore", "arch"] },
        { text: "I don't write code", score: ["broke", "grandma"] },
      ],
    },
    {
      question: "Where do you store your code?",
      options: [
        { text: "GitHub", score: ["basic", "vibecoder"] },
        { text: "Self-hosted Git", score: ["hardcore", "arch"] },
        { text: "iCloud/Google Drive", score: ["apple", "design"] },
        { text: "Wait, I'm supposed to save it?", score: ["newb", "grandma"] },
      ],
    },
    {
      question: "What's your dream project?",
      options: [
        {
          text: "An open-source tool used by thousands",
          score: ["hardcore", "arch"],
        },
        {
          text: "A slick portfolio site with animations",
          score: ["design", "apple"],
        },
        {
          text: "A mobile app that gets on the App Store",
          score: ["basic", "vibecoder"],
        },
        { text: "Dunno, whatever ChatGPT says", score: ["newb", "grandma"] },
      ],
    },
    // SKIP BLOCK END

    {
      question: "If you could have any phone, what would it be?",
      options: [
        { text: "iPhone", score: ["apple", "design", "rich"] },
        { text: "Google Pixel", score: ["basic", "hardcore"] },
        { text: "Samsung Galaxy", score: ["broke", "newb"] },
        { text: "Nothing Phone", score: ["arch", "design"] },
      ],
    },
    {
      question: "How do you listen to music?",
      options: [
        { text: "Spotify (free)", score: ["broke", "grandma"] },
        { text: "Spotify (premium)", score: ["basic", "rich"] },
        { text: "Apple Music", score: ["apple", "design", "rich"] },
        { text: "Playlist on YouTube", score: ["vibecoder", "broke"] },
      ],
    },
    {
      question: "What browser do you use?",
      options: [
        { text: "Google Chrome", score: ["basic", "newb"] },
        { text: "Mozilla Firefox", score: ["hardcore", "arch"] },
        { text: "Safari", score: ["apple", "design", "rich"] },
        { text: "Edge", score: ["broke", "grandma"] },
      ],
    },
    {
      question: "Best design language?",
      options: [
        { text: "Minimalism", score: ["apple", "arch"] },
        { text: "Skeuomorphic", score: ["apple", "rich"] },
        { text: "Aero / Aqua", score: ["basic", "newb"] },
        { text: "Huh?", score: ["broke", "grandma"] },
      ],
    },
    {
      question: "Which of these tech YouTubers do you watch the most?",
      options: [
        { text: "Linus Tech Tips", score: ["hardcore", "basic"] },
        { text: "MrWhoseTheBoss", score: ["basic", "newb"] },
        { text: "MKBHD", score: ["arch", "apple"] },
        { text: "HUH?!", score: ["grandma", "newb"] },
      ],
    },
    {
      question: "What kind of keyboard do you use?",
      options: [
        { text: "Mechanical, custom-built", score: ["arch", "hardcore"] },
        { text: "Apple Magic Keyboard", score: ["apple", "design"] },
        { text: "Whatever came with the laptop", score: ["basic", "newb"] },
        { text: "On-screen keyboard", score: ["grandma", "broke"] },
      ],
    },
    {
      question: "What’s your take on smart home tech?",
      options: [
        { text: "Automated everything", score: ["rich", "arch"] },
        {
          text: "A few essentials like lights and plugs",
          score: ["basic", "design"],
        },
        { text: "Just a speaker or display", score: ["newb", "vibecoder"] },
        { text: "Don’t trust it", score: ["hardcore", "grandma"] },
      ],
    },
    {
      question: "How do you handle your data backups?",
      options: [
        { text: "Local and cloud, automated", score: ["hardcore", "rich"] },
        { text: "iCloud or Google Backup", score: ["apple", "basic"] },
        { text: "Manual copies now and then", score: ["broke", "vibecoder"] },
        { text: "What’s a backup?", score: ["newb", "grandma"] },
      ],
    },
    {
      question: "Which of these is your dream tech setup?",
      options: [
        {
          text: "Triple monitor battlestation with LED lighting",
          score: ["hardcore", "arch"],
        },
        {
          text: "Apple Studio Display and MacBook docked",
          score: ["apple", "design"],
        },
        {
          text: "Just a solid laptop and phone",
          score: ["basic", "vibecoder"],
        },
        { text: "Whatever’s free or on sale", score: ["broke", "grandma"] },
      ],
    },
  ];

  let currentQuestionIndex = 0;
  let currentQuestion = questions[currentQuestionIndex];
  let selectedOptions: string[][] = [];
  let totalQuestions = questions.length;

  window.onload = () => {
    const buttons = document.querySelectorAll("button");
    const dinos = [
      "confused.jpg",
      "ehh.png",
      "ok.jpg"
    ]
    const dino = document.getElementById("dino") as HTMLImageElement;
    if (!dino) {
      console.error("Dino element not found");
      return;
    }
    dino.src = "/img/simple.png";;
    buttons.forEach((button, index) => {
      button.textContent = currentQuestion.options[index].text;
      button.onclick = () => {
         dino.src = "/img/"+dinos[Math.floor(Math.random() * dinos.length)];
        selectedOptions.push(currentQuestion.options[index].score);
        currentQuestionIndex++;
        if (currentQuestionIndex < totalQuestions) {
          currentQuestion = questions[currentQuestionIndex];
          updateUI();
        } else {
          calculateResults();
        }
        // unselect all buttons (move focus to invisible element
        const invisibleElement = document.createElement("span");
        invisibleElement.tabIndex = -1;
        document.body.appendChild(invisibleElement);
        invisibleElement.focus();
        invisibleElement.remove();
      };
    });
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
    selectedOptions.forEach((optionScores) => {
      optionScores.forEach((score) => {
        personalities[score as Personality] += 1;
      });
    });

    const personality = Object.keys(personalities).reduce((a, b) =>
      personalities[a as Personality] > personalities[b as Personality] ? a : b
    );
    alert(`Your tech personality is: ${personality}`);
    console.log("Personality scores:", personalities);
    alert(
      `Certainty: ${
        (personalities[personality as Personality] / totalQuestions) * 100
      }%`
    );
  }

  return (
    <MantineProvider>
      <Center h="100vh">
        <Card shadow="lg" padding="lg" radius="md" w="95%" style={{ border: "5px solid rgb(182, 146, 79)", backgroundImage:"url(https://www.pixcrafter.com/wp-content/uploads/2022/11/free-white-paper-texture-background.jpg)", filter: "brightness(1.2)", backgroundSize: "cover" }}>
        <Stack style={{ textAlign: "center" }}>
          <Center>
          <Image 
          src=""
          id="dino"
          w="20%"
          /></Center>
          <Title order={1}>Barxilly's Tech Personality Quiz 2</Title>
          <Title order={4}>
            New and Improved... or something along those lines.
          </Title>
          <Space h="xl" />
          <Title order={2}>{currentQuestion.question}</Title>
          <Flex gap="md" justify={"center"} wrap="wrap">
            <Button id="op1"></Button>
            <Button id="op2"></Button>
            <Button id="op3"></Button>
            <Button id="op4"></Button>
          </Flex>
        </Stack></Card>
      </Center>
    </MantineProvider>
  );
}

export default App;
