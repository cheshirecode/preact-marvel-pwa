import globalStyles from './style/global';
import App from './components/app';
import Parse from 'Parse';

globalStyles();
//initialise Parse API - ideally the ID and key should be injected at runtime through dotenv or process.env variables. For demo, we don't mind
Parse.initialize(
  'Nv7vQUsvXyzSBPAXgLavKfjgK0UBviZDCSoCI2Kc', //APP Id
  'Yob7dc9ECs4J5ds0eZK09aMl6FPe1zc6GEoVUqQe' //JS Key
);
Parse.serverURL = 'https://parseapi.back4app.com/';
export default App;
