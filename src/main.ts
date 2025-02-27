import command from "../config.json" assert { type: "json" };
import { HELP } from "./commands/help";
import { BANNER } from "./commands/banner";
import { ABOUT } from "./commands/about";
import { DEFAULT } from "./commands/default";
import { SUBSCRIBE } from "./commands/subscribe";
import { APPS } from "./commands/apps";
import { createWhoami } from "./commands/whoami";
import { NOTIFY } from "./commands/notifications";
import { handleChat } from "./commands/chat";

//mutWriteLines gets deleted and reassigned
let mutWriteLines = document.getElementById("write-lines");
let historyIdx = 0;
let tempInput = "";
// let userInput: string;
let isSudo = false;
let isPasswordInput = false;
let passwordCounter = 0;
let bareMode = false;

//WRITELINESCOPY is used to during the "clear" command
const WRITELINESCOPY = mutWriteLines;
const TERMINAL = document.getElementById("terminal");
const USERINPUT = document.getElementById("user-input") as HTMLInputElement;
const INPUT_HIDDEN = document.getElementById("input-hidden");
const PASSWORD = document.getElementById("password-input");
const PASSWORD_INPUT = document.getElementById(
  "password-field"
) as HTMLInputElement;
const PRE_HOST = document.getElementById("pre-host");
const PRE_USER = document.getElementById("pre-user");
const HOST = document.getElementById("host");
const USER = document.getElementById("user");
const PROMPT = document.getElementById("prompt");
const COMMANDS = [
  "help",
  "about",
  "apps",
  "mdm",
  "subscribe",
  "notify",
  "whoami",
  "docs",
  "banner",
  "clear",
  "chat",
];
const HISTORY: string[] = [];
const SUDO_PASSWORD = command.password;
const REPO_LINK = command.repoLink;
const DOCS_LINK = command.docsLink;
const MDM_LINK = command.mdmLink;
const LINKEDIN_LINK = command.social.linkedin;
const GITHUB_LINK = command.social.github;
const EMAIL_LINK = command.social.email;

const scrollToBottom = () => {
  const MAIN = document.getElementById("main");
  if (!MAIN) return;

  MAIN.scrollTop = MAIN.scrollHeight;
};

async function userInputHandler(e: KeyboardEvent) {
  if (!USERINPUT) return;
  const key = e.key;

  switch (key) {
    case "Enter":
      e.preventDefault();
      await enterKey();
      scrollToBottom();
      break;
    case "Escape":
      USERINPUT.value = "";
      break;
    case "ArrowUp":
    case "ArrowDown":
      e.preventDefault();
      arrowKeys(key);
      break;
    case "Tab":
      e.preventDefault();
      tabKey();
      break;
    default:
      break;
  }
}

async function enterKey() {
  if (!USERINPUT || !mutWriteLines) return;
  if (isPasswordInput) {
    passwordHandler();
    return;
  }

  const input = USERINPUT.value.toLowerCase().trim();
  HISTORY.unshift(input);
  historyIdx = 0;

  const prompt = document.createElement("div");
  prompt.className = "prompt-line";
  prompt.innerHTML = `<span id="pre-host">╭─</span><span id="user">creative</span> <span id="pre-host">at</span> <span id="host">terminal</span> <span id="prompt">~/</span>`;

  const line = document.createElement("div");
  line.className = "line";
  const arrow = document.createElement("span");
  arrow.id = "prompt";
  arrow.textContent = "└─>";
  line.appendChild(arrow);

  const command = document.createElement("span");
  command.className = "command";
  command.textContent = ` ${input}`;
  line.appendChild(command);

  mutWriteLines.appendChild(prompt);
  mutWriteLines.appendChild(line);

  USERINPUT.value = "";

  await commandHandler(input);
  scrollToBottom();
}

function tabKey() {
  let currInput = USERINPUT.value;

  for (const ele of COMMANDS) {
    if (ele.startsWith(currInput)) {
      USERINPUT.value = ele;
      return;
    }
  }
}

function arrowKeys(e: string) {
  switch (e) {
    case "ArrowDown":
      if (historyIdx !== HISTORY.length) {
        historyIdx += 1;
        USERINPUT.value = HISTORY[historyIdx];
        if (historyIdx === HISTORY.length) USERINPUT.value = tempInput;
      }
      break;
    case "ArrowUp":
      if (historyIdx === HISTORY.length) tempInput = USERINPUT.value;
      if (historyIdx !== 0) {
        historyIdx -= 1;
        USERINPUT.value = HISTORY[historyIdx];
      }
      break;
  }
}

