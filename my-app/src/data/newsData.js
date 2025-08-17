// Mock news data with full content
export const newsData = [
    {
        id: 1,
        title: "Chương trình tiêm vaccine COVID-19 cho học sinh",
        summary: "Bộ Y tế công bố kế hoạch triển khai tiêm vaccine COVID-19 cho học sinh từ 12 tuổi trở lên trong năm học 2025-2026.",
        content: `
      <div>
        <h3>Kế hoạch tiêm vaccine COVID-19 cho học sinh</h3>
        <p>Bộ Y tế vừa chính thức công bố kế hoạch triển khai tiêm vaccine COVID-19 cho học sinh từ 12 tuổi trở lên trong năm học 2025-2026. Đây là một bước quan trọng trong việc bảo vệ sức khỏe học sinh và cộng đồng.</p>
        
        <h4>Đối tượng tiêm chủng:</h4>
        <ul>
          <li>Học sinh từ 12-18 tuổi</li>
          <li>Sinh viên các trường đại học, cao đẳng</li>
          <li>Cán bộ giáo viên và nhân viên trong trường học</li>
        </ul>
        
        <h4>Lịch trình triển khai:</h4>
        <p>Chương trình sẽ được triển khai từ tháng 8/2025, bắt đầu từ các thành phố lớn như TP.HCM, Hà Nội, Đà Nẵng, sau đó mở rộng ra các tỉnh thành khác.</p>
        
        <h4>Vaccine được sử dụng:</h4>
        <p>Sử dụng các loại vaccine đã được Bộ Y tế phê duyệt: Pfizer-BioNTech, Moderna, và các vaccine trong nước đã qua thử nghiệm.</p>
        
        <h4>Lưu ý quan trọng:</h4>
        <ul>
          <li>Phụ huynh cần ký cam kết đồng ý tiêm chủng</li>
          <li>Học sinh có bệnh lý nền cần tham khảo ý kiến bác sĩ</li>
          <li>Sau tiêm cần theo dõi sức khỏe trong 30 phút</li>
        </ul>
        
        <p>Chương trình này nhằm đảm bảo an toàn cho việc học tập trực tiếp và bảo vệ sức khỏe cộng đồng trường học.</p>
      </div>
    `,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=400&fit=crop&crop=faces",
        category: "Sức khỏe",
        publishDate: "2025-07-02",
        source: "Báo Sức khỏe Đời sống",
        author: "BS. Nguyễn Văn An",
        tags: ["vaccine", "covid-19", "học sinh", "y tế trường học"],
        isHighlight: true,
        readTime: "5 phút đọc"
    },
    {
        id: 2,
        title: "Hướng dẫn dinh dưỡng cho học sinh mùa thi",
        summary: "Các chuyên gia dinh dưỡng đưa ra lời khuyên về chế độ ăn uống hợp lý giúp học sinh duy trì sức khỏe và tập trung trong mùa thi.",
        content: `
      <div>
        <h3>Dinh dưỡng hợp lý cho học sinh mùa thi</h3>
        <p>Mùa thi là thời gian căng thẳng nhất trong năm học. Việc duy trì chế độ dinh dưỡng hợp lý không chỉ giúp học sinh có đủ năng lượng học tập mà còn tăng cường khả năng tập trung và ghi nhớ.</p>
        
        <h4>Nguyên tắc dinh dưỡng cơ bản:</h4>
        <ul>
          <li><strong>Ăn đầy đủ 3 bữa chính:</strong> Không bỏ bữa, đặc biệt là bữa sáng</li>
          <li><strong>Cân bằng các nhóm chất:</strong> Protein, carbohydrate, chất béo, vitamin, khoáng chất</li>
          <li><strong>Uống đủ nước:</strong> 1.5-2 lít nước mỗi ngày</li>
          <li><strong>Hạn chế đường và caffeine:</strong> Tránh năng lượng giả tạo</li>
        </ul>
        
        <h4>Thực phẩm tốt cho não bộ:</h4>
        <ul>
          <li>Cá béo (cá hồi, cá thu): Giàu omega-3</li>
          <li>Quả óc chó, hạnh nhân: Cung cấp vitamin E</li>
          <li>Trái cây mọng (việt quất, dâu tây): Chống oxy hóa</li>
          <li>Rau lá xanh: Giàu folate và vitamin K</li>
          <li>Trứng: Cung cấp choline cho não</li>
        </ul>
        
        <h4>Thực đơn mẫu một ngày:</h4>
        <p><strong>Bữa sáng:</strong> Bánh mì nguyên cám + trứng + sữa tươi + trái cây</p>
        <p><strong>Bữa trưa:</strong> Cơm + thịt/cá + rau xanh + canh</p>
        <p><strong>Bữa tối:</strong> Cháo dinh dưỡng + thịt băm + rau củ</p>
        <p><strong>Bữa phụ:</strong> Sữa chua + hạt dinh dưỡng</p>
        
        <h4>Lưu ý đặc biệt:</h4>
        <ul>
          <li>Không ăn quá no trước khi học</li>
          <li>Tránh thức ăn nhanh và đồ uống có gas</li>
          <li>Bổ sung vitamin nhóm B nếu cần thiết</li>
        </ul>
      </div>
    `,
        image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=400&fit=crop&crop=center",
        category: "Dinh dưỡng",
        publishDate: "2025-07-01",
        source: "VnExpress Sức khỏe",
        author: "ThS. Trần Thị Bình",
        tags: ["dinh dưỡng", "học sinh", "mùa thi", "sức khỏe"],
        readTime: "4 phút đọc"
    },
    {
        id: 3,
        title: "Phòng chống cận thị ở học sinh",
        summary: "Tỷ lệ cận thị ở học sinh Việt Nam đang gia tăng đáng báo động. Các chuyên gia nhãn khoa đưa ra những lời khuyên quan trọng.",
        content: `
      <div>
        <h3>Tình trạng cận thị ở học sinh Việt Nam</h3>
        <p>Theo thống kê mới nhất, tỷ lệ cận thị ở học sinh Việt Nam đã tăng từ 25% năm 2015 lên 45% năm 2024. Đây là con số đáng báo động, đặc biệt trong bối cảnh học trực tuyến ngày càng phổ biến.</p>
        
        <h4>Nguyên nhân chính gây cận thị:</h4>
        <ul>
          <li><strong>Sử dụng thiết bị điện tử quá nhiều:</strong> Máy tính, điện thoại, tablet</li>
          <li><strong>Tư thế học tập không đúng:</strong> Ngồi quá gần sách, màn hình</li>
          <li><strong>Thiếu ánh sáng tự nhiên:</strong> Học trong nhà quá nhiều</li>
          <li><strong>Ít vận động ngoài trời:</strong> Không có thời gian thư giãn mắt</li>
        </ul>
        
        <h4>Biện pháp phòng chống:</h4>
        <ul>
          <li><strong>Quy tắc 20-20-20:</strong> Cứ 20 phút nhìn màn hình, nghỉ 20 giây, nhìn vật cách 20 feet (6m)</li>
          <li><strong>Tư thế ngồi đúng:</strong> Màn hình cách mắt 50-70cm, nghiêng xuống 10-20 độ</li>
          <li><strong>Ánh sáng phù hợp:</strong> Đủ sáng nhưng không chói, tránh phản chiếu</li>
          <li><strong>Thời gian ngoài trời:</strong> Ít nhất 2 tiếng/ngày</li>
        </ul>
        
        <h4>Bài tập thể dục cho mắt:</h4>
        <ol>
          <li>Nhắm mắt thật chặt 5 giây, sau đó mở to 5 giây (lặp 5 lần)</li>
          <li>Nhìn lên, xuống, trái, phải (mỗi hướng 5 giây)</li>
          <li>Xoay tròn nhãn cầu theo chiều kim đồng hồ và ngược lại</li>
          <li>Nhìn xa - gần xen kẽ (10 lần)</li>
        </ol>
        
        <h4>Khi nào cần đi khám:</h4>
        <ul>
          <li>Nheo mắt khi nhìn xa</li>
          <li>Đau đầu thường xuyên</li>
          <li>Mỏi mắt khi học</li>
          <li>Khó nhìn rõ bảng trong lớp</li>
        </ul>
        
        <p>Phòng chống cận thị cần sự phối hợp của gia đình, nhà trường và chính bản thân học sinh.</p>
      </div>
    `,
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop&crop=faces",
        category: "Mắt",
        publishDate: "2025-06-30",
        source: "Tuổi Trẻ Online",
        author: "BS. Lê Minh Duc",
        tags: ["cận thị", "mắt", "học sinh", "phòng chống"],
        readTime: "6 phút đọc"
    },
    {
        id: 4,
        title: "Khám sức khỏe định kỳ cho học sinh",
        summary: "Tầm quan trọng của việc khám sức khỏe định kỳ trong phát hiện sớm các bệnh lý ở học sinh và đảm bảo sự phát triển toàn diện.",
        content: `
      <div>
        <h3>Tầm quan trọng của khám sức khỏe định kỳ</h3>
        <p>Khám sức khỏe định kỳ là biện pháp quan trọng giúp phát hiện sớm các vấn đề sức khỏe, đảm bảo sự phát triển toàn diện của học sinh. Điều này đặc biệt quan trọng trong giai đoạn phát triển của trẻ em và thanh thiếu niên.</p>
        
        <h4>Tần suất khám sức khỏe:</h4>
        <ul>
          <li><strong>Học sinh tiểu học:</strong> 2 lần/năm</li>
          <li><strong>Học sinh trung học:</strong> 1 lần/năm</li>
          <li><strong>Học sinh có bệnh lý nền:</strong> Theo chỉ định bác sĩ</li>
        </ul>
        
        <h4>Các hạng mục khám chính:</h4>
        <ul>
          <li><strong>Khám tổng quát:</strong> Chiều cao, cân nặng, chỉ số BMI</li>
          <li><strong>Khám tim mạch:</strong> Huyết áp, nhịp tim, nghe tim phổi</li>
          <li><strong>Khám mắt:</strong> Thị lực, khúc xạ, đáy mắt</li>
          <li><strong>Khám răng miệng:</strong> Sâu răng, nướu, cắn khớp</li>
          <li><strong>Khám tai mũi họng:</strong> Thính lực, viêm họng, viêm mũi</li>
          <li><strong>Xét nghiệm máu:</strong> Công thức máu, đường huyết</li>
        </ul>
        
        <h4>Các bệnh thường gặp ở học sinh:</h4>
        <ul>
          <li>Cận thị (45% học sinh)</li>
          <li>Sâu răng (60% học sinh)</li>
          <li>Thiếu máu (20% học sinh nữ)</li>
          <li>Béo phì (15% học sinh thành thị)</li>
          <li>Vẹo cột sống (10% học sinh)</li>
        </ul>
        
        <h4>Chuẩn bị trước khi khám:</h4>
        <ul>
          <li>Mang theo sổ sức khỏe</li>
          <li>Danh sách thuốc đang dùng (nếu có)</li>
          <li>Trang phục thuận tiện cho khám</li>
          <li>Không ăn uống trước khi xét nghiệm máu</li>
        </ul>
        
        <h4>Sau khi khám:</h4>
        <ul>
          <li>Thực hiện theo chỉ định của bác sĩ</li>
          <li>Tái khám theo lịch hẹn</li>
          <li>Thông báo cho nhà trường về tình trạng sức khỏe</li>
          <li>Điều chỉnh chế độ sinh hoạt nếu cần</li>
        </ul>
        
        <p>Khám sức khỏe định kỳ không chỉ giúp phát hiện bệnh sớm mà còn tư vấn về dinh dưỡng, vận động và lối sống lành mạnh.</p>
      </div>
    `,
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&crop=center",
        category: "Y tế",
        publishDate: "2025-06-29",
        source: "Sức khỏe Đời sống",
        author: "BS. Phạm Thị Lan",
        tags: ["khám sức khỏe", "định kỳ", "học sinh", "y tế"],
        readTime: "5 phút đọc"
    },
    {
        id: 5,
        title: "Tăng cường miễn dịch cho trẻ em",
        summary: "Các phương pháp tự nhiên và an toàn để tăng cường sức đề kháng cho trẻ em, giúp các em có thể chống lại các bệnh tật thường gặp.",
        content: `
      <div>
        <h3>Tăng cường miễn dịch tự nhiên cho trẻ em</h3>
        <p>Hệ miễn dịch khỏe mạnh là yếu tố quan trọng giúp trẻ em chống lại các bệnh tật. Thay vì dựa vào thuốc, cha mẹ có thể áp dụng các phương pháp tự nhiên để tăng cường sức đề kháng cho con.</p>
        
        <h4>Nguyên tắc tăng cường miễn dịch:</h4>
        <ul>
          <li><strong>Dinh dưỡng đầy đủ:</strong> Cung cấp đủ vitamin, khoáng chất</li>
          <li><strong>Vận động thường xuyên:</strong> Tăng cường thể chất</li>
          <li><strong>Nghỉ ngơi hợp lý:</strong> Ngủ đủ giấc</li>
          <li><strong>Vệ sinh sạch sẽ:</strong> Phòng ngừa vi khuẩn</li>
        </ul>
        
        <h4>Thực phẩm tăng cường miễn dịch:</h4>
        <ul>
          <li><strong>Trái cây giàu vitamin C:</strong> Cam, chanh, kiwi, ổi</li>
          <li><strong>Rau lá xanh:</strong> Rau bina, cải bó xôi, rau muống</li>
          <li><strong>Sữa chua:</strong> Cung cấp probiotic tốt cho đường ruột</li>
          <li><strong>Tỏi, gừng:</strong> Kháng khuẩn tự nhiên</li>
          <li><strong>Hạt dinh dưỡng:</strong> Óc chó, hạt lanh, hạt chia</li>
        </ul>
        
        <h4>Thời gian nghỉ ngơi phù hợp:</h4>
        <ul>
          <li>Trẻ 3-5 tuổi: 10-13 giờ/ngày</li>
          <li>Trẻ 6-13 tuổi: 9-11 giờ/ngày</li>
          <li>Thanh thiếu niên: 8-10 giờ/ngày</li>
        </ul>
        
        <h4>Hoạt động thể chất:</h4>
        <ul>
          <li>Chạy bộ, đi bộ</li>
          <li>Bơi lội</li>
          <li>Đạp xe</li>
          <li>Các môn thể thao nhóm</li>
          <li>Yoga, thái cực quyền</li>
        </ul>
        
        <h4>Các biện pháp phòng bệnh:</h4>
        <ul>
          <li>Rửa tay thường xuyên</li>
          <li>Đeo khẩu trang khi cần thiết</li>
          <li>Tránh tiếp xúc với người bệnh</li>
          <li>Giữ môi trường sống sạch sẽ</li>
          <li>Tiêm vaccine đầy đủ</li>
        </ul>
        
        <h4>Dấu hiệu miễn dịch yếu:</h4>
        <ul>
          <li>Ốm vặt thường xuyên</li>
          <li>Mệt mỏi kéo dài</li>
          <li>Khó lành vết thương</li>
          <li>Rối loạn tiêu hóa</li>
        </ul>
        
        <p>Tăng cường miễn dịch là quá trình dài hạn, cần sự kiên trì và chế độ sinh hoạt khoa học.</p>
      </div>
    `,
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&crop=center",
        category: "Sức khỏe",
        publishDate: "2025-06-27",
        source: "VnExpress Sức khỏe",
        author: "BS. Nguyễn Thị Mai",
        tags: ["miễn dịch", "trẻ em", "sức khỏe", "phòng bệnh"],
        readTime: "6 phút đọc"
    },
    {
        id: 6,
        title: "An toàn thực phẩm trong bữa ăn học đường",
        summary: "Hướng dẫn đảm bảo an toàn thực phẩm cho bữa ăn bán trú, căng tin trường học và những lưu ý quan trọng cho phụ huynh.",
        content: `
      <div>
        <h3>An toàn thực phẩm tại trường học</h3>
        <p>An toàn thực phẩm tại trường học là vấn đề được nhiều phụ huynh và nhà trường quan tâm. Việc đảm bảo chất lượng bữa ăn không chỉ cung cấp dinh dưỡng mà còn bảo vệ sức khỏe học sinh.</p>
        
        <h4>Nguyên tắc an toàn thực phẩm cơ bản:</h4>
        <ul>
          <li><strong>Chọn nguồn gốc rõ ràng:</strong> Thực phẩm có tem nhãn, nguồn gốc</li>
          <li><strong>Bảo quản đúng cách:</strong> Nhiệt độ, độ ẩm phù hợp</li>
          <li><strong>Chế biến hợp lý:</strong> Nấu chín, vệ sinh sạch sẽ</li>
          <li><strong>Kiểm tra thường xuyên:</strong> Hạn sử dụng, chất lượng</li>
        </ul>
        
        <h4>Quy trình chuẩn bị bữa ăn:</h4>
        <ol>
          <li><strong>Mua sắm:</strong> Chọn nguyên liệu tươi, không dấu hiệu hỏng</li>
          <li><strong>Vận chuyển:</strong> Giữ lạnh, không để lẫn thực phẩm sống - chín</li>
          <li><strong>Bảo quản:</strong> Tủ lạnh, kho khô sạch sẽ</li>
          <li><strong>Chế biến:</strong> Rửa sạch, nấu chín kỹ</li>
          <li><strong>Phục vụ:</strong> Trong vòng 2 giờ sau khi nấu</li>
        </ol>
        
        <h4>Thực phẩm cần tránh:</h4>
        <ul>
          <li>Thực phẩm hết hạn sử dụng</li>
          <li>Thực phẩm có mùi lạ, màu sắc bất thường</li>
          <li>Thực phẩm để lâu ở nhiệt độ thường</li>
          <li>Đồ ăn từ nguồn không rõ ràng</li>
          <li>Thực phẩm chế biến sẵn để lâu</li>
        </ul>
        
        <h4>Tiêu chuẩn bếp ăn trường học:</h4>
        <ul>
          <li>Có giấy phép kinh doanh thực phẩm</li>
          <li>Nhân viên có chứng chỉ vệ sinh an toàn thực phẩm</li>
          <li>Trang thiết bị đạt tiêu chuẩn</li>
          <li>Quy trình chế biến minh bạch</li>
          <li>Có hệ thống kiểm soát chất lượng</li>
        </ul>
        
        <h4>Dấu hiệu ngộ độc thực phẩm:</h4>
        <ul>
          <li>Buồn nôn, nôn mửa</li>
          <li>Đau bụng, tiêu chảy</li>
          <li>Sốt, chóng mặt</li>
          <li>Mệt mỏi, yếu sức</li>
        </ul>
        
        <h4>Xử lý khi nghi ngờ ngộ độc:</h4>
        <ol>
          <li>Ngừng ăn ngay lập tức</li>
          <li>Uống nhiều nước sạch</li>
          <li>Không tự ý dùng thuốc</li>
          <li>Đến cơ sở y tế khám ngay</li>
          <li>Báo cáo cho nhà trường</li>
        </ol>
        
        <h4>Vai trò của phụ huynh:</h4>
        <ul>
          <li>Kiểm tra thực đơn hàng tuần</li>
          <li>Hỏi ý kiến con về chất lượng bữa ăn</li>
          <li>Phản hồi với nhà trường khi có vấn đề</li>
          <li>Giáo dục con về vệ sinh ăn uống</li>
        </ul>
        
        <p>An toàn thực phẩm cần sự hợp tác chặt chẽ giữa nhà trường, phụ huynh và cơ quan quản lý để đảm bảo sức khỏe học sinh.</p>
      </div>
    `,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&crop=center",
        category: "Dinh dưỡng",
        publishDate: "2025-06-26",
        source: "Tuổi Trẻ Online",
        author: "TS. Đinh Văn Thành",
        tags: ["an toàn thực phẩm", "bữa ăn học đường", "dinh dưỡng", "sức khỏe"],
        readTime: "7 phút đọc"
    }
];

export default newsData;
