package com.StumartApp.Model;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class User extends BaseUser {
    private String _password;
    private Date _created;
    private boolean _verify;

    public User() {
        super();
        this._password = "";
        this._verify = false;
    }

    public User(int uid, String username, String password, String email, boolean _verify, Date _created) {
        super(uid, email, username);
        this._password = password;
        this._verify = _verify;
        this._created = _created;
    }

    public User setPassword(String password) {
        this._password = password;
        return this;
    }

    public User setCreated(Date created) {
        this._created = created;
        return this;
    }

    public String getPassword() {
        return this._password;
    }

    public User setVerified(boolean verify) {
        this._verify = verify;
        return this;
    }

    public boolean isVerified() {
        return this._verify;
    }

    public Date getCreated() {
        return this._created;
    }

    public String getCreatedInFormat(String format) {
        DateFormat _format = new SimpleDateFormat(format);
        return  _format.format(this._created);
    }

    @Override
    public boolean checkSelf() {
        return this.getUserID() != 0;
    }

    @Override
    public Map<String, Object> toJson() {
        Map<String, Object> json =  super.toJson();
        json.put("created_at", this.getCreatedInFormat("dd-MM-YYYY HH:mm:ss"));
        json.put("verify", this.isVerified());
        return json;
    }

    @Override
    public User setUserID(int id) {
        super.setUserID(id);
        return this;
    }

    @Override
    public User setEmail(String email) {
        super.setEmail(email);
        return this;
    }

    @Override
    public User setUsername(String username) {
        super.setUsername(username);
        return this;
    }

    @Override
    public int getUserID() {
        return super.getUserID();
    }

    @Override
    public String getEmail() {
        return super.getEmail();
    }

    @Override
    public String getUsername() {
        return super.getUsername();
    }
}