async function commandHandler(input: string) {
  // Handle chat command
  if (input.startsWith("chat")) {
    const message = input.substring(4).trim();
    if (message) {
      writeLines(["Sending message to AI...", "<br>"]);
      const response = await handleChat(message);
      writeLines(response);
      return;
    } else {
      writeLines(["Usage: chat <message>", "<br>"]);
      return;
    }
  }

  // Handle rm -rf command
  if (input.startsWith("rm -rf") && input.trim() !== "rm -rf") {
    if (isSudo) {
      if (input === "rm -rf src" && !bareMode) {
        bareMode = true;

        setTimeout(() => {
          if (!TERMINAL || !WRITELINESCOPY) return;
          TERMINAL.innerHTML = "";
          TERMINAL.appendChild(WRITELINESCOPY);
          mutWriteLines = WRITELINESCOPY;
        });

        easterEggStyles();
        setTimeout(() => {
          writeLines(["What made you think that was a good idea?", "<br>"]);
        }, 200);

        setTimeout(() => {
          writeLines(["Now everything is ruined.", "<br>"]);
        }, 1200);
      } else if (input === "rm -rf src" && bareMode) {
        writeLines(["there's no more src folder.", "<br>"]);
      } else {
        if (bareMode) {
          writeLines(["What else are you trying to delete?", "<br>"]);
        } else {
          writeLines([
            "<br>",
            "Directory not found.",
            "type <span class='command'>'ls'</span> for a list of directories.",
            "<br>",
          ]);
        }
      }
    } else {
      writeLines(["Permission not granted.", "<br>"]);
    }
    return;
  }

  switch (input) {
    case "clear":
      setTimeout(() => {
        if (!TERMINAL || !WRITELINESCOPY) return;
        TERMINAL.innerHTML = "";
        TERMINAL.appendChild(WRITELINESCOPY);
        mutWriteLines = WRITELINESCOPY;
      });
      break;
    case "banner":
      if (bareMode) {
        writeLines(["The Creative v1.0.1", "<br>"]);
        break;
      }
      writeLines(BANNER);
      break;
    case "help":
      if (bareMode) {
        writeLines(["maybe restarting your browser will fix this.", "<br>"]);
        break;
      }
      writeLines(HELP);
      break;
    case "whoami":
      if (bareMode) {
        writeLines([`${command.username}`, "<br>"]);
        break;
      }
      writeLines(createWhoami());
      break;
    case "about":
      if (bareMode) {
        writeLines(["Nothing to see here.", "<br>"]);
        break;
      }
      writeLines(ABOUT);
      break;
    case "subscribe":
      if (bareMode) {
        writeLines(["Nothing to see here.", "<br>"]);
        break;
      }
      writeLines(SUBSCRIBE);
      break;
    case "notify":
      if (bareMode) {
        writeLines(["Nothing to see here.", "<br>"]);
        break;
      }
      writeLines(NOTIFY);
      break;
    case "apps":
      if (bareMode) {
        writeLines(["I don't want you to break the other apps.", "<br>"]);
        break;
      }
      writeLines(APPS);
      break;
    case "docs":
      writeLines(["Redirecting to creativeplatform.xyz...", "<br>"]);
      setTimeout(() => {
        window.open(DOCS_LINK, "_blank");
      }, 500);
      break;
    case "mdm":
      writeLines(["Redirecting to Creative MDM...", "<br>"]);
      setTimeout(() => {
        window.open(MDM_LINK, "_blank");
      }, 500);
      break;
    case "repo":
      writeLines(["Redirecting to github.com...", "<br>"]);
      setTimeout(() => {
        window.open(REPO_LINK, "_blank");
      }, 500);
      break;
    case "linkedin":
      writeLines(["Redirecting to linkedin.com...", "<br>"]);
      setTimeout(() => {
        window.open(LINKEDIN_LINK, "_blank");
      }, 500);
      break;
    case "github":
      writeLines(["Redirecting to github.com...", "<br>"]);
      setTimeout(() => {
        window.open(GITHUB_LINK, "_blank");
      }, 500);
      break;
    case "email":
      writeLines(["Composing an email to creativeplatform.xyz...", "<br>"]);
      setTimeout(() => {
        window.open(EMAIL_LINK, "_blank");
      }, 500);
      break;
    case "rm -rf":
      if (bareMode) {
        writeLines(["don't try again.", "<br>"]);
        break;
      }

      if (isSudo) {
        writeLines([
          "Usage: <span class='command'>'rm -rf &lt;dir&gt;'</span>",
          "<br>",
        ]);
      } else {
        writeLines(["Permission not granted.", "<br>"]);
      }
      break;
    case "sudo":
      if (bareMode) {
        writeLines(["no.", "<br>"]);
        break;
      }
      if (!PASSWORD) return;
      isPasswordInput = true;
      USERINPUT.disabled = true;

      if (INPUT_HIDDEN) INPUT_HIDDEN.style.display = "none";
      PASSWORD.style.display = "block";
      setTimeout(() => {
        PASSWORD_INPUT.focus();
      }, 100);

      break;
    case "ls":
      if (bareMode) {
        writeLines(["", "<br>"]);
        break;
      }

      if (isSudo) {
        writeLines(["src", "<br>"]);
      } else {
        writeLines(["Permission not granted.", "<br>"]);
      }
      break;
    default:
      if (bareMode) {
        writeLines(["type 'help'", "<br>"]);
        break;
      }

      writeLines(DEFAULT);
      break;
  }
}

