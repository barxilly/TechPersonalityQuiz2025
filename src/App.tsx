import { useState } from "react";
import {
  Button,
  Card,
  Center,
  Flex,
  Image,
  MantineProvider,
  Progress,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Notifications, showNotification } from "@mantine/notifications";
import { toPng } from "html-to-image";
import "./App.css";
import "@mantine/core/styles.css";
import { FaBackward, FaSlack } from "react-icons/fa";

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

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[][]>([]);
  const [completed, setCompleted] = useState(false);
  const [result, setResult] = useState<{
    personality: string;
    certainty: number;
  } | null>(null);
  const [finalScores, setFinalScores] = useState<Record<
    Personality,
    number
  > | null>(null);
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

  const personalityImages: Record<Personality, string> = {
    arch: "/img/arch.jpeg",
    apple: "/img/apple.jpg",
    hardcore: "/img/hardcore.jpg",
    newb: "/img/newb.jpeg",
    broke: "/img/broke.jpeg",
    design: "/img/design.jpg",
    basic: "/img/basic.jpg",
    vibecoder: "/img/vibecoder.png",
    rich: "/img/rich.jpg",
    grandma: "/img/grandma.jpg",
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

  // Shuffle options for each question on first render
  const [shuffledQuestions] = useState(() =>
    questions.map((q) => ({ ...q, options: shuffleArray(q.options) }))
  );

  const dinoImages = [
    "/img/confused.png",
    "/img/ehh.png",
    "/img/shock.png",
    "/img/simple.png",
  ];
  const [dinoSrc, setDinoSrc] = useState<string>("/img/simple.png");

  function handleOption(index: number) {
    // Change dino image randomly (not repeating the same image)
    let nextImages = dinoImages.filter((img) => img !== dinoSrc);
    setDinoSrc(nextImages[Math.floor(Math.random() * nextImages.length)]);

    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const newSelected = [
      ...selectedOptions,
      currentQuestion.options[index].score,
    ];
    setSelectedOptions(newSelected);
    // invisible element to focus
    const invisibleElement = document.createElement("button");

    // Play 0.7 seconds of scribble.mp3
    const audio = new Audio("/audio/scribble.mp3");
    audio.play().catch((error) => {
      console.error("Audio playback failed:", error);
      showNotification({
        message: "Audio playback failed. Please check your device settings.",
        color: "red",
        autoClose: 3000,
        style: { position: "fixed", top: 16, right: 16, zIndex: 9999 },
      });
    });
    

    document.body.appendChild(invisibleElement);
    invisibleElement.focus();
    document.body.removeChild(invisibleElement);
    if (currentQuestionIndex + 1 < shuffledQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate results
      newSelected.forEach((optionScores) => {
        optionScores.forEach((score) => {
          personalities[score as Personality] += 1;
        });
      });
      const personality = Object.keys(personalities).reduce((a, b) =>
        personalities[a as Personality] > personalities[b as Personality]
          ? a
          : b
      );
      const certainty =
        (personalities[personality as Personality] / shuffledQuestions.length) *
        100;
      setDinoSrc("/img/done.png"); // Set dino to shocked image on completion
      // Set dino image size to 20% of the container width
      document.getElementById("dino")!.style.width = "10% !important"; // Adjust size for better visibility
      setResult({ personality, certainty });
      setFinalScores({ ...personalities }); // Store the scores for close competitors
      setCompleted(true);
    }
  }

  function isMobile() {
    console.log(
      "Mobile check:",
      /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 768
    );
    return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
  }

  function isSmallMobile() {
    return window.innerHeight < 500 || window.innerWidth < 700;
  }

  const hrpers: Record<string, string> = {
    arch: "I use Arch BTW",
    apple: "Apple Greaser",
    hardcore: "Hardcore Dev",
    newb: "Newbie",
    broke: "Brokie",
    design: "Design Nut",
    basic: "Basic Dev",
    vibecoder: "AI Slopcoder",
    rich: "Bougie B*tch",
    grandma: "Grandma",
  };

  // style={{ backgroundImage:"url(https://www.pixcrafter.com/wp-content/uploads/2022/11/free-white-paper-texture-background.jpg)", filter: "brightness(1.2)", backgroundSize: "cover", opacity: "0.9" }}>

  // Handler to copy results card as image
  async function handleCopyCardImage() {
    const card = document.getElementById("results-card");
    if (!card) return;
    try {
      const dataUrl = await toPng(card, { skipFonts: true });
      const blob = await (await fetch(dataUrl)).blob();
      await navigator.clipboard.write([
        new window.ClipboardItem({ "image/png": blob }),
      ]);
      showNotification({
        message: "Results card copied as image!",
        color: "teal",
        autoClose: 2000,
        style: { position: "fixed", top: 16, right: 16, zIndex: 9999 },
      });
    } catch (e) {
      showNotification({
        message: "Failed to copy image.",
        color: "red",
        autoClose: 2000,
        style: { position: "fixed", top: 16, right: 16, zIndex: 9999 },
      });
    }
  }

  window.onload = () => {
    if (isSmallMobile()) {
      showNotification({
        message:
          "Ur device very smol, quiz will still work, but desktop experience is better.",
        color: "yellow",
        autoClose: 5000,
        style: { position: "fixed", top: 16, right: "5%", zIndex: 9999, maxWidth: "90%" },
      });
    } else if (isMobile()) {
      showNotification({
        message:
          "Mobile experience is not fully kitted out, please use a desktop for the best experience.",
        color: "yellow",
        autoClose: 5000,
        style: { position: "fixed", top: 16, right: "5%", zIndex: 9999, maxWidth: "90%" },
      });
    }
  };

  return (
    <MantineProvider>
      <Notifications position="top-right" zIndex={9999} />
      <Center h="100vh">
        <Card shadow="xl" padding="lg" radius="md" w="95%" className="glassDiv" style={{ position:"relative",maxHeight: "95vh", overflowY: "auto" }}>
          {completed ? <></> : <><Progress value={(currentQuestionIndex / shuffledQuestions.length) * 100} size="md" color="blue" radius={0} style={{ 
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0)",
           }} />
           {currentQuestionIndex > 0 ? <FaBackward 
            style={{
              position: "absolute",
              top: "1.5em",
              left: "1.5em",
              cursor: "pointer",
              color: "#00000055",
            }}
            onClick={() => {
              if (currentQuestionIndex > 0) {
                setCurrentQuestionIndex(currentQuestionIndex - 1);
                setDinoSrc("/img/simple.png"); // Reset dino image
              }
            }} 
            /> : <></>}
           </>}
          <Stack style={{ textAlign: "center", marginTop: "0.3em" }}>
            {isSmallMobile() && completed ? (
              <></>
            ) : (
              <Center>
                <Image
                  src={dinoSrc}
                  id="dino"
                  style={{
                    width: completed ? (isMobile() ? "40%" : "10%") : "20%",
                  }}
                />
              </Center>
            )}
         <Title order={1}>Barxilly's Tech Personality Quiz 2</Title>
            <Title order={4}>
              New and Improved... or something along those lines.
            </Title>
            <Space h="xl" />
            {completed && result ? (
              <Stack>
                <Center>
                  <Card
                    id="results-card"
                    shadow="sm"
                    padding="xl"
                    radius="md"
                    withBorder
                    className="glassDiv for"
                    onClick={handleCopyCardImage}
                    style={{ cursor: "pointer", position: "relative" }}
                    title="Click to copy as image"
                  >
                    {isMobile() ? (
                      <Card.Section>
                        <Image
                          src={
                            personalityImages[result.personality as Personality]
                          }
                          alt={result.personality}
                          h="150px"
                          style={{ objectFit: "cover", borderRadius: "md" }}
                        />
                      </Card.Section>
                    ) : (
                      <Card.Section>
                        <Image
                          src={
                            personalityImages[result.personality as Personality]
                          }
                          alt={result.personality}
                          h="200px"
                        />
                      </Card.Section>
                    )}

                    <Space h="md" />
                    <Title order={2}>Quiz Complete!</Title>
                    <Title order={3}>
                      Your tech personality is: {hrpers[result.personality]}
                    </Title>
                    <Title order={4}>
                      Certainty: {result.certainty.toFixed(1)}%
                    </Title>
                    <Space h="md" />
                    {isMobile() ? (
                      <></>
                    ) : (
                      <>
                        <Title order={5}>Close competitors:</Title>
                        <Flex justify="center" wrap="wrap" gap="md">
                          {finalScores &&
                            Object.entries(finalScores)
                              .filter(([key]) => key !== result.personality)
                              .sort((a, b) => b[1] - a[1])
                              .slice(0, 3)
                              .map(([key, value]) => (
                                <Title order={6} key={key}>
                                  {hrpers[key]}:{" "}
                                  {(
                                    (value / shuffledQuestions.length) *
                                    100
                                  ).toFixed(1)}
                                  %
                                </Title>
                              ))}
                        </Flex>
                        <Space h="md" />{" "}
                      </>
                    )}
                    <Text>
                      tpq.benjs.uk by  <a href="https://hackclub.slack.com/team/U078L1ETM6E" target="_blank"><FaSlack style={{ verticalAlign: "middle",paddingBottom: "0.1em",}}/> @barxilly</a>
                    </Text>
                  </Card>
                </Center>

                {isMobile() ? (
                  <></>
                ) : (
                  <Button
                    onClick={handleCopyCardImage}
                    style={{ alignSelf: "center", marginTop: "md" }}
                  >
                    Copy Results Card as Image
                  </Button>
                )}
              </Stack>
            ) : (
              <>
                <Title order={2}>
                  {shuffledQuestions[currentQuestionIndex].question}
                </Title>
                {!isMobile() ? (
                  <Flex gap="md" justify={"center"} wrap="wrap">
                    {shuffledQuestions[currentQuestionIndex].options.map(
                      (option, idx) => (
                        <Button key={idx} onClick={() => handleOption(idx)}>
                          {option.text}
                        </Button>
                      )
                    )}
                  </Flex>
                ) : (
                  <Center>
                    <Stack gap="md" justify={"center"} w="fit-content">
                      {shuffledQuestions[currentQuestionIndex].options.map(
                        (option, idx) => (
                          <Button key={idx} onClick={() => handleOption(idx)}>
                            {option.text}
                          </Button>
                        )
                      )}
                    </Stack>
                  </Center>
                )}
              </>
            )}
          </Stack>
        </Card>
      </Center>
    </MantineProvider>
  );
}

export default App;
