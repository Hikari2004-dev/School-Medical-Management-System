package com.school_medical.school_medical_management_system.VNPAY;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
public class CheckoutController {

    @Autowired
    private CheckoutService checkoutService;

    @PostMapping("/create")
    public CreatePaymentResponse createPayment(@RequestBody CreatePaymentRequest request) {
        String paymentUrl = checkoutService.createPaymentUrl(request);
        return new CreatePaymentResponse(paymentUrl);
    }
}
