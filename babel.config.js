module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "react-native-reanimated/plugin",
      ['module-resolver', {
        alias: {
          'react-native-url-polyfill/auto': './node_modules/react-native-url-polyfill/auto'
        }
      }]
    ],
  };
};

