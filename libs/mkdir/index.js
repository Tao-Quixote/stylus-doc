/**
 * Created by taoxin on 2017/2/25.
 */

let fs = require('fs')

function path2arr(path) {
    if('string' !== typeof path) {
        console.error('the path must be a string.')
        return 0
    } else {
        return path.split('/')
    }
}

exports = module.exports = (path) => {
    if(fs.existsSync(path)) {
        console.log('The path: ' + path + ' is already there.')
        return 0;
    } else {
        var paths = path2arr(path)
        var path = ''
        paths.forEach(item => {
            if('.' === item) {
                path = './'
            } else {
                path += item + '/'
                if(!fs.existsSync(path)) {
                    fs.mkdirSync(path)
                    console.log('The path:' + path + 'is created.')
                } else {
                    console.log('The path:' + path + 'is already there.')
                }
            }
        });
    }
}
