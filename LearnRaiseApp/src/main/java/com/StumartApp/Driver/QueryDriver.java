package com.StumartApp.Driver;

import com.StumartApp.App;
import com.StumartApp.Database.DBConnection;

import javax.management.Query;
import java.sql.*;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class QueryDriver {
    private DBConnection dbConnection;
    private ResultSet rs;
    private PreparedStatement prsStmt;

    private static QueryDriver $inner;

    /**
     *
     */
    private QueryDriver() {
        this.rs = null;
        prsStmt = null;
        String config = App.class.getProtectionDomain().getCodeSource().getLocation().getPath() + "db.config.json";
        this.dbConnection = new DBConnection(config);
        $inner = this;
    }

    /**
     * @return
     */
    public static QueryDriver getInstances() {
        if ($inner == null) {
            $inner = new QueryDriver();
        }
        return $inner;
    }

    private void connect() {
        if (this.dbConnection.isNull()) {
            this.dbConnection.setConnection();
        }
    }

    /**
     * @param sql
     * @param params
     * @return
     */
    public QueryResult fetchAll(String sql, List<Object> params) {
        this.connect();
        QueryResult result = new QueryResult();
        try {
            this.prepareSQL(sql, params);
            this.rs = this.prsStmt.executeQuery();
            result.setDataAll(this.parseAllData())
                    .setTotalRows(this.getRowCount());
        } catch (Exception e) {
            System.out.println("\n\n\nError query\n\n\n");
            e.printStackTrace();
        } finally {
            this.close();
        }
        return result;
    }

    /**
     * @param sql
     * @return
     */
    public QueryResult fetchAssoc(String sql) {
        this.connect();
        QueryResult result = new QueryResult();
        try {
            this.prsStmt = this.dbConnection.getCon().prepareStatement(sql);
            this.prsStmt.setMaxRows(1);
            this.rs = this.prsStmt.executeQuery();
            result.setDataAssoc(this.parseAssocData())
                    .setTotalRows(this.getRowCount());
        } catch (Exception sqle) {
            System.out.println("\n\nUnable to query due to: \n\n");
            sqle.printStackTrace();
        } finally {
            this.close();
        }
        return result;
    }

    /**
     * @param sql
     * @param _params
     * @return
     */
    public QueryResult fetchAssoc(String sql, List<Object> _params) {
        this.connect();
        QueryResult result = new QueryResult();
        try {
            this.prepareSQL(sql, _params);
            this.rs = this.prsStmt.executeQuery();
            result.setDataAssoc(this.parseAssocData())
                    .setTotalRows(this.getRowCount());
        } catch (Exception sqle) {
            System.out.println("\n\nUnable to query the database due to: \n\n");
            sqle.printStackTrace();
        } finally {
            this.close();
        }
        return result;
    }

    /**
     *
     * @param tableName
     * @param newData
     * @param conditions
     * @return
     */
    public QueryResult update(String tableName, Map<String, Object> newData, Map<String, Object> conditions) {
        this.connect();
        QueryResult result = new QueryResult();
        try {
            this.prepareUpdateSQL(tableName, newData, conditions);
            int affectedRow = this.prsStmt.executeUpdate();
            result.setAffectedRows(affectedRow);
        } catch (SQLException sqle) {
            System.out.println("\n\n\n Unable to update the record due to errors: \n\n\n");
            sqle.printStackTrace();
        } finally {
            this.close();
        }

        return result;
    }

    private String  getUpdateSQL (String tableName, Map<String, Object> newData, Map<String, Object> conditions) {
        String sql = "UPDATE `" + tableName + "` SET ";
        String sql2 = " WHERE " ;
        int i = 0;
        for(Map.Entry entry: newData.entrySet()) {
            if (i == 0) {
                sql += entry.getKey() + " = ?";
            } else {
                sql += ", " + entry.getKey() + " = ? ";
            }
            i = 1;
        }
        i = 0;
        for (Map.Entry entry: conditions.entrySet()) {
            if (i == 0) {
                sql2 += entry.getKey() + " = ? ";
            } else {
                sql2 += " AND " + entry.getKey() + " = ?";
            }
        }
        return String.format("%s %s", sql, sql2);
    }

    private QueryDriver prepareUpdateSQL(String tableName, Map<String, Object> newData, Map<String, Object> conditions) throws SQLException {
        String sql = this.getUpdateSQL(tableName, newData, conditions);
        System.out.println("\n\n\n" +sql + "\n\n\n");
        Map <String, Object> combined = new HashMap<>();
        combined.putAll(newData);
        combined.putAll(conditions);
        this.prsStmt = this.dbConnection.getCon().prepareStatement(sql);
        this.setParams(combined);
        return this;
    }

    private void setParams(Map<String, Object> combined) throws SQLException {
        int i  = 1;
        if (this.prsStmt != null) {
            for (Map.Entry entry: combined.entrySet()) {
                if (entry.getValue() instanceof Integer) {
                    this.prsStmt.setInt(i, (int) entry.getValue());
                } else if ( entry.getValue() instanceof Float) {
                    this.prsStmt.setFloat(i, (Float) entry.getValue());
                } else if (entry.getValue() instanceof String) {
                    this.prsStmt.setString(i, (String) entry.getValue());
                }
                i++;
            }
        }
    }

    /**
     * @param tableName
     * @param _params
     * @return
     */
    public QueryResult insert(String tableName, Map<String, Object> _params) {
        this.connect();
        QueryResult result = new QueryResult();
        try {
            this.prepareInsertSQL(tableName, _params);
            int affectdRows = this.prsStmt.executeUpdate();
            result.setAffectedRows(affectdRows);
            if (affectdRows != 0) {
                this.rs = this.prsStmt.getGeneratedKeys();
                if (this.rs.next()) {
                    result.setInsertID(rs.getInt(1));
                }
            }
        } catch (SQLException sqle) {
            System.out.println("\n\nUnable to query the database due to: \n\n");
            sqle.printStackTrace();
        } finally {
            this.close();
        }
        return result;
    }

    /**
     *
     * @param tableName
     * @param _params
     * @return
     * @throws SQLException
     */
    private QueryDriver prepareInsertSQL(String tableName, Map<String, Object> _params) throws SQLException {
        String sql = this.getInsertSQL(tableName, _params);
        this.prsStmt = this.dbConnection.getCon().prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
        this.setParams(_params);
        return this;
    }

    /**
     * @param tableName
     * @param _params
     * @return
     */
    private String getInsertSQL(String tableName, Map<String, Object> _params) {
        String sql = "INSERT INTO `" + tableName + "`( ";
        String sql2 = "VALUES ( ";
        int i = 0;
        for (Map.Entry entry : _params.entrySet()) {
            if (i == 0) {
                sql += entry.getKey();
                sql2 += " ?";
            } else {
                sql += ", " + entry.getKey();
                sql2 += ", ?";
            }
            i += 1;
        }
//        sql += " ) " + sql2 + " )";
        return String.format("%s ) %s ) ", sql, sql2);
    }

    /**
     * @return
     * @throws SQLException
     */
    private Map<String, Object> parseAssocData() throws SQLException, ParseException {
        Map<String, Object> dataAssoc = new HashMap<>();
        if (this.rs != null && rs.next()) {
            dataAssoc = this.parseData();
        }
        return dataAssoc;
    }

    /**
     * @param sql
     * @return
     */

    public QueryResult fetchAll(String sql) {
        this.connect();
        QueryResult result = new QueryResult();
        try {
            this.prsStmt = this.dbConnection.getCon().prepareStatement(sql);
            this.rs = this.prsStmt.executeQuery();
            result.setDataAll(this.parseAllData())
                    .setTotalRows(this.getRowCount());
        } catch (Exception sqle) {
            System.out.println("Invalid Query");
            sqle.printStackTrace();
        } finally {
            this.close();
        }
        return result;
    }

    private void close() {
        try {
            if (this.prsStmt != null) {
                this.prsStmt.close();
            }

            if (this.rs != null) {
                this.rs.close();
            }
            this.dbConnection.close();
        } catch (SQLException sqle) {
            System.out.println("Unable to close result set and statement");
            sqle.printStackTrace();
        }
    }

    /**
     * @param sql
     * @param params
     * @return
     * @throws SQLException
     */
    private QueryDriver prepareSQL(String sql, List<Object> params) throws SQLException {
        this.prsStmt = this.dbConnection.getCon().prepareStatement(sql);
        int index = 1;
        for (Object obj : params) {
            if (obj instanceof Integer) {
                this.prsStmt.setInt(index, (int) obj);
            } else if (obj instanceof Float) {
                this.prsStmt.setFloat(index, (float) obj);
            } else {
                this.prsStmt.setString(index, (String) obj); //default
            }
            index++;
        }
        return this;
    }

    private List<Map<String, Object>> parseAllData() throws SQLException, ParseException {
        List<Map<String, Object>> data = new ArrayList<>();
        if (this.rs != null) {
//            ResultSetMetaData rsmd = this.rs.getMetaData();
            int count = this.getRowCount();
            for (int ix = 0; ix < count; ix++) {
                this.rs.next();
//                Map<String, Object> entry = new HashMap<>();
//                for (int i = 1; i <= rsmd.getColumnCount(); i++) {
//                    String type = rsmd.getColumnTypeName(i);
//                    switch (type) {
//                        case "INT":
//                            entry.put(rsmd.getColumnName(i), rs.getInt(i));
//                            break;
//                        default:
//                        case "VARCHAR":
//                            entry.put(rsmd.getColumnName(i), rs.getString(i));
//                            break;
//                        case "FLOAT":
//                            entry.put(rsmd.getColumnName(i), rs.getFloat(i));
//                            break;
//                        case "DATE":
//                            entry.put(rsmd.getColumnName(i), rs.getDate(i));
//                            break;
//                    }
//                }
                Map<String, Object> entry = this.parseData();
                data.add(entry);
            }
        }
        return data;
    }

    private int getRowCount() throws SQLException {
        this.rs.last();
        int count = rs.getRow();
        this.rs.beforeFirst();
        return count;
    }

    private Map<String, Object> parseData() throws SQLException, ParseException {
        Map<String, Object> entry = new HashMap<>();
        ResultSetMetaData rsmd = this.rs.getMetaData();
        for (int i = 1; i <= rsmd.getColumnCount() ; i++) {
            String type = rsmd.getColumnTypeName(i);
            System.out.println(type);
            switch (type) {
                case "INT":
                case "TINYINT":
                    entry.put(rsmd.getColumnName(i), this.rs.getInt(i));
                    break;
                default:
                case "VARCHAR":
                    entry.put(rsmd.getColumnName(i), this.rs.getString(i));
                    break;
                case "FLOAT":
                    entry.put(rsmd.getColumnName(i), this.rs.getFloat(i));
                    break;
                case "DATETIME":
                    String dt_st = this.rs.getString(i);
                    if (!this.rs.wasNull()) {
                        DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                        java.util.Date date = format.parse(dt_st);
                        entry.put(rsmd.getColumnName(i), date);
                    } else {
                        entry.put(rsmd.getColumnName(i), null);
                    }

                    break;
                case "DATE":
                    entry.put(rsmd.getColumnName(i), this.rs.getDate(i));
                    break;
            }
        }
        return entry;
    }
}
