const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes, Model) => {

    class PersonalPizza extends Model {}

    PersonalPizza.init({
        // Model attributes are defined here
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        person_id: {
          type: Sequelize.UUID,
          onDelete: 'cascade',
          references: {
            model: 'people',
            key: 'id'
          }
        },
        meat_type: {
          type: DataTypes.STRING
          // allowNull: true
        },
        date: {
          type: DataTypes.DATE
          // allowNull defaults to true
        },
      }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'personal_pizza', // We need to choose the model name
      });
      
      return PersonalPizza;
}