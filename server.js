const userfunctions = require('./callfunctions/userfunctions');
const dcfunctions = require('./callfunctions/dcfunctions');
const pubfunctions = require('./callfunctions/pubfunctions');
const hwcfunctions = require('./callfunctions/hwcfunctions');
const csfunctions = require('./callfunctions/csfunctions');
var pubSyncfunc = require('./datacheck/publicity');
var dcSyncfunc = require('./datacheck/dailycount');
var comSyncfunc = require('./datacheck/compensation');
var hwcSyncfunc = require('./datacheck/hwc');
var reportDCfunc = require('./reports/dailycountReports');
var reportHWCfunc = require('./reports/hwcReports');

var bodyParser = require("body-parser");
var express = require("express");
var cors = require("cors");
var jwt = require("jsonwebtoken");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// app.use(function (req, res, next) {
//     if (req.url !== '/authUser' && req.url !== "/") {
//         var token = req.headers['authorization'];
//         if (token) {
//             try {
//                 var decoded = jwt.verify(token, 'sysarks');
//                 if (decoded) {
//                     req.decoded = decoded;
//                     next();
//                 }
//             } catch (err) {
//                 return res.status(403).send({ success: false, message: 'Invalid token' })
//             }
//         }
//         else {
//             return res.status(403).send({ success: false, message: 'no token provided' })
//         }
//     } else {
//         next();
//     }
// })
var port = process.env.port || 8080;
// var router = express.Router();

app.get("/", function (req, res) { res.send("[ Home - Page of API's ]") });

app.get("/getHWCreport", reportHWCfunc.report.getHWCbyrange);

app.get("/getDCreportbyMonth", reportDCfunc.report.getdailycount);
app.get("/getDCreportbyday", reportDCfunc.report.getdailycountbyday);
app.post("/getDCreportbyrange", reportDCfunc.report.getdailycountbyrange);

app.post("/authUser", userfunctions.caller.authUser);
app.get("/users", userfunctions.caller.getusers);
app.post("/createuser", userfunctions.caller.createUser);
app.get("/deleteuser/:id", userfunctions.caller.deleteUser);
app.post("/updateuser", userfunctions.caller.updateUser);

app.get("/getDailyCountAO", dcfunctions.caller.getdailyDAO);
app.get("/getDailyCountFA/:id", dcfunctions.caller.getFAusers);
app.get("/getallDC", dcfunctions.caller.getDailyCount);

app.get("/getCompensation_OM", dcfunctions.caller.getdailyDAO);
app.get("/getOM_cases/:id", dcfunctions.caller.getFAusers);

app.get("/getpublicity", pubfunctions.caller.getpubdata);

app.get("/getallhwc", hwcfunctions.caller.get_all_hwc);
app.get("/gethwc", hwcfunctions.caller.get_hwc);
app.get("/gethwc/:id", hwcfunctions.caller.get_hwcall_byid);

app.get("/getcase_users", csfunctions.caller.get_case_users);
app.get("/img", pubfunctions.caller.getpubImg);

              ///charts APIs

//home
app.post("/getBpNhByRange", reportDCfunc.report.getBpNhByRange);
app.get("/getPreviousBpNhCount", reportDCfunc.report.getPreviousBpNhCount);
app.post("/getBpByCategory", reportDCfunc.report.getBpByCategory);
app.post("/getNhByCategory", reportDCfunc.report.getNhByCategory);
app.post("/getBpNhByCategory", reportDCfunc.report.getBpNhByCategory);
app.get("/getBpNhYearly", reportDCfunc.report.getBpNhYearly);


//observer
setInterval(hwcSyncfunc.func.syncallhwvdetails, 1000 * 60 * 1);
setInterval(dcSyncfunc.func.syncformdailyusers, 1000 * 60 * 1);
setInterval(comSyncfunc.func.syncallcompensationdetails, 1000 * 60 * 1);
setInterval(pubSyncfunc.func.syncallformpublicitydata, 1000 * 60 * 1);

app.listen(port, () => console.log("Server running on port %d", port));
