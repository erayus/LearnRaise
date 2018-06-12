package com.StumartApp.Utils;

import java.util.HashMap;
import java.util.Map;

public class JsonResponse {
    private Map<String, Object> json;

    public JsonResponse() {
        this.json = new HashMap<>();
        json.put("success", false);
        json.put("data", new HashMap<String, Object>());
    }

    public Map<String, Object> getData() {
        return this.json;
    }

    public JsonResponse update(String key, Object data) {
        if (this.checkSelfSechema(key)) {
            this.json.put(key, data);
        }
        return this;
    }

    public JsonResponse registerField (String key, Object data) {
        this.json.put(key, data);
        return this;
    }

    private boolean checkSelfSechema(String key) {
        boolean pass = false;
        for (String inner_key: this.json.keySet()) {
            if (inner_key.equalsIgnoreCase(key)) {
                pass = true;
            }
        }
        return pass;
    }

    public JsonResponse removeEntry(String key) {
        if (this.checkSelfSechema(key)) {
            this.json.remove(key);
        }
        return this;
    }

    public Object getEntryValue(String key){
        if (checkSelfSechema(key)) {
            return this.json.get(key);
        }
        return null;
    }
}
