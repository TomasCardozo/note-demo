import { useEffect, useState } from "react";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import { listCategories } from "../api/categoryApi";
import {
  createNote,
  updateNote,
  deleteNote,
  archivedNote,
  unarchivedNote,
  listNotes,
  addCategoryToNote,
  removeCategoryFromNote,
} from "../api/noteApi";

export default function NotesPage() {
  const [tab, setTab] = useState("active");
  const archived = tab === "archived";

  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const categoriesRes = await listCategories();
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    })();
  }, []);

  useEffect(() => {
    setEditingNote(null);
    load();
  }, [tab]);

  useEffect(() => {
    load();
  }, [selectedCategoryIds]);

  async function load() {
    try {
      setLoading(true);
      setError("");
      const res = await listNotes({
        archived,
        categoryIds: selectedCategoryIds,
        page: 0,
        size: 50,
      });
      setNotes(res.data?.content ?? []);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setError(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to fetch notes. Please try again later.",
      );
      setNotes([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(note) {
    try {
      await createNote(note);
      await load();
    } catch (error) {
      console.error(error);
      setError(
        error?.message ?? "Failed to create note. Please try again later.",
      );
    }
  }

  async function handleUpdate(note) {
    try {
      await updateNote(editingNote.id, note);
      setEditingNote(null);
      await load();
    } catch (error) {
      console.error(error);
      setError(
        error?.message ?? "Failed to update note. Please try again later.",
      );
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this note?")) return;
    try {
      await deleteNote(id);
      await load();
    } catch (error) {
      console.error(error);
      setError(
        error?.message ?? "Failed to delete note. Please try again later.",
      );
    }
  }

  async function handleArchiveToggle(id, isArchived) {
    try {
      if (isArchived) {
        await unarchivedNote(id);
      } else {
        await archivedNote(id);
      }
      await load();
    } catch (error) {
      console.error(error);
      setError(
        error?.message ??
          "Failed to archive/unarchive note. Please try again later.",
      );
    }
  }

  async function handleCategoryToggle(noteId, categoryId, isAdded) {
    try {
      if (isAdded) {
        await addCategoryToNote(noteId, categoryId);
      } else {
        await removeCategoryFromNote(noteId, categoryId);
      }
      await load();
    } catch (error) {
      console.error(error);
      setError(
        error?.message ??
          "Failed to update note categories. Please try again later.",
      );
    }
  }

  return (
    <div style={{ padding: 20, color: "white" }}>
      <h1>Notes</h1>

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setTab("active")} disabled={tab === "active"}>
          Active Notes
        </button>
        <button
          onClick={() => setTab("archived")}
          disabled={tab === "archived"}
        >
          Archived Notes
        </button>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div>
          <h3>Categories</h3>
        </div>

        {categories.length === 0 ? (
          <p>No categories available.</p>
        ) : (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {categories.map((category) => (
              <label
                key={category.id}
                style={{ display: "flex", gap: 8, alignItems: "center" }}
              >
                <input
                  type="checkbox"
                  checked={
                    Array.isArray(selectedCategoryIds) &&
                    selectedCategoryIds.includes(category.id)
                  }
                  onChange={(e) => {
                    setSelectedCategoryIds((prev) => {
                      const safePrev = Array.isArray(prev) ? prev : [];
                      return e.target.checked
                        ? [...safePrev, category.id]
                        : safePrev.filter((id) => id !== category.id);
                    });
                  }}
                />
                <span>{category.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}

      <NoteForm
        key={editingNote?.id ?? "new"}
        value={editingNote}
        onSubmit={editingNote ? handleUpdate : handleCreate}
        onCancel={() => setEditingNote(null)}
      />

      <NoteList
        notes={notes}
        categories={categories}
        onEdit={setEditingNote}
        onDelete={handleDelete}
        onArchiveToggle={handleArchiveToggle}
        onCategoryToggle={handleCategoryToggle}
      />

      <p style={{ opacity: 0.5 }}>Total Notes: {notes.length}</p>
    </div>
  );
}
