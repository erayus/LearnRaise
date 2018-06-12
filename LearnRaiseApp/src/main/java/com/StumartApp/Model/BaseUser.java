package com.StumartApp.Model;

import java.util.HashMap;
import java.util.Map;

public class BaseUser extends BaseModel {
    private int _uid;
    private String _email;
    private String _username;

    public BaseUser() {
        super();
        this._uid = 0;
        this._email = "";
        this._username = "";
    }

    public BaseUser(int uid, String email, String username) {
        super();
        this._uid = uid;
        this._email = email;
        this._username = username;
    }

    public BaseUser setUserID(int id) {
        this._uid = id;
        return this;
    }

    public BaseUser setEmail(String email) {
        this._email = email;
        return this;
    }

    public BaseUser setUsername(String username) {
        this._username = username;
        return this;
    }

    public int getUserID() {
        return this._uid;
    }

    public String getEmail() {
        return this._email;
    }

    public String getUsername() {
        return this._username;
    }

    @Override
    public boolean checkSelf() {
        return this.getUserID() != 0;
    }

    @Override
    public Map<String, Object> toJson() {
        Map<String, Object> json = new HashMap<>();
        json.put("user_id", this.getUserID());
        json.put("email", this.getEmail());
        json.put("username", this.getUsername());
        return json;
    }
}
