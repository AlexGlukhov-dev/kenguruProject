import path from 'path';

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js')
    },

    output: {
        main: path.resolve(__dirname, './build/test'),
        filename: '[name].react_main.js',
    }
}