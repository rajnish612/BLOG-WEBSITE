import React from 'react';

const BlogPost = ({ post }) => {
  return (
    <div className="post-card">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-meta">
        By {post.author?.username || 'Unknown'} • {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="post-content">
        {post.content}
      </div>
      {post.tags && post.tags.length > 0 && (
        <div className="tag-list">
          {post.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPost;
