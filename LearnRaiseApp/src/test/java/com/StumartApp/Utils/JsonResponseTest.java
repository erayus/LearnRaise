package com.StumartApp.Utils;

import junit.framework.TestCase;

import java.util.Map;

public class JsonResponseTest extends TestCase {
    private JsonResponse json;

    public JsonResponseTest() {
        super();
        this.json = new JsonResponse();
    }

    public void testRegisterField() {
        this.json.registerField("message", "Hello");
        this.assertEquals("Hello", (String) this.json.getEntryValue("message"));
    }

    public void testGetDefaultEntryValue() {
        this.assertFalse((boolean) this.json.getEntryValue("success"));
    }

    public void testGetDefaultEntryValueData() {
        Map<String, Object> data = (Map<String, Object>) this.json.getEntryValue("data");
        this.assertTrue(data.isEmpty());
    }

    public void testRemoveEntry() {
        this.json.removeEntry("data");
        this.assertNull(this.json.getEntryValue("data"));
    }

    public void testUpdateEntry() {
        this.json.update("success", true);
        this.assertTrue((boolean) this.json.getEntryValue("success"));
    }

    public void testGetData() {
        Map<String, Object> json_data = this.json.getData();
        Map<String, Object> data = (Map<String, Object>) json_data.get("data");
        this.assertFalse((boolean) json_data.get("success"));
        this.assertTrue(data.isEmpty());
    }
}