import command from '../../config.json' assert {type: 'json'};

const createProject = () : string[] => {
  let string = "";
  const apps : string[] = [];
  const files = `${command.apps.length} File(s)`;
  const SPACE = "&nbsp;";

  apps.push("<br>")

  command.apps.forEach((ele) => {
    let link = `<a href="${ele[2]}" target="_blank">${ele[0]}</a>`
    string += SPACE.repeat(2);
    string += link;
    string += SPACE.repeat(17 - ele[0].length);
    string += ele[1];
    apps.push(string);
    string = '';
  });

  apps.push("<br>");
  apps.push(files);
  apps.push("<br>");
  return apps
}

export const apps = createProject()
