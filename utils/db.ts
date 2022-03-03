const admin = require("firebase-admin");

const serviceAccount = require("./../firestoreKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
    
const DB = admin.firestore();

module.exports = DB;

// EXAMPLE GET ALL DATA;
// db.collection('test').get().then((result:any) => {
//     result.forEach((test:any) => {
//         console.log(test.data());
//     });
// });