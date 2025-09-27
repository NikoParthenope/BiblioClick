# BIBLIOCLICK

BiblioClick is a Web site designed for the management of virtual communities dedicated to reading. The system implements a user authentication flow and provides dedicated interfaces for the creation, administration and participation in book clubs, with support for discussion threads and customized user areas.

The project was implemented as part of the Web Technologies course at the University of Naples "Parthenope," with the aim of applying principles of design and development of web applications based on client-side technologies.

# Main Features

- **User Authentication Module**: interfaces for registration and login with credential management.
- **Club Management System**: functionality for creating and configuring literary clubs.
- **Discussion Page**: pages dedicated to message exchange and content moderation for each club.
- **User Dashboard**: restricted area with profile information and club membership management.

# Components Used

- Python3
- MySQL
- HTML5
- JavaScript

# Installation

In order to run the software in question, be sure to follow the following steps:

1. **Cloning the repository**
    
    ```bash
    git clone https://github.com/NikoParthenope/BiblioClick
    ```
    
2. **Loading MySQL Database**
    
    ```bash
    mysql -u root -p
    create database BiblioClick
    mysql -u root -p BiblioClick<LatestDB/backup.sql
    ```
    
3. **Python backend**
    
    ```bash
    pip install Flask Flask-Cors
    pip install mysql-connector-python
    python3 Flask/backend.py
    ```
    
4. **Run**
    
    Open `index.html` with Live Server
