package com.school_medical.school_medical_management_system.VNPAY;

import org.apache.commons.codec.digest.HmacAlgorithms;
import org.apache.commons.codec.digest.HmacUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class CheckoutService {

    @Autowired
    private VnPayConfig vnPayConfig;

    public String createPaymentUrl(CreatePaymentRequest request) {
        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String vnp_TmnCode = vnPayConfig.getTmnCode();
        String vnp_Amount = String.valueOf(request.getAmount() * 100);
        String vnp_CurrCode = "VND";
        String vnp_TxnRef = String.valueOf(System.currentTimeMillis());
        String vnp_OrderInfo = request.getOrderInfo();
        String vnp_OrderType = "other";
        String vnp_Locale = "vn";
        String vnp_ReturnUrl = vnPayConfig.getReturnUrl();
        String vnp_IpAddr = "127.0.0.1";
        String vnp_CreateDate = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", vnp_Amount);
        vnp_Params.put("vnp_CurrCode", vnp_CurrCode);
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", vnp_OrderInfo);
        vnp_Params.put("vnp_OrderType", vnp_OrderType);
        vnp_Params.put("vnp_Locale", vnp_Locale);
        vnp_Params.put("vnp_ReturnUrl", vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
        Collections.sort(fieldNames);

        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        for (int i = 0; i < fieldNames.size(); i++) {
            String fieldName = fieldNames.get(i);
            String value = vnp_Params.get(fieldName);
            if ((value != null) && (value.length() > 0)) {
                hashData.append(fieldName).append('=').append(value);
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII)).append('=')
                        .append(URLEncoder.encode(value, StandardCharsets.US_ASCII));
                if (i < fieldNames.size() - 1) {
                    hashData.append('&');
                    query.append('&');
                }
            }
        }

        String vnp_SecureHash = new HmacUtils(HmacAlgorithms.HMAC_SHA_512, vnPayConfig.getHashSecret())
                .hmacHex(hashData.toString());
        query.append("&vnp_SecureHash=").append(vnp_SecureHash);

        return vnPayConfig.getPayUrl() + "?" + query.toString();
    }
}
