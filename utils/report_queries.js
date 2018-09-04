const procedure = {};

procedure.bypark = function () {
    return "SELECT SUM(DC_NH_CASES) AS TOTAL_NH_CASES, SUM(DC_BP_CASES) AS TOTAL_BP_CASES FROM daily_count";
};

procedure.byFA = function () {
    const sum = "DC_CROP+DC_CROP_PROPERTY+DC_PROPERTY+DC_LIVESTOCK+DC_HUMAN_INJURY+DC_HUMAN_DEATH AS TOTAL_CASES_BY_FA";
    return "SELECT DC_FA_UN AS FA_NAME," + sum + " FROM dc_cases GROUP BY DC_FA_UN";
};

procedure.byHWCType = function () {
    return "SELECT SUM(DC_CROP) AS CROP_SUM, SUM(DC_CROP_PROPERTY) AS CROP_PROPERTY_SUM, SUM(DC_PROPERTY) AS PROPERTY_SUM, SUM(DC_LIVESTOCK) AS LIVESTOCK_SUM, SUM(DC_HUMAN_INJURY) AS HUMAN_INJURY_SUM, SUM(DC_HUMAN_DEATH) AS HUMAN_DEATH_SUM FROM dc_cases";
};

procedure.byHWCType_day = function () {
    return "SELECT DATE_FORMAT(DC_CASE_DATE, '%d-%m-%y') AS CASE_DATE, SUM(DC_CROP) AS CROP_SUM, SUM(DC_CROP_PROPERTY) AS CROP_PROPERTY_SUM, SUM(DC_PROPERTY) AS PROPERTY_SUM, SUM(DC_LIVESTOCK) AS LIVESTOCK_SUM, SUM(DC_HUMAN_INJURY) AS HUMAN_INJURY_SUM, SUM(DC_HUMAN_DEATH) AS HUMAN_DEATH_SUM FROM dc_cases GROUP BY DC_CASE_DATE ORDER BY DC_CASE_DATE DESC";
};

procedure.byFA_day = function () {
    return "SELECT  DATE_FORMAT(DC_CASE_DATE, '%d-%m-%y') AS CASE_DATE, DC_FA_UN AS FA_NAME,  sum(DC_CROP + DC_CROP_PROPERTY + DC_PROPERTY + DC_LIVESTOCK + DC_HUMAN_DEATH + DC_HUMAN_INJURY) AS TOTAL_CASES_FA  FROM  dc_cases GROUP BY concat(DC_CASE_DATE,'_',DC_FA_UN) ORDER BY DC_CASE_DATE DESC";
};

procedure.bypark_day = function () {
    return "SELECT DATE_FORMAT(DC_CASE_DATE, '%d-%m-%y') AS CASE_DATE, SUM(DC_NH_CASES) AS TOTAL_NH_CASES, SUM(DC_BP_CASES) AS TOTAL_BP_CASES FROM daily_count GROUP BY DC_CASE_DATE ORDER BY DC_CASE_DATE DESC";
};

procedure.bypark_range = function (fromdate, todate) {
    return "SELECT DATE_FORMAT(DC_CASE_DATE, '%d-%m-%Y') AS CASE_DATE, SUM(DC_NH_CASES) AS TOTAL_NH_CASES, SUM(DC_BP_CASES) AS TOTAL_BP_CASES FROM daily_count WHERE (DATE_FORMAT(DC_CASE_DATE, '%Y-%m-%d') BETWEEN '"+fromdate+"' AND '"+todate+"' ) GROUP BY DC_CASE_DATE ORDER BY DC_CASE_DATE DESC";
};
procedure.byHWCType_range = function (fromdate, todate) {
    return "SELECT DATE_FORMAT(DC_CASE_DATE, '%d-%m-%Y') AS CASE_DATE, SUM(DC_CROP) AS CROP_SUM, SUM(DC_CROP_PROPERTY) AS CROP_PROPERTY_SUM, SUM(DC_PROPERTY) AS PROPERTY_SUM, SUM(DC_LIVESTOCK) AS LIVESTOCK_SUM, SUM(DC_HUMAN_INJURY) AS HUMAN_INJURY_SUM, SUM(DC_HUMAN_DEATH) AS HUMAN_DEATH_SUM FROM dc_cases WHERE (DATE_FORMAT(DC_CASE_DATE, '%Y-%m-%d') BETWEEN '"+fromdate+"' AND '"+todate+"' ) GROUP BY DC_CASE_DATE ORDER BY DC_CASE_DATE DESC";
};

