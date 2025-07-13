package com.school_medical.school_medical_management_system.VNPAY;

import com.school_medical.school_medical_management_system.VNPAY.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByTxnRef(String txnRef);
}
