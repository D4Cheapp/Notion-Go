module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: [
            ".ts",
            ".tsx"
          ],
          alias: {
            hooks: './src/hooks',
            components: './src/components',
            constants: './src/constants'
          }
        }
      ]
    ],
  };
};
