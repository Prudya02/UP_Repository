package com.prud.task5;

import java.io.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet(name = "CheckServlet", urlPatterns = {"/check"})
public class CheckServlet extends HttpServlet {

    private static final String JSON = "{\"success\" :\"true\"}";

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("json");
        response.getWriter().write(JSON);
    }
}