package com.StumartApp.Model;

import java.util.Map;

public class MapEntry implements Map.Entry{
    private String _key;
    private Object _value;

    public MapEntry(String key, Object value) {
        this._key = key;
        this._value = value;
    }


    @Override
    public String getKey() {
        return this._key;
    }

    @Override
    public Object getValue() {
        return this._value;
    }

    @Override
    public Object setValue(Object value) {
        this._value = value;
        return this;
    }
}
