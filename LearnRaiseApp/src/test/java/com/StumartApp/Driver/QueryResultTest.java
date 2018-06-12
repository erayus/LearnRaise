package com.StumartApp.Driver;

import com.StumartApp.App;
import junit.framework.TestCase;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class QueryResultTest extends TestCase {
    private QueryResult queryResult;

    public QueryResultTest() {
        super("Testing QueryResult CLASS");
        this.queryResult = new QueryResult();
    }

    public void testGetSetQueryResultFetchDataAll(){
        Map<String, Object> data = new HashMap<>();
        data.put("ID", 1);
        data.put("Email", "kianbomba");
        data.put("Username", "");
        data.put("U_Password", "abcd");
        data.put("Verified", 1);
        this.queryResult.setDataAll(Arrays.asList(data));
        this.assertEquals(data, this.queryResult.getDataAll().get(0));
    }

    public void testGetSetAffectedRow() {
        this.queryResult.setAffectedRows(1);
        this.assertEquals(1, this.queryResult.getAffectedRows());
    }

    public void testGetSetInsertedID() {
        this.assertEquals(1, this.queryResult.setInsertID(1).getInsertID());
    }

    public void testGetSetTotalRows() {
        this.assertEquals(1, this.queryResult.setTotalRows(1).getTotalRows());
    }

    public void testIsQuerySuccess() {
        this.assertFalse(queryResult.isQuerySuccess());
    }

    public void testEmptyDataAssoc() {
        this.assertTrue(queryResult.getDataAssoc().isEmpty());
    }

    public void testEmptyDataAll() {
        this.assertTrue(queryResult.getDataAll().isEmpty());
    }

    public void testPath() {
        System.out.println(App.class.getProtectionDomain().getCodeSource().getLocation().getPath());
    }
}