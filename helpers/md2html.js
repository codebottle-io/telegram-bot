const md2html = text => {
    return text
        .replace(/\*{2}(.+?)\*{2}/g, `<i>$1</i>`)
        .replace(/\*(.+?)\*/g, `<b>$1</b>`)
        .replace(/`{3}\w*\n(.+?)\n`{3}/gs, `<pre>$1</pre>`)
        .replace(/`(.+?)`/g, `<code>$1</code>`)
        .replace(/\[(.+?)\]\((.+?)\)/g, `<a href="$2">$1</a>`);
};

module.exports = md2html;
