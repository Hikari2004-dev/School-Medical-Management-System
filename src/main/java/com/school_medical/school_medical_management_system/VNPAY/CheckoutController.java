package com.school_medical.school_medical_management_system.VNPAY;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;
import org.springframework.http.ResponseEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.*;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "http://localhost:3000")
public class CheckoutController {

    private static final Logger logger = LoggerFactory.getLogger(CheckoutController.class);

    @Autowired
    private CheckoutService checkoutService;

    @Autowired
    private OrderRepository orderRepository;

    @PostMapping("/create")
    public ResponseEntity<CreatePaymentResponse> createPayment(@RequestBody CreatePaymentRequest request) {
        try {
            logger.info("Creating payment for user: {} with amount: {}", request.getUserId(), request.getAmount());
            String paymentUrl = checkoutService.createPaymentUrl(request);
            return ResponseEntity.ok(new CreatePaymentResponse(paymentUrl));
        } catch (Exception e) {
            logger.error("Error creating payment: ", e);
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/vnpay-return")
    public RedirectView vnpayReturn(@RequestParam Map<String, String> params) {
        logger.info("VNPAY return with parameters: {}", params);

        try {
            boolean isValid = checkoutService.verifyPayment(params);
            logger.info("Verification result: {}", isValid);

            if (isValid) {
                String txnRef = params.get("vnp_TxnRef");
                String responseCode = params.get("vnp_ResponseCode");

                Optional<Order> orderOpt = orderRepository.findByTxnRef(txnRef);
                if (orderOpt.isPresent()) {
                    Order order = orderOpt.get();
                    if ("00".equals(responseCode)) {
                        order.setStatus("SUCCESS");
                        order.setVnpTransactionNo(params.get("vnp_TransactionNo"));
                        orderRepository.save(order);

                        String redirectUrl = String.format(
                                "http://localhost:3000/payment/result?success=true&txnRef=%s&amount=%s&orderInfo=%s",
                                params.get("vnp_TxnRef"),
                                params.get("vnp_Amount"),
                                params.get("vnp_OrderInfo"));
                        return new RedirectView(redirectUrl);
                    } else {
                        order.setStatus("FAIL");
                        orderRepository.save(order);

                        String redirectUrl = String.format(
                                "http://localhost:3000/payment/result?success=false&txnRef=%s",
                                params.get("vnp_TxnRef"));
                        return new RedirectView(redirectUrl);
                    }
                }
            }

            return new RedirectView("http://localhost:3000/payment/result?success=false&error=invalid");
        } catch (Exception e) {
            logger.error("Error processing VNPAY return: ", e);
            return new RedirectView("http://localhost:3000/payment/result?success=false&error=exception");
        }
    }

    @GetMapping("/test")
    public ResponseEntity<Map<String, Object>> testEndpoint() {
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Payment API is working",
                "timestamp", new Date()));
    }

    @GetMapping("/user/{userId}/orders")
    public ResponseEntity<Map<String, Object>> getUserOrders(@PathVariable Long userId) {
        try {
            logger.info("Getting orders for user: {}", userId);

            List<Order> orders = orderRepository.findByUserIdAndStatus(userId, "SUCCESS");
            logger.info("Found {} orders for user {}", orders.size(), userId);

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "packages", orders,
                    "total", orders.size()));
        } catch (Exception e) {
            logger.error("Error getting user orders: ", e);
            return ResponseEntity.ok(Map.of("success", false, "message", "Error: " + e.getMessage()));
        }
    }
}
