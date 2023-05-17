module.exports = (sequelize, DataTypes, Model) => {

    class Person extends Model {}

    Person.init({
        // Model attributes are defined here
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
      }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'person' // We need to choose the model name
      });
      
      return Person;
}