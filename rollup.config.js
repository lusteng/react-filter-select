import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss'; 
import easyImport from 'postcss-easy-import'
import autoprefixer from 'autoprefixer' 
import imageBase64 from 'rollup-plugin-image-base64'
import {uglify} from 'rollup-plugin-uglify'


export default {
    entry: './src/index.js',
    dest: './lib/index.js',
    format: 'cjs',  
    plugins: [ 
        imageBase64(), 
        postcss({
          extensions: [ '.scss'],
          use: ['sass'],
          loaders: ['.scss'],
          plugins: [autoprefixer, easyImport]
        }),
        babel({
          exclude: 'node_modules'   
        }),
        uglify()
    ], 
  } 