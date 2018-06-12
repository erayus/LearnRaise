package com.StumartApp.Model;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class Word extends BaseModel{
    private int _id;
    private String _word;
    private String _description;
    private Date _created;

    public Word() {
        this._id = 0;
        this._word = "";
        this._description = "";
        this._created = new Date();
    }

    public Word(int id, String word, String description, Date created) {
        this._id = id;
        this._word = word;
        this._description = description;
        this._created = created;
    }

    public Word setID(int id) {
        this._id = id;
        return this;
    }

    public Word setWord(String word) {
        this._word = word;
        return this;
    }

    public Word setDescription(String description) {
        this._description = description;
        return this;
    }

    public Word setCreated(Date created) {
        this._created = created;
        return this;
    }

    public int getID(){
        return this._id;
    }

    public String getDescription() {
        return this._description;
    }

    public String getWord() {
        return this._word;
    }

    public Date getCreated() {
        return this._created;
    }

    public String getCreatedFormat(String format) {
        DateFormat _format = new SimpleDateFormat(format);
        return _format.format(this._created);
    }

    @Override
    public boolean checkSelf() {
        return this.getID() != 0;
    }

    @Override
    public Map<String, Object> toJson() {
        Map<String, Object> json = new HashMap<>();
        json.put("id", this.getID());
        json.put("word", this.getWord());
        json.put("description", this.getDescription());
        json.put("created_at", this.getCreatedFormat("dd-MM-YYYY HH:mm:ss"));
        return json;
    }
}
