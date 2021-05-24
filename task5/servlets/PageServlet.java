package com.prud.task5;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;

@WebServlet(name = "PageServlet", urlPatterns = {"/page"})
public class PageServlet extends HttpServlet {

    private static final String PATH = "/jsp/page.jsp";

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher(PATH).forward(request, response);
    }
}