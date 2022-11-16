require('dotenv').config();
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require( 'terser-webpack-plugin');
const autoprefixer = require( 'autoprefixer');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const cssDeclarationSorter = require('css-declaration-sorter');

module.exports = (env, argv) => {
    const config = {
        entry: {
            editor: './src/editor.js',
            script: './src/script.js',
            options: './src/options.js'
        },
        output: {
            filename: '[name].js'
        },
        plugins: [
            new CleanPlugin(),
            new MiniCSSExtractPlugin({
                chunkFilename: "[id].css",
                filename: chunkData => {
                    return chunkData.chunk.name === 'script' ? 'style.css' : "[name].css"
                }
            })
        ],
        devtool: argv.mode === 'development' ? 'cheap-module-eval-source-map' : false,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                plugins: [
                                    ['lodash'],
                                    ['@babel/plugin-proposal-class-properties']
                                ],
                                presets: [
                                    '@babel/preset-env',
                                    [
                                        '@babel/preset-react',
                                        {
                                            "pragma": "wp.element.createElement",
                                            "pragmaFrag": "wp.element.Fragment",
                                            "development": argv.mode === 'development'
                                        }
                                    ]
                                ]
                            }
                        },
                        'eslint-loader'
                    ]
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCSSExtractPlugin.loader,
                        { loader: 'css-loader' },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer()
                                ],
                                sourceMap: false
                            }
                        },
                        { loader: 'sass-loader' }
                    ]
                }
            ]
        },
        optimization: {
            minimizer: [
                // new TerserPlugin({
                //     sourceMap: true
                // }),
                new OptimizeCSSAssetsPlugin(
                    {
                        cssProcessorOptions: {
                            map: {
                                inline: false,
                                annotation: true
                            }
                        }
                    }
                )
            ]
        },
        externals: {
            jquery: 'jQuery',
            lodash: 'lodash',
            "@wordpress/blob": ["wp", "blob"],
            "@wordpress/blocks": ["wp", "blocks"],
            "@wordpress/block-editor": ["wp", "block-editor"],
            "@wordpress/compose": ["wp", "compose"],
            "@wordpress/components": ["wp", "components"],
            "@wordpress/data": ["wp", "data"],
            "@wordpress/editor": ["wp", "editor"],
            "@wordpress/element": ["wp", "element"],
            "@wordpress/i18n": ["wp", "i18n"],
            "@wordpress/plugins": ["wp", "plugins"],
            "@wordpress/edit-post": ["wp", "editPost"],
            "@wordpress/core-data": ["wp", "coreData"],
            "@wordpress/keycodes": ["wp", "keycodes"],
            "@wordpress/is-shallow-equal": ["wp", "isShallowEqual"],
            // "@wordpress/icons": ["wp", "icons"],
        },
        devServer: {
            port: 3001,
            hot: true,
            publicPath: process.env.LOCAL_SITE_URL,
            proxy: {
                target: process.env.LOCAL_SITE_URL,
                secure: false,
                changeOrigin: true
            }
        },
    }
    return config;
}