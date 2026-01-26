package com.tomas.note.note.domain;

import com.tomas.note.note.domain.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

public interface NoteRepository extends JpaRepository<Note, Long> {
    Page<Note> findByArchived(Boolean archived, Pageable pageable);
}
