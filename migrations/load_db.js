require('dotenv').config()
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const { Client } = require('pg')
const { Sequelize, Model, DataTypes } = require("sequelize");


const { connect } = require('../config/db.config');

const db = connect()
// const person = new db.people({name: 'Test 33'})

db.sequelize.sync({force: true}).then(()=> {
  console.log('complete')
  initData()
})

const initData = () => {
  let personNames = []
  let csvData = [];
  let personIdMap = new Map()
  console.log('initialize data...')
  fs.createReadStream(path.resolve(__dirname, '../data.csv'))
  .pipe(csv.parse({ headers: true }))
  .on('error', error => console.error(error))
  .on('data', row => {
    personNames.push(row['person'])
    csvData.push(row)
  })
  .on('end', rowCount => {
    console.log(`Parsed ${rowCount} rows`)
    const setName = new Set(personNames)
    // console.log(setName)
    let namePromises = []
    for (const [ name ] of setName.entries()) {
      namePromises.push(
        db.people.create({name: name })
        .then((person) => {
          console.log('inside then person promise')
          personIdMap.set(person.dataValues.name, person.dataValues.id)
        }).finally(()=> {
          console.log('insde finally')
        })
      )
 
    }
    Promise.allSettled(namePromises)
    .then(ps => {
      console.log(personIdMap)
      // create personal pizza
      // console.log(csvData)
      let ppp = csvData.map( async (data) => {
        let personId = personIdMap.get(data['person'])
        // console.log(data, personId)
        return await db.personal_pizzas.create({
            person_id: personId,
            meat_type: data['meat-type'],
            date: data['date'],
          })
          // console.log(personalPizza)
        })
        // console.log('ppp',ppp)

        Promise.allSettled(ppp).then((all)=>{
          console.log('all promise done', all)
        })
      })
  });

}
// initData()
// module.exports = {
//   initData
// }