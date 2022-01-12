module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ["plugin:vue/essential"],
    rules: {
        // override/add rules settings here, such as:
        // 'vue/no-unused-vars': 'error'
        'vue/no-parsing-error': 'off',
        "vue/valid-v-model": "off",
        "vue/no-use-v-if-with-v-for": "off",
    },
    parserOptions: {
        parser: "babel-eslint"
    }

}