const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadContact, findContact, addContact, deleteContact, updateContacts } = require('./utils/contacts');

const app = express();
const port = 3000;


app.set('view engine', 'ejs'); // Gunakan ejs
app.use(expressLayouts); // Third-party Middleware
app.use(express.static('public')); // Built-in middleware
app.use(express.urlencoded({ extended: true })); // Built-in middleware

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
    const contacts = loadContact();

    res.render('contact', { 
        layout: 'layouts/main-layout',
        title: 'Contact',
        contacts,
    });
});

// Halaman form tambah data contact
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        title: 'Tambah Data Contact',
        layout: 'layouts/main-layout',
    });
});

// Proses data contact
app.post('/contact', (req, res) => {
    updateContact(req.body);
    res.redirect('/contact');
});

// Proses delete contact
app.get('/contact/delete/:nama', (req, res) => {
    const contact = findContact(req.params.nama);

    // Jika contact tidak ada 
    if (!contact) {
        res.status(404);
        res.send('<h1>404 not found</h1>');
    } else {
        deleteContact(req.params.nama);
        res.redirect('/contact');
    }
});

// Halaman form ubah data contact
app.get('/contact/edit/:nama', (req, res) => {
    const contact = findContact(req.params.nama);

    res.render('edit-contact', {
        title: 'Ubah Data Contact',
        layout: 'layouts/main-layout',
        contact,
    });
});

// Proses ubah contact
app.post('/contact/update', (req, res) => {
    updateContacts(req.body);
    res.redirect('/contact');
});

// Halaman detail contact
app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama);

    res.render('detail', { 
        layout: 'layouts/main-layout',
        title: 'Detail Contact',
        contact,
    });
});

app.use((req, res) => {
    res.status(404);
    res.send('<h1><center>404 Not Found</center></h1>');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})