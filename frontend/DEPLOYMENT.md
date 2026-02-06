# GitHub Pages Deployment Configuration

This project is configured to automatically deploy to GitHub Pages when pushed to the main branch.

## Setup Instructions

### 1. Update Homepage URL
In `package.json`, replace the homepage field with your actual GitHub Pages URL:

```json
"homepage": "https://[YOUR_USERNAME].github.io/[REPO_NAME]"
```

Replace:
- `[YOUR_USERNAME]` with your GitHub username
- `[REPO_NAME]` with your repository name

### 2. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click Settings → Pages
3. Under "Build and deployment", set Source to "GitHub Actions"

### 3. Deploy Commands

**Manual Deployment:**
```bash
npm run deploy
```

**Automatic Deployment:**
- Push to main branch → Automatic deployment
- Pull requests → Build test only (no deployment)

### 4. Environment Variables (Optional)
If you need environment variables:
1. Go to repository Settings → Secrets and variables → Actions
2. Add your secrets (e.g., API URLs, tokens)

### 5. Important Notes

- **Router Configuration:** The app uses `basename={process.env.PUBLIC_URL}` for proper routing on GitHub Pages
- **API Configuration:** Make sure API URLs use absolute paths (not localhost) for production
- **Image Paths:** All images are imported from `src/assets` to ensure they're included in the build

### 6. Troubleshooting

**404 Errors on Route Navigation:**
- The BrowserRouter basename configuration should handle this
- Ensure all navigation uses relative paths from the root

**Images Not Loading:**
- Verify images are in `src/assets/` folder
- Import images using ES6 import syntax

**API Connection Issues:**
- Update API URLs in production to point to your deployed backend
- Consider using environment variables for different environments

### 7. Build Process

The GitHub Actions workflow:
1. Checks out the latest code
2. Sets up Node.js environment
3. Installs dependencies
4. Builds the React app
5. Deploys to GitHub Pages (main branch only)

The build output will be available at your GitHub Pages URL.