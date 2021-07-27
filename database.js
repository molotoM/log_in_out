const {
    Pool,
    types
} = require('pg');

var pg = require('pg');
pg.defaults.ssl = true;
const connection_string = 'postgres://qcbwaglzhyhkaw:c2a03596c88f7f92bf8edf0e2f9fc8f1bfa38933faa9028e57f34a2db58b524e@ec2-34-228-100-83.compute-1.amazonaws.com:5432/de1pafg5ht6hsv';

module.exports = class Database {
    constructor() {
        try {
            this.pool = new Pool({
                connectionString: connection_string,
                ssl:true
            });

            types.setTypeParser(1700, value => parseFloat(value));

            types.setTypeParser(20, value => parseInt(value));
        } catch (error) {
            throw error;
        }

        this.pool.on('error', (err, client) => {
            console.error('Unexpected error on idle client', err);
        });
    }

    functionWithResults(functionname) {
        const removeQuotes = `SELECT * FROM ${functionname}()`

        removeQuotes.replace(/'/g, "''");

        return new Promise((resolve, reject) => {
            this.pool.connect()
                .then(client => client.query(removeQuotes)
                    .then((res) => {
                        const rb = {
                            status: true,
                            message: 'Success',
                            data: res.rows
                        }

                        resolve(rb);
                    })
                    .catch((err) => {
                        const rb = {
                            status: false,
                            message: `Failed To Retrieve Data ${err.stack}`,
                            data: err
                        }
                        reject(rb);
                    }));
        });
    }


    callFnWithResultsById(functionname) {

        try {
            const removeQuotes = `SELECT * FROM ${functionname}`

            removeQuotes.replace(/'/g, "''");
    
            return new Promise((resolve, reject) => {
                this.pool.connect()
                    .then(client => client.query(removeQuotes)
                        .then((res) => {
                            const rb = {
                                status: true,
                                message: 'Success',
                                data: res.rows
                            }
    
                            resolve(rb);
                        })
                        .catch((err) => {
                            const rb = {
                                status: false,
                                message: `Failed To Retrieve Data ${err.stack}`,
                                data: err
                            }
                            reject(rb);
                        }));
            });
        } catch (err) {
            const rb = {
                status: false,
                message: `Failed To Retrieve Data ${err.stack}`,
                data: err
            }
            reject(rb);
        }
        
       
    }

    
    callFnWithResultsAdd(functionname, adduser) {
        debugger;
        const removeQuotes = `SELECT * FROM ${functionname}`

        removeQuotes.replace(/'/g, "''");

        return new Promise((resolve, reject) => {
            this.pool.connect()
                .then(client => client.query(removeQuotes, adduser)
                    .then((res) => {
                        const rb = {
                            status: true,
                            message: 'Success',
                            data: res.rows
                        }

                        resolve(rb);
                    })
                    .catch((err) => {
                        const rb = {
                            status: false,
                            message: `Failed To addData ${err.stack}`,
                            data: err
                        }
                        reject(rb);
                    }));
        });
    }


};