package com.StumartApp.Model;

import junit.framework.TestCase;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class UserLogTest extends TestCase {
    private UserLog userLog;
    private Date dt;
    public UserLogTest() throws Exception{
        super();
        this.userLog = new UserLog();
        String date_time = "2017-09-15 12:00:00";
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        this.dt = format.parse(date_time);

    }

    public void testGetSetID(){
        this.assertEquals(1, this.userLog.setID(1).getID());
    }

    public void testGetSetUserID() {
        this.assertEquals(1, this.userLog.setUserID(1).getUserID());
    }

    public void testCheckSelf() {
        this.userLog.setID(1);
        this.assertTrue(this.userLog.checkSelf());
    }

    public void testCheckSelfFalseCase() {
        this.assertFalse(this.userLog.checkSelf());
    }

    public void testSetGetEmail() {
        this.assertEquals("abcd@abcs.co.nz", this.userLog.setEmail("abcd@abcs.co.nz").getEmail());
    }

    public void testGetSetUsername() {
        this.assertEquals("abc", this.userLog.setUsername("abc").getUsername());
    }

    public void testGetSetLogInTime() {
        this.userLog.setLoginTime(this.dt);
        this.assertEquals("15-09-2017 12:00:00", this.userLog.getLoginTimeInFormat());
    }

    public void testGetSetLogOutTime() {
        this.userLog.setLogOutTime(this.dt);
        this.assertEquals("15-09-2017 12:00:00", this.userLog.getLogOutTimeInFormat());
    }

    public void testJson() {
        Map<String, Object> json = new HashMap<>();
        json.put("log_id", 1);
        json.put("login_time", "15-09-2017 12:00:00");
        json.put("logout_time", "15-09-2017 12:00:00");
        json.put("user_id", 1);
        json.put("username", "abc");
        json.put("email", "abcd@abcs.co.nz");
        UserLog userLog = new UserLog(1, 1, this.dt, this.dt, "abcd@abcs.co.nz","abc");
        this.assertEquals(json, userLog.toJson());
    }
}