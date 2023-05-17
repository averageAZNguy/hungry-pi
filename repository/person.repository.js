const { connect } = require('../config/db.config');
const logger = require('../logger/api.logger');


class PersonRepository {

    db = {};

    constructor() {
        this.db = connect();
        // For Development
        this.db.sequelize.sync({ force: true }).then(() => {
            console.log("Drop and re-sync db.");
        });
    }

    async getPeople() {
        
        try {
            const pp = await this.db.person.findAll();
            console.log('people:::', pp);
            return pp;
        } catch (err) {
            console.log(err);
            return [];
        }
    }
    
    async getPeople() {
        
        try {
            const people = await this.db.person.findAll({attributes: ['person']});
            console.log('people:::', people);
            return people;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async createPersonalPizza(person) {
        let data = {};
        try {
            person.date = new Date().toISOString();
            data = await this.db.person.create(person);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updatePersonalPizza(person) {
        let data = {};
        try {
            person.date = new Date().toISOString();
            data = await this.db.person.update({...person}, {
                where: {
                    id: person.id
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
            data = await this.db.person.destroy({
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

module.exports = new PersonRepository();