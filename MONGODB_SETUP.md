# MongoDB Setup Guide

## Option 1: Local MongoDB Installation

### Install MongoDB on Windows
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Run the installer and choose "Complete" setup
3. Install MongoDB Compass (GUI tool)
4. MongoDB will run as a service by default on port 27017

### Install MongoDB on macOS
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Install MongoDB on Linux (Ubuntu/Debian)
```bash
# Import public key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Add repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update and install
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start service
sudo systemctl start mongod
sudo systemctl enable mongod
```

## Option 2: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/atlas
2. Create a free account
3. Create a new cluster (free tier available)
4. Create a database user with password
5. Configure network access (whitelist IP address)
6. Get connection string

## Configuration

### For Local MongoDB
No additional configuration needed - the application will connect to `localhost:27017` by default.

### For MongoDB Atlas
Update `application.properties`:

```properties
# Comment out local configuration
# spring.data.mongodb.host=localhost
# spring.data.mongodb.port=27017

# Add Atlas connection string
spring.data.mongodb.uri=mongodb+srv://username:password@cluster.mongodb.net/tk_fajar
```

## Verify Connection

1. Start MongoDB service
2. Run the Spring Boot application
3. Check logs for successful MongoDB connection
4. Access the application at http://localhost:3000
5. Submit a registration form to test database insertion

## MongoDB Compass (GUI Tool)

1. Open MongoDB Compass
2. Connect with: `mongodb://localhost:27017`
3. You should see the `tk_fajar` database
4. Browse the `registrations` collection to see submitted data

## Troubleshooting

### Connection Issues
- Verify MongoDB is running: `mongod` (should be running on port 27017)
- Check firewall settings
- Verify connection string format

### Database Not Found
- MongoDB creates databases automatically on first write operation
- Submit a registration form to create the database and collection

### Performance
- For production, consider adding indexes:
```javascript
// In MongoDB shell or Compass
db.registrations.createIndex({ "whatsapp": 1 }, { unique: true })
```