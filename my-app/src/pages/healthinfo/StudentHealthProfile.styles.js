const styles = {
  wrapper: "bg-gray-100 min-h-screen flex",
  sidebar: "w-64 bg-indigo-700 text-white p-5 flex flex-col",
  logo: "text-xl font-semibold mb-5",
  nav: "flex flex-col gap-4",
  activeLink: "hover:underline font-bold",
  main: "flex-1 p-8",
  loading: "text-center p-10",

  // Header
  header: "flex items-center justify-between mb-8",
  profile: "flex items-center gap-4",
  avatar: "w-20 h-20 rounded-full",
  name: "text-xl font-bold",
  classText: "text-gray-600",
  addButton: "bg-indigo-600 text-white px-4 py-2 rounded",

  // Summary
  summaryGrid: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-8",
  cardRed: "bg-red-100 p-4 rounded",
  cardGreen: "bg-green-100 p-4 rounded",
  cardBlue: "bg-blue-100 p-4 rounded",
  cardPink: "bg-pink-100 p-4 rounded",
  cardTitle: "font-semibold",

  // Section
  section: "mb-8",
  sectionTitle: "font-bold mb-2",

  // Table
  table: "w-full text-sm border",
  thead: "bg-gray-200",
  th: "p-2 text-left",
  tr: "border-t",
  td: "p-2",
};

export default styles;