function writeLines(message: string[]) {
  message.forEach((item, idx) => {
    displayText(item, idx);
  });
}

function displayText(item: string, idx: number) {
  setTimeout(() => {
    if (!mutWriteLines) return;
    const p = document.createElement("p");
    p.innerHTML = item;
    mutWriteLines.parentNode!.insertBefore(p, mutWriteLines);
    scrollToBottom();
  }, 40 * idx);
}

function revertPasswordChanges() {
  if (!INPUT_HIDDEN || !PASSWORD) return;
  PASSWORD_INPUT.value = "";
  USERINPUT.disabled = false;
  INPUT_HIDDEN.style.display = "block";
  PASSWORD.style.display = "none";
  isPasswordInput = false;

  setTimeout(() => {
    USERINPUT.focus();
  }, 200);
}

function passwordHandler() {
  if (passwordCounter === 2) {
    if (!INPUT_HIDDEN || !mutWriteLines || !PASSWORD) return;
    writeLines([
      "<br>",
      "INCORRECT PASSWORD.",
      "PERMISSION NOT GRANTED.",
      "<br>",
    ]);
    revertPasswordChanges();
    passwordCounter = 0;
    return;
  }

  if (PASSWORD_INPUT.value === SUDO_PASSWORD) {
    if (!mutWriteLines || !mutWriteLines.parentNode) return;
    writeLines([
      "<br>",
      "PERMISSION GRANTED.",
      "Try <span class='command'>'rm -rf'</span>",
      "<br>",
    ]);
    revertPasswordChanges();
    isSudo = true;
    return;
  } else {
    PASSWORD_INPUT.value = "";
    passwordCounter++;
  }
}

function easterEggStyles() {
  const bars = document.getElementById("bars");
  const body = document.body;
  const main = document.getElementById("main");
  const span = document.getElementsByTagName("span");

  if (!bars) return;
  bars.innerHTML = "";
  bars.remove();

  if (main) main.style.border = "none";

  body.style.backgroundColor = "black";
  body.style.fontFamily = "VT323, monospace";
  body.style.fontSize = "20px";
  body.style.color = "white";

  for (let i = 0; i < span.length; i++) {
    span[i].style.color = "white";
  }

  USERINPUT.style.backgroundColor = "black";
  USERINPUT.style.color = "white";
  USERINPUT.style.fontFamily = "VT323, monospace";
  USERINPUT.style.fontSize = "20px";
  if (PROMPT) PROMPT.style.color = "white";
}

const initEventListeners = () => {
  if (HOST) {
    HOST.innerText = command.hostname;
  }

  if (USER) {
    USER.innerText = command.username;
  }

  if (PRE_HOST) {
    PRE_HOST.innerText = command.hostname;
  }

  if (PRE_USER) {
    PRE_USER.innerText = command.username;
  }

  window.addEventListener("load", () => {
    writeLines(BANNER);
  });

  if (!USERINPUT || !PASSWORD_INPUT) return;

  USERINPUT.addEventListener("keydown", async (e) => {
    await userInputHandler(e);
  });

  PASSWORD_INPUT.addEventListener("keydown", (e) => {
    const key = e.key;
    if (key === "Enter") {
      e.preventDefault();
      passwordHandler();
    }
  });
};

initEventListeners();
