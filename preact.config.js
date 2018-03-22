//https://github.com/developit/preact-cli/wiki/Config-Recipes#customising-babel-options-using-loader-helpers
import preactCLILodash from 'preact-cli-lodash';

export default (config, env, helpers) => {
  preactCLILodash(config);
};
