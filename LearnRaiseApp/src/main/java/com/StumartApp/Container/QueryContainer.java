package com.StumartApp.Container;

import com.StumartApp.Model.MapEntry;
import com.StumartApp.Query.QueryProvider;

import java.util.HashMap;
import java.util.Map;

public class QueryContainer {
    private Map<String, QueryProvider> _queryContainer;

    public QueryContainer () {
        this._queryContainer = new HashMap<>();
    }

    public QueryContainer registerQuery(QueryProvider queryProvider) {
        this._queryContainer.put(queryProvider.getQueryName(), queryProvider);
        return this;
    }

    public QueryProvider getQuery(String name) {
      return this._queryContainer.get(name);
    }
}
