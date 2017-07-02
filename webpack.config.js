const path = require('path'),
    webpack = require("webpack"),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    WebpackNotifierPlugin = require('webpack-notifier'),
    HtmlWebpackPlugin = require('html-webpack-plugin');


let base = {
    index: './src/js/index.js',
    common: './src/js/common/common.js',
};

module.exports = {
    // https://webpack.js.org/configuration/devtool/#devtool
    devtool: 'source-map',
    // https://webpack.js.org/configuration/target/#target
    target: "web",
    entry: base,
    output: {
        path: path.resolve(__dirname, 'dist'),
        //文件名
        //hash ==> webpack编译过程
        //chunkhash => webpack对每个文件的hash
        //chunkFilename: '[chunkhash]_[name].js',
        //开发模式下推荐使用hash，每次编译后hash值不同，可更新所有文件
        //生产环境推荐使用chunkhash，根据文件内容生成，只有文件内容修改后才会改变，可以实现修改后更新，但编译效率较低
        //hash位数
        hashDigestLength: 3,
        //导出文件   
        filename: '[name].[hash].js',

        //包规范格式
        libraryTarget: 'umd',
        library: "MyLibrary",
    },
    resolve: {
        alias: {
            // test: path.resolve(__dirname, 'test/test.js')
        }
    },
    // webpack lifecycle before-complitaion run done =>
    plugins: [
        //在run阶段执行，$相当于占位符
        //web原生插件，可以使$符号代表jquery，jquery是从node_modules文件夹中查找的
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        new WebpackNotifierPlugin({
            title: 'Webpack 编译成功',
            contentImage: path.resolve(process.cwd(), './img/avatar.jpeg'),
            alwaysNotify: true
        }),
        new ExtractTextPlugin({
            filename: "[name].css",
            disable: false,
            allChunks: true
        }),
        //非常重要！！可以抽取公用的模块，
        //公用的模块会被抽取到common.js,即entry里定义的common，
        //所以必须在entry中先定义common
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: Infinity
        }),
        //可以在output路径下输出html文件的插件，
        //参考：https://github.com/jantimon/html-webpack-plugin
        new HtmlWebpackPlugin({
            title: 'haha',
            //template表示html模板，默认是index.html,但实测不配置会报错...
            //生成的index.html中会自动在index.html中注入index.js,common.js
            template: './index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                    // more options:
                    // https://github.com/kangax/html-minifier#options-quick-reference
            },
        })
    ],
    module: {
        rules: [{
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    }]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }]
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg|swf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[sha512:hash:base64:7].[ext]'
                    }
                }
            },
            {
                test: /\.html/,
                use: {
                    loader: "html-loader",
                    options: {
                        minimize: false,
                        attrs: false
                    }
                }
            }
        ]
    }
};