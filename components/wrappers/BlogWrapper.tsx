import React from 'react';

interface BlogWrapperProps {
    children: React.ReactNode;
}

const BlogWrapper: React.FC<BlogWrapperProps> = ({ children }) => {
    return (
        <div className="blog-wrapper">
            {children}
        </div>
    );
};

export default BlogWrapper;