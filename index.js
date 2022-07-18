require('dotenv').config()

const fs = require('fs')
const express = require('express')

const app = express()
const port = process.env.PORT || 8000
const USER_DATA_PATH = "./data/users.json"

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/hello', (req, res, next) => {
    return res.status(200).json({
        message: 'Hello World from hot reload'
    })
})

// note: pakai file karna belum ke materi db, setelah ke materi db kita akan pakai query database

// get data users
app.get('/users', (req, res, next) => {
    // buat variabel untuk menampung data read file
    const usersAsString = fs.readFileSync(USER_DATA_PATH).toString()

    // parse data string jadi json
    const users = JSON.parse(usersAsString)

    // dicek datanya ada atau engga
    const isUserExist = users && users.length > 0

    if (!isUserExist) {
        // kalo ngga ada data, maka return status code 404
        return res.status(404).json({
            message: 'user tidak ditemukan'
        })
    }

    // kalo ada data, return datanya
    return res.status(200).json({
        message: 'user ditemukan',
        data: users
    })
})

// create new user
app.post('/users', (req, res, next) => {
    console.log(req.body)
    // read file users.json
    let usersAsString = fs.readFileSync(USER_DATA_PATH).toString()

    // parse data string jadi json
    const users = JSON.parse(usersAsString)

    const newUser = {
        id: Date.now(),
        ...req.body
    }

    // tambah data baru ke array of user
    users.push(newUser)

    // konversi data array/object ke string
    usersAsString = JSON.stringify(users)

    // ditulis ulang data baru ke file users.json
    fs.writeFileSync(USER_DATA_PATH, usersAsString)

    // dimunculin respon bahwa data berhasil dibuat
    return res.status(201).json({
        message: 'success create user',
        data: users
    })
})

// update existing user
app.patch('/users/:id', (req, res, next) => {
    console.log(req.params.id)
    console.log(req.body)
    
    let usersAsString = fs.readFileSync(USER_DATA_PATH).toString()

    // parse data string jadi json
    const users = JSON.parse(usersAsString)

    // nyari data dengan id tertentu ada atau engga
    const indexOfDataExist = users.findIndex((user) => Number(user.id) === Number(req.params.id))

    // kalo ngga ada respon data not found
    if (indexOfDataExist < 0) {
        return res.status(404).json({
            message: 'user with this id not found'
        })
    }

    // kalo ada, kita update data dari request
    // if (req.body.full_name) {
    //     users[indexOfDataExist].full_name = req.body.full_name
    // }

    // if (req.body.address) {
    //     users[indexOfDataExist].address = req.body.address
    // }

    // if (req.body.age) {
    //     users[indexOfDataExist].age = req.body.age
    // }

    users[indexOfDataExist] = {
        ...users[indexOfDataExist],
        ...req.body
    }

    // baju = {warna: 'ungu', ukuran: m}
    // pengganti = {warna: 'merah', bahan: 'katun'}

    // baju = {...baju} // => {warna: 'ungu', ukuran: m}

    // newBaju = {...baju, ...pengganti} // => {warna: 'merah', ukuran: m}
    // newBaju = {warna: 'ungu', ukuran: m, warna: 'merah',  bahan: 'katun'} // => { ukuran: m, warna: 'merah',  bahan: 'katun'}


    // users[indexOfDataExist].full_name = req.body.full_name
    // users[indexOfDataExist].address = req.body.address
    // users[indexOfDataExist].age = req.body.age

    // konversi data array/object ke string
    usersAsString = JSON.stringify(users)

    // save ulang data ke users.json
    fs.writeFileSync(USER_DATA_PATH, usersAsString)


    return res.status(200).json({
        message: 'user berhasil diupdate',
        data: users
    })
})

// delete user
app.delete('/users/:id', (req, res, next) => {
    let usersAsString = fs.readFileSync(USER_DATA_PATH).toString()

    // parse data string jadi json
    const users = JSON.parse(usersAsString)

    // cari datanya by id
    const indexOfDataExist = users.findIndex((user) => Number(user.id) === Number(req.params.id))

    // datanya ga ketemu => respon not found
    if (indexOfDataExist < 0) {
        return res.status(404).json({
            message: 'user with this id not found'
        })
    }

    // kalo datanya ketemu baru kita hapus data tersebut
    users.splice(indexOfDataExist, 1)

    // konversi data array/object ke string
    usersAsString = JSON.stringify(users)
    
    // simpan data ke users.json
    fs.writeFileSync(USER_DATA_PATH, usersAsString)

    // dimunculin respon bahwa data berhasil dihapus
    return res.status(200).json({
        message: 'success remove user'
    })
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})