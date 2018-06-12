package com.StumartApp.Model;

import org.springframework.beans.factory.annotation.Autowired;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

public class UserLog extends BaseUser {
    private int _id;
    private Date _login_time;
    private Date _logout_time;

    public UserLog() {
        super();
        this._id = 0;
    }

    public UserLog(int id, int uid,Date login, Date logout, String email, String username){
        super(uid, email, username);
        this._id = id;
        this._login_time = login;
        this._logout_time = logout;
    }

    public UserLog setID(int id) {
        this._id = id;
        return this;
    }

    @Override
    public UserLog setUserID(int id) {
        super.setUserID(id);
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

    @Override
    public UserLog setEmail(String email) {
        super.setEmail(email);
        return this;
    }

    @Override
    public UserLog setUsername(String username) {
        super.setUsername(username);
        return this;
    }

    public UserLog setLoginTime(Date loginTime) {
        this._login_time = loginTime;
        return this;
    }

    public UserLog setLogOutTime(Date logout) {
        this._logout_time = logout;
        return this;
    }

    public int getID(){
        return this._id;
    }

    public Date getLoginTime() {
        return this._login_time;
    }

    public Date getLogoutTime() {
        return this._logout_time;
    }

    public String getLoginTimeInFormat() {
        DateFormat _format = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
        return _format.format(this._login_time);
    }

    public String getLogOutTimeInFormat() {
        DateFormat _format = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
        return  _format.format(this._logout_time);
    }


    @Override
    public boolean checkSelf() {
        return this.getID() != 0;
    }

    @Override
    public Map<String, Object> toJson() {
        Map<String, Object> json = super.toJson();
        json.put("log_id", this.getID());
        json.put("login_time", this.getLoginTimeInFormat());
        json.put("logout_time", this.getLogOutTimeInFormat());
        return json;
    }
}
