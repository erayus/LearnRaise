package com.StumartApp.Helper;

import junit.framework.TestCase;

public class TimeHelperTest extends TestCase {
    private TimeHelper timeHelper;

    public TimeHelperTest() {
        super("Test TimeHelper CLASS");
        this.timeHelper = new TimeHelper();
    }

    public void testTimeZone() {
        System.out.printf("\nTesting TimeHelper Time Stamp: %s\n", timeHelper.getDateString());
        this.assertTrue(true);
    }
}