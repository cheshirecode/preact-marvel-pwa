//https://github.com/developit/preact-cli/wiki/Config-Recipes#customising-babel-options-using-loader-helpers
export default (config, env, helpers) => {
  let { rule } = helpers.getLoadersByName(config, 'babel-loader')[0];
  let babelConfig = rule.options;
  //use babel-plugin-lodash to cherry-pick Lodash and Recompose modules instead of the whole bundle
  babelConfig.plugins.push(['lodash', { id: ['lodash', 'recompose'] }]);
};
