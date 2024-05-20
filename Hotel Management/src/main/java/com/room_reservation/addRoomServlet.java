package com.room_reservation;

import java.io.IOException;
import java.sql.SQLException;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class addRoomServlet extends HttpServlet{
	private static final long serialVersionUID = 1L;
	
	public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
		String room_num = req.getParameter("numofroom");
		String fromdate = req.getParameter("fromdate");
		String todate = req.getParameter("todate");
		
		int numofroom = room_num == null ? 0 : Integer.parseInt(room_num);
		
		Booking book = new Booking("abc",numofroom,fromdate,todate);
		book.displayQ();
		try {
			book.display();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		res.sendRedirect("room_registration.html");
	}
}
