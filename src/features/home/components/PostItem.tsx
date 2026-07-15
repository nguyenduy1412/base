import { Text, View } from 'react-native'
import React from 'react'

type PostItemProps = {
  post: Post
}
const PostItem = ({ post }: PostItemProps) => {
  return (
    <View>
      <Text>PostItem</Text>
    </View>
  )
}

export default PostItem
