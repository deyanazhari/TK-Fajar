# GitHub Pages Deployment with Jekyll Configuration

This project is configured to deploy to GitHub Pages using Jekyll for better SEO, performance, and asset management.

## 🔧 Configuration Files Created

### 1. Jekyll Configuration (`_config.yml`)
- Site settings optimized for TK Fajar
- SEO meta tags and sitemap generation
- Asset compression and optimization
- GitHub Pages compatible settings

### 2. Jekyll Layout (`_layouts/default.html`)
- Responsive HTML5 structure
- SEO-optimized meta tags
- Open Graph and Twitter Card support
- Critical CSS for fast loading
- Analytics integration ready

### 3. Deployment Workflow (`.github/workflows/jekyll-deploy.yml`)
- Automatic deployment on push to main branch
- Node.js and Ruby environment setup
- React build process with GitHub Pages compatibility
- Jekyll site generation and deployment

### 4. Ruby Dependencies (`Gemfile`)
- Jekyll and GitHub Pages gems
- SEO and performance plugins
- Cross-platform compatibility

## 🚀 Deployment Process

### Automatic Deployment
1. Push to `main` branch → Triggers GitHub Actions
2. Builds React app with `/TK-Fajar` base URL
3. Generates Jekyll site with SEO optimization
4. Deploys to GitHub Pages

### Manual Local Development
```bash
# Install Ruby dependencies
bundle install

# Serve locally with Jekyll
bundle exec jekyll serve

# Or serve React development server
npm start
```

## 🌍 Environment Configuration

### GitHub Pages URL
- **URL:** `https://deyanazhari.github.io/TK-Fajar/`
- **Base URL:** `/TK-Fajar/`
- **Environment:** Production

### Environment Variables
- `PUBLIC_URL`: `/TK-Fajar`
- `REACT_APP_GITHUB_PAGES`: `true`

## 📁 Project Structure

```
frontend/
├── _config.yml              # Jekyll configuration
├── _layouts/
│   └── default.html         # Main HTML layout
├── index.html               # Jekyll front page
├── Gemfile                  # Ruby dependencies
├── .github/workflows/
│   └── jekyll-deploy.yml    # Deployment workflow
├── src/                     # React source code
└── build/                   # React build output
```

## 🔍 SEO Features

### Meta Tags
- Title and description optimization
- Open Graph tags for social sharing
- Twitter Card support
- Structured data ready

### Performance
- Critical CSS inlining
- Font preloading
- Asset compression
- Cache optimization

### Analytics Integration
Add to `_config.yml`:
```yaml
google_analytics: GA-TRACKING-ID
```

## 🛠️ Customization

### Add Custom CSS
Create `_sass/custom.scss`:
```scss
// Custom styles for TK Fajar
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Add Blog Posts
Create `_posts/2024-01-01-welcome.md`:
```markdown
---
layout: post
title: "Selamat Datang di TK Fajar"
date: 2024-01-01 10:00:00 +0700
---

Konten blog post di sini...
```

### Contact Form Integration
Add to `_layouts/default.html`:
```html
<form action="{{ site.baseurl }}/contact" method="POST">
  <!-- Form fields -->
</form>
```

## 🔧 Troubleshooting

### Build Issues
1. Check Ruby version compatibility (requires Ruby 3.1+)
2. Clear Jekyll cache: `bundle exec jekyll clean`
3. Verify base URL configuration

### Routing Issues
1. Ensure React Router uses basename: `basename={process.env.PUBLIC_URL}`
2. Check all navigation links use relative paths

### Asset Loading Issues
1. Verify all images are in `src/assets/`
2. Check asset paths in `static/` folder after build
3. Ensure font loading paths are correct

## 📊 Performance Monitoring

### Google PageSpeed Insights
- Target: 90+ score on mobile and desktop
- Monitor: Core Web Vitals
- Optimize: Image compression, lazy loading

### Analytics Setup
1. Google Analytics 4 integration
2. GitHub Pages traffic analytics
3. User behavior tracking

## 🔄 Continuous Integration

### GitHub Actions Features
- Automated testing on pull requests
- Build status notifications
- Rollback capabilities
- Environment isolation

### Branch Strategy
- `main`: Production deployment
- `develop`: Staging environment
- Feature branches: Testing only

---

**Deployed URL:** https://deyanazhari.github.io/TK-Fajar/  
**Repository:** https://github.com/deyanazhari/TK-Fajar