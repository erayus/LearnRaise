package com.StumartApp.Query;

import com.StumartApp.Driver.QueryResult;
import com.StumartApp.Helper.TimeHelper;
import com.StumartApp.Model.UserLog;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class UserLogQuery extends BaseQuery implements QueryProvider {

    public UserLogQuery() {
        super();
    }

    @Override
    public String getQueryName() {
        return this.getClass().getName();
    }

    @Override
    public UserLog findById(int id) {
        UserLog userLog = new UserLog();
        String sql =
                "SELECT ul.*, u.Email, u.Username FROM `UserLogging` AS ul INNER JOIN `User` AS u ON ul.UID = u.ID WHERE ul.ID = ? AND ul.LogoutTime IS NOT NULL LIMIT 1";
        QueryResult result = this.getQueryDriver().fetchAssoc(sql);
        if (result.isQueryAssocSuccess()) {
            userLog = this.factory().createUserLog(result.getDataAssoc());
        }
        return userLog;
    }

    public UserLog findByUserID(int uid) {
        UserLog userLog = new UserLog();
        String sql =
                "SELECT ul.*, u.Email, u.Username FROM `UserLogging` AS ul INNER JOIN `User` AS u ON ul.UID = u.ID WHERE ul.UID = ? AND ul.LogoutTime IS NULL LIMIT 1";
        QueryResult result= this.getQueryDriver().fetchAssoc(sql, Arrays.asList(uid));
        if (result.isQueryAssocSuccess()) {
            userLog = this.factory().createUserLog(result.getDataAssoc());
        }
        return userLog;
    }

    public boolean addEntry(int uid) {
        TimeHelper timeHelper = new TimeHelper();
        String today = timeHelper.getDateString();
        Map<String, Object> params = new HashMap<>();
        params.put("LoginTime", today);
        params.put("UID", uid);
        QueryResult result = this.getQueryDriver().insert("UserLogging", params);
        return result.isInsertSuccess();
    }

    public boolean loggingOut(int uid) {
        TimeHelper timeHelper = new TimeHelper();
        String today = timeHelper.getDateString();
        UserLog userLog = this.findByUserID(uid);
        Map<String, Object> new_data = new HashMap<>();
        new_data.put("LogoutTime", today);
        Map<String, Object> conditions = new HashMap<>();
        conditions.put("ID", userLog.getID());
        QueryResult result = this.getQueryDriver().update("UserLogging", new_data, conditions);
        return result.isUpdateSuccess();
    }
}
