`use strict`;

const Markup = require(`telegraf/markup`);

const htmlEntities = {
    '<': `&lt;`,
    '>': `&gt;`,
    '&': `&amp;`,
    '"': `&quot;`
};

const md2html = (text) => {
    return text
        .replace(/\*{2}(.+?)\*{2}/g, `<i>$1</i>`)
        .replace(/\*(.+?)\*/g, `<b>$1</b>`)
        .replace(/`{3}\w*\n(.+?)\n`{3}/gs, `<pre>$1</pre>`)
        .replace(/`(.+?)`/g, `<code>$1</code>`)
        .replace(/\[(.+?)\]\((.+?)\)/g, `<a href="$2">$1</a>`);
};

const escapeHtml = (html) => {
    return html.replace(
        new RegExp(`[${Object.keys(htmlEntities).join(``)}]`, `g`),
        char => htmlEntities[char]
    );
};

const truncate = (code) => code.length > 1000 ? `${code.slice(0, 1000)}...` : code;

const inlineButtons = (id, code) => {
    const buttons = Markup.inlineKeyboard([
        Markup.callbackButton(code ? `Code` : `Description`, `${code ? `code` : `desc`}_${id}`),
        Markup.urlButton(`Open`, `https://codebottle.io/s/${id}`)
    ]).extra();

    return Object.assign({
        disable_web_page_preview: true
    }, buttons);
};

const formatText = (data, code) => {
    let message = `<a href="https://codebottle.io/s/${data.id}">${data.title}</a> `;
    message += `by <a href="https://codebottle.io/users/${data.username}">${data.username}</a>\n\n`;

    if (code) {
        message += `<pre>${escapeHtml(truncate(data.code))}</pre>`;
    } else {
        message += md2html(
            escapeHtml(
                truncate(
                    data.description || `No description.`
                )
            )
        );
    }

    return message;
};

module.exports = {
    inlineButtons,
    formatText,
};