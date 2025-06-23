import React, { useState, useEffect } from "react";
import service from "../appWrite/Databaseconfig";
import { Container, PostCard } from "../components/index";

const AllPosts = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    service.getPosts([]).then((posts) => {
      if (posts) {
        setPost(posts?.documents);
      }
    });
  }, []);
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {post.map((value) => {
            <div key={value.$id} className="p-2 w-1/4">
              <PostCard post = {value} />;
            </div>;
          })}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
