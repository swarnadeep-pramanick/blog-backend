function userDto(user) {
  if (!user) return user;
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

function postDto(post) {
  if (!post) return post;
  const { author, ...rest } = post;
  return {
    ...rest,
    author: userDto(author)
  };
}

function postsDto(posts) {
  return posts.map(postDto);
}

module.exports = {
  postDto,
  postsDto,
}; 