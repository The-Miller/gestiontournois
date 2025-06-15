package com.gestionTSIU.gestiontournois.service;

import com.gestionTSIU.gestiontournois.model.Post;
import com.gestionTSIU.gestiontournois.model.Comment;
import com.gestionTSIU.gestiontournois.model.Like;
import com.gestionTSIU.gestiontournois.repository.PostRepository;
import com.gestionTSIU.gestiontournois.repository.CommentRepository;
import com.gestionTSIU.gestiontournois.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SocialService {

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private LikeRepository likeRepository;

    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public Like addLike(Like like) {
        return likeRepository.save(like);
    }
}
