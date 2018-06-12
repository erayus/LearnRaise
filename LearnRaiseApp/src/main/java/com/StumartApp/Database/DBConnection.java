package com.StumartApp.Database;


import com.mysql.jdbc.jdbc2.optional.MysqlDataSource;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import java.io.FileReader;
import java.sql.Connection;
import java.sql.SQLException;


public class DBConnection {
    private MysqlDataSource dataSource = new MysqlDataSource();
    private String url;
    private long port;
    private String user;
    private String password;
    private String db;

    private Connection con = null;

    public DBConnection(String file_path) {
        this.init(file_path);
        this.setCredentials();
        this.setConnection();
    }

    private void init(String file_path) {
        JSONParser jsonParser = new JSONParser();
        try {
            FileReader fileReader = new FileReader(file_path);
            JSONObject jsonObject = (JSONObject) jsonParser.parse(fileReader);
            this.url = (String) jsonObject.get("host");
            this.port = (long) jsonObject.get("port");
            this.user = (String) jsonObject.get("username");
            this.password = (String) jsonObject.get("password");
            this.db = (String) jsonObject.get("db");
        } catch (Exception e) {
            System.out.println("\n\n\n Unable to load the file from : " + file_path + "\n\n\n");
            e.printStackTrace();
        }
    }

    private final DBConnection setCredentials() {
        dataSource.setServerName(this.url);
        dataSource.setPortNumber((int) this.port);
        dataSource.setUser(this.user);
        dataSource.setPassword(this.password);
        dataSource.setDatabaseName(this.db);
        return this;
    }

    public DBConnection setConnection() {
        try {
            this.con = dataSource.getConnection();
        } catch (SQLException sqle) {
            System.out.println("Unable to connect to the database due to bad credentials provided");
        }
        return this;
    }

    public Connection getCon() {
        if (this.con == null) {
            this.setCredentials().setConnection();
        }
        return con;
    }

    public DBConnection close() throws SQLException {
        if (this.con != null) {
            this.con.close();
        }
        return this;
    }

    /**
     * @return
     */
    public boolean isNull() {
        boolean close = false;
        try {
            if (this.con == null) {
                close = true;
            } else if (this.con.isClosed()) {
                close = true;
            }
        } catch (SQLException sqle) {
            System.out.println("\n\n\n");
            sqle.printStackTrace();
            System.out.println("\n\n\n");
        }
        return close;
    }
}
