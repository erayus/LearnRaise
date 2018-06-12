package com.StumartApp.Query;

import com.StumartApp.Driver.QueryDriver;
import com.StumartApp.Factory.ModelFactory;
import com.StumartApp.Helper.TimeHelper;
import com.StumartApp.Utils.Invoker;

import java.util.Date;

public class BaseQuery {
    private QueryDriver _queryDriver;
    private ModelFactory _modelFactory;
    private Invoker _invoker;
    private TimeHelper _timeHelper;

    public BaseQuery() {
        this._queryDriver = QueryDriver.getInstances();
        this._modelFactory = new ModelFactory();
        this._invoker = Invoker.getInstances();
        this._timeHelper = new TimeHelper();
    }

    protected final QueryDriver getQueryDriver() {
        return _queryDriver;
    }

    protected final ModelFactory factory() {
        return this._modelFactory;
    }

    protected final Invoker invoker() {
        return this._invoker;
    }

    protected final TimeHelper timeHelper() {
        return this._timeHelper;
    }

    protected final String now() {
        return this._timeHelper.getDateString();
    }
}
