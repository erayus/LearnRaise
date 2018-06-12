package com.StumartApp.Query;

import com.StumartApp.Driver.QueryResult;
import com.StumartApp.Model.UserVerify;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class UserVerifyQuery extends BaseQuery implements QueryProvider {
    public UserVerifyQuery () {
        super();
    }

    @Override
    public String getQueryName() {
        return this.getClass().getName();
    }

    @Override
    public UserVerify findById(int id) {
        UserVerify userVerify = new UserVerify();
        String sql =
                "SELECT uv.*, u.Email, u.Username FROM `UserVerify` AS uv INNER JOIN `User` AS u ON uv.UID = u.ID WHERE uv.ID = ? AND Deleted IS NULL";
        QueryResult result = this.getQueryDriver().fetchAssoc(sql, Arrays.asList(id));
        if (result.isQueryAssocSuccess()) {
            userVerify = this.factory().createUserVerify(result.getDataAssoc());
        }
        return userVerify;
    }

    public boolean createUserVerifyEntry(int uid) {
        String token = this.invoker().generatedToken();
        Map<String, Object> params = new HashMap<>();
        params.put("UID", uid);
        params.put("Token", token);
        QueryResult result =  this.getQueryDriver().insert("UserVerify", params);
        return result.isInsertSuccess();
    }
}
