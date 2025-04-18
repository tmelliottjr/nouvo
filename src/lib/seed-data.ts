// Types that match the new flat tree structure
export type NodeType = "folder" | "note";

export interface BaseNode {
  id: string;
  name: string;
  type: NodeType;
  parentId: string | null;
  childIds: string[];
}

// Interface for shared access permissions
export interface SharedAccess {
  permission: "read" | "write";
  sharedBy?: string;
  sharedAt?: string;
}

export interface NoteNode extends BaseNode {
  type: "note";
  content: string;
  tags: string[];
  creationDate: string;
  userId?: string; // Owner of the note
  sharedAccess?: SharedAccess; // Access information when viewing a shared note
}

export interface FolderNode extends BaseNode {
  type: "folder";
}

export type TreeNode = NoteNode | FolderNode;

export type TreeData = {
  [key: string]: TreeNode;
};

// Optional type for tracking creation/editing state
export interface NodeCreationState {
  status: "creating" | "editing" | "complete";
  parentId: string | null;
}

export type CreationStateMap = {
  [id: string]: NodeCreationState;
};

// Tag related types
export interface TagSetting {
  name: string;
  color: string;
}

// Initial tag settings to be used as seed data
export const seedTagSettings: TagSetting[] = [
  { name: "work", color: "blue-500" },
  { name: "personal", color: "green-500" },
  { name: "ideas", color: "purple-500" },
  { name: "meeting", color: "yellow-500" },
  { name: "todo", color: "red-500" },
  { name: "important", color: "orange-500" },
  { name: "travel", color: "teal-500" },
  { name: "project", color: "indigo-500" },
  { name: "research", color: "cyan-500" },
  { name: "learning", color: "pink-500" },
  { name: "frontend", color: "blue-500" },
  { name: "architecture", color: "indigo-500" },
  { name: "react", color: "cyan-500" },
  { name: "vue", color: "green-500" },
  { name: "react-native", color: "blue-500" },
  { name: "flutter", color: "blue-500" },
  { name: "mobile", color: "purple-500" },
  { name: "planning", color: "yellow-500" },
  { name: "food", color: "orange-500" },
  { name: "italian", color: "red-500" },
  { name: "dessert", color: "pink-500" },
  { name: "requirements", color: "teal-500" },
  { name: "meetings", color: "yellow-500" },
  { name: "shopping", color: "green-500" },
  { name: "development", color: "blue-500" },
];

/**
 * Seed data for the notes application.
 * Flat structure with parent/child relationships for efficient operations.
 */
export const seedData: {
  treeData: TreeData;
  rootIds: string[];
  creationStateById: CreationStateMap;
} = {
  // All nodes in a flat structure
  treeData: {
    // Root level folders
    "projects-folder": {
      id: "projects-folder",
      name: "Projects",
      type: "folder",
      parentId: null,
      childIds: ["web-dev-folder", "mobile-dev-folder"],
    },
    "work-folder": {
      id: "work-folder",
      name: "Work",
      type: "folder",
      parentId: null,
      childIds: ["meetings-folder", "projects-work-folder"],
    },
    "personal-folder": {
      id: "personal-folder",
      name: "Personal",
      type: "folder",
      parentId: null,
      childIds: ["travel-folder", "recipes-folder"],
    },
    "quick-notes-folder": {
      id: "quick-notes-folder",
      name: "Quick Notes",
      type: "folder",
      parentId: null,
      childIds: ["shopping-note", "ideas-note"],
    },

    // Projects subfolders
    "web-dev-folder": {
      id: "web-dev-folder",
      name: "Web Development",
      type: "folder",
      parentId: "projects-folder",
      childIds: ["react-folder", "vue-folder", "angular-folder"],
    },
    "mobile-dev-folder": {
      id: "mobile-dev-folder",
      name: "Mobile Development",
      type: "folder",
      parentId: "projects-folder",
      childIds: ["react-native-note", "flutter-folder"],
    },

    // Web dev subfolders
    "react-folder": {
      id: "react-folder",
      name: "React",
      type: "folder",
      parentId: "web-dev-folder",
      childIds: ["react-hooks-note", "react-patterns-note"],
    },
    "vue-folder": {
      id: "vue-folder",
      name: "Vue",
      type: "folder",
      parentId: "web-dev-folder",
      childIds: ["vue-composition-note"],
    },
    "angular-folder": {
      id: "angular-folder",
      name: "Angular",
      type: "folder",
      parentId: "web-dev-folder",
      childIds: [],
    },

    // Mobile dev subfolders
    "flutter-folder": {
      id: "flutter-folder",
      name: "Flutter",
      type: "folder",
      parentId: "mobile-dev-folder",
      childIds: ["flutter-widgets-note", "flutter-state-note"],
    },

    // Personal subfolders
    "travel-folder": {
      id: "travel-folder",
      name: "Travel",
      type: "folder",
      parentId: "personal-folder",
      childIds: ["japan-note", "europe-note"],
    },
    "recipes-folder": {
      id: "recipes-folder",
      name: "Recipes",
      type: "folder",
      parentId: "personal-folder",
      childIds: ["italian-folder", "desserts-folder"],
    },

    // Recipe subfolders
    "italian-folder": {
      id: "italian-folder",
      name: "Italian",
      type: "folder",
      parentId: "recipes-folder",
      childIds: ["pasta-note", "risotto-note"],
    },
    "desserts-folder": {
      id: "desserts-folder",
      name: "Desserts",
      type: "folder",
      parentId: "recipes-folder",
      childIds: ["tiramisu-note", "cheesecake-note"],
    },

    // Work subfolders
    "meetings-folder": {
      id: "meetings-folder",
      name: "Meetings",
      type: "folder",
      parentId: "work-folder",
      childIds: ["team-standup-note", "q2-planning-note"],
    },
    "projects-work-folder": {
      id: "projects-work-folder",
      name: "Projects",
      type: "folder",
      parentId: "work-folder",
      childIds: ["project-alpha-folder", "project-beta-folder"],
    },

    // Work project subfolders
    "project-alpha-folder": {
      id: "project-alpha-folder",
      name: "Project Alpha",
      type: "folder",
      parentId: "projects-work-folder",
      childIds: ["alpha-requirements-note", "alpha-timeline-note"],
    },
    "project-beta-folder": {
      id: "project-beta-folder",
      name: "Project Beta",
      type: "folder",
      parentId: "projects-work-folder",
      childIds: ["beta-notes-note"],
    },

    // Notes in React folder
    "react-hooks-note": {
      id: "react-hooks-note",
      name: "Hooks Overview",
      type: "note",
      parentId: "react-folder",
      childIds: [],
      content: JSON.stringify({
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                text: "Notes about React hooks and their usage patterns",
                type: "text",
              },
            ],
          },
        ],
      }),
      tags: ["react", "frontend"],
      creationDate: "2025-04-01T09:30:00.000Z",
    },
    "react-patterns-note": {
      id: "react-patterns-note",
      name: "Design Patterns",
      type: "note",
      parentId: "react-folder",
      childIds: [],
      content: JSON.stringify({
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                text: "Common React design patterns and best practices",
                type: "text",
              },
            ],
          },
        ],
      }),
      tags: ["react", "architecture"],
      creationDate: "2025-04-05T14:15:00.000Z",
    },

    // Notes in Vue folder
    "vue-composition-note": {
      id: "vue-composition-note",
      name: "Composition API",
      type: "note",
      parentId: "vue-folder",
      childIds: [],
      content: JSON.stringify({
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                text: "Notes on Vue 3 Composition API",
                type: "text",
              },
            ],
          },
        ],
      }),
      tags: ["vue", "frontend"],
      creationDate: "2025-04-02T10:45:00.000Z",
    },

    // Notes in Mobile Dev
    "react-native-note": {
      id: "react-native-note",
      name: "React Native Basics",
      type: "note",
      parentId: "mobile-dev-folder",
      childIds: [],
      content: JSON.stringify({
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                text: "Getting started with React Native",
                type: "text",
              },
            ],
          },
        ],
      }),
      tags: ["react-native", "mobile"],
      creationDate: "2025-04-03T11:20:00.000Z",
    },

    // Notes in Flutter folder
    "flutter-widgets-note": {
      id: "flutter-widgets-note",
      name: "Common Widgets",
      type: "note",
      parentId: "flutter-folder",
      childIds: [],
      content: JSON.stringify({
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                text: "Overview of common Flutter widgets",
                type: "text",
              },
            ],
          },
        ],
      }),
      tags: ["flutter", "mobile"],
      creationDate: "2025-04-06T15:30:00.000Z",
    },
    "flutter-state-note": {
      id: "flutter-state-note",
      name: "State Management",
      type: "note",
      parentId: "flutter-folder",
      childIds: [],
      content: JSON.stringify({
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                text: "Comparing state management approaches in Flutter",
                type: "text",
              },
            ],
          },
        ],
      }),
      tags: ["flutter", "architecture"],
      creationDate: "2025-04-07T16:45:00.000Z",
    },

    // Notes in Travel folder
    "japan-note": {
      id: "japan-note",
      name: "Japan Trip 2024",
      type: "note",
      parentId: "travel-folder",
      childIds: [],
      content: JSON.stringify({
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                text: "Planning and itinerary for Japan trip",
                type: "text",
              },
            ],
          },
        ],
      }),
      tags: ["travel", "planning"],
      creationDate: "2025-04-08T13:15:00.000Z",
    },
    "europe-note": {
      id: "europe-note",
      name: "Europe Backpacking",
      type: "note",
      parentId: "travel-folder",
      childIds: [],
      content: JSON.stringify({
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                text: "Notes for backpacking through Europe",
                type: "text",
              },
            ],
          },
        ],
      }),
      tags: ["travel", "planning"],
      creationDate: "2025-04-09T14:30:00.000Z",
    },

    // Notes in Italian folder
    "pasta-note": {
      id: "pasta-note",
      name: "Homemade Pasta",
      type: "note",
      parentId: "italian-folder",
      childIds: [],
      content: JSON.stringify({
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                text: "Recipe for homemade pasta from scratch",
                type: "text",
              },
            ],
          },
        ],
      }),
      tags: ["food", "italian"],
      creationDate: "2025-04-10T09:15:00.000Z",
    },
    "risotto-note": {
      id: "risotto-note",
      name: "Mushroom Risotto",
      type: "note",
      parentId: "italian-folder",
      childIds: [],
      content: JSON.stringify({
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                text: "Classic mushroom risotto recipe",
                type: "text",
              },
            ],
          },
        ],
      }),
      tags: ["food", "italian"],
      creationDate: "2025-04-10T10:30:00.000Z",
    },

    // Notes in Desserts folder
    "tiramisu-note": {
      id: "tiramisu-note",
      name: "Tiramisu",
      type: "note",
      parentId: "desserts-folder",
      childIds: [],
      content: JSON.stringify({
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ text: "Classic tiramisu recipe", type: "text" }],
          },
        ],
      }),
      tags: ["food", "dessert"],
      creationDate: "2025-04-11T08:15:00.000Z",
    },
    "cheesecake-note": {
      id: "cheesecake-note",
      name: "NY Cheesecake",
      type: "note",
      parentId: "desserts-folder",
      childIds: [],
      content: JSON.stringify({
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                text: "New York style cheesecake recipe",
                type: "text",
              },
            ],
          },
        ],
      }),
      tags: ["food", "dessert"],
      creationDate: "2025-04-11T09:30:00.000Z",
    },

    // Notes in Meetings folder
    "team-standup-note": {
      id: "team-standup-note",
      name: "Team Standups",
      type: "note",
      parentId: "meetings-folder",
      childIds: [],
      content: JSON.stringify({
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ text: "Notes from daily team standups", type: "text" }],
          },
        ],
      }),
      tags: ["work", "meetings"],
      creationDate: "2025-04-12T09:00:00.000Z",
    },
    "q2-planning-note": {
      id: "q2-planning-note",
      name: "Q2 Planning",
      type: "note",
      parentId: "meetings-folder",
      childIds: [],
      content: JSON.stringify({
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ text: "Q2 2025 planning meeting notes", type: "text" }],
          },
        ],
      }),
      tags: ["work", "planning"],
      creationDate: "2025-04-12T14:00:00.000Z",
    },

    // Notes in Project Alpha folder
    "alpha-requirements-note": {
      id: "alpha-requirements-note",
      name: "Requirements",
      type: "note",
      parentId: "project-alpha-folder",
      childIds: [],
      content: JSON.stringify({
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                text: "Project Alpha requirements and specifications",
                type: "text",
              },
            ],
          },
        ],
      }),
      tags: ["work", "requirements"],
      creationDate: "2025-04-13T10:00:00.000Z",
    },
    "alpha-timeline-note": {
      id: "alpha-timeline-note",
      name: "Timeline",
      type: "note",
      parentId: "project-alpha-folder",
      childIds: [],
      content: JSON.stringify({
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                text: "Project Alpha timeline and milestones",
                type: "text",
              },
            ],
          },
        ],
      }),
      tags: ["work", "planning"],
      creationDate: "2025-04-13T11:30:00.000Z",
    },

    // Notes in Project Beta folder
    "beta-notes-note": {
      id: "beta-notes-note",
      name: "Meeting Notes",
      type: "note",
      parentId: "project-beta-folder",
      childIds: [],
      content: JSON.stringify({
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ text: "Project Beta meeting notes", type: "text" }],
          },
        ],
      }),
      tags: ["work", "meetings"],
      creationDate: "2025-04-13T15:00:00.000Z",
    },

    // Notes in Quick Notes folder
    "shopping-note": {
      id: "shopping-note",
      name: "Shopping List",
      type: "note",
      parentId: "quick-notes-folder",
      childIds: [],
      content: JSON.stringify({
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ text: "Groceries and items to buy", type: "text" }],
          },
        ],
      }),
      tags: ["personal", "shopping"],
      creationDate: "2025-04-12T16:30:00.000Z",
    },
    "ideas-note": {
      id: "ideas-note",
      name: "App Ideas",
      type: "note",
      parentId: "quick-notes-folder",
      childIds: [],
      content: JSON.stringify({
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              { text: "Brainstorming for new app ideas", type: "text" },
            ],
          },
        ],
      }),
      tags: ["ideas", "development"],
      creationDate: "2025-04-13T08:45:00.000Z",
    },
  },

  // IDs of the top-level nodes
  rootIds: [
    "projects-folder",
    "personal-folder",
    "work-folder",
    "quick-notes-folder",
  ],

  creationStateById: {},
};
