const Markup = require(`telegraf/markup`);

const inlineButtons = (id, code) =>
    Markup.inlineKeyboard([
        Markup.callbackButton(code ? `Code` : `Description`, `${code ? `code` : `desc`}_${id}`),
        Markup.urlButton(`Open`, `https://codebottle.io/s/${id}`),
    ]).extra({
        disable_web_page_preview: true,
    });

module.exports = inlineButtons;
