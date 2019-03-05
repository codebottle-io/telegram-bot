const codebottle = require(`codebottle`);
const { inlineButtons, formatText } = require(`../helpers`);

module.exports = bot => {
    bot.action(/^code_(.+)$/, async ctx => {
        try {
            const [, id] = ctx.match;
            const data = await codebottle.fetch(id);

            await ctx.editMessageText(
                formatText(data, true),
                Object.assign({
                    parse_mode: `html`,
                }, inlineButtons(id))
            );

            ctx.answerCbQuery();
        } catch (e) {
            ctx.answerCbQuery(`There was an error.`, true);
            console.log(e);
        }
    });

    bot.action(/^desc_(.+)$/, async ctx => {
        try {
            const [, id] = ctx.match;
            const data = await codebottle.fetch(id);

            await ctx.editMessageText(
                formatText(data),
                Object.assign({
                    parse_mode: `html`,
                }, inlineButtons(id, true))
            );

            ctx.answerCbQuery();
        } catch (e) {
            ctx.answerCbQuery(`There was an error.`, true);
            console.log(e);
        }
    });
};
