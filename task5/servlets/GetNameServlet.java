package com.prud.task5;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;

@WebServlet(name = "GetNameServlet", urlPatterns = {"/get"})
public class GetNameServlet extends HttpServlet {

    private static final String USER_NAME = "name";
    private static final int NAME_LIMIT = 100;
    private static final String ERROR_NAME_MESSAGE = "Name is too long";

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String name = request.getParameter(USER_NAME);
        if (name.length() > NAME_LIMIT) {
            throw new IOException(ERROR_NAME_MESSAGE);
        }
        response.getWriter().println("<html><body>");
        response.getWriter().printf("<h1> Name is %s</h1>%n", name);
        response.getWriter().println("</body></html>");
    }
}