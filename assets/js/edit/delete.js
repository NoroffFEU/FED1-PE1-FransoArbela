export const deletePost = async (postId) => {
  const apiLink = `https://v2.api.noroff.dev/blog/posts`;
  const accessToken = localStorage.getItem("accessToken");
  const loginDataString = localStorage.getItem("loginData");
  const loginData = JSON.parse(loginDataString);
  const authorName = loginData.data.name;
  if (apiLink && accessToken) {
    try {
      const response = await fetch(`${apiLink}/${authorName}/${postId}`, {
        method: "DELETE",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        alert("Blog post deleted successfully.");
        reload();
      } else {
        console.error(
          "Failed to delete the blog post:",
          response.status,
          await response.text()
        );
      }
    } catch (error) {
      console.error("Error deleting the blog post:", error);
    }
  } else {
    console.error("API link or access token is missing.");
  }
};

const reload = () => {
  window.location.reload();
};
