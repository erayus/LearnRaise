package com.StumartApp.Helper;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

public class TimeHelper {
    private Date _date;
    private String _date_string;
    private DateFormat _format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    public TimeHelper() {
        this._date = new Date();
        this._format.setTimeZone(TimeZone.getTimeZone("Pacific/Auckland"));
        this._date_string =  _format.format(_date);
    }

    public String getDateString() {
        return this._date_string;
    }

}
