const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const app = express();
const port = 3000;

// Gunakan ejs
app.set('view engine', 'ejs');

// Third-party Middleware
app.use(expressLayouts);
app.use(morgan('dev'));
// npm i morhan@1.10.0

// Application level middlewere
app.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});

// Built-in middleware
app.use(express.static('public'));

app.get('/', (req, res) => {
    const mahasiswa = [
        {
            nama: 'hasan',
            email: 'hasan@gmail.com',
        },
        {
            nama: 'rizki',
            email: 'rizki@gmail.com',
        },
        {
            nama: 'dimas',
            email: 'dimas@gmail.com',
        },
    ]
    res.render('index', {
        layout: 'layouts/main-layout',
        nama: 'Hasan',
        title: 'Home',
        mahasiswa,
    });
});

app.get('/about', (req, res) => {
    res.render('about', { 
        layout: 'layouts/main-layout',
        title: 'About',
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', { 
        layout: 'layouts/main-layout',
        title: 'Contact',
    });
});

app.get('/product/:id', (req, res) => {
    res.send(`Product ID : ${req.params.id} <br> Category : ${req.query.category}`);
});

app.use((req, res) => {
    res.status(404);
    res.send('<h1><center>404 Not Found</center></h1>');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})

// const http = require('http');
// const fs = require('fs');

// const port = 3000;

// const renderHTML = (path, res) => {
//     fs.readFile(path, (err, data) => {
//         if (err) {
//             res.writeHead(404);
//             res.write('Error: file not found');
//         } else {
//             res.write(data);
//         }
//         res.end();
//     });
// };

// http
//     .createServer((req, res) => {
//         res.writeHead(200, {
//             'Content-Type': 'text/html',
//         });

//         const url = req.url;

//         switch (url) {
//             case '/about':
//                 renderHTML('./about.html', res);
//                 break;
//             case '/contact':
//                 renderHTML('./contact.html', res);
//                 break;
//             default:
//                 renderHTML('./index.html', res);
//                 break;
//         }

//         // if(url === '/about'){
//         //     renderHTML('./about.html', res);
//         // } else if (url === '/contact') {
//         //     renderHTML('./contact.html', res);
//         // } else {
//         //     // res.write('Hello World!');
//         //     renderHTML('./index.html', res)
//         // }
//     })
//     .listen(port, () => {
//         console.log(`Server is listenung on port ${port}..`);
//     });