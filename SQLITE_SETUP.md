# SQLite Database Setup Guide

## Current Configuration

The application is already configured to use SQLite as the default database:

### Database File Location
- **File**: `tk_fajar.db` (located in the `backend/` directory)
- **Type**: SQLite database file
- **Connection**: JDBC connection through HikariCP

### Current Application Properties
```properties
# SQLite Database Configuration
spring.datasource.url=jdbc:sqlite:tk_fajar.db
spring.datasource.driver-class-name=org.sqlite.JDBC
spring.datasource.hikari.maximum-pool-size=1

# JPA/Hibernate Configuration
spring.jpa.database-platform=org.hibernate.community.dialect.SQLiteDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.defer-datasource-initialization=true
```

## Database Schema

### Admins Table
```sql
CREATE TABLE admins (
    id INTEGER PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) DEFAULT 'admin',
    active BOOLEAN NOT NULL,
    created_at TIMESTAMP NOT NULL,
    last_login TIMESTAMP
);
```

### Registrations Table
```sql
CREATE TABLE registrations (
    id INTEGER PRIMARY KEY,
    parent_name VARCHAR(255) NOT NULL,
    child_name VARCHAR(255) NOT NULL,
    whatsapp VARCHAR(255) NOT NULL UNIQUE,
    tanggal_lahir DATE NOT NULL,
    alamat VARCHAR(255),
    created_at TIMESTAMP NOT NULL
);
```

## How to Access the Database

### Option 1: SQLite Command Line
```bash
# Navigate to backend directory
cd backend

# Open SQLite database
sqlite3 tk_fajar.db

# List tables
.tables

# View registrations
SELECT * FROM registrations;

# View admins
SELECT * FROM admins;

# Exit SQLite
.quit
```

### Option 2: GUI Tools

#### DB Browser for SQLite (Recommended)
1. Download from https://sqlitebrowser.org/
2. Install and run
3. Open File → Open Database → `backend/tk_fajar.db`
4. Browse data in user-friendly interface

#### DBeaver
1. Download from https://dbeaver.io/
2. Create new connection → SQLite
3. Browse to `backend/tk_fajar.db`
4. Manage database with professional interface

### Option 3: Programming Access

#### Python Example
```python
import sqlite3

# Connect to database
conn = sqlite3.connect('tk_fajar.db')
cursor = conn.cursor()

# Query registrations
cursor.execute("SELECT * FROM registrations")
registrations = cursor.fetchall()

# Close connection
conn.close()
```

#### Node.js Example
```javascript
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./tk_fajar.db');

db.all("SELECT * FROM registrations", (err, rows) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(rows);
});

db.close();
```

## Data Management

### Backup Database
```bash
# Navigate to backend directory
cd backend

# Create backup
cp tk_fajar.db tk_fajar_backup_$(date +%Y%m%d_%H%M%S).db

# Or use SQLite dump
sqlite3 tk_fajar.db ".dump" > tk_fajar_backup_$(date +%Y%m%d_%H%M%S).sql
```

### Restore Database
```bash
# Stop application if running

# Restore from backup
cp tk_fajar_backup_YYYYMMDD_HHMMSS.db tk_fajar.db

# Or restore from SQL dump
sqlite3 tk_fajar.db < tk_fajar_backup_YYYYMMDD_HHMMSS.sql
```

## Verify Connection

1. **Start Application**: Run the Spring Boot backend
   ```bash
   cd backend
   ./gradlew bootRun
   ```

2. **Check Logs**: Look for successful database initialization
   ```
   INFO: HikariPool-1 - Added connection
   INFO: Initialized JPA EntityManagerFactory
   ```

3. **Test Data Access**: Submit a registration form
   - Should save to `tk_fajar.db`
   - Check database file size increases

4. **Verify Tables**: Use SQLite browser or command line
   ```bash
   sqlite3 tk_fajar.db ".tables"
   ```

## Troubleshooting

### Database File Not Found
- **Symptom**: "File not found" error
- **Solution**: Ensure application has write permissions to `backend/` directory
- **Check**: The `tk_fajar.db` file will be created automatically

### Connection Issues
- **Check**: Ensure only one application instance is running
- **Verify**: Database file permissions
- **Test**: Use SQLite command line to open the database

### Data Not Persisting
- **Symptom**: Application works but data disappears on restart
- **Cause**: Database file being created in wrong directory
- **Fix**: Verify working directory when starting application

### Performance Issues
- **Index Recommendation**: Add index for faster queries
   ```sql
   CREATE INDEX idx_registrations_whatsapp ON registrations(whatsapp);
   CREATE INDEX idx_admins_username ON admins(username);
   ```

## Advantages of SQLite

✅ **Zero Configuration** - No separate database server needed  
✅ **Portable** - Single database file  
✅ **Fast** - Excellent for read-heavy applications  
✅ **Reliable** - ACID compliant  
✅ **No Network** - All local operations  
✅ **Small Footprint** - Minimal resource usage  
✅ **Backup Friendly** - Simple file copy operations  

The application is fully configured for SQLite and ready for production use!