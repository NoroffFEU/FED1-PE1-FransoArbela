import { getUsername } from "../scriptComponents/caseOfLoggedIn.js"; // Import function to get the logged-in user's username
import { showLoadingMessage, hideLoadingMessage } from "./loading.js";

const filterInput = document.querySelector("#filter");
const searchInput = document.querySelector("#search"); // Select the search input field

//=================================== Fetch blog posts and display them in the blog feed

// this function using methods and headers was inspired by the Moodle

document.addEventListener("DOMContentLoaded", async () => {
  // show loading screen
  showLoadingMessage();
  const username = getUsername(); // Get the current user's username

  try {
    // Fetch blog posts for the logged-in user
    const response = await fetch(
      `https://v2.api.noroff.dev/blog/posts/${username}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error(
        "Failed to fetch blog posts:",
        response.status,
        await response.text()
      );
      return;
    }

    const blogPosts = await response.json(); // Parse JSON response
    const blogData = blogPosts.data;
    const cards = document.querySelector("#cards"); // Select blog post container
    const carousel = document.querySelector(".carousel"); // Select carousel container

    //================================ Generate blog images for the carousel
    blogData.forEach((post) => {
      const carouselImgAndTitle = document.createElement("div");
      carouselImgAndTitle.classList.add("carousel-posts");
      carouselImgAndTitle.id = `${post.id}`;

      carouselImgAndTitle.innerHTML = `
      <h5 class="carousel-titles">${post.title}</h5>
      <img class="carousel-images" src="${post.media?.url}" alt="${post.media?.alt}">
  `;
      carousel.appendChild(carouselImgAndTitle);
    });

    // Redirect the current displayed slide
    carousel.addEventListener("click", () => {
      const currentSlide = document.querySelector(
        ".carousel-images.display-slide"
      );
      const currentTitle = document.querySelector(
        ".carousel-titles.display-slide"
      );

      if (!currentSlide || !currentTitle) {
        console.error("No active slide found!");
        return;
      }

      const postID = currentSlide.closest(".carousel-posts")?.id;

      if (!postID) {
        console.error("Post ID not found!");
        return;
      }

      console.log("Redirecting to post:", postID);
      window.location.href = `/post/index.html?id=${postID}`;
    });

    //=================================== Initialize carousel functionality
    
    //  this carousel function was inspired from this video and a few more
    // https://www.youtube.com/watch?v=IL4b86MPJmU&t=923s&ab_channel=CodingLab

    const allCarouselImg = document?.querySelectorAll(".carousel-images");
    const allCarouselTitles = document?.querySelectorAll(".carousel-titles");

    let slideIndex = 0,
      intervalId;

    const showSlide = (index) => {
      // Hide all slides before displaying the current one
      allCarouselImg.forEach((slide) =>
        slide.classList.remove("display-slide")
      );
      allCarouselTitles.forEach((slide) =>
        slide.classList.remove("display-slide")
      );

      // Ensuring index stays within bounds
      if (index >= allCarouselImg.length) {
        slideIndex = 0;
      } else if (index < 0) {
        slideIndex = allCarouselImg.length - 1;
      } else {
        slideIndex = index;
      }

      // Display the current slide
      allCarouselImg[slideIndex].classList.add("display-slide");
      allCarouselTitles[slideIndex].classList.add("display-slide");
    };

    const nextSlide = () => {
      slideIndex++;
      showSlide(slideIndex);
    };

    const prevSlide = () => {
      slideIndex--;
      showSlide(slideIndex);
    };

    // Add event listeners for previous and next buttons
    document.querySelector(".prev").addEventListener("click", prevSlide);
    document.querySelector(".next").addEventListener("click", nextSlide);

    const carouselWrapper = document.querySelector(".carousel-wrapper");
    const searchAndFilter = document.querySelector("#search-and-filter");
    if (allCarouselImg.length === 0 || allCarouselTitles.length === 0) {
      carouselWrapper.innerHTML = "No posts to be displayed";
      carousel.remove();
      searchAndFilter.remove();

      return;
    }

    // Automatically change slides every 6 seconds
    const autoDisplayImgs = () => {
      allCarouselImg.length &&
        allCarouselImg[slideIndex].classList.add("display-slide");
      allCarouselTitles.length &&
        allCarouselTitles[slideIndex].classList.add("display-slide");
      intervalId = setInterval(nextSlide, 6000);
    };

    // Pause auto-slide on mouse hover
    carousel.addEventListener("mouseover", () => clearInterval(intervalId));
    carousel.addEventListener(
      "mouseout",
      () => (intervalId = setInterval(nextSlide, 6000))
    );

    autoDisplayImgs(); // Start auto-slide

    //========================= Search blog post cards

    // this search function is from Moodle
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value; // Convert input to lowercase for case-insensitive search

      const result = blogData
        .map((item) => {
          const content = [item.title, item.tags.join(", ")];

          const score = content
            .map((value) => value.toLocaleLowerCase())
            .reduce((score, value) => {
              if (value.includes(searchTerm.toLocaleLowerCase())) {
                return score + 1;
              }
              return score;
            }, 0);
          return {
            ...item,
            score,
          };
        })
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score);

      posts(result);
    });

    // ======================== Filter blog posts
    // this filter was made by the help of AI, the code  filtered.sort((a, b) => new Date(b.created) - new Date(a.created)); was generated by AI
    filterInput.addEventListener("change", (event) => {
      const filterValue = event.target.value;

      // Copy the array
      let filtered = [...blogData];

      if (filterValue === "latest") {
        // newest first
        filtered.sort((a, b) => new Date(b.created) - new Date(a.created));
      } else if (filterValue === "oldest") {
        // oldest first
        filtered.sort((a, b) => new Date(a.created) - new Date(b.created));
      } else {
        // all no sorting
        filtered = [...blogData];
      }

      posts(filtered);
    });

    //========================= Generate blog post cards
    const posts = (filteredPosts) => {
      cards.innerHTML = "";
      const postList = filteredPosts.length > 0 ? filteredPosts : blogData;

      postList.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.className = "post-card";
        postElement.id = `${post.id}`;
        postElement.innerHTML = `
          <div>
            <img src="${post.media?.url || ""}" alt="${
          post.media?.alt || "Image"
        }" />
            <h3 id="blog-feed-title">${post.title}</h3>
            <p id="blog-feed-p">${post.body}</p>
          </div>
          <div class="read-more-button-container">
            <button class="read-more" data-class="${
              post.id
            }">Read more...</button>
          </div>
        `;
        cards.appendChild(postElement);
      });

      // Handle post click events to navigate to the full post page
      cards.addEventListener("click", (event) => {
        const postID = event.target.classList.contains("manage-post-btn")
          ? event.target.getAttribute("data-class")
          : event.target.closest(".post-card")?.id;

        if (postID) {
          window.location.href = `/post/${
            event.target.classList.contains("manage-post-btn")
              ? "edit"
              : "index"
          }.html?id=${postID}`;
        }
      });
    };
    posts(blogData);
    // hide loading screen
    hideLoadingMessage();
    //============================ Display message if no blog posts are found
    if (!cards.innerHTML) {
      cards.innerHTML = "<p>No posts found.</p>";
    }
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }
});
