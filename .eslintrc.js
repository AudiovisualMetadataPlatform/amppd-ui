module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "vue",
    ],
    "rules": {
      "no-console": "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
      "no-unused-vars": "off",
      "no-mixed-spaces-and-tabs": "off", 
      "vue/no-unused-components": "off",
      "vue/no-mutating-props": "off",
      "vue/multi-word-component-names": "off"
    }
};