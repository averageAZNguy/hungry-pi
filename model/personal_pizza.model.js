module.exports = (sequelize, DataTypes, Model) => {

    class PersonalPizza extends Model {}

    PersonalPizza.init({
        // Model attributes are defined here
        person: {
          type: DataTypes.STRING,
          allowNull: false
        },
        meat_type: {
          type: DataTypes.STRING
          // allowNull defaults to true
        },
        date: {
          type: DataTypes.DATE
          // allowNull defaults to true
        },
      }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'personalPizza' // We need to choose the model name
      });
      
      return PersonalPizza;
}