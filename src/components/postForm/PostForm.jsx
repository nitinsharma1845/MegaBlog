import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { SelectBtn, Button, Input, RTE } from "../index.js";
import services from "../../appWrite/Databaseconfig.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
  const { register, watch, setValue, control, getValues, handleSubmit } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData); 
  console.log(userData.userData.$id)

  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? services.uploadFile(data.image[0]) : null;

      if (file) {
        services.deleteFile(post.featuredImage);
      }

      const dbPost = await services.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = data.image[0];

      if (file) {
        const uploadFile = await services.uploadFile(file)
        const fileId = uploadFile.$id;
        data.featuredImage = fileId;

        const dbPost = await services.createPost({
          ...data,
          userId: userData.userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
    } else {
      return "";
    }
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }

      return () => {
        subscription.unsubscribe();
      };
    });
  }, [watch, slugTransform, setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
          <Input
            lable="Title : "
            placeholder="Title"
            className=" mb-4"
            {...register("title", { required: true })}
          />

          <Input
            lable="Slug : "
            placeholder="Slug"
            className=" mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />

          <RTE
            label="Content : "
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>

        <div className="w-1/3 px-2">
          <Input
            label="Featured Image : "
            type="file"
            className="mb-4"
            accept="image/png , image/jpg , image/jpeg , image/gif"
            {...register("image", { required: !post })}
          />

          {post && (
            <div className="w-full mb-4">
              <img
                src={services.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}
          <SelectBtn
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
          />

          <Button
            type="submit"
            bgColor={post ? "bg-green-500" : undefined}
            clasName="w-full"
          >
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default PostForm;
