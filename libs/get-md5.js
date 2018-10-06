const crypto = require('crypto');
const fs = require('fs');

module.exports = {
     getMD5: function(path){
        return new Promise((resolve, reject)=>{
            const stream = fs.createReadStream(path);
            const fsHash = crypto.createHash('md5');
            
            stream.on('data', function(d) {
                fsHash.update(d);
            });
            
            stream.on('end', function() {
                var md5 = fsHash.digest('hex');
                console.log(`文件[${path}]的MD5是: ${md5}`);
                resolve(md5);
            });
        })
    }
}