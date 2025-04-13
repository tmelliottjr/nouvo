# Noevo Project Documentation

## Project Overview

Noevo is a note-taking application built with modern web technologies. This document provides an overview of the libraries, design principles, and best practices used in this project.

## Tech Stack

### Core Technologies

- **React**: The foundation of our UI components (v18+)
- **Next.js**: Framework for server-side rendering, routing, and more
- **TypeScript**: For type safety and better developer experience

### UI and Styling

- **Tailwind CSS**: Utility-first CSS framework for styling
- **Shadcn UI**: Reusable UI components built with Radix UI and Tailwind
- **Lucide Icons**: Modern icon library

### Editor Technologies

- **TipTap**: Rich text editor framework based on ProseMirror

### State Management

- Custom React context providers (e.g., `NotesProvider`)

## Component Design Principles

### Navigation

- **Next.js**: Framework for server-side rendering, routing, and more

When controlling navigation, we use the Next.js router for client-side navigation. This allows us to take advantage of Next.js's built-in features like prefetching and dynamic routing. We should avoid using state and `useEffect` for navigation, as it can lead to unnecessary complexity and performance issues.

### 1. Modular Component Structure

- **Single Responsibility**: Each component should focus on one specific functionality
- **Composability**: Build larger components by composing smaller ones
- **Reusability**: Create components that can be reused across the application

Example:

```tsx
// Good: Breaking down a complex UI into modular components
<NoteView>
  <NoteHeader />
  {isViewingFolder ? (
    <FolderView folder={currentFolder} />
  ) : (
    <NoteEditor note={currentNote} />
  )}
</NoteView>
```

### 2. State Management

- Use React Context for global state shared across multiple components
- Keep local state in components when possible
- Use custom hooks to encapsulate related state logic

Example:

```tsx
// Custom hook for note-related state and actions
const { currentNote, updateNote } = useNotes();

// Component with local state
const [isExpanded, setIsExpanded] = useState(false);
```

### 3. Consistent Styling

- Use Tailwind utility classes for styling
- Follow the project's design system and color palette
- Leverage Shadcn UI components for consistent UI elements

Example:

```tsx
// Using Tailwind classes for styling
<div className="flex items-center p-2 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800">
  <Button variant="ghost" size="sm">
    Action
  </Button>
</div>
```

### 4. Type Safety

- Use TypeScript interfaces and types for component props
- Define shared types in dedicated files
- Avoid `any` type when possible

Example:

```tsx
// Defining prop types
interface FolderViewProps {
  folder: FolderNode;
  isRootView?: boolean;
}

export function FolderView({ folder, isRootView = false }: FolderViewProps) {
  // Component implementation
}
```

### 5. Error Handling

- Implement proper error boundaries
- Handle edge cases and provide fallback UI
- Use conditional rendering to prevent null reference errors

Example:

```tsx
// Conditional rendering to handle potential null values
{
  currentNote ? (
    <TiptapEditor note={currentNote} onUpdate={handleContentUpdate} />
  ) : (
    <EmptyState message="No note selected" />
  );
}
```

## File Structure Conventions

### Component Design

Components follow a domain-based structure:

- ui: Reusable UI elements (buttons, inputs, etc.)
- notes: Note-specific components
- `/src/components/sidebar`: Navigation and folder structure components
- `/src/components/editor`: Text editor related components

- Each component should be in its own file
- Group related components in folders with an index.ts file for exports
- For complex components, create a directory with the component name:

  ```
  /NoteEditor/
    ├── index.ts
    ├── NoteEditor.tsx
    ├── EditorToolbar.tsx
    └── FormatButton.tsx
  ```

- **Avoiding Component Bloat**:

  - Keep components under 100-150 lines of code
  - Extract repeated patterns into separate components
  - Split complex rendering logic into smaller components
  - Use composition over inheritance

- **Component Boundaries**:

  - Create clear interfaces between components
  - Pass only necessary props to child components
  - Use prop destructuring for clarity

- **Code Reuse Strategies**:
  - Extract common UI patterns to shared components
  - Create utility components for frequently used patterns
  - Don't over-abstract - duplicating simple JSX is often clearer than complex abstractions
  - Consider the trade-off between DRY principles and readability

### State Management

- State providers go in `/src/state-providers`
- Share types between related state contexts

### Utilities and Helpers

- Common utilities go in `/src/lib`
- Custom hooks go in `/src/hooks`

### Best Practices

- Follow React's official guidelines for [thinking in React](https://react.dev/learn/thinking-in-react)
- Use the [Tailwind CSS style guide](https://tailwindcss.com/docs/functions-and-directives) for consistent class ordering
- Implement [Accessibility best practices](https://www.w3.org/WAI/ARIA/apg/) in all components

## Common Patterns

### Component Structure

```tsx
// 1. Imports
import React from "react";
import { useNotes } from "@/state-providers/use-notes";

// 2. Types
interface ExampleProps {
  title: string;
}

// 3. Component definition
export function Example({ title }: ExampleProps) {
  // 4. Hooks
  const [state, setState] = useState(false);

  // 5. Effects
  useEffect(() => {
    // Effect implementation
  }, [dependencies]);

  // 6. Event handlers
  const handleClick = () => {
    setState(!state);
  };

  // 7. Render
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={handleClick}>Toggle</button>
    </div>
  );
}
```

## Contribution Guidelines

1. Follow the established code style and patterns
2. Write clear and concise commit messages
3. Create new components in the appropriate directories
4. Update documentation when introducing new patterns or libraries
5. Test your changes thoroughly before submitting
