package com.StumartApp.Controller;

import com.StumartApp.Model.User;
import com.StumartApp.Utils.JsonResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;
import java.util.Arrays;

@Controller
@RequestMapping("/login") //Mount to the public
public class LoginController extends BaseController implements ControllerProvider {
    public LoginController() {
        super();
    }

    @RequestMapping(path = "", method = RequestMethod.GET)
    public String indexAction() {
        if (this.checkUserSession()) {
            this.redirect("/");
        }
        return this.renderHTML("login");
    }

    @RequestMapping(path = "/hello", method = RequestMethod.GET)
    public String abcd() {
        return this.renderHTML("stumart_app");
    }

    @ResponseBody
    @RequestMapping(path = "/in", method = RequestMethod.POST, produces = "application/json")
    public String loginUser() {
        JsonResponse json = new JsonResponse();
        json.registerField("message", "Unable to log in, please try again later");
        String email = this.request().getParameter("email");
        String password = this.request().getParameter("password");
        if (this.invoker().checkNullParams(Arrays.asList(email, password))) {
            User user = userQuery().findByEmailAndPassword(email, password);
            if (user.checkSelf()) {
                if (user.isVerified()) {
                    this.setUserIDSession(user.getUserID());
                    this.userLogQuery().addEntry(user.getUserID());
                    json.update("success", true);
                    json.update("data", user.toJson());
                    json.update("message", "");
                } else {
                    json.update("message", "Please verify your account before you login");
                }
            }
        } else {
            json.update("message", "The system did not receive your data, please try again");
        }
        return this.jsonParser().parseJson(json.getData());
    }

    @ResponseBody
    @RequestMapping(path = "/out", method = RequestMethod.GET)
    public String logOut(){
        this.destroyUserIDSession();
//        this.indexAction();
        return "";
    }
}
