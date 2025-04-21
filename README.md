## Pixel Studio

This application provides a responsive image gallery with editing capabilities. 
Users can browse through a paginated list of images from the Lorem Picsum API, select images to edit (adjusting dimensions, applying grayscale filters, and adding blur effects), and download their edited creations.

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:Siddhant-awati/pixel-studio.git
   or
   git clone https://github.com/Siddhant-awati/pixel-studio.git
   ```

2. Install dependencies:
   ```bash
   cd pixel-studio
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Run unit tests:
   ```bash
   npm run test
   ```

## Project Structure

```
src/
├── components/      # Reusable UI components
├── hooks/           # Custom React hooks
├── pages/           # Application pages
├── types/           # TypeScript type definitions
├── App.tsx          # Main application component
└── main.tsx         # Application entry point
```


## Features

- **Image Gallery**:
  - Paginated browsing of images
  - Responsive grid layout
  - Persistent page state 

- **Image Editor**:
  - Adjustable width and height
  - Grayscale toggle
  - Blur effect with slider control
  - Real-time preview of edits
  - Download edited images

- **Persistence**:
  - Remembers edit parameters for each image
  - Maintains browser history state

## Technologies Used

- **Frontend**:
  - React with TypeScript
  - React Router for navigation
  - React Bootstrap for UI components
  - Vite for build tooling

- **API**:
  - [Lorem Picsum](https://picsum.photos/) for image data