import command from '../../config.json' assert {type: 'json'};

const createJoin = () : string[] => {
    let string = "";
    const join : string[] = [];
    const option = `${command.join.length} Option(s)`;

    join.push("<br>")

  command.join.forEach((ele) => {
    let link = `<a href="${ele[2]}" target="_blank">${ele[0]}</a>`;
    string += `<div style='display: flex; align-items: center; justify-content: start; gap: 25px;'>
                 <div style='flex-shrink: 0;'>${link}</div>
                 <div>${ele[1]}</div>
               </div>`;
    join.push(string);
    string = '';
  });
  
  

  join.push("<br>");
  join.push(option);
  join.push("<br>");
  return join
}

export const JOIN = createJoin();