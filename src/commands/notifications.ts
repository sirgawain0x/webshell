import command from '../../config.json' assert {type: 'json'};

const createNotifications = () : string[] => {
    const notify : string[] = [];
    const SPACE = "&nbsp;";

    const METAMASK = "Metamask Snap";
    const ANDROID = "Android App";
    const IOS = "iOS App";

    const metamask = `<i class='fa-solid fa-wallet'></i> ${METAMASK}`;   
    const android = `<i class='fa-brands fa-android'></i> ${ANDROID}`;
    const ios = `<i class='fa-brands fa-apple'></i> ${IOS}`;
    let string = "";

    notify.push("<br>");
    notify.push(command.notificationsGreeting);
    notify.push("<br>");
    string += SPACE.repeat(2);
    string += metamask;
    string += SPACE.repeat(17 - METAMASK.length);
    string += `<a target='_blank' href='${command.notify.metamask}'>Push Snap</a>`;
    notify.push(string);

    string = '';
    string += SPACE.repeat(2);
    string += android;
    string += SPACE.repeat(17 - ANDROID.length);
    string += `<a target='_blank' href='${command.notify.android}'>Google Play Store</a>`;
    notify.push(string);

    string = '';
    string += SPACE.repeat(2);
    string += ios;
    string += SPACE.repeat(17 - IOS.length);  
    string += `<a target='_blank' href='${command.notify.ios}'>Apple Store</a>`;
    notify.push(string);

    notify.push("<br>");
    return notify
}

export const NOTIFY = createNotifications();