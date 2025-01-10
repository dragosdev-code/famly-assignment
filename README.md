This is my implementation of the Famly Assignment, designed with a focus on clean architecture, reusability, and modern React best practices.

First I want to say that I love **SWR** 😁, is my go-to library for efficient data fetching in single-page applications (SPAs), so I used that for the API interaction. **The project took me around 2 hours to complete**, with some extra time spent organizing the structure for clarity and maintainability.


## Features

### Dynamic Child List
- Fetches and displays a list of children with their attendance status (`Checked In`/`Checked Out`) using **SWR**.
- Provides efficient revalidation and caching to keep the UI responsive and up-to-date.

### Check In / Check Out Functionality
- Integrated using `useSWRMutation` to handle mutations efficiently.
- Actions like "Check In" and "Check Out" trigger revalidation of the child list while I would say that is maintaining a smooth user experience.

### Lazy Loading
- Since the API doesn't support any limit or offset, I implemented **lazy loading** on the client-side as a demonstration.
- This approach uses a "Load More" button to load additional children in batches with a simple `slice` on the `children` array.
- I chose lazy loading because it’s the fastest to implement and works well for small to medium datasets. Even though the implementation is quite similar, we can also consider alternatives like infinite scrolling or pagination if needed.

### Overlay for Actions
- When a child is being checked in or out, an overlay appears with a clear message (`"Checking In..."` or `"Checking Out..."`) for improved user feedback.
  

### Reusable Service API
- I follow a structured service-based approach, encapsulating API interactions in dedicated modules.
- This is a practice I use in almost every project to keep my code clean, modular, and testable.

## Packages Used

- **SWR**: For data fetching, caching, and mutations.
- **clsx**: For dynamic class name management.
- **Tailwind CSS**: For utility-first styling.
- **shadcn/ui**: For prebuilt components like cards, buttons, and skeletons.


## File Structure
```bash
src/
├── api/
│   ├── useChildListGroup.ts       # SWR hook to fetch child list
│   ├── useChildrenAction.ts       # SWR mutation hook for check-in/out
├── components/
│   ├── ui/
│   │   ├── button.tsx             # Button component
│   │   ├── card.tsx               # Card component
│   │   ├── skeleton.tsx           # Skeleton loader component
│   ├── ChildItem.tsx              # Displays individual child details and actions
│   ├── ChildList.tsx              # Renders the entire list of children
├── lib/
│   ├── utils.ts                   # Utility functions
├── services/
│   ├── api/
│   │   ├── index.ts               # Base API setup
│   ├── children/
│   │   ├── index.ts               # Service for child-related API calls
│   │   ├── types.ts               # TypeScript types for child data
├── App.tsx                        # Main application component
├── index.css                      # Global styles
├── main.tsx                       # Entry point for the app
├── vite-env.d.ts                  # TypeScript environment definitions
```

## How to Run the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/dragosdev-code/famly-assignment.git
   ```
2. Navigate to the project directory:
   ```bash
   cd famly-assignment
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables in a .env file:
  ```bash
  VITE_ACCESS_TOKEN=<Your Access Token>
  VITE_BACKEND_URL=<The Backend Url>
  ```
5. Start the application
  ```bash
  npm run dev
  ```
6. Open your browser and navigate to
  ```bash
  http://localhost:5173
   ```
