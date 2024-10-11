FROM openjdk:17

ENV APP_HOME=/app

ARG JAR_FILE_PATH=build/libs/sucpi-0.0.1-SNAPSHOT.jar

WORKDIR $APP_HOME

COPY $JAR_FILE_PATH app.jar

EXPOSE 4502

ENTRYPOINT ["java", "-jar", "app.jar"]