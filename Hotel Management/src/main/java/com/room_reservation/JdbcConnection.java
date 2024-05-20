package com.room_reservation;

import java.sql.*;

public class JdbcConnection {
	private static final String url = "jdbc:mysql://localhost:3306/hotelmenu";
	private static final String name = "root";
	private static final String password = "Yoga&2207";
	
	public static Connection getConnection() throws SQLException {
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		return DriverManager.getConnection(url, name, password);	
	}
}
