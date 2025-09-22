# Kabarangay Website

A static website for barangay-level services and community information. It provides announcements, a directory of officials, service request forms, and request tracking.

# Project Structure

kabarangay-website-main/
├── .gitignore              # Ignored files for Git
├── README.md               # Documentation (this file)
├── index.html              # Homepage
├── announcements.html      # Announcements page
├── directory.html          # Barangay directory
├── services.html           # List of barangay services
├── request.html            # Service request form
├── status.html             # Status information
├── track-request.html      # Track service request
│
├── assets/
│   ├── css/                # Stylesheets
│   │   ├── document-request.css
│   │   ├── footer.css
│   │   ├── global.css
│   │   ├── header.css
│   │   ├── main.css
│   │   ├── nav.css
│   │   ├── style.css
│   │   └── track-request.css
│   └── js/                 # JavaScript files
│       ├── announcements.js
│       ├── directory.js
│       ├── header.js
│       ├── partials.js
│       └── script.js
│
├── data/                   # Static JSON data
│   ├── announcements.json
│   └── officials.json
│
└── partials/               # Reusable HTML snippets
    ├── document-request.html
    ├── footer.html
    ├── header.html
    └── track-request.html

# Key Components

HTML Pages → Different sections of the website (home, announcements, directory, services, request, status, tracking).
assets/css → Modular CSS files for styling different sections (header, footer, navigation, etc.).
assets/js → JavaScript handling page logic, dynamic content, and loading partials.
data → JSON files storing announcements and officials.
partials → HTML snippets (header, footer, request form, etc.) dynamically injected into pages.


# Running the Project Locally

# Option 1: Open directly

Clone or download this repository.
Open index.html in your browser.
Navigate through the site normally.


# Option 2: Run with a local server

VS Code Live Server Extension
Right-click index.html → “Open with Live Server”.
