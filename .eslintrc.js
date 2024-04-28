module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true // Add the 'node' environment to fix the 'module is not defined' error
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "ignorePatterns": [
        "webpack.config.js"
    ],
    "rules": {
        // Define ESLint rules here
    }
};
