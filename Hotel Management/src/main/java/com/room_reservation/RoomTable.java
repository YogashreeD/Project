package com.room_reservation;

import java.sql.*;
import java.time.LocalDate;

public class RoomTable {
	public void displayRoom() throws SQLException {
		String query = "Select * from rooms";
		Connection con = JdbcConnection.getConnection();
		Statement stmt = con.createStatement();
		ResultSet rs = stmt.executeQuery(query);
		while(rs.next()) {
			System.out.println(rs.getString(1)+" "+rs.getInt(2)+" "+rs.getDate(3)+" "+rs.getDate(4));
		}
	}
	
	//get checkroom
	public int[] checkRoomList(int[] checkroom,LocalDate fromdate, LocalDate todate) throws SQLException{
		String query = "Select * from rooms";
		Connection con = JdbcConnection.getConnection();
		Statement stmt = con.createStatement();
		ResultSet rs = stmt.executeQuery(query);
		while(rs.next()) {
			Date roomfrom = rs.getDate(3);
			Date roomto = rs.getDate(4);
			int num = rs.getInt(2);
			if(booleandate(roomfrom,fromdate) || booleandate(roomto,todate)) {
				System.out.println("true");
				checkroom[num-1]=1;
			}
		}
		return checkroom;
	}
	
	public boolean booleandate(Date roomdate, LocalDate thisdate) {
		LocalDate room = roomdate.toLocalDate();
		if((thisdate.isEqual(room) || thisdate.isEqual(room))
				||(thisdate.isAfter(room) && thisdate.isBefore(room))) {
			return true;
		}
		else {
			return false;
		}
	}
	
	//insert new row
	public void insertroom(int roomnum, Date fromdate, Date todate) throws SQLException {
		String query = "Insert into rooms values(?,?,?,?)";
		Connection con = JdbcConnection.getConnection();
		PreparedStatement pst = con.prepareStatement(query);
		pst.setString(1, "1");
		pst.setInt(2, roomnum);
		pst.setDate(3, fromdate);
		pst.setDate(4, todate);
		int row = pst.executeUpdate();
		System.out.println(row);
	}
}
