import React, { useEffect, useState } from "react";
import service from "../appWrite/Databaseconfig";
import { Container, PostForm } from "../components/index";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const [post, setPost] = useState([]);
  const { slug } = useParams();
  const nevigate = useNavigate();

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      nevigate("/");
    }
  }, [slug, nevigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
};

export default EditPost;
