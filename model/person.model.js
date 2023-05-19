const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes, Model) => {

    class Person extends Model {}

    Person.init({
        // Model attributes are defined here
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
      }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'person', // We need to choose the model name
      });
      
      return Person;
}