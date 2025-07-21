# Giai đoạn build (dùng Java 21)
FROM eclipse-temurin:21-jdk as build

# Tạo thư mục và copy toàn bộ mã nguồn vào
WORKDIR /app
COPY . .

# Build ứng dụng bằng Maven Wrapper (nếu bạn có mvnw)
RUN ./mvnw clean package -DskipTests

# Giai đoạn chạy
FROM eclipse-temurin:21-jdk

WORKDIR /app
# Copy file jar đã build sang container
COPY --from=build /app/target/*.jar app.jar

# Mở cổng 8080 (hoặc cổng khác nếu bạn dùng)
EXPOSE 8080

# Chạy ứng dụng
ENTRYPOINT ["java", "-jar", "app.jar"]
