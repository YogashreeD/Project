package com.hotelMenu;

public class parcel {
	
	private String id;
	private int quantity;
	
	
	@Override
	public String toString() {
		return "parcel [id=" + id + ", quantity=" + quantity + "]";
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
}
