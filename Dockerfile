FROM php:8.4-fpm

RUN apt-get update && apt-get install -y \
    unzip \
    nodejs \
    npm \
    libpq-dev

RUN docker-php-ext-install pdo_pgsql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

EXPOSE 9000

CMD ["php-fpm"]