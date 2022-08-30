#! /usr/bin/env node
const jsf = require('./jsfuck/');
const fs = require('fs');
const argv = require('yargs/yargs')(process.argv.slice(2))
    .command('jsf')
    .usage('Usage: jsf [--code [code] | --in [filename]] --out [name] {.jsf}\n specify --out to compile into a JavaScript executable file, or ommit to run code directly')
    .demandOption(['code'])
    .option('out', {
        demandOption: false,
        requiresArg: true,
        type: 'string'
    })
    .argv;
const code = argv.code;
console.log(`Compiling code: ${argv.code.slice(0,32)} ... `);

const prg = jsf.compile(code);
if(argv.out){
    const filename = (argv.out.includes('.')) ? argv.out : `${argv.out}.jsf`;
    console.log(`Compiling into: ${filename}`);
    fs.writeFileSync(filename, prg);

} else {
    console.log(`Compiling into terminal, and executing`);
    console.log(`Your program: \n${prg}`);
    console.log("Executing...\n");
    jsf.run(prg);
}