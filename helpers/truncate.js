const truncate = code => code.length > 1000 ? `${code.slice(0, 1000)}...` : code;

module.exports = truncate;
