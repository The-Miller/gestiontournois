package com.gestionTSIU.gestiontournois.controller;

import com.gestionTSIU.gestiontournois.exception.ResourceNotFoundException;
import com.gestionTSIU.gestiontournois.model.Comment;
import com.gestionTSIU.gestiontournois.model.Post;
import com.gestionTSIU.gestiontournois.service.CommentService;
import com.gestionTSIU.gestiontournois.service.PostService;
import com.gestionTSIU.gestiontournois.repository.PostRepository; // Assurez-vous que cet import est présent
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private PostRepository postRepository;

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Post> createPost(
            @RequestParam("titre") String titre,
            @RequestParam("texte") String texte,
            @RequestPart(value = "photo", required = false) MultipartFile photo
    ) {
        Post post = new Post();
        post.setTitre(titre);
        post.setTexte(texte);

        if (photo != null) {
            try {
                String base64Photo = Base64.getEncoder().encodeToString(photo.getBytes());
                post.setPhoto(base64Photo);
            } catch (IOException e) {
                return ResponseEntity.badRequest().build();
            }
        }

        Post savedPost = postRepository.save(post);
        return ResponseEntity.ok(savedPost);
    }

    @PutMapping(value = "/{id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Post> updatePost(
            @PathVariable Long id,
            @RequestParam("titre") String titre,
            @RequestParam("texte") String texte,
            @RequestPart(value = "photo", required = false) MultipartFile photo
    ) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found for this id :: " + id));

        post.setTitre(titre);
        post.setTexte(texte);

        if (photo != null) {
            try {
                String base64Photo = Base64.getEncoder().encodeToString(photo.getBytes());
                post.setPhoto(base64Photo);
            } catch (IOException e) {
                return ResponseEntity.badRequest().build();
            }
        }

        final Post updatedPost = postRepository.save(post);
        return ResponseEntity.ok(updatedPost);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    @PostMapping("/{id}/like")
    public Post likePost(@PathVariable Long id) {
        return postService.likePost(id);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        postService.deletePost(id);
    }

    @PostMapping("/{id}/comments")
    public ResponseEntity<Comment> addComment(@PathVariable Long id, @RequestBody Comment comment) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id " + id));

        comment.setPost(post);
        Comment savedComment = commentService.save(comment);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(savedComment);
    }

    @GetMapping("/{id}/comments")
    public List<Comment> getCommentsByPostId(@PathVariable Long id) {
        return commentService.getCommentsByPostId(id);
    }
}
