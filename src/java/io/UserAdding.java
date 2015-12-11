package io;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.Image;
import model.User;

@WebServlet("/registerServlet")
@MultipartConfig
public class UserAdding extends HttpServlet {

    EntityManager em;
    EntityManagerFactory emf;

    //Database settings
    private final String dbURL = "jdbc:mysql://192.168.56.1:3306/image-sharing";
    private final String dbUser = "admin";
    private final String dbPass = "password";

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        try (PrintWriter out = response.getWriter()) {
            //obtains file part of multipart request
            String username = request.getParameter("username").toLowerCase();
            String password = request.getParameter("password");
            String retype = request.getParameter("retype-password");

            Connection conn = null;
            String message = null;
            response.setContentType("text/plain");
            response.setCharacterEncoding("UTF-8");
            try {
                if (!retype.equals(password)) {
                    message = "Wrong retype";
                } else {
                    if (checkUsernameExist(username)) {
                        message = "User existed";
                    } else {
                        // connects to the database
                        DriverManager.registerDriver(new com.mysql.jdbc.Driver());
                        conn = DriverManager.getConnection(dbURL, dbUser, dbPass);

                        // constructs SQL statement
                        String sql = "INSERT INTO USER (UserName, Password, TotalPoints) values (?, ?, ?)";
                        PreparedStatement statement = conn.prepareStatement(sql);
                        statement.setString(1, username);
                        statement.setString(2, password);
                        statement.setString(3, "0");
                        // sends the statement to the database server
                        int row = statement.executeUpdate();
                        if (row > 0) {
                            message = "User added";
                        }
                    }
                }
            } catch (Exception e) {
                out.write("ERROR --> " + e.getMessage());
            } finally {
                out.write(message);
                out.close();
            }
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }

    public boolean checkUsernameExist(String username) {
        emf = Persistence.createEntityManagerFactory("Image_SharingPU");
        em = emf.createEntityManager();

        List<User> users = em.createNamedQuery("User.findByUserName").setParameter("userName", username).getResultList();

        return !users.isEmpty();
    }

}
