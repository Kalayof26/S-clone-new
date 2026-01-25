import { FlatList } from "react-native";
import StoriesSection from "../../components/StoriesSection";
import Post from "../../components/Post";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function FeedScreen() {
  const posts = useQuery(api.posts.getAll);

  if (!posts) return null;

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <Post post={item} isLiked={item.isLiked} />
      )}
      ListHeaderComponent={<StoriesSection />}
      contentContainerStyle={{ paddingBottom: 60 }}
    />
  );
}
