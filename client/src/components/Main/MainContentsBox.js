export default function MainContentsBox({ post }) {
  console.log(post);
  console.log();
  const imagesPath = `http://localhost:4000/images/`;
  return (
    <div className="main-box">
      <img src={imagesPath + post.image.split(',')[0]} alt="" />
      <div className="postTitle">{post.title}</div>
    </div>
  );
}
