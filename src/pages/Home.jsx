import React, { useState, useEffect, useReducer } from "react";
import service from "../appWrite/Databaseconfig";
import { Container, PostCard } from "../components";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login To read Posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }else{
    <div className="w-full py-8">
        <Container>
            <div className="flex flex-wrap">
                {
                    posts.map((value)=>{
                        <div key={value.$id} className="p-2 w-1/4">
                            <PostCard  {...value}/>
                        </div>
                    })
                }
            </div>
        </Container>
    </div>
  }
};

export default Home;
