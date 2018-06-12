package com.StumartApp.Query;

public interface QueryProvider {

    String getQueryName();

    Object findById(int id);
}
