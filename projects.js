require('dotenv').config(); // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

const express = require('express');
const bodyParser = require('body-parser');
const  mysql = require('mysql');
const sha1 = require('sha1');

const connOptions = {
    connectionLimit: 10,
    host: 'maguystichy.com',
    user: 'bbi_api_user',
    password: 'Letmein@2022',
    database: 'badihbarakat_fms'
}

const connectionPool = mysql.createPool(connOptions);

// import { IProject, IProjectDoc } from '../types/projects.types';
// import { Result } from '../common/common.types';

const router = express.Router();

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());


router.get('/healthCheck',async (req, res) => {
    console.log(connOptions);
    console.log('############# Attempting to connect and query #############');
    connectionPool.query('SELECT * FROM dependencies WHERE dbParamName = \'HostName\'', 
        function (error, results) {
            console.log('############# Inside query callback #############');
            try {
                if (error) console.log("ERROR: ", error)
                else {
                    let docs = [];
                    results.map(d => {
                        docs.push(d);    
                    });
    
                    let result = {
                        resultStatus: 200,
                        resultDesc: "Successful",
                        resultReturn: docs,
                        errorDesc: null
                    }
    
                    res.send(result);
                }

            }
            catch(err) {
                res.send(err);
            }
            
    });
});

router.get('/', async (req: express.Request, res: express.Response) => { 
    // get all projects

    connectionPool.query('SELECT prjID, prjName FROM projects', 
        function (error: mysql.MysqlError, results, fields: mysql.FieldInfo[]) {
            try {
                if (error) throw error;

                let docs: IProject[] = [];
                results.map(d => {
                    docs.push({
                        prjID: d.prjID,
                        prjName: d.prjName
                        
                    });    
                });

                let result: Result = {
                    resultStatus: 200,
                    resultDesc: "Successful",
                    resultReturn: docs,
                    errorDesc: null
                }

                res.send(result);
            }
            catch(err) {
                res.send(err);
            }
            
    });
});

module.exports = router;
