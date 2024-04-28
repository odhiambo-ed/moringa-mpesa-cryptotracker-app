const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js', // Entry point of your application
    output: {
        path: path.resolve(__dirname, 'dist'), // Output directory
        filename: 'bundle.js', // Output bundle file name
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Match JavaScript files
                exclude: /node_modules/, // Exclude node_modules directory
                use: {
                    loader: 'babel-loader', // Use babel-loader for JavaScript files
                },
            },
            {
                test: /\.css$/, // Match CSS files
                use: ['style-loader', 'css-loader'], // Use style-loader and css-loader for CSS files
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i, // Match image files
                use: [
                    {
                        loader: 'url-loader', // Use url-loader for image files
                        options: {
                            limit: 8192, // Convert images smaller than 8kb to base64 strings
                            name: '[name].[hash:7].[ext]', // File name pattern
                            outputPath: 'images', // Output directory for images
                        },
                    },
                ],
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i, // Match font files
                use: [
                    {
                        loader: 'file-loader', // Use file-loader for font files
                        options: {
                            name: '[name].[hash:7].[ext]', // File name pattern
                            outputPath: 'fonts', // Output directory for fonts
                        },
                    },
                ],
            },
            {
                test: /\.js$/, // Match JavaScript files
                exclude: /node_modules/, // Exclude node_modules directory
                use: ['eslint-loader'], // Use eslint-loader for linting
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Path to your HTML template
            filename: 'index.html', // Output HTML file name
        }),
    ],
};
