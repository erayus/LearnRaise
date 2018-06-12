package com.StumartApp.Controller;

import com.StumartApp.Helper.EmailHelper;
import com.StumartApp.Utils.JsonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;

@RestController
@RequestMapping("/register")
public class RegisterController extends BaseController implements ControllerProvider {
    public RegisterController() {
        super();
    }

    @RequestMapping(path = "/new", method = RequestMethod.POST, produces = "application/json")
    @ResponseBody
    public String newUser() {
        JsonResponse json = new JsonResponse();
        json.registerField("message", "Unable to receive your data, please try again !!!")
                .removeEntry("data");
        String email = this.request().getParameter("email");
        String password = this.request().getParameter("password");
        if (this.invoker().checkNullParams(Arrays.asList(email, password))) {
            EmailHelper emailHelper = new EmailHelper();
            password = this.invoker().stringFilter(password);
            if (this.invoker().isEmail(email)) {
                email = this.invoker().emailFilter(email);
                int uid = this.userQuery().createNewUser(email, password);
                boolean injected = this.userVerifyQuery().createUserVerifyEntry(uid);
                emailHelper.setUrl("http://localhost:80/send-mail/" + uid);
                boolean success = emailHelper.sendVerifyTokenEmail();
                System.out.println("\n\n\n" + success + "\n\n\n");
                if (injected && success) {
                    json.update("success", true);
                    json.update("message", "");
                } else {
                    json.update("message", "Unable to process your request at the moment, please try again later !!! ");
                }
            }
        }
        return this.jsonParser().parseJson(json.getData());
    }


    @RequestMapping(path = "/", method = RequestMethod.GET)
    public String indexAction() {
        return this.renderHTML("stumart_app");
    }
}
