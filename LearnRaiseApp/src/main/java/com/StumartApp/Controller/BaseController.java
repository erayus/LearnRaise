package com.StumartApp.Controller;

import com.StumartApp.Container.QueryContainer;
import com.StumartApp.Query.UserLogQuery;
import com.StumartApp.Query.UserQuery;
import com.StumartApp.Query.UserVerifyQuery;
import com.StumartApp.Utils.Invoker;
import com.StumartApp.Utils.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class BaseController {
    private HttpServletRequest _request;
    private Invoker invoker;
    private QueryContainer _queryContainer = new QueryContainer();
    private JsonParser _jsonParser;
    private HttpServletResponse _response;

    @Autowired
    private HttpSession _session;

    protected final String renderHTML(String template_name) {
        System.out.println("\n\n Rendering: " + template_name + ".html\n\n");
        return "/view/" + template_name + ".html";
    }

    @PostConstruct
    public void init() {
        this._jsonParser = new JsonParser();
        this.invoker = Invoker.getInstances();
        this._queryContainer.registerQuery(new UserQuery())
            .registerQuery(new UserLogQuery())
            .registerQuery(new UserVerifyQuery())
        ;
    }

    @Autowired
    public void setRequest(HttpServletRequest request) {
        this._request = request;
    }

    @Autowired
    public void setResponse(HttpServletResponse response) {
        this._response = response;
    }

    protected final HttpServletRequest request() {
        return this._request;
    }

    protected final QueryContainer queryContainer() {
        return this._queryContainer;
    }

    protected final Invoker invoker() {
        return this.invoker;
    }

    protected final JsonParser jsonParser() {
        return this._jsonParser;
    }

    /*----------- QUERY GETTER ----------------*/

    protected final UserLogQuery userLogQuery() {
        return (UserLogQuery) this.queryContainer().getQuery(UserLogQuery.class.getName());
    }

    protected final UserVerifyQuery userVerifyQuery() {
        return (UserVerifyQuery) this.queryContainer().getQuery(UserVerifyQuery.class.getName());
    }

    protected final UserQuery userQuery() {
        return (UserQuery) this.queryContainer().getQuery(UserQuery.class.getName());
    }

    /*------------------END---------------------*/

    protected final HttpServletResponse response() {
        return this._response;
    }

    protected final int getUserIDSession() {
        int nb = 0;
        if (this.session() != null && this.invoker.checkObject(this.session().getAttribute("user_id"))) {
            nb = (int) this.session().getAttribute("user_id");
        }
        return nb;
    }

    protected final void setUserSession(String key_name, Object data) {
        if (this.session() != null) {
            this.session().setAttribute(key_name, data);
        }
    }

    protected final HttpSession session() {
        if (this._session == null) {
            this._session = this._request.getSession();
        }
        return this._session;
    }

    protected final void setUserIDSession(int id) {
        this.setUserSession("user_id", id);

    }

    protected final void destroyUserIDSession() {
        int uid = this.getUserIDSession();
        this.userLogQuery().loggingOut(uid);
        this.setUserIDSession(0);
    }

    protected final boolean checkUserSession() {
        return  this.getUserIDSession() > 0;
    }

    protected final void redirect(String path) {
        try {
            this.response().sendRedirect(path);
        } catch (IOException ioe) {
            System.out.println("\n\nUnable to reirect the page.\n\n");
            ioe.printStackTrace();
        }
    }
}
