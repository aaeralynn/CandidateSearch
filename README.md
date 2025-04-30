# Candidate Search – Aeralyn Neff

## Description  
Candidate Search is a single-page React + TypeScript application that allows users to browse, review, and save GitHub candidates one at a time. It interacts with the GitHub API to fetch and display detailed user profiles, and leverages localStorage to persist saved candidates across sessions. The design is clean, mobile-responsive, and interactive, delivering a smooth user experience.

---

## Features  

### GitHub Integration  
Fetches candidate data in real-time using the GitHub API, with support for secure access via a personal access token stored in a `.env` file.

### Candidate Review Flow  
Displays one GitHub candidate at a time with relevant info including name, username, avatar, location, company, email, and GitHub profile link.

### Save / Skip Functionality  
Users can save candidates for later or skip to the next one. Saved candidates persist using `localStorage`.

### Saved Candidates Page  
Displays a list of saved candidates with the same detailed information layout.

### Responsive Design  
Built with a mobile-first approach and styled for clean layout across various devices and screen sizes.

---

## User Story  
**AS A** hiring manager or recruiter  
**I WANT** to review GitHub candidates one at a time  
**SO THAT** I can easily save promising profiles and skip the rest  

---

## Acceptance Criteria  

### On Page Load  
- The app fetches a list of GitHub users.  
- The first candidate is displayed with full profile details.  

### Candidate Details  
Each candidate shows:  
- Full name (if available)  
- Username  
- Avatar image  
- Location  
- Email  
- Company  
- GitHub profile link  

### Review Buttons  
- `+` button saves the candidate and moves to the next.  
- `–` button skips the candidate and moves to the next.  

### Saved Candidates  
- Navigating to the saved candidates page shows all previously saved profiles.  
- Data is persisted using `localStorage`.  

### Empty States  
- If there are no candidates to review, a message is shown.  
- If no candidates have been saved, an appropriate message is displayed.  

---

## Installation  

### Clone the Repository  
```bash
git clone <https://github.com/yourusername/candidate-search-app>
cd into develop
Install Dependencies
npm install

Set Up Environment Variables
Create a .env file in the root and add your GitHub Personal Access Token:
VITE_GITHUB_API_TOKEN=your_personal_access_token

Run the Development Server
npm run dev

Usage
On load, view one GitHub candidate at a time.

Click + to save a candidate or – to skip.

Navigate to the "Saved Candidates" page to review saved profiles.

All saved candidates persist even after reloading the page.

Technologies Used
Frontend
React (TypeScript)

Vite

CSS / Responsive Styling

API
GitHub REST API v3

Tools
ESLint
Prettier
