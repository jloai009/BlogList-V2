import React from 'react'
import { useDispatch } from 'react-redux'
import { updateReactions } from './blogsSlice'

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

export const ReactionButtons = ({ blog }) => {
  const dispatch = useDispatch()

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() =>
          dispatch(updateReactions({ blogId: blog.id, reaction: name }))
        }
      >
        {emoji} {blog.reactions[name]}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}
