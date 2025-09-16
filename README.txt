#GoGreener

Full stack website with eco-friendly content. 
Visitors view events and other categories, which are posted by users and approved by admins.

##1. Prerequisites (for installation on Windows): 

1.1 Download java jdk 17 from Oracle JDK (www.oracle.com/java/technologies/downloads/#java21?er=221886) 

1.2 Verify installation:

	bash 
	java -version

1.3 Maven Download from Maven version 3.9.9 (https://maven.apache.org/download.cgi) 

1.4 Verify installation:

	bash 

	mvn -v 

1.5 Node.js (20.x) and npm 

	Download from Node.js official site https://nodejs.org/en/ npm

1.6 Verify installation:

	bash 
	node -v 
	npm -v 

1.7 MySQL Server (e.g., 8.x) MySQL Workbench (optional, for managing DB) 

	Download mysql shell for managing and visualizing your db (optional)

##2. Clone the Repository

	git clone https://github.com/maria-xenaki/go_greener 
	cd go_greener 
	
	git checkout gogreener1 (*branch with latest updates)

##3. Database Setup: Create a local database using the provided SQL file:

	mydb_schema_self_contained.sql

##4. Backend Setup (Spring Boot) 

	Go to backend folder: 

	cd backend 

	create a .env file with: 

	DB_URL=jdbc:mysql://127.0.0.1:3306/mydb
	DB_USERNAME=username
	DB_PASSWORD=password
	JWT_SECRET=your_jwt_secret
	MAIL_USERNAME=your_email
	MAIL_PASSWORD=your_password

##5. SERVER_PORT=8080 

	Run backend AND frontend (frontend bundle inside backend): # Maven 

	bash 
	mvn clean install
	mvn spring-boot:run 

	Backend and frontend should be accessible at: http://localhost:8080 

##6. Frontend Setup (React) (OPTIONAL: if you want to run frontend only)

	Go to frontend folder: 

	cd frontend 

6.1 Install dependencies and run: 

	frontend: 
	bash
	npm install 
	npm start 
	# opens at http://localhost:3000 Frontend should open in browser automatically 

##7. Demo Account 

	User: user 
	Password: 123 
	Role: Regular user (no admin rights) 
	*Admin features are not accessible for safety; see screenshots if needed. 

##8. Screenshots 

	Available inside docs/images 

##9. Future improvements 
	- implement language toggle
	- add dark mode
	- improve mobile responsiveness
	- go live using Render and switching to PostgreSQL
	- find entities posted by user
