package com.school_medical.school_medical_management_system.VNPAY;

public class CreatePaymentRequest {
     private long amount;
    private String orderInfo;

    // Getters and setters
    public long getAmount() { return amount; }
    public void setAmount(long amount) { this.amount = amount; }
    public String getOrderInfo() { return orderInfo; }
    public void setOrderInfo(String orderInfo) { this.orderInfo = orderInfo; }
}