procedure.byFA_range = function (fromdate, todate) {
    return "SELECT  DATE_FORMAT(DC_CASE_DATE, '%d-%m-%Y') AS CASE_DATE, DC_FA_UN AS FA_NAME,  sum(DC_CROP + DC_CROP_PROPERTY + DC_PROPERTY + DC_LIVESTOCK + DC_HUMAN_DEATH + DC_HUMAN_INJURY) AS TOTAL_CASES_FA  FROM  dc_cases WHERE (DATE_FORMAT(DC_CASE_DATE, '%Y-%m-%d') BETWEEN '"+fromdate+"' AND '"+todate+"' ) GROUP BY concat(DC_CASE_DATE,'_',DC_FA_UN) ORDER BY DC_CASE_DATE DESC";
};

procedure.gethwcbyrange = function () {
    return "SELECT  DATE_FORMAT(HWC_CASE_DATE, '%d-%m-%Y') AS CASE_DATE,  HWC_PARK_NAME FROM  hwc_details ";
}

///Charts APIs

//home
procedure.getBpNhByRange = function (fromdate, todate) {
    return "SELECT  DATE_FORMAT(DC_CASE_DATE, '%d-%m-%Y') AS CASE_DATE,  sum(DC_NH_CASES) AS NH_CASES, sum(DC_BP_CASES) as BP_CASE  FROM  daily_count WHERE (DATE_FORMAT(DC_CASE_DATE, '%Y-%m-%d') BETWEEN '"+fromdate+"' AND '"+todate+"' ) GROUP BY DC_CASE_DATE ORDER BY DC_CASE_DATE DESC";
}
procedure.getPreviousBpNhCount = function () {
    return "select DATE_FORMAT(DC_CASE_DATE, '%d-%m-%Y') AS CASE_DATE, sum(DC_NH_CASES) AS NH_CASES, sum(DC_BP_CASES) as BP_CASE from daily_count WHERE DC_CASE_DATE BETWEEN CURDATE() - INTERVAL 1 DAY AND CURDATE()"
}
procedure.getBpByCategory = function (fromdate, todate) {
    return "select DATE_FORMAT(d.DC_CASE_DATE, '%d-%m-%Y')  as CASE_DATE, h.HWC_CASE_CATEGORY as CATEGORY, d.DC_BP_CASES AS BP_CASES , sum(d.DC_BP_CASES) AS BP_CASES from daily_count d, hwc_details h where (h.HWC_CASE_DATE between '"+fromdate+"' AND '"+todate+"') and (d.DC_CASE_DATE between '"+fromdate+"' AND '"+todate+"') group by d.DC_CASE_DATE, h.HWC_CASE_DATE;"
}
procedure.getNhByCategory = function (fromdate, todate) {
    return "select DATE_FORMAT(d.DC_CASE_DATE, '%d-%m-%Y')  as CASE_DATE, h.HWC_CASE_CATEGORY as CATEGORY, d.DC_NH_CASES AS NH_CASES , sum(d.DC_NH_CASES) AS NH_CASES from daily_count d, hwc_details h where (h.HWC_CASE_DATE between '"+fromdate+"' AND '"+todate+"') and (d.DC_CASE_DATE between '"+fromdate+"' AND '"+todate+"') group by d.DC_CASE_DATE, h.HWC_CASE_DATE;"
}
procedure.getBpNhByCategory = function (fromdate, todate) {
    return "select DATE_FORMAT(d.DC_CASE_DATE, '%d-%m-%Y')  as CASE_DATE, h.HWC_CASE_CATEGORY as CATEGORY, sum(d.DC_NH_CASES+d.DC_BP_CASES) AS TOTAL_BP_NH_CASES from daily_count d, hwc_details h where (h.HWC_CASE_DATE between '"+fromdate+"' AND '"+todate+"') and (d.DC_CASE_DATE between '"+fromdate+"' AND '"+todate+"') group by d.DC_CASE_DATE, h.HWC_CASE_DATE;"
}
procedure.getBpNhYearly = function () {
    return "select year(DC_CASE_DATE) as YEAR, sum(DC_NH_CASES) AS NH_CASES, sum(DC_BP_CASES) as BP_CASE from daily_count WHERE year(DC_CASE_DATE) in (YEAR(CURDATE())-3,YEAR(CURDATE())) group by year(DC_CASE_DATE);"
}

exports.func = procedure;
