package com.prud.task5;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;

@WebServlet(name = "StatusServlet", urlPatterns = "/status")
public class StatusServlet extends HttpServlet {

    private static final String MESSAGE = "Application Is Running";

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.getWriter().println("<html><body>");
        response.getWriter().printf("<h1> %s </h1>%n", MESSAGE);
        response.getWriter().println("</body></html>");
    }
}