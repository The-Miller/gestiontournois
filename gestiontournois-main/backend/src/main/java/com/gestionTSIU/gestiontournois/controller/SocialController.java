package com.gestionTSIU.gestiontournois.controller;


import com.gestionTSIU.gestiontournois.model.Post;
import com.gestionTSIU.gestiontournois.model.Comment;
import com.gestionTSIU.gestiontournois.model.Like;
import com.gestionTSIU.gestiontournois.service.SocialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/social")
public class SocialController {

    @Autowired
    private SocialService socialService;

    @PostMapping("/posts")
    public Post createPost(@RequestBody Post post) {
        return socialService.createPost(post);
    }

    @GetMapping("/posts")
    public List<Post> getAllPosts() {
        return socialService.getAllPosts();
    }

    @PostMapping("/comments")
    public Comment createComment(@RequestBody Comment comment) {
        return socialService.createComment(comment);
    }

    @PostMapping("/likes")
    public Like addLike(@RequestBody Like like) {
        return socialService.addLike(like);
    }
}
