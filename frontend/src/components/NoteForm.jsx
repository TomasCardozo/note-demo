import { useState } from "react";

export default function NoteForm({ value, onSubmit, onCancel }) {
  const isEditing = !!value?.id;

  const [form, setForm] = useState({
    title: value?.title ?? "",
    content: value?.content ?? "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const note = { title: form.title.trim(), content: form.content.trim() };
    if (!note.title || !note.content) return;
    onSubmit(note);

    if (!isEditing) {
      setForm({ title: "", content: "" });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "grid", gap: 10, marginBottom: 18 }}
    >
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
      />

      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        rows={5}
        placeholder="Content"
      />

      <div style={{ display: "flex", gap: 10 }}>
        <button type="submit">{isEditing ? "Save Changes" : "Create"}</button>

        {isEditing && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
