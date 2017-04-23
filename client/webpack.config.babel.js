import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const extractTextPlugin = new ExtractTextPlugin({
    filename: 'styles/css/main.css',
});

module.exports = {
    context: path.resolve(__dirname),

    entry: './app/main.js',

    devtool: 'source-map',

    watch: true,

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: extractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: true,
                                camelCase: true,
                                minimize: true,
                                localIdentName: '[path]-[local]--[hash:base64:5]',
                                importLoaders: 1,
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            }
                        }
                     ]
                })
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    },

    plugins: [
        extractTextPlugin,
    ],
    
    resolve: {
        modules: [
            path.resolve(__dirname, './app/modules'),
            'node_modules',
        ]
    },

    output: {
        filename: 'js/main.js',
        path: path.resolve(__dirname, 'dist')
    },
};
