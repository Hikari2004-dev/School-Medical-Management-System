package com.school_medical.school_medical_management_system.VNPAY;

import com.school_medical.school_medical_management_system.VNPAY.Order;
import com.school_medical.school_medical_management_system.VNPAY.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class CheckoutService {

    @Autowired
    private OrderRepository orderRepository;

    public String createPaymentUrl(CreatePaymentRequest request) {
        String txnRef = String.valueOf(System.currentTimeMillis());
        Order order = new Order();
        order.setAmount(request.getAmount());
        order.setOrderInfo(request.getOrderInfo());
        order.setStatus("PENDING");
        order.setTxnRef(txnRef);
        orderRepository.save(order);

        // Trả về link demo, gắn txnRef vào orderInfo để test
        return "http://sandbox.vnpayment.vn/tryitnow/Home/CreateOrder"
                + "?amount=" + request.getAmount()
                + "&orderInfo="
                + URLEncoder.encode(request.getOrderInfo() + " | txnRef:" + txnRef, StandardCharsets.UTF_8)
                + "&txnRef=" + txnRef;
    }
}
