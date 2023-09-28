package io.github.louisp78.sudosumo_backend.exposition;

import io.github.louisp78.sudosumo_backend.application.UserService;
import io.github.louisp78.sudosumo_backend.domain.UserDomain;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
public class UserControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService service;

    @Test
    public void testCreateUser() throws Exception {
        when(service.createUser(any())).thenReturn(new UserDomain());
        this.mockMvc.perform(post("/users/create")
                        .contentType("application/json")
                        .content("{\"token\":\"token\"}"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string("User created"));

    }

    @Test
    public void testGetUserByToken() throws Exception {
        when(service.getUserByEmail(any())).thenReturn(new UserDomain(0L, "token", 0));
        this.mockMvc.perform(get("/users")
                        .contentType("application/json")
                        .content("{\"token\":\"token\"}"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string("{\"id\":0,\"score\":0}"));
    }

    @Test
    public void testGetUserByTokenWithWrongToken() throws Exception {
        when(service.getUserByEmail(any())).thenReturn(null);
        this.mockMvc.perform(get("/users")
                        .contentType("application/json")
                        .content("{\"token\":\"token\"}"))
                .andDo(print())
                .andExpect(status().isNotFound());
    }

}
