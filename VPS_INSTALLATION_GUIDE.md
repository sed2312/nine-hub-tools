# Nine Hub Tools - VPS Installation Guide

This guide provides step-by-step instructions for deploying Nine Hub Tools on a VPS using CloudPanel.

## 📋 Prerequisites

### System Requirements
- **VPS Provider**: Any Linux VPS (DigitalOcean, Linode, Vultr, etc.)
- **OS**: Ubuntu 20.04+ or Debian 11+
- **RAM**: Minimum 1GB (2GB recommended)
- **Storage**: 10GB+ available space
- **Domain**: Registered domain name (e.g., nineproo.com)

### Required Software
- **CloudPanel**: Control panel for server management
- **Node.js**: 18+ (or Bun runtime)
- **Git**: For code deployment
- **Nginx**: Web server (included with CloudPanel)

## 🚀 Step 1: VPS Setup with CloudPanel

### 1.1 Install CloudPanel

Connect to your VPS via SSH and install CloudPanel:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install curl wget -y

# Install CloudPanel
curl -sSL https://installer.cloudpanel.io/ce/v2/install.sh -o install.sh
sudo bash install.sh

# Note the admin credentials displayed after installation
```

### 1.2 Access CloudPanel

1. Open your browser and navigate to: `https://YOUR_SERVER_IP:8443`
2. Login with the admin credentials from installation
3. Change the default password immediately

### 1.3 Create Site

