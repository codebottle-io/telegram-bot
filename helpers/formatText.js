const escapeHtml = require(`./escapeHtml`);
const truncate = require(`./truncate`);
const md2html = require(`./md2html`);

const formatText = (data, code) => {
    let message = `<a href="https://codebottle.io/s/${data.id}">${data.title}</a> `;
    message += `by <a href="https://codebottle.io/users/${data.username}">${data.username}</a>\n\n`;

    if (code) {
        message += `<pre>${escapeHtml(truncate(data.code))}</pre>`;
    } else {
        message += md2html(
            escapeHtml(truncate(data.description || `No description.`)),
        );
    }

    return message;
};

module.exports = formatText;
