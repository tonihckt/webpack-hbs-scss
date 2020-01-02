// Add Scripts ---------------
// ---------------------------
import './assets/scripts/main.js';

// Add Styles -----------------
// ----------------------------
import './assets/styles/main.scss';

// if(process.env.NODE_ENV !== 'production'){
//   console.log('development mode!')
// }

// Add Libs -----------------
// --------------------------

//Bootstrap
import 'bootstrap';
// Alternatively, you may import plugins individually as needed:
// import 'bootstrap/js/dist/util';
// import 'bootstrap/js/dist/dropdown';

//Fontawesome
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

// Router
// import Navigo from 'navigo';

// $(window).on('load', () => {
//     $('#app').html('<h1>We are ready!</h1>')
// })


// import handlebars from "handlebars-inline-precompile";
// import * as Handlebars from 'handlebars'
// import * as Handlebars from 'handlebars/dist/handlebars'

// Routers -----------------
// --------------------------
// const router = new Navigo()
// const HomePage = () => System.import('./home').then(module => module.default())


// router
//     .on('/', HomePage)
//     // .on('/about', AboutPage)
//     .resolve()

// $(window).on('load', () => {

//     $(document).on('click', '[data-path]', (e) => {
//         e.preventDefault()

//         const href = $(e.target).attr('href')

//         if (process.env.DEBUG) {
//             console.log(`Navigating to ${href}`)
//         }

//         router.navigate(href)
//     })
// })

// import compileTpl from './views/templates/alert/alert.hbs',
// // import './alert.css';

// var tpl = compileTpl({
//     headText:'head',
//     bodyText:'body',
//     confirmButName:'确认'
// });