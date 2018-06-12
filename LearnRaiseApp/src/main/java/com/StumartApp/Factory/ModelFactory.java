package com.StumartApp.Factory;

import com.StumartApp.Model.User;
import com.StumartApp.Model.UserLog;
import com.StumartApp.Model.UserVerify;
import com.StumartApp.Utils.Invoker;
import com.StumartApp.Utils.JsonParser;

import java.util.Date;
import java.util.Map;

public class ModelFactory {
    private JsonParser jsonParser;
    private Invoker _invoker;
    public ModelFactory() {
        this._invoker = Invoker.getInstances();
        this.jsonParser = new JsonParser();
    }

    public User createUser(Map<String, Object> resultSet) {
        User user = new User();
        System.out.println("\n\n\n" + this.jsonParser.parseJson(resultSet) + "\n\n\n");

        user.setUserID((int) resultSet.get("ID"))
            .setEmail((String) resultSet.get("Email"))
            .setPassword((String) resultSet.get("U_Password"))
            .setUsername((String) resultSet.get("Username"))
            .setVerified(_invoker.parseValue((int) resultSet.get("Verified")))
            .setCreated((Date) resultSet.get("Created"));
        return user;
    }

    public UserVerify createUserVerify(Map<String, Object> resultSet) {
        UserVerify userVerify = new UserVerify();
        userVerify.setID((int) resultSet.get("ID"))
                .setUserID((int) resultSet.get("UID"))
                .setEmail((String) resultSet.get("Email"))
                .setUsername((String) resultSet.get("Username"))
                .setToken((String) resultSet.get("Token"))
                .setCreated((Date) resultSet.get("Created"));
        return userVerify;
    }

    public UserLog createUserLog(Map<String, Object> resultSet) {
        UserLog userLog = new UserLog();
        userLog.setID((int)resultSet.get("ID"))
                .setEmail((String) resultSet.get("Email"))
                .setUsername((String) resultSet.get("Username"))
                .setUserID((int) resultSet.get("UID"))
                .setLoginTime((Date) resultSet.get("LoginTime"))
                .setLogOutTime((Date) resultSet.get("LogoutTime"));
        return userLog;
    }


}
