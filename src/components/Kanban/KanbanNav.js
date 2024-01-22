const KanbanNav = () => {
  return (
    <div className="flex gap-2 text-sm lg:text-lg">
      <button className="px-2 py-1 text-blue-600 bg-blue-200 rounded-lg">
        Board
      </button>
      <button
        className="px-2 py-1 text-gray-600 border border-gray-500 rounded-lg"
        disabled
      >
        Timeline
      </button>
    </div>
  );
};

export default KanbanNav;
