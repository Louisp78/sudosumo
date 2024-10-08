package io.github.louisp78.sudosumo_backend.exposition;

import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

// For this example we will use the property spring.docker.compose.lifecycle-management=start_only with a redis container to obtain persistence

@RestController
public class HomeController {

    private final String HOME_VIEW_COUNT = "HOME_VIEW_COUNT";

    @GetMapping("/")
    public String home(Principal principal, HttpSession session) {
        incrementCount(session, HOME_VIEW_COUNT);
        return "Hello " + principal.getName();
    }

    @GetMapping("/count")
    public String count(HttpSession session) {
        return "Home view count : " + session.getAttribute(HOME_VIEW_COUNT);
    }

    private void incrementCount(HttpSession session, String attribute) {
        var homeViewCount = session.getAttribute(HOME_VIEW_COUNT) != null ? (Integer) session.getAttribute(attribute) : 0;
        session.setAttribute(HOME_VIEW_COUNT, homeViewCount += 1);
    }

}
