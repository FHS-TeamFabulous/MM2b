import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';

const extractTextPlugin = new ExtractTextPlugin({
    filename: 'styles/css/main.css',
});

module.exports = {
    context: path.resolve(__dirname),

    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        path.join(__dirname, 'app/main.js')
    ],

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
                },
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        extractTextPlugin,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],

    devServer: {
        hot: true,
        port: 3000,
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },

    resolve: {
        modules: [
            path.resolve(__dirname, './app/modules'),
            'node_modules',
        ]
    },

    output: {
        filename: 'js/main.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
