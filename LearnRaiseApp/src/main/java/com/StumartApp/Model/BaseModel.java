package com.StumartApp.Model;

import com.StumartApp.Utils.Invoker;

import java.util.Map;

public abstract class BaseModel {
    private Invoker _invoker;

    public BaseModel() {
        this._invoker = Invoker.getInstances();
    }

    protected final Invoker getInvoker() {
        return this._invoker;
    }

    public abstract boolean checkSelf();

    public abstract Map<String, Object> toJson();

}
