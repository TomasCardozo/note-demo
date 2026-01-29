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
    <ul>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          categories={categories}
          onEdit={onEdit}
          onDelete={onDelete}
          onArchiveToggle={onArchiveToggle}
          onCategoryToggle={onCategoryToggle}
        />
      ))}
    </ul>
  );
}
