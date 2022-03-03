module.exports = async (req:Object, res:any) => {
    const db = require('./../utils/db')
        
    db.collection('test').get().then((result:any) => {
            result.forEach((test:any) => {
                res.send(test.data());
        }); 
    });
}


