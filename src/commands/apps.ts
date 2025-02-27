import command from '../../config.json' assert {type: 'json'};

const createProject = () : string[] => {
  let string = "";
  const apps : string[] = [];
  const files = `${command.apps.length} File(s)`;
  // const SPACE = "&nbsp;";

  apps.push("<br>")

  command.apps.forEach((ele) => {
    let link = `<a href="${ele[2]}" target="_blank">${ele[0]}</a>`;
    string += `<div style='display: flex; align-items: center; justify-content: start; gap: 25px;'>
                 <div style='flex-shrink: 0;'>${link}</div>
                 <div>${ele[1]}</div>
               </div>`;
    apps.push(string);
    string = '';
  });
  
  

  apps.push("<br>");
  apps.push(files);
  apps.push("<br>");
  return apps
}

export const APPS = createProject();
