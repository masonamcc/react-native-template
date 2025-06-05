module.exports = function(api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'], // Ensure this is the only preset and it's correct
    };
};