package com.StumartApp.Query;


import com.StumartApp.Driver.QueryResult;
import com.StumartApp.Helper.TimeHelper;
import com.StumartApp.Model.User;

import java.util.Arrays;
import java.util.HashMap;

public class UserQuery extends BaseQuery implements QueryProvider {

    public UserQuery() {
        super();
    }

    @Override
    public String getQueryName() {
        return this.getClass().getName();
    }

    public User findById(int id) {
        User user = new User();
        String sql =
                "SELECT * FROM `User` WHERE ID = ? AND Verified = 1";
        QueryResult result = this.getQueryDriver().fetchAssoc(sql, Arrays.asList(id));
        if (result.isQueryAssocSuccess()) {
            user = this.factory().createUser(result.getDataAssoc());
        }
        return user;
    }

    public User findByEmailAndPassword(String _email, String _password) {
        User user = new User();
        String sql = "SELECT * FROM `User` WHERE Email = ? AND U_Password = ? LIMIT 1";
        _password = this.invoker().encrypt(_password);
        QueryResult result = this.getQueryDriver().fetchAssoc(sql, Arrays.asList(_email, _password));
        if (result.isQueryAssocSuccess()) {
            user = this.factory().createUser(result.getDataAssoc());
        }
        return user;
    }

    public int createNewUser(String email, String password) {
        int uid = 0;
        password = this.invoker().encrypt(password);
        HashMap<String, Object> _params = new HashMap<>();
        _params.put("Email", email);
        _params.put("U_Password", password);
        QueryResult result = this.getQueryDriver().insert("User", _params);
        if (result.isInsertSuccess()) {
            uid = result.getInsertID();
//            this.userCreatedLog(uid);
//            pass = this.createUserVerify(uid);
        }
        return uid;
    }

    // @todo: implementing this ability later on
    public User updateEmail(String email) {
        User user = new User();

        return user;
    }
}
