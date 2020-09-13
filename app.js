const AdminBro = require('admin-bro')
const AdminBroExpressjs = require('admin-bro-expressjs');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// We have to tell AdminBro that we will manage mongoose resources with it
AdminBro.registerAdapter(require('admin-bro-mongoose'))

// express server definition
const app = express()
app.use(bodyParser.json())

const User = mongoose.model('User',{
    email: { type: String, required: true },
    encryptedPassword: { type: String, required: true },
    role: { type: String, enum: ['admin', 'restricted'], required: true },
})

// Pass all configuration settings to AdminBro
const adminBro = new AdminBro({
    resources: [User],
    rootPath: '/admin',
})

// Build and use a router which will handle all AdminBro routes
const router = AdminBroExpressjs.buildRouter(adminBro)
app.use(adminBro.options.rootPath, router)

// Running the server
const run = async () => {
    await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true })
    await app.listen(8080, () => console.log(`Example app listening on port 8080!`))
}

run();
