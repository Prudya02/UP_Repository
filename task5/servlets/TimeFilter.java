package com.prud.task5;

import javax.servlet.*;
import javax.servlet.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@WebFilter(filterName = "TimeFilter", urlPatterns = "/*")
public class TimeFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws ServletException, IOException {
        long startTime = System.currentTimeMillis();
        chain.doFilter(request, response);
        long timeTaken = System.currentTimeMillis() - startTime;
        String method = ((HttpServletRequest) request).getMethod();
        String url = ((HttpServletRequest) request).getRequestURL().toString();
        System.out.printf("%s - %s - %dms%n", method, url, timeTaken);
    }
}