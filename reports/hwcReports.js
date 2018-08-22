const dbconn = require('../config/sshdbconn');
const procedure = require('../utils/report_queries');

const reports = {};
var result_data = [];

reports.getHWCbyrange = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.gethwcbyrange(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                // result_data.push(data);
                // console.log(JSON.stringify(data));
                res.send(JSON.stringify(data));
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

exports.report = reports;
