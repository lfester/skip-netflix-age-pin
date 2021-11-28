import path from 'path';

const ROOT_PATH = path.resolve('./');

export default {
    node: {
        __filename: true,
    },
    entry: {
        plugin: [
            path.resolve('src/index'),
        ],
    },
    resolve: {
        extensions: ['.js'],
    },
    output: {
        path: path.resolve(ROOT_PATH, 'build'),
        filename: '[name].js',
    },
    module: {
        rules: [{
            test: /\.js?$/,
            use: ['babel-loader'],
            exclude: /node_modules/,
        }],
    },
}
