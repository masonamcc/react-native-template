import { registerRootComponent } from 'expo';
import './firebase';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriatelyn
registerRootComponent(App);


export const getAllTemplates = async () => {
    console.log('Getting all templates')
    let response = await fetch('http://192.168.1.119:9090/templates');
    let templates = await response.json();
    templates.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    console.log(templates)
    return Array.isArray(templates) ? templates : [];

    // if (!templates || templates.length === 0) {
    //     console.log("There are no thoughts to show")
    //     // noTemplatesToShowDiv.classList.remove('is-hidden')
    // } else {
    //
    //     templates.forEach(template => {
    //         console.log("Template Found: ", template)
    //         return template
    //     })
    //
    // }
}

