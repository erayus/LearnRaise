package com.StumartApp.Helper;

//import org.apache.http


import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.nio.Buffer;

public class RequestHelper {
    private String _string_url;

    public RequestHelper() {}

    public RequestHelper(String url) {
        this._string_url = url;
    }

    public RequestHelper setUrl(String url) {
        this._string_url = url;
        return this;
    }

    public JSONObject sendRequest() {
        JSONParser parser = new JSONParser();
        JSONObject jsonObject = new JSONObject();
        try {
            URL url = new URL(_string_url);
            URLConnection urlConnection = url.openConnection();
            urlConnection.setRequestProperty("X-Requested-With", "Curl");
            urlConnection.setRequestProperty("Authoken", "f0aaac1bf459d4088855a8eb4daa38c4");
            BufferedReader reader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
            jsonObject = (JSONObject) parser.parse(reader.readLine());
            reader.close();
        }catch (Exception mue) {
            System.out.println("\n\n\n The URL is invalid \n\n\n");
            mue.printStackTrace();
        }
        return jsonObject;
    }
}
