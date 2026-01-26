package com.tomas.note.note.dto;

import com.tomas.note.note.domain.Note;
import java.time.Instant;

public class NoteResponse {
    private Long id;
    private String content;
    private String title;
    private boolean archived;
    private Instant createdAt;
    private Instant updatedAt;

    public static NoteResponse from(Note note) {
        NoteResponse noteResponse = new NoteResponse();

        noteResponse.id = note.getId();
        noteResponse.title = note.getTitle();
        noteResponse.content = note.getContent();
        noteResponse.archived = note.isArchived();
        noteResponse.createdAt = note.getCreatedAt();
        noteResponse.updatedAt = note.getUpdatedAt();
        return noteResponse;
    }

    public Long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public String getTitle() {
        return title;
    }

    public boolean isArchived() {
        return archived;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }
}
