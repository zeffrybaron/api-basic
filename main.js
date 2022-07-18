const data = [
    {
        id: 1,
        name: 'Saeful'
    },
    {
        id: 2,
        name: 'Tamir'
    },
    {
        id: 3,
        name: 'Chris'
    },
]

const param = 2

const existUser = data.find(value => value.id === param)

console.log(existUser)

const indexOfExistUser = data.findIndex(value => value.id === param)

console.log(indexOfExistUser)

const filteredData = data.filter(value => value.id === param)

console.log(filteredData)

let name

if (!name) {
    console.log("tidak ada name")
}