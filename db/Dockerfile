FROM mysql:8.0

# MySQL 환경 변수 설정
ENV MYSQL_ROOT_PASSWORD=1234 \
    MYSQL_DATABASE=siop-db

# MySQL 기본 포트 노출
EXPOSE 3306

# 초기화 SQL 스크립트 복사
COPY ./init/siop-db.sql /docker-entrypoint-initdb.d/