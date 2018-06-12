package com.StumartApp.Model;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

public class UserVerify extends BaseUser {
    private int _id;
    private String _token;
    private Date _created;

    public UserVerify() {
        super();
        this._id = 0;
        this._token = "";
        this._created = new Date();
    }

    public UserVerify(int id, String token, Date created, int uid, String email, String username) {
        super(uid, email, username);
        this._id = id;
        this._token = token;
        this._created = created;
    }

    public UserVerify setID(int id) {
        this._id = id;
        return this;
    }

    public UserVerify setToken(String token) {
        this._token = token;
        return this;
    }

    public UserVerify setCreated(Date created) {
        this._created = created;
        return this;
    }

    public String getToken() {
        return this._token;
    }

    public Date getCreated() {
        return this._created;
    }

    public String getCreatedInFormat(String format) {
        DateFormat _format = new SimpleDateFormat(format);
        return _format.format(this._created);
    }

    public String getCreatedInFormat() {
        DateFormat _format = new SimpleDateFormat("dd-MM-YYY");
        return _format.format(this._created);
    }

    public int getID() {
        return this._id;
    }

    @Override
    public UserVerify setUserID(int uid) {
        super.setUserID(uid);
        return this;
    }

    @Override
    public UserVerify setEmail(String email) {
        super.setEmail(email);
        return this;
    }

    @Override
    public UserVerify setUsername(String username) {
        super.setUsername(username);
        return this;
    }

    @Override
    public boolean checkSelf() {
        return this.getID() != 0;
    }

    @Override
    public Map<String, Object> toJson() {
        Map<String, Object> json = super.toJson();
        json.put("verify_id", this.getID());
        json.put("token", this.getToken());
        json.put("created", this.getCreatedInFormat());
        return json;
    }
}
