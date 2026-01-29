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
    <li
      className="card h-100"
      style={{
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div className="card-body d-flex flex-column">
        <h3 className="card-title">{note.title}</h3>
        <p className="card-text">{note.content}</p>

        <div className="mb-2">
          {(note.categories ?? []).map((name) => (
            <span key={name} className="badge bg-secondary me-1">
              {name}
            </span>
          ))}
        </div>

        <details className="mb-2">
          <summary style={{ cursor: "pointer" }}>Manage Categories</summary>
          <div className="mt-2 d-flex flex-wrap gap-2">
            {categories.map((category) => {
              const checked = noteCategories.has(category.name);

              return (
                <div className="form-check form-check-inline" key={category.id}>
                  <input
                    type="checkbox"
                    checked={checked}
                    id={`note-${note.id}-cat-${category.id}`}
                    onChange={(e) =>
                      onCategoryToggle(note.id, category.id, e.target.checked)
                    }
                    className="form-check-input"
                  />
                  <label
                    key={category.id}
                    className="form-check-label"
                    htmlFor={`note-${note.id}-cat-${category.id}`}
                  >
                    {category.name}
                  </label>
                </div>
              );
            })}
          </div>
        </details>

        <div className="mt-auto d-flex gap-2">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => onEdit(note)}
          >
            Edit
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => onDelete(note.id)}
          >
            Delete
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => onArchiveToggle(note.id, archived)}
          >
            {archived ? "Unarchive" : "Archive"}
          </button>
        </div>
      </div>
    </li>
  );
}
