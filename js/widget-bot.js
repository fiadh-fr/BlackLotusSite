const widgetbot = document.createElement('script');
widgetbot.setAttribute('src', 'https://cdn.jsdelivr.net/npm/@widgetbot/crate@3');
widgetbot.setAttribute('async', '');
widgetbot.setAttribute('defer', '');

document.body.appendChild(widgetbot);

widgetbot.onload = () => {
  new Crate({
    server: '896047806454837278', // Black Lótus
    channel: '1096060003372241070' // #᲼᲼site-chat
  });
};