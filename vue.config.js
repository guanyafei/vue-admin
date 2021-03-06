'use strict'
const path = require('path')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

function resolve(dir) {
    return path.join(__dirname, dir)
}

const port = process.env.port || process.env.npm_config_port || 9527 // dev port
module.exports = {
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    // mode: 'history',
    devServer: {
        port: port,
        open: true,
        hotOnly: false, // 热更新
        overlay: {
            warnings: false,
            errors: true
        },
        before: require('./mock/mock-server.js'),
        proxy: {
            '/dev-api': {
                // target: 'http://10.112.76.32:8084/', // 服务器端接口地址
                target: 'http://10.2.115.47:8080/', // 服务器端接口地址
                secure: false, // 如果是https接口，需要配置这个参数
                ws: true,
                changeOrigin: true, //是否跨域
                pathRewrite: {
                    // '^/dev-api/lmis-md-web': '/lmis-md-web',
                    '^/dev-api/route': '/route'
                }
            }
        }
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            const plugins = [];
            plugins.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        //生产环境自动删除console
                        compress: {
                            drop_debugger: true,
                            drop_console: true,
                            pure_funcs: ['console.log']
                        }
                    },
                    sourceMap: false,
                    parallel: true
                })
            );
            config.plugins = [...config.plugins, ...plugins];
        }
    },
    chainWebpack(config) {
        config.resolve.alias.set("@", resolve("src"))
        config.plugin('preload').tap(() => [{
            rel: 'preload',
            fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
            include: 'initial'
        }])
        config.plugins.delete('prefetch')
            // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
            // set xml-loader
        config.module
            .rule('xml')
            .test(/\.xml$/)
            .include.add(resolve('src/views'))
            .end()
            .use('xml-loader')
            .loader('xml-loader')
            .end()
        config
            .when(process.env.NODE_ENV !== 'development',
                config => {
                    config
                        .plugin('ScriptExtHtmlWebpackPlugin')
                        .after('html')
                        .use('script-ext-html-webpack-plugin', [{
                            inline: /runtime\..*\.js$/
                        }])
                        .end()
                    config
                        .optimization.splitChunks({
                            chunks: 'all',
                            cacheGroups: {
                                libs: {
                                    name: 'chunk-libs',
                                    test: /[\\/]node_modules[\\/]/,
                                    priority: 10,
                                    chunks: 'initial'
                                },
                                elementUI: {
                                    name: 'chunk-elementUI',
                                    priority: 20,
                                    test: /[\\/]node_modules[\\/]_?element-ui(.*)/
                                },
                                commons: {
                                    name: 'chunk-commons',
                                    test: resolve('src/components'),
                                    minChunks: 3,
                                    priority: 5,
                                    reuseExistingChunk: true
                                }
                            }
                        })
                    config.optimization.runtimeChunk('single')
                }
            )
    }
}