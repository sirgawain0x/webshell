import command from "../../config.json" assert { type: "json" };

const createSubscribe = (): string[] => {
  let string = "";
  const subscribe: string[] = [];
  const option = `${command.subscribe.length} Option(s)`;

  subscribe.push("<br>");

  command.subscribe.forEach((ele) => {
    let link = `<a href="${ele[2]}" target="_blank">${ele[0]}</a>`;
    string += `<div style='display: flex; align-items: center; justify-content: start; gap: 25px;'>
                 <div style='flex-shrink: 0;'>${link}</div>
                 <div>${ele[1]}</div>
               </div>`;
    subscribe.push(string);
    string = "";
  });
  subscribe.push("<br>");
  subscribe.push(option);
  subscribe.push("<br>");
  return subscribe;
};

export const SUBSCRIBE = createSubscribe();
