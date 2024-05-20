package com.room_reservation;

import java.sql.Date;
import java.sql.SQLException;
import java.time.*;

//Booking history
public class Booking {
	String name;
	int numofroom;
	LocalDate fromdate;
	LocalDate todate;
	int[] checkroom = new int[10];
	
	Booking(String name,int roomquan, String datefrom,String dateto){
		this.name=name;
		numofroom = roomquan;
		fromdate=LocalDate.parse(datefrom);
		todate=LocalDate.parse(dateto);
	}
	
	public void display() throws SQLException {
		RoomTable rt = new RoomTable();
    	rt.displayRoom();
	}
	
	public void displayQ(){
		System.out.println(fromdate+" "+todate+" "+this.numofroom);
	}
	
	public boolean isAvailable() throws SQLException {
		if(this.numofroom>=10 || this.numofroom<=0) {
			return false;
		}
		RoomTable rt = new RoomTable();
		checkroom = rt.checkRoomList(checkroom, fromdate, todate);

		int c=0;
		for(int i=0 ; i<this.checkroom.length ; i++) {
			if(checkroom[i]==0)
				c++;
		}
		if(c<this.numofroom)
			return false;
		
		for(int i=0 ; i<this.checkroom.length ; i++) {
			System.out.println(checkroom[i]);
			if(this.checkroom[i]==0) {
				rt.insertroom(i+1,Date.valueOf(fromdate),Date.valueOf(todate));
				numofroom--;
			}
			if(numofroom==0)
				return true;
		}
		return false;
	}
}

