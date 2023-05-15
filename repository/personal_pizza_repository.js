const { connect } = require('../config/db.config');
const logger = require('../logger/api.logger');


class PersonalPizzaRepository {

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
            const pp = await this.db.tasks.findAll();
            console.log('personal pizza:::', pp);
            return pp;
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

    async updateTask(personalPizza) {
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

    async deleteTask(ppId) {
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

module.exports = new PersonalPizzaRepository();