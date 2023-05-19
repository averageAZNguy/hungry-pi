const { Sequelize, Model, DataTypes } = require("sequelize");
const logger = require('../logger/api.logger');

const connect = () => {

    // const hostName = process.env.HOST;
    const userName = process.env.USER;
    const password = process.env.PASSWORD;
    const database = process.env.DB;
    const dialect = process.env.DIALECT;

    const sequelize = new Sequelize(database, userName, password, {
        host: 'localhost',
        dialect: dialect,
        operatorsAliases: false,
        pool: {
            max: 10,
            min: 0,
            acquire: 20000,
            idle: 5000
        },
        logging: true
      });

    const db = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;
    const Person = require("../model/person.model")(sequelize, DataTypes, Model);
    const PersonalPizza = require("../model/personal_pizza.model")(sequelize, DataTypes, Model);
    Person.hasMany(PersonalPizza, { foreignKey: 'person_id'})
    PersonalPizza.belongsTo(Person, { foreignKey: 'person_id'})
    console.log(PersonalPizza)
    db.personal_pizzas = PersonalPizza;
    db.people = Person;
    // db.sequelize.sync({force: true})
// TODO: find way to init personal pizza and person from csv files from here
    return db;

}

module.exports = {
    connect
}