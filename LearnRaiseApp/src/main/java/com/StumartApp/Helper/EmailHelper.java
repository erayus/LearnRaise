package com.StumartApp.Helper;


import org.json.simple.JSONObject;

public class EmailHelper {
    private RequestHelper _requestHelper;
    private String _url;

    public EmailHelper() {
        this._requestHelper = new RequestHelper();
    }

    public EmailHelper(String url) {
        this._url = url;
        this._requestHelper = new RequestHelper(this._url);
    }

    public EmailHelper setUrl(String url) {
        this._url = url;
        this._requestHelper.setUrl(this._url);
        return this;
    }

    public boolean sendVerifyTokenEmail() {
        JSONObject jsonObject = this._requestHelper.sendRequest();
        return (boolean) jsonObject.get("success");
    }
}
