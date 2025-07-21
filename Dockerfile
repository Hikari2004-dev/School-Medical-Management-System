# Giai đoạn build
FROM eclipse-temurin:21-jdk as build

WORKDIR /app
COPY . .

# Cấp quyền thực thi cho script mvnw
RUN chmod +x mvnw

# Build project bằng Maven Wrapper
RUN ./mvnw clean package -DskipTests

# Giai đoạn chạy
FROM eclipse-temurin:21-jdk
WORKDIR /app

# Copy file jar đã build
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
