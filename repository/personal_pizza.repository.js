const { connect } = require('../config/db.config');
const logger = require('../logger/api.logger');


class Personal_PizzaRepository {

    db = {};

    constructor() {
        this.db = connect();
        // For Development
        this.db.sequelize.sync({ force: true }).then(() => {
            console.log("Drop and re-sync db.");
        });
    }

    async getPersonalPizzas() {
        
        try {
            const pp = await this.db.personal_pizza.findAll();
            console.log('personal pizza:::', pp);
            return pp;
        } catch (err) {
            console.log(err);
            return [];
        }
    }
    
    async getPeople() {
        
        try {
            const people = await this.db.personal_pizza.findAll({attributes: ['person']});
            console.log('people:::', people);
            return people;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async createPersonalPizza(personalPizza) {
        let data = {};
        try {
            personalPizza.date = new Date().toISOString();
            data = await this.db.personal_pizza.create(personalPizza);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updatePersonalPizza(personalPizza) {
        let data = {};
        try {
            personalPizza.date = new Date().toISOString();
            data = await this.db.personal_pizza.update({...personalPizza}, {
                where: {
                    id: personalPizza.id
                }
            });
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async deletePersonalPizza(ppId) {
        let data = {};
        try {
            data = await this.db.personal_pizza.destroy({
                where: {
                    id: ppId
                }
            });
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
        // return {status: `${data.deletedCount > 0 ? true : false}`};
    }

}

module.exports = new Personal_PizzaRepository();