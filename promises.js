var fs = require('fs');

var readFile = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./package.json', (err, file) => {
            return err ? reject(err) : resolve(file.toString());
        });
    });
};

var readAllFiles = () => {
    var promises = [readFile(), readFile(), readFile()];
    return Promise.all(promises);
};

readFile()
    .then(file => {
        console.log(file);
    })
    .catch(err => {
        console.log(err);
    });

readAllFiles()
    .then(files => {
        console.log(files.length);
    });





// var action = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             reject(new Error('error oops'));
//         }, 3000);
//     });
// };
//
// action()
//     .then(word => {
//         console.log(word);
//     })
//     .catch(err => {
//         console.log(err);
//     });
