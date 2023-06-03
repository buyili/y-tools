module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/vue3-recommended', // Use this if you are using Vue.js 3.x
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],
  rules: {
    // "off" or 0 - turn the rule off
    // "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
    // "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
    
    // Available rules for Vue.js: https://eslint.vuejs.org/rules/
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    'vue/singleline-html-element-content-newline': 'off',
    'vue/max-attributes-per-line': ['warn', {
      'singleline': 3
    }]
  }
}
