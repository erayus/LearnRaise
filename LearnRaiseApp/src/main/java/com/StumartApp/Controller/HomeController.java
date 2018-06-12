package com.StumartApp.Controller;

import com.StumartApp.Model.User;
import com.StumartApp.Utils.JsonResponse;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;


@RestController
@RequestMapping("/")
public class HomeController extends BaseController implements ControllerProvider {
    public HomeController() {
        super();
    }

    /**
     *
     * @param id
     * @return
     */
    @RequestMapping(path = "/{id}", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public String otherUser(@PathVariable(value = "id") int id) {
        User user = this.userQuery().findById(id);
        JsonResponse json = new JsonResponse();
        if (user.checkSelf()) {
            json.update("data", user.toJson())
                    .update("success", true);
        }
        return this.jsonParser().parseJson(json.getData());
    }

    /**
     *
     * @return
     */
    @RequestMapping(path = "/", method = RequestMethod.GET)
    public String indexAction(){
        if (!this.checkUserSession()) {
            this.redirect("/login");
        }
        return this.renderHTML("stumart_app");
    }
}