1. In CloudPanel dashboard, go to **Sites** → **Add Site**
2. Configure:
   - **Domain**: `nineproo.com` (your domain)
   - **Site Type**: **PHP** (we'll modify for Node.js)
   - **PHP Version**: 8.1 or higher
   - **Vhost Template**: **Generic**
3. Click **Create**

### 1.4 DNS Configuration

Update your domain's DNS records:

```
Type: A
Name: @
Value: YOUR_SERVER_IP

Type: A
Name: www
Value: YOUR_SERVER_IP
```

Wait for DNS propagation (can take up to 24 hours).

## 🔧 Step 2: Server Preparation

### 2.1 Install Node.js and Build Tools

SSH into your server and install Node.js:

```bash
# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install build tools
sudo apt-get install -y build-essential

# Optional: Install Bun (faster alternative to npm)
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc
```

### 2.2 Install Git

```bash
sudo apt-get install -y git
```

### 2.3 Clone Repository

Navigate to your site's directory and clone the repository:

```bash
# Go to site directory (adjust path as needed)
cd /home/cloudpanel/htdocs/nineproo.com

# Clone the repository
git clone https://github.com/sed2312/nineproohub.git .
# or if private repo:
# git clone https://YOUR_USERNAME:YOUR_TOKEN@github.com/sed2312/nineproohub.git .
```

## 🏗️ Step 3: Application Setup

### 3.1 Install Dependencies

```bash
# Install dependencies
npm install
# or with bun:
# bun install
```

### 3.2 Build Application

```bash
# Build for production
npm run build
# or with bun:
# bun run build
```

### 3.3 Verify Build

Check that the `dist/` directory was created with build files:

```bash
ls -la dist/
```

## 🌐 Step 4: Nginx Configuration

### 4.1 Update Site Configuration

In CloudPanel, go to **Sites** → **nineproo.com** → **Nginx** tab.

Replace the existing configuration with:

```nginx
# Nginx Configuration for Nine Hub Tools SPA

server {
    listen 80;
    listen [::]:80;
    server_name nineproo.com www.nineproo.com;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;

    # Content Security Policy
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self';" always;

    # SPA Routing - Redirect all requests to index.html
    location / {
        root /home/cloudpanel/htdocs/nineproo.com/current;
        try_files $uri $uri/ /index.html;
        index index.html;

        # Cache HTML files briefly
        expires -1;
        add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
    }

    # Cache static assets aggressively
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp)$ {
        root /home/cloudpanel/htdocs/nineproo.com/current;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Handle robots.txt and sitemap.xml
    location = /robots.txt {
        root /home/cloudpanel/htdocs/nineproo.com/current;
        try_files $uri =404;
        access_log off;
    }

    location = /sitemap.xml {
        root /home/cloudpanel/htdocs/nineproo.com/current;
        try_files $uri =404;
        access_log off;
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/x-javascript
        application/xml
        application/xml+rss
        application/json
        image/svg+xml;

    # Error pages
    error_page 404 /index.html;
}
```

### 4.2 SSL Certificate Setup

1. In CloudPanel, go to **Sites** → **nineproo.com** → **SSL** tab
2. Click **Free Let's Encrypt Certificate**
3. Enter your email and click **Create**
4. Wait for certificate generation

## 🚀 Step 5: Deploy Application

### 5.1 Initial Deployment

```bash
# Navigate to site directory
cd /home/cloudpanel/htdocs/nineproo.com

# Make deploy script executable
chmod +x deploy.sh

# Run initial deployment
./deploy.sh
```

### 5.2 Set Correct Permissions

```bash
# Set ownership to web user
sudo chown -R cloudpanel:cloudpanel /home/cloudpanel/htdocs/nineproo.com/current
sudo chmod -R 755 /home/cloudpanel/htdocs/nineproo.com/current
```

## 🔒 Step 6: Security Hardening

### 6.1 Firewall Configuration

In CloudPanel, go to **Services** → **Firewall** and ensure:

- **SSH (22)**: Allow from your IP only
- **HTTP (80)**: Allow from all
- **HTTPS (443)**: Allow from all
- **CloudPanel (8443)**: Allow from your IP only

### 6.2 Fail2Ban Setup (Optional)

```bash
# Install Fail2Ban
sudo apt install fail2ban -y

# Basic configuration
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

## 🔄 Step 7: Automated Deployment Setup

### 7.1 Create Deployment User (Optional)

```bash
# Create deployment user
sudo useradd -m -s /bin/bash deploy
sudo usermod -aG cloudpanel deploy

# Set password
sudo passwd deploy

# Allow SSH access
sudo mkdir -p /home/deploy/.ssh
sudo chmod 700 /home/deploy/.ssh
# Add your public key to /home/deploy/.ssh/authorized_keys
```

### 7.2 Setup Git Hooks (Optional)

Create `.git/hooks/post-receive` in your repository:

```bash
#!/bin/bash
cd /home/cloudpanel/htdocs/nineproo.com
./deploy.sh
```

Make it executable:
```bash
chmod +x .git/hooks/post-receive
```

## 📊 Step 8: Monitoring & Maintenance

### 8.1 Log Monitoring

```bash
# View Nginx access logs
sudo tail -f /home/cloudpanel/logs/nginx/nineproo.com.access.log

# View error logs
sudo tail -f /home/cloudpanel/logs/nginx/nineproo.com.error.log
```

### 8.2 Backup Strategy

Create a backup script `/home/cloudpanel/htdocs/nineproo.com/backup.sh`:

```bash
#!/bin/bash
BACKUP_DIR="/home/cloudpanel/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup application files
tar -czf $BACKUP_DIR/nineproo_$DATE.tar.gz /home/cloudpanel/htdocs/nineproo.com

# Keep only last 7 backups
cd $BACKUP_DIR
ls -t *.tar.gz | tail -n +8 | xargs rm -f

echo "Backup completed: $BACKUP_DIR/nineproo_$DATE.tar.gz"
```

Make executable and add to cron:

```bash
chmod +x /home/cloudpanel/htdocs/nineproo.com/backup.sh
# Add to crontab: 0 2 * * * /home/cloudpanel/htdocs/nineproo.com/backup.sh
```

### 8.3 Update Process

```bash
# Update application
cd /home/cloudpanel/htdocs/nineproo.com
git pull origin main
./deploy.sh

# Update dependencies (monthly)
npm audit fix
npm update

# Update Node.js (as needed)
# Follow Node.js update procedure
```

## 🧪 Step 9: Testing & Verification

### 9.1 Basic Tests

```bash
# Test HTTP response
curl -I https://nineproo.com

# Test all tool routes
curl -I https://nineproo.com/glass
curl -I https://nineproo.com/palette
curl -I https://nineproo.com/grid

# Test static assets
curl -I https://nineproo.com/favicon.ico
curl -I https://nineproo.com/og-image.png
```

### 9.2 Performance Testing

```bash
# Install Apache Bench
sudo apt install apache2-utils -y

# Basic load test
ab -n 100 -c 10 https://nineproo.com/
```

### 9.3 SSL Verification

```bash
# Check SSL certificate
openssl s_client -connect nineproo.com:443 -servername nineproo.com < /dev/null

# SSL Labs test
curl -s https://www.ssllabs.com/ssltest/analyze.html?d=nineproo.com
```

## 🚨 Troubleshooting

### Common Issues

**Site not loading:**
- Check DNS propagation: `nslookup nineproo.com`
- Verify Nginx configuration syntax: `sudo nginx -t`
- Check file permissions: `ls -la /home/cloudpanel/htdocs/nineproo.com/current`

**Build failures:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version`
- Verify disk space: `df -h`

**SSL issues:**
- Check certificate status in CloudPanel
- Verify domain DNS records
- Test with `curl -k https://nineproo.com`

**Performance issues:**
- Check server resources: `top`, `htop`
- Review Nginx access logs for bottlenecks
- Optimize images and assets

## 📞 Support

For issues specific to Nine Hub Tools:
- Check the [GitHub repository](https://github.com/sed2312/nineproohub)
- Review the [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)

For CloudPanel support:
- [CloudPanel Documentation](https://www.cloudpanel.io/docs/)
- [CloudPanel Community](https://community.cloudpanel.io/)

---

## 📋 Quick Reference

**Site Directory:** `/home/cloudpanel/htdocs/nineproo.com`
**Web Root:** `/home/cloudpanel/htdocs/nineproo.com/current`
**Nginx Config:** CloudPanel → Sites → nineproo.com → Nginx
**SSL Config:** CloudPanel → Sites → nineproo.com → SSL
**Logs:** `/home/cloudpanel/logs/nginx/`

**Useful Commands:**
```bash
# Deploy updates
cd /home/cloudpanel/htdocs/nineproo.com && ./deploy.sh

# Check site status
curl -I https://nineproo.com

# Restart Nginx
sudo systemctl restart nginx

# View logs
sudo tail -f /home/cloudpanel/logs/nginx/nineproo.com.access.log
```