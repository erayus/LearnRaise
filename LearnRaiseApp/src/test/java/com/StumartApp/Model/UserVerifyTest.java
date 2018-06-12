package com.StumartApp.Model;

import junit.framework.TestCase;
import org.omg.CORBA.OBJ_ADAPTER;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class UserVerifyTest extends TestCase {
    private UserVerify userVerify;

    public UserVerifyTest() {
        this.userVerify = new UserVerify();
    }

    public void testGetSetID() {
        this.assertEquals(1, this.userVerify.setID(1).getID());
    }

    public void testGetSetToken() {
        this.assertEquals("abcd", this.userVerify.setToken("abcd").getToken());
    }

    public void testGetSetCreated() throws ParseException{
        String date_time = "2017-09-15 12:00:00";
        String expected = "15-09-2017 12:00:00";
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date dt = format.parse(date_time);
        this.userVerify.setCreated(dt);
        this.assertEquals(expected, this.userVerify.getCreatedInFormat("dd-MM-yyyy HH:mm:ss"));
    }

    public void testGetSetCreatedWithSimpleFormat() throws ParseException{
        String date_time = "2017-09-15 12:00:00";
        String expected = "15-09-2017";
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date dt = format.parse(date_time);
        this.userVerify.setCreated(dt);
        this.assertEquals(expected, this.userVerify.getCreatedInFormat());
    }

    public void testGetSetUserID() {
        this.assertEquals(1, this.userVerify.setUserID(1).getUserID());
    }

    public void testGetSetEmail() {
        this.assertEquals("abcd@abcs.co.nz", this.userVerify.setEmail("abcd@abcs.co.nz").getEmail());
    }

    public void testGetSetUsername() {
        this.assertEquals("abcd", this.userVerify.setUsername("abcd").getUsername());
    }

    public void testCheckSelf() {
        this.userVerify.setID(1);
        this.assertTrue(this.userVerify.checkSelf());
    }

    public void testCheckSelfFalseCase() {
        this.assertFalse(this.userVerify.checkSelf());
    }

    public void testJson() throws ParseException{
        String date_time = "2017-09-15 12:00:00";
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date dt = format.parse(date_time);
        UserVerify userVerify = new UserVerify(1, "Abcd", dt, 1, "abc@abcs.co.nz", "avc");
        Map<String, Object> json = new HashMap<>();
        json.put("user_id", 1);
        json.put("verify_id", 1);
        json.put("token", "Abcd");
        json.put("created", "15-09-2017");
        json.put("email", "abc@abcs.co.nz");
        json.put("username", "avc");
        this.assertEquals(json, userVerify.toJson());
    }
}