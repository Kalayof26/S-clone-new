import { ScrollView } from "react-native";
import Post from "@/components/Post";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { PostType } from "@/types";

export default function HomeScreen() {
  const postsData = useQuery(api.posts.getPosts) as PostType[] | undefined;

  return (
    <ScrollView>
      {postsData?.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </ScrollView>
  );
}
