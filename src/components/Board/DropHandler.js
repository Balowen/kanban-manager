export const DropHandler = ({ onDrop, children, status }) => {
  const allowDrop = (e) => e.preventDefault();

  const handleDrop = (e) => {
    const data = JSON.parse(e.dataTransfer.getData("task"));
    onDrop(data, status);
  };

  return (
    <div onDragOver={allowDrop} onDrop={handleDrop} className="drop-handler">
      {children}
    </div>
  );
};
