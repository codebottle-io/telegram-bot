const codebottle = require(`codebottle`);
const { inlineButtons, formatText } = require(`../helpers`);

module.exports = bot =>
    bot.on(`inline_query`, async ctx => {
        const results = [];
        const { query } = ctx.inlineQuery;

        try {
            const data = await (query && query.length > 2 ?
                codebottle.search({ query }) :
                codebottle.latest);

            data.forEach(snippet => {
                results.push({
                    type: `article`,
                    id: snippet.id,
                    title: snippet.title,
                    input_message_content: {
                        message_text: formatText(snippet),
                        parse_mode: `html`,
                        disable_web_page_preview: true,
                    },
                    url: `https://codebottle.io/s/${snippet.id}`,
                    hide_url: true,
                    ...inlineButtons(snippet.id, true),
                });
            });
        } catch (e) {
            results.push({
                type: `article`,
                id: `error`,
                title: `There was an error.`,
                message_text: `¯\\_(ツ)_/¯`,
            });

            console.log(e);
        } finally {
            ctx.answerInlineQuery(results.slice(0, 50));
        }
    });
