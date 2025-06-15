package com.gestionTSIU.gestiontournois.social;

import com.gestionTSIU.gestiontournois.model.Post;
import com.gestionTSIU.gestiontournois.model.Comment;
import com.gestionTSIU.gestiontournois.model.Like;
import com.gestionTSIU.gestiontournois.repository.PostRepository;
import com.gestionTSIU.gestiontournois.repository.CommentRepository;
import com.gestionTSIU.gestiontournois.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SocialMediaManager {

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

    public Comment addComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public Like addLike(Like like) {
        return likeRepository.save(like);
    }

    public void removeLike(Long likeId) {
        likeRepository.deleteById(likeId);
    }
}
