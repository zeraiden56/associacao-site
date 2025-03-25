FROM php:8.2-fpm

# Instala as dependências do PostgreSQL
RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo_pgsql pgsql
