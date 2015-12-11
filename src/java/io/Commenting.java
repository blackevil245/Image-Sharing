package io;

import java.io.IOException;
import java.io.PrintWriter;
import static java.lang.System.out;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.Calendar;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.DateFormat;
import java.util.List;

@WebServlet("/commentingServlet")
@MultipartConfig
public class Commenting extends HttpServlet {

    //Database settings
     private final String dbURL = "jdbc:mysql://127.0.0.1:3306/image-sharing";
    private final String dbUser = "root";
    private final String dbPass = "root";
    
     protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
         try (PrintWriter out = response.getWriter()) {
     
         String text = request.getParameter("comment");
         Connection conn = null;
         String message = null;
         
         if (text !=""); {
         
         try {
             
                // connects to the database
                   
                    DriverManager.registerDriver(new com.mysql.jdbc.Driver());
                    conn = DriverManager.getConnection(dbURL, dbUser, dbPass);

                    // constructs SQL statement
                    String sql = "INSERT INTO COMMENT (Time, Text) values (?,?)";
                    PreparedStatement statement = conn.prepareStatement(sql);
                    DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
                    statement.setString(1, dateFormat.format(Calendar.getInstance().getTime()));
                    statement.setString(2, text);
                    
                   
                    // sends the statement to the database server
                   int row = statement.executeUpdate();
                    if (row > 0) {
                        message = "Comment added";
                    }
                
            } catch (Exception e) {
                out.println("ERROR --> " + e.getMessage());
            } finally {
                out.println(message);
                out.close();
            }
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

}
     
    


     