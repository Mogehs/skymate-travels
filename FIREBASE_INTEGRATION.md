# Firebase Integration Documentation

## Overview

This document describes the Firebase integration implemented in the Skymate Landing Page project. The integration allows the landing page to fetch and display travel packages data from the same Firebase Firestore database used by the Skymate Admin Panel.

## Architecture

### Firebase Configuration

- **File**: `src/firebase.js`
- **Purpose**: Initializes Firebase app and Firestore database connection
- **Configuration**: Uses the same Firebase project as the admin panel (`skymate-admin-panel`)

### Package Service

- **File**: `src/services/packageService.js`
- **Purpose**: Provides functions to fetch package data from Firestore
- **Functions**:
  - `fetchAllPackages()` - Fetches all package categories
  - `fetchPackagesByCategory(category)` - Fetches packages for a specific category
  - `fetchTopDestinations()` - Fetches top destination packages
  - `fetchBestDeals()` - Fetches best deals packages
  - `fetchMostSearched()` - Fetches most searched packages
  - `fetchCuratedPackages()` - Fetches curated packages

## Database Structure

The Firestore database has the following structure:

```
packages (collection)
├── top-destinations (document)
│   └── items (array) - Array of package objects
├── best-deals (document)
│   └── items (array) - Array of package objects
├── most-searched (document)
│   └── items (array) - Array of package objects
└── curated (document)
    └── items (array) - Array of package objects
```

### Package Object Structure

Each package object contains the following fields:

- `title` or `name` - Package name
- `price` - Package price
- `duration` - Package duration
- `rating` - Package rating (optional)
- `country` - Destination country
- `imageUrl` - Package image URL
- `description` - Package description (optional)
- `reviews` - Number of reviews (optional)
- `days` - Number of days (for best deals)

## Updated Components

### 1. TopPackages Component (`src/components/TopPackage.jsx`)

- **Data Source**: `top-destinations` Firestore collection
- **Features**: Loading states, error handling, fallback data
- **Mapping**: Maps Firebase data to component format

### 2. BestDeals Component (`src/components/BestDeals.jsx`)

- **Data Source**: `best-deals` Firestore collection
- **Features**: Loading states, error handling, fallback data
- **Mapping**: Maps Firebase `duration` to `days` field

### 3. MostSearched Component (`src/components/MostSearched.jsx`)

- **Data Source**: `most-searched` Firestore collection
- **Features**: Loading states, error handling, fallback data
- **Mapping**: Maps Firebase data to city format with ratings

### 4. CuratedPackages Component (`src/components/CuratedPackages.jsx`)

- **Data Source**: `curated` Firestore collection
- **Features**: Loading states, error handling, fallback data
- **Mapping**: Maps Firebase data to package format

## Features Implemented

### Loading States

- All components show skeleton loaders while fetching data
- Consistent loading UI across all components

### Error Handling

- Components gracefully handle Firebase connection errors
- Fallback to static data when Firebase is unavailable
- User-friendly error messages displayed

### Fallback Data

- Each component maintains static fallback data
- Ensures the site works even if Firebase is unavailable
- Maintains visual consistency

## Usage

### Running the Project

```bash
cd skymate-landing-page
npm run dev
```

### Data Flow

1. Component mounts and calls Firebase service function
2. Service function fetches data from Firestore
3. Component receives data and updates state
4. UI renders with Firebase data or fallback data

### Testing

- Components will first show loading states
- If Firebase connection succeeds, real data is displayed
- If Firebase connection fails, fallback data is displayed with error message

## Dependencies

The integration uses the following dependencies (already installed):

- `firebase` (v12.0.0) - Firebase SDK
- `react` (v19.1.0) - React hooks for state management

## Admin Panel Compatibility

This integration is fully compatible with the Skymate Admin Panel:

- Uses the same Firebase project configuration
- Reads from the same Firestore collections
- Respects the same data structure
- Real-time updates when admin panel modifies data

## Future Enhancements

Potential improvements for the integration:

1. Real-time updates using Firestore listeners
2. Caching strategies for better performance
3. Image optimization and lazy loading
4. Search and filtering functionality
5. Pagination for large datasets
