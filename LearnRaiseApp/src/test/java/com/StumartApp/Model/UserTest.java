package com.StumartApp.Model;

import junit.framework.TestCase;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class UserTest extends TestCase {
    private User usr;

    public UserTest() {
        super("Test User CLASS");
        this.usr = new User();
    }

    public void testGetSetUserID() {
        this.assertEquals(1, this.usr.setUserID(1).getUserID());
    }

    public void testGetSetUsername() {
        this.assertEquals("abcd", this.usr.setUsername("abcd").getUsername());
    }

    public void testGetSetEmail(){
        this.assertEquals("abcd@gmail.com", this.usr.setEmail("abcd@gmail.com").getEmail());
    }

    public void testGetSetUserPassword() {
        this.assertEquals("abcd", this.usr.setPassword("abcd").getPassword());
    }

    public void testGetSetUserVerify() {
        this.assertTrue(this.usr.setVerified(true).isVerified());
    }

    public void testGetSetUserVerifyFalsCase() {
        this.assertFalse(this.usr.setVerified(false).isVerified());
    }

    public void testCheckSelf() {
        this.assertTrue(this.usr.setUserID(1).checkSelf());
    }

    public void testCheckSelfFalseCase() {
        this.assertFalse(this.usr.setUserID(0).checkSelf());
    }

    public void testCheckJson() throws ParseException {
        String expected_date = "2017-10-25 12:00:00";
        Map<String, Object> json = new HashMap<>();
        json.put("user_id", 1);
        json.put("email", "abcd@abcs.co.nz");
        json.put("username", "kian_nguyen");
        json.put("created_at", "25-10-2017 12:00:00");
        json.put("verify", true);
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = format.parse(expected_date);
        User user = new User(1, "kian_nguyen", "abcd", "abcd@abcs.co.nz", true, date);
        this.assertEquals(json, user.toJson());
    }
}