# Deployment Guide

## Production Deployment Checklist

### Backend Deployment

#### 1. Environment Variables

Update your production `.env` file:

```env
PORT=5000
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_very_secure_random_secret_key
NODE_ENV=production
```

#### 2. MongoDB Setup

- Use MongoDB Atlas for cloud hosting
- Create a new cluster
- Whitelist your server IP
- Get connection string and update MONGO_URI

#### 3. Security Improvements

- Change JWT_SECRET to a strong random string (use: `openssl rand -base64 32`)
- Enable CORS only for your frontend domain
- Add rate limiting middleware
- Add helmet.js for security headers
- Enable HTTPS

#### 4. Deploy to Heroku (Example)

```bash
cd backend
heroku create eventhub-api
heroku config:set MONGO_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

#### 5. Deploy to Railway/Render

- Connect your GitHub repository
- Set environment variables in dashboard
- Deploy automatically on push

### Frontend Deployment

#### 1. Update Environment Variables

Create `.env.production`:

```env
VITE_API_URL=https://your-backend-api.com/api
```

#### 2. Build for Production

```bash
cd event-vite
npm run build
```

#### 3. Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

#### 4. Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

#### 5. Deploy to GitHub Pages

Add to `package.json`:

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

### Post-Deployment

1. Create admin user:

```bash
# SSH into your backend server
npm run create-admin
```

2. Test all endpoints:

- User registration
- User login
- Event creation
- Event registration

3. Monitor logs for errors

4. Set up backup strategy for MongoDB

### Recommended Services

**Backend Hosting:**

- Railway (Easy, free tier)
- Render (Free tier available)
- Heroku (Paid)
- DigitalOcean App Platform

**Frontend Hosting:**

- Vercel (Best for React/Vite)
- Netlify (Great free tier)
- GitHub Pages (Free)
- Cloudflare Pages

**Database:**

- MongoDB Atlas (Free tier: 512MB)
- Railway MongoDB (Included)

### Performance Optimization

1. Enable gzip compression in Express
2. Add Redis for caching
3. Implement pagination for events
4. Add image optimization
5. Use CDN for static assets

### Monitoring

1. Set up error tracking (Sentry)
2. Add analytics (Google Analytics)
3. Monitor API performance (New Relic)
4. Set up uptime monitoring (UptimeRobot)

### Backup Strategy

1. Enable MongoDB Atlas automated backups
2. Export data regularly
3. Version control all code changes
4. Document all configuration changes
