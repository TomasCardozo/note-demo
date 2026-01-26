package com.tomas.note.note.service;

import com.tomas.note.note.domain.Note;
import com.tomas.note.note.dto.NoteRequest;
import com.tomas.note.note.repository.NoteRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class NoteService {
    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public Note create(NoteRequest noteRequest) {
        Note note = new Note();
        note.setTitle(noteRequest.getTitle());
        note.setContent(noteRequest.getContent());
        return noteRepository.save(note);
    }

    public Note update(Long id, NoteRequest noteRequest) {
        Note note = noteRepository.findById(id).orElseThrow(() -> new NoteNotFoundException(id));
        note.setTitle(noteRequest.getTitle());
        note.setContent(noteRequest.getContent());
        return noteRepository.save(note);
    }

    public Note archive(Long id) {
        Note note = noteRepository.findById(id).orElseThrow(() -> new NoteNotFoundException(id));
        note.setArchived(true);
        return noteRepository.save(note);
    }

    public Note unArchive(Long id) {
        Note note = noteRepository.findById(id).orElseThrow(() -> new NoteNotFoundException(id));
        note.setArchived(false);
        return noteRepository.save(note);
    }

    public void delete(Long id) {
        if(!noteRepository.findById(id).isPresent()) {
            throw new NoteNotFoundException(id);
        }
        noteRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Page<Note> list(boolean archived, Pageable pageable) {
        return noteRepository.findByArchived(archived, pageable);
    }

    @Transactional(readOnly = true)
    public Note get(Long id) {
        return noteRepository.findById(id).orElseThrow(() -> new NoteNotFoundException(id));
    }
}
