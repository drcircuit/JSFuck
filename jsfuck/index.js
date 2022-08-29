const zero = '+[]';
const one = '+!![]';
const number = n => {
    if (n === 0) return zero;
    return Array.from({ length: n }, () => one).join(' + ');
}
const map = {};

const stringToJSF = s => s.split('').map(c => {
    if (!(c in map)) {
        const char = c.charCodeAt(0);
        return `([]+[])[${stringToJSF('constructor')}][${stringToJSF('fromCharCode')}](${number(char)})`;
    }
    return map[c];
}).join('+');
map.a = `(+{}+[])[${number(1)}]`;
map.o = `({}+[])[${number(1)}]`;
map.e = `({}+[])[${number(4)}]`;
map.c = `({}+[])[${number(5)}]`;
map.t = `({}+[])[${number(6)}]`;
map[' '] = `({}+[])[${number(7)}]`;
map.f = `(![]+[])[${number(0)}]`;
map.s = `(![]+[])[${number(3)}]`;
map.r = `(!![]+[])[${number(1)}]`;
map.u = `(!![]+[])[${number(2)}]`;
map.i = `((+!![]/+[])+[])[${number(3)}]`;
map.n = `((+!![]/+[])+[])[${number(4)}]`;
map.S = `([]+([]+[])[${stringToJSF('constructor')}])[${number(9)}]`;
map.g = `([]+([]+[])[${stringToJSF('constructor')}])[${number(14)}]`;
map.p = `([]+(/-/)[${stringToJSF('constructor')}])[${number(14)}]`;
map['\\'] = `(/\\\\/+[])[${number(1)}]`;
map.d = `(${number(13)})[${stringToJSF('toString')}](${number(14)})`;
map.h = `(${number(17)})[${stringToJSF('toString')}](${number(18)})`;
map.m = `(${number(22)})[${stringToJSF('toString')}](${number(23)})`;
map.C = `(()=>{})[${stringToJSF('constructor')}](${stringToJSF('return escape')})()(${map['\\']})[${number(2)}]`;
const compile = (c, string) => {
    if (Number.isInteger(c)) return number(c);
    if (string) return stringToJSF(c);
    return `(()=>{})[${stringToJSF('constructor')}](${stringToJSF(c)})()`;
};
// console.oldLog = console.log;
// console.log = function(value){
//     console.oldLog(value);
//     return value;
// }

const run = c => {
    if ((/[^({[/>\+!\-=\\\]}\s)]/).test(c)) throw SyntaxError(`Only JSFuck Syntax Allowed...\n JSFuck consists only of these characters: ({[/>+ !-=\\]})\n${c}`);
    const out = eval(c);
    return out;
}
module.exports = {
    compile: compile,
    run: run
};
