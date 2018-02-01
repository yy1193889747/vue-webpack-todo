const webpack = require('webpack')
const path = require('path')
const isDev = process.env.NODE_ENV === 'development'
const HTMLPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')

const config = {
    target: 'web', // <=== 默认是 'web'，可省略
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: "bundle.[hash:8].js",
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: '[name]-aaa.[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
     // 根据不同环境进行打包
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
     // 生成index页面
        new HTMLPlugin()
    ]
}
// 如果是开发环境
if (isDev) {
    config.module.rules.push({
        test: /\.styl$/,
        use: [
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true,
                }
            },
            'stylus-loader'
        ]
    })
    config.devtool = "#cheap-module-eval-source-map" //页面调试代码
    // webpack2后添加的
    config.devServer = {
        port: 8080,
        host: '0.0.0.0', // 通过内网都可以访问
        // 将错误显示到页面
        overlay: {
            errors: true,
        },
        // 热加载   open: true 打开浏览器   historFallback:{} 前段路由
        hot: true  // 需要下面插件的引入
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(), // hot插件
        new webpack.NoEmitOnErrorsPlugin() // 减少不需要信息的展示
    )
} else {
    config.entry = {
        app: path.join(__dirname, 'src/index.js'),
        vendor: ["vue"]
    }
    config.output.filename = '[name].[chunkhash:8].js'
    config.module.rules.push({
        test: /\.styl$/,
        use: ExtractPlugin.extract({
            fallback: 'style-loader',
            use: [
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                    }
                },
                'stylus-loader'
            ]
        })
    })
    config.plugins.push(
        new ExtractPlugin('styles.[contentHash:8].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })

    )
}
module.exports = config