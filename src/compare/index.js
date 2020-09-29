var looksSame = require('looks-same');
looksSame.createDiff({
    reference: './example.png',
    current: './example1.png',
    diff: './diff.png',
    highlightColor: '#ff00ff', // color to highlight the differences
    strict: false, // strict comparsion
    tolerance: 2.5,
    antialiasingTolerance: 0,
    ignoreAntialiasing: true, // ignore antialising by default
    ignoreCaret: true // ignore caret by default
}, function (error) {
    console.log('error', error)
});