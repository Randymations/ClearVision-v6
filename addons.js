const fs = require('node:fs');
const sass = require('node-sass');
const util = require('util');
const path = require('path');

const addons = './src/addons';
const outputPath = './public'
const data = `\
$version: 'x';
@import 'lib/selectors/selectorPlaceholders';
@import 'src/functions';
@import 'src/variables';
@import 'src/mixins';
@import 'src/addons/%s';`;

fs.mkdirSync(outputPath);
fs.readdirSync(addons).forEach(file => {
    const name = path.parse(file).name;
    sass.render({
        data: util.format(data, name),
        outputStyle : 'expanded',
        sourceMap: false,
    }, function(err, result) {
        if(err) console.log(err);
        if(result) {
            const output = result.css.toString().replace(/\*\/\n/g, '*/\n\n');
            fs.writeFile(`${outputPath}/${name}.css`, output, err => {
                if(err) console.log(err);
                else console.log(`Successfully wrote ${name}.css`);
            });
        }
    });
});
