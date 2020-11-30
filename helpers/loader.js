const admin = require('firebase-admin');
const csv = require('csvtojson');
const serviceAccount = require('./wyr-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://wyr-would-you-rather.firebaseio.com',
});

(async () => {
  const db = admin.database();
  const ref = db.ref('/questions');
  const data = await csv().fromFile('./data.csv');
  const questions = data.reduce((acc, question) => {
    acc[question.id] = question;
    return acc;
  }, {});

  ref.set(questions);
})();
