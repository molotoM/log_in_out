const express = require('express');

const router = express();
const cors = require('cors');
const bodyParser = require('body-parser')

const Database = require('./database');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());
var postgres = new Database()

router.get('/allemp', (req, res) => res.send('Hello World!'))

//GET CUSTOMER BY EMAIL===============================================================================
router.get('/getByEmail/:email', (req, res, next) => {
    
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control_Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");

    const functionName = `fn_get_by_email('${req.params.email}')`;

        postgres.callFnWithResultsById(functionName)  
            .then((data) => {
                res.status(200).json({
                    message: 'All for the requested email',
                    customer: data,
                    status: true
                });
            })
            .catch((error => {
            debugger;
                console.log(error);
                res.status(500).json({
                    message: 'bad Request',
                    error: error,
                    status: false
                });
            }))

});
//Get ALL EMPLOYEES===================================================================================
router.get('/allEmployees', (req, res,next) => {

    const functionName = `fn_get_all_employees`;
    debugger;
    return new Promise((resolve, reject) => {
        postgres.functionWithResults(functionName)
            .then((data) => {
                res.status(200).json({
                    message: 'Here is all appointments',
                    appointments: data,
                    status: true
                });
                resolve(data);

            })
            .catch((error => {
                debugger;
                res.status(500).json({
                    message: 'bad Request',
                    error: error,
                    status: false
                });
                reject(error);
            }))

    })
});
//GET CUSTOMER BY DATE===============================================================================
router.get('/getByDate/:date', (req, res, next) => {
    
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control_Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");

    const functionName = `fn_get_by_date('${req.params.date}')`;

        postgres.callFnWithResultsById(functionName)  
            .then((data) => {
                res.status(200).json({
                    message: 'All for the requested date',
                    customer: data,
                    status: true
                });
            })
            .catch((error => {
            debugger;
                console.log(error);
                res.status(500).json({
                    message: 'bad Request',
                    error: error,
                    status: false
                });
            }))

});
//GET CUSTOMER BY EMPLOYEE NUMBER===============================================================================
router.get('/getByEmpNo/:empno', (req, res, next) => {
    
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control_Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");

    const functionName = `fn_get_by_emp_no(${req.params.empno})`;

        postgres.callFnWithResultsById(functionName)  
            .then((data) => {
                res.status(200).json({
                    message: 'Employee s clock',
                    customer: data,
                    status: true
                });
            })
            .catch((error => {
            debugger;
                console.log(error);
                res.status(500).json({
                    message: 'bad Request',
                    error: error,
                    status: false
                });
            }))

});
//ADD A EMPLOYEE==============================================================================================
router.post('/addEmployee/', (req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control_Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");

    debugger;
    return new Promise((resolve, reject) => {
        let placeholder = '';
        let count = 1;
        const params = Object.keys(req.body).map(key => [(key), req.body[key]]);

        const paramsValues = Object.keys(req.body).map(key => req.body[key]);

        if (Array.isArray(params)) {
            params.forEach(() => {
                placeholder += `$${count},`;
                count += 1;
            });
        } 

        placeholder = placeholder.replace(/,\s*$/, ''); 

        const functionName = `fn_add_new_employee`;

        const sql = `${functionName}(${placeholder})`;

        postgres.callFnWithResultsAdd(sql, paramsValues)
        .then((data) => {
            debugger;
            res.status(201).json({
                message: 'Employee added',
                customer: data
            });
            resolve(data);

        })
        .catch((error) => {
            debugger;
            res.status(500).json({
                message: 'bad Request',
                error: error,
                status: false
            });
            reject(error);
        })
    })
});
//LOG OUT=================================================================================
router.patch('/logout', (req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control_Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");

    return new Promise((resolve, reject) => {
        let placeholder = '';
        let count = 1;
        const params = Object.keys(req.body).map(key => [(key), req.body[key]]);

        const paramsValues = Object.keys(req.body).map(key => req.body[key]);

        if (Array.isArray(params)) {
            params.forEach(() => {
                placeholder += `$${count},`;
                count += 1;
            });
        } 


        placeholder = placeholder.replace(/,\s*$/, ''); 

        const functionName = `fn_add_new_clock_out`;

        const sql = `${functionName}(${placeholder})`;

        postgres.callFnWithResultsAdd(sql, paramsValues)
        .then((data) => {
            debugger;
            res.status(201).json({
                message: 'Successfully Clocked Out',
                addedUser: data
            });
            resolve(data);

        })
        .catch((error) => {
            debugger;
            res.status(500).json({
                message: 'bad Request',
                error: error,
                status: false
            });
            reject(error);
        })
    })
});

//POST A NEW CLOCK==================================================================================
router.post('/addNewClock/:empno', (req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control_Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");

    const functionName = `fn_add_new_clock_in(${req.params.empno})`;

        postgres.callFnWithResultsById(functionName)  
            .then((data) => {
                res.status(200).json({
                    message: 'Employee s clock',
                    employee: data,
                    status: true
                });
            })
            .catch((error => {
            debugger;
                console.log(error);
                res.status(500).json({
                    message: 'bad Request',
                    error: error,
                    status: false
                });
            }))
});
module.exports = router;