package com.StumartApp.Model;

import junit.framework.TestCase;

import java.util.HashMap;
import java.util.Map;

public class BaseUserTest extends TestCase {
    private BaseUser baseUser;

    public BaseUserTest() {
        super("Test BaseUser CLASS");
        this.baseUser = new BaseUser();
    }

    public void testGetDefaultUserID() {
        this.assertEquals(0, this.baseUser.getUserID());
    }

    public void testGetDefaultUsername() {
        this.assertEquals("", this.baseUser.getUsername());
    }

    public void testGetDefaultEmail() {
        this.assertEquals("", this.baseUser.getEmail());
    }

    public void testGetSetUserID() {
        this.assertEquals(1, this.baseUser.setUserID(1).getUserID());
    }

    public void testGetSetUsername() {
        this.assertEquals("kian_nguyen", this.baseUser.setUsername("kian_nguyen").getUsername());
    }

    public void testGetSetEmail() {
        this.assertEquals("kianbomba@gmail.com", this.baseUser.setEmail("kianbomba@gmail.com").getEmail());
    }

    public void testCheckSelfFailCase() throws Exception {
        this.assertFalse(this.baseUser.checkSelf());
    }

    public void testCheckSelfPassCase() {
        this.baseUser.setUserID(1);
        this.assertTrue(this.baseUser.checkSelf());
    }

    public void testToJson() throws Exception {
        Map<String, Object> json = new HashMap<>();
        json.put("user_id", 1);
        json.put("email", "kianbomba@gmail.com");
        json.put("username", "kian_nguyen");
        BaseUser bUser = new BaseUser(1, "kianbomba@gmail.com", "kian_nguyen");
        this.assertEquals(json, bUser.toJson());
    }

}