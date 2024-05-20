package com.hotelMenu;


import java.io.IOException;
import java.sql.SQLException;

//import org.json.JSONObject;
//import org.json.JSONArray;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class orderServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	//post method
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
		String info = req.getParameter("orderlist");
		String pack = req.getParameter("orderlist2");
		System.out.println("---");
		//System.out.println(info);
		//System.out.println(pack);
		
		//string to json array
//		JSONArray jarray=new JSONArray(pack);
//		System.out.println(jarray);
		
		//json string maps to java object
		ObjectMapper mapper = new ObjectMapper();
		FoodPack fp = mapper.readValue(info, FoodPack.class);
		//System.out.println(fp.getOrderdate());
		parcel[] p = mapper.readValue(pack, parcel[].class);	
		for(parcel pp : p) {
			System.out.println(pp.getId());
		}
		
		ParcelDAO pd = new ParcelDAO();
		try {
			//pd.insertfood(p,fp);
			pd.displayorder();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		
		res.sendRedirect("hotelmenu.html");
	}
}
