function userDto(user) {
  if (!user) return user;
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

function commentDto(comment) {
  if (!comment) return comment;
  const { author, ...rest } = comment;
  return {
    ...rest,
    author: userDto(author)
  };
}

function commentsDto(comments) {
  return comments.map(commentDto);
}

module.exports = {
  commentDto,
  commentsDto,
}; 