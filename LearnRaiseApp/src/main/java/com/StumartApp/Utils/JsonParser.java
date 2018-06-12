package com.StumartApp.Utils;

import com.google.gson.Gson;

import java.util.Map;

public class JsonParser {
    private Gson gson;

    public JsonParser() {
        this.gson = new Gson();
    }

    public String parseJson(Map<String, Object> data) {
        return this.gson.toJson(data);
    }
}
