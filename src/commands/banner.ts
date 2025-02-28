import command from "../../config.json" assert { type: "json" };

const createBanner = (): string[] => {
  const banner: string[] = [];
  banner.push("<br>");
  command.ascii.forEach((ele) => {
    let bannerString = "";
    //this is for the ascii art
    for (let i = 0; i < ele.length; i++) {
      if (ele[i] === " ") {
        bannerString += "&nbsp;";
      } else {
        bannerString += ele[i];
      }
    }

    let eleToPush = `<pre>${bannerString}</pre>`;
    banner.push(eleToPush);
  });
  banner.push("<br>");
  banner.push("Welcome to The Creative v1.0.3");
  banner.push(
    "Type <span class='command'>'help'</span> for a list of all available commands."
  );
  banner.push(
    `Type <span class='command'>'subscribe'</span> to gain access to The Creative apps & tools.`
  );
  banner.push(
    `Type <span class='command'>'notify'</span> to stay informed on software updates and news.`
  );
  banner.push(
    `Type <span class='command'>'apps'</span> to access a suite of Creative apps & tools.`
  );
  banner.push(
    `Type <span class='command'>'chat {message}'</span> to chat with Creative Muse AI.`
  );
  banner.push("<br>");
  return banner;
};

export const BANNER = createBanner();
