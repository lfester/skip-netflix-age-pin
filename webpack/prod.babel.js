import merge from 'webpack-merge';

import CopyPlugin from 'copy-webpack-plugin';

import common from "./common";

export default merge(
    common, {
        mode: 'production',
        plugins: [
            new CopyPlugin([{
                from: 'src/chrome/',
                to: './',
                context: './',
            }]),
        ],
    }
);
