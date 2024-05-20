package com.hotelMenu;

import java.sql.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

import com.room_reservation.JdbcConnection;

public class ParcelDAO {

	public void insertfood(parcel[] p,FoodPack fp) throws SQLException {
		//System.out.println(fp.getOrderdate()+" "+fp.getOrdertime());
		DateTimeFormatter df = DateTimeFormatter.ofPattern("d-M-yyyy");
		LocalDate orderdate = LocalDate.parse(fp.getOrderdate(),df);
		DateTimeFormatter tf = DateTimeFormatter.ofPattern("H-m-s");
		LocalTime ordertime = LocalTime.parse(fp.getOrdertime(),tf);
		
		Connection con = JdbcConnection.getConnection();
		String query = "Insert into parcel values(?,?,?,?,?)";
		PreparedStatement pst = con.prepareStatement(query);
		for(parcel pp : p) {
			pst.setString(1, fp.getPersonid());
			pst.setDate(2, Date.valueOf(orderdate));
			pst.setTime(3, Time.valueOf(ordertime));
			pst.setString(4, pp.getId());
			pst.setInt(5, pp.getQuantity());
		}
		pst.executeUpdate();
	}
	
	public void displayorder() throws SQLException {
		Connection con = JdbcConnection.getConnection();
		String query = "Select * from parcel";
		Statement stmt = con.createStatement();
		ResultSet rs = stmt.executeQuery(query);
		while(rs.next()) {
			System.out.println(rs.getString(1)+ " "+ rs.getDate(2)+" "+
					rs.getTime(3)+" "+rs.getString(4)+" "+rs.getInt(5));
		}
	}
}
