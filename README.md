Campers

Campers is a website for searching and booking campervans. It features filtering, pagination, navigation, form submission simulation, and saving favorites.

Technologies
React 19

Redux Toolkit

React Router DOM

React Datepicker

React Hot Toast

Axios

Yup (form validation)

Vite (build tool)

CSS Modules

ESLint

Features
Filtering and pagination of campers

Search by various parameters

Navigation between catalog and reviews pages

Simulated booking form submission with validation

Adding and saving favorites

Custom DatePicker with date selection limits

Working with API backend (note: the backend returns 404 on invalid requests, which is difficult to handle on the frontend)

Installation and Running
Clone the repository:

git clone <your-repo-url>
cd campers
Install dependencies:

npm install

# or

yarn
Run locally:

npm run dev

# or

yarn dev
Open http://localhost:5173 in your browser.

Scripts
npm run dev — run in development mode

npm run build — build the project

npm run preview — preview the build

npm run lint — run ESLint to check code

Project Structure
src/components — React components

src/redux — Redux logic (slices, selectors, operations)

src/hooks — custom React hooks

src/assets — styles, images

src/pages — app pages

Known Issues
When sending invalid requests, the backend returns 404 errors that are difficult to intercept on the frontend (backend limitation).

Contact
Author: Vlad Prokopiy
Email: vladprokopiy@gmail.com
