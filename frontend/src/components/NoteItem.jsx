function getArchived(note) {
  return note.archived ?? note.isArchived ?? note.is_archived ?? false;
}

export default function NoteItem({
  note,
  categories,
  onEdit,
  onDelete,
  onArchiveToggle,
  onCategoryToggle,
}) {
  const archived = getArchived(note);
  const noteCategories = new Set(note.categories ?? []);

  return (
    <li>
      <h3>{note.title}</h3>
      <p>{note.content}</p>

      <div>
        {(note.categories ?? []).map((name) => (
          <span
            key={name}
            style={{
              marginRight: 6,
              padding: "2px 6px",
              backgroundColor: "#304a5f",
              borderRadius: 4,
            }}
          >
            {name}
          </span>
        ))}
      </div>

      <details>
        <summary>Manage Categories</summary>
        <div>
          {categories.map((category) => {
            const checked = noteCategories.has(category.name);

            return (
              <label
                key={category.id}
                style={{ display: "block", marginBottom: 4 }}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) =>
                    onCategoryToggle(note.id, category.id, e.target.checked)
                  }
                />
                {category.name}
              </label>
            );
          })}
        </div>
      </details>

      <div>
        <button onClick={() => onEdit(note)}>Edit</button>
        <button onClick={() => onDelete(note.id)}>Delete</button>
        <button onClick={() => onArchiveToggle(note.id, archived)}>
          {archived ? "Unarchive" : "Archive"}
        </button>
      </div>
    </li>
  );
}
