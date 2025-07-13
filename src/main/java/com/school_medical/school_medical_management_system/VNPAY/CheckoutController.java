package com.school_medical.school_medical_management_system.VNPAY;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/payment")
public class CheckoutController {

    @Autowired
    private CheckoutService checkoutService;

    @Autowired
    private OrderRepository orderRepository; // Thêm dòng này

    @PostMapping("/create")
    public CreatePaymentResponse createPayment(@RequestBody CreatePaymentRequest request) {
        String paymentUrl = checkoutService.createPaymentUrl(request);
        return new CreatePaymentResponse(paymentUrl);
    }

    // Thêm đoạn này vào đây
    @GetMapping("/vnpay-return")
    public String vnpayReturn(@RequestParam("txnRef") String txnRef,
            @RequestParam("vnp_ResponseCode") String responseCode) {
        Optional<Order> orderOpt = orderRepository.findByTxnRef(txnRef);
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();
            if ("00".equals(responseCode)) {
                order.setStatus("SUCCESS");
            } else {
                order.setStatus("FAIL");
            }
            orderRepository.save(order);
            return "Cập nhật trạng thái thành công!";
        }
        return "Không tìm thấy đơn hàng!";
    }
}
