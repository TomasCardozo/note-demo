import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/authApi";
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

  const navigate = useNavigate();
  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="mb-0">Notes</h1>
        <button
          onClick={handleLogout}
          className="btn btn-outline-danger btn-sm"
        >
          Logout
        </button>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-lg-8">
          <NoteForm
            key={editingNote?.id ?? "new"}
            value={editingNote}
            onSubmit={editingNote ? handleUpdate : handleCreate}
            onCancel={() => setEditingNote(null)}
          />
        </div>

        <div className="col-12 col-lg-4">
          <div className="mb-3">
            <div className="btn-group w-100" role="group">
              <button
                className={`btn btn-${tab === "active" ? "success" : "outline-secondary"}`}
                onClick={() => setTab("active")}
              >
                Active Notes
              </button>
              <button
                className={`btn btn-${tab === "archived" ? "success" : "outline-secondary"}`}
                onClick={() => setTab("archived")}
              >
                Archived Notes
              </button>
            </div>
          </div>

          {/* <div className="col-12 col-md-9"> */}
          <div className="card card-body mb-3">
            <h5 className="mb-3">Categories</h5>

            {categories.length === 0 ? (
              <p className="mb-0">No categories available.</p>
            ) : (
              <div className="d-flex flex-wrap gap-3">
                {categories.map((category) => (
                  <div className="form-check" key={category.id}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`cat-${category.id}`}
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
                    <label
                      className="form-check-label"
                      htmlFor={`cat-${category.id}`}
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* </div> */}
        </div>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}

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
