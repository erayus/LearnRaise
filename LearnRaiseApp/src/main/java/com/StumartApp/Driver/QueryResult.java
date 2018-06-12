package com.StumartApp.Driver;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class QueryResult {
    private List<Map<String, Object>> _dataAll;
    private Map<String, Object> _dataAssoc;

    private int _affectedRows = 0;
    private int _insertID = 0;
    private int _totalRows = 0;

    /**
     *
     */
    public QueryResult() {
        this._dataAssoc = new HashMap<>();
        this._dataAll = new ArrayList<>();
    }

    /**
     *
     * @param dataAssoc
     * @return
     */
    public QueryResult setDataAssoc(Map<String, Object> dataAssoc) {
        this._dataAssoc = dataAssoc;
        return this;
    }

    /**
     *
     * @param affectedRows
     * @return
     */
    public QueryResult setAffectedRows(int affectedRows) {
        this._affectedRows = affectedRows;
        return this;
    }

    /**
     *
     * @return
     */
    public int getAffectedRows() {
        return this._affectedRows;
    }

    /**
     *
     * @return
     */
    public List<Map<String, Object>> getDataAll() {
        return this._dataAll;
    }

    /**
     *
     * @param data
     * @return
     */
    public QueryResult setDataAll(List<Map<String, Object>> data) {
        this._dataAll = data;
        return this;
    }

    /**
     *
     * @return
     */
    public Map<String, Object> getDataAssoc() {
        return this._dataAssoc;
    }

    public boolean isQueryAssocSuccess() {
        boolean success = true;
        if (this._dataAssoc.isEmpty()) {
            success = false;
        }
        return success;
    }

    public boolean isQueryAllSuccess() {
        boolean success = true;
        if (this._dataAll.isEmpty()) {
            success = false;
        }
        return success;
    }

    public boolean isQuerySuccess() {
        return !this._dataAll.isEmpty() || !this._dataAssoc.isEmpty();
    }

    /**
     *
     * @return
     */
    public boolean isInsertSuccess() {
        return this._insertID != 0;
    }

    /**
     *
     * @return
     */
    public boolean isUpdateSuccess() {
        return this._affectedRows != 0;
    }

    /**
     *
     * @param total
     * @return
     */
    public QueryResult setTotalRows(int total) {
        this._totalRows = total;
        return this;
    }

    /**
     *
     * @return
     */
    public int getTotalRows() {
        return this._totalRows;
    }

    /**
     *
     * @param insertID
     * @return
     */
    public QueryResult setInsertID(int insertID){
        this._insertID = insertID;
        return this;
    }

    /**
     *
     * @return
     */
    public int getInsertID() {
        return this._insertID;
    }


}
