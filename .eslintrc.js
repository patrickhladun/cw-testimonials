module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        'node': true
    },
    "extends": [
        'eslint:recommended',
        'prettier'
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "wp": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-unused-vars": "off",
        'no-console': 'off'
    }
};
