import localforage from 'localforage'
import WakeUpDB from './wake_up_db.js'

localforage.ready().then(function () {
  console.log(`LocalStorage Ready: ${localforage.driver()}`);
}).catch(function (e: any) {
  console.log(`No available storage method found.`, e);
});


export { WakeUpDB }
