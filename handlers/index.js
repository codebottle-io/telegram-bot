const handlers = [`start`, `search`, `latest`, `fetch`, `inline`, `callbacks`];

module.exports = bot =>
    handlers.forEach(handler => require(`./${handler}`)(bot));
