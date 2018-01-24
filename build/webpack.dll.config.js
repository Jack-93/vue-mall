const path = require("path")
const webpack = require("webpack")

module.exports = {
    // 你想要打包的模块的数组
    entry: {
        element:['element-ui'],
        axios: ['axios'],
        echarts: [
            'echarts/lib/echarts',
            'echarts/lib/chart/line',
            'echarts/lib/chart/bar',
            'echarts/lib/chart/pie',
            'echarts/lib/component/tooltip',
            'echarts/lib/component/title',
            'echarts/lib/component/dataZoom',
        ],
    },
    output: {
        path: path.join(__dirname, '../static/js'), // 打包后文件输出的位置
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '.', '[name]-manifest.json'),
            name: '[name]_library',
            context: __dirname
        }),
        // 压缩打包的文件
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
}
