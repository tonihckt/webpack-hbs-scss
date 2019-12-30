console.log("scrip cargado!");

// // Libs ---------------
// // -----------------------
// // JQuery
import $ from "jquery";
// // Uuid
import { v4 } from "uuid";

// // Imports Others ---------------
// // ------------------------------
import {showAlert} from './test-helpers/messages';
import * as Dog from './test-helpers/dog.js';
import * as Addition from './test-helpers/addition.js';

// // https://webpack.github.io/docs/hot-module-replacement.html#api
// if (module.hot) {
//     module.hot.accept();
// }

//JS Vanilla
document.getElementById('btn-alert')
    .addEventListener('click',showAlert)


// // jQuery
$('#btn-jquery').click(()=> alert(v4()));

 
const dog = new Dog.default();
dog.bark(); // 'bark!'

console.log(Addition.sum(1,2));
console.log(Addition.substract(3,1));
console.log(Addition.divide(6,3));