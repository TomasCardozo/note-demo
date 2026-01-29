import NoteItem from "./NoteItem";

export default function NoteList({
  notes,
  categories,
  onEdit,
  onDelete,
  onArchiveToggle,
  onCategoryToggle,
}) {
  if (!notes.length) {
    return <p>No notes available.</p>;
  }
  return (
    <div className="row g-4">
      {notes.map((note) => (
        <div className="col-12 col-md-6 col-lg-4" key={note.id}>
          <NoteItem
            note={note}
            categories={categories}
            onEdit={onEdit}
            onDelete={onDelete}
            onArchiveToggle={onArchiveToggle}
            onCategoryToggle={onCategoryToggle}
          />
        </div>
      ))}
    </div>
  );
}
