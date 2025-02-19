const helpObj = {
  commands: [
    ["'about'", "Who made this website?"],
    ["'join'", "Join The Creative."],
    ["'notify'", "Stay informed on software platform updates and news."],
    ["'apps'", "Maybe there's something interesting."],
    ["'whoami'", "A perplexing question."],
    ["'sudo'", "???"],
    ["'repo'", "View the Github repository."],
    ["'docs'", "View the documentaion."],
    ["'banner'", "Display the banner."],
    ["'mdm'", "Mobile Device Managment (MDM) License"],
    ["'clear'", "Clear the terminal."],
    ["'chat'", "Chat with Creative Muse AI"],
  ],
};

const createHelp = (): string[] => {
  const help: string[] = [];
  help.push("<br>");
  help.push("Available commands:");
  help.push("<br>");

  helpObj.commands.forEach((ele) => {
    const SPACE = "&nbsp;";
    let string = "";
    string += SPACE.repeat(2);
    string += "- <span class='command'>";
    if (ele[0] === "'chat'") {
      string += "chat &lt;message&gt;";
    } else {
      string += ele[0].slice(1, -1);
    }
    string += "</span>";
    string += SPACE.repeat(17 - ele[0].length);
    if (ele[0] === "'chat'") {
      string += "chat with Creative Muse AI";
    } else {
      string += ele[1];
    }
    help.push(string);
  });

  help.push("<br>");
  help.push("Press <span class='keys'>[Tab]</span> for auto completion.");
  help.push("Press <span class='keys'>[Esc]</span> to clear the input line.");
  help.push(
    "Press <span class='keys'>[↑][↓]</span> to scroll through your history of commands."
  );
  help.push("<br>");
  return help;
};

export const HELP = createHelp();
