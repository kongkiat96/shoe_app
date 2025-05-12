FROM php:8.4-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    zip unzip git curl libzip-dev \
    ca-certificates gnupg \
    libgd-dev  # Add GD library

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl gd  # Add gd extension

# Install Node.js (v20) + npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Set permissions
RUN usermod -u 1000 www-data && chown -R www-data:www-data /var/www

EXPOSE 9000

CMD ["php-fpm"]
