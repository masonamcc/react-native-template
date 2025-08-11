import {registerRootComponent} from 'expo';
// import './firebase';
// import 'expo-router/entry';
import App from './App';


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriatelyn
registerRootComponent(App);
export const ip = '192.168.1.119'

function currentIP() {
    fetch('https://api.iplocation.net/?cmd=get-ip')

        .then(response => response.json())
        .then(data => {
            console.log("Public IP Address:", data);
        });
}

currentIP();
