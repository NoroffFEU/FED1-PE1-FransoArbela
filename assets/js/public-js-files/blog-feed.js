import { getUsername } from "./caseOfLoggedIn.js"; // Import function to get the logged-in user's username

const searchInput = document.querySelector("#search"); // Select the search input field

// Fetch blog posts and display them in the blog feed
document.addEventListener("DOMContentLoaded", async () => {
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
    const cards = document.querySelector("#cards"); // Select blog post container
    const carousel = document.querySelector(".carousel"); // Select carousel container

    // Generate blog images for the carousel
    blogPosts.data.forEach((post) => {
      const carouselImgAndTitle = document.createElement("div");
      carouselImgAndTitle.classList = "carousel-posts";
      carouselImgAndTitle.innerHTML = `
        <h1 class="carousel-titles">${post.title}</h1>
        <img class="carousel-images" src="${post.media?.url}" alt="${post.media?.alt}">
      `;

      carouselImgAndTitle.id = `${post.id}`;
      carousel.appendChild(carouselImgAndTitle);

      // Redirect to post page when clicking on a carousel item
      carouselImgAndTitle.addEventListener("click", (event) => {
        const postID = event.currentTarget.id;
        window.location.href = `/post/index.html?id=${postID}`;
      });
    });

    const viewPost = document.createElement("p")
    viewPost.innerText = "View Post"
    carousel.appendChild(viewPost);

    // Initialize carousel functionality
    const allCarouselImg = document.querySelectorAll(".carousel-images");
    const allCarouselTitles = document.querySelectorAll(".carousel-titles");
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

      // Ensure index stays within bounds

      slideIndex =
        index >= allCarouselImg.length
          ? 0
          : index < 0
          ? allCarouselImg.length - 1
          : index;

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

    // Automatically change slides every 6 seconds
    const autoDisplayImgs = () => {
      allCarouselImg.length && allCarouselImg[slideIndex].classList.add("display-slide");
      allCarouselImg.length && allCarouselTitles[slideIndex].classList.add("display-slide");
      intervalId = setInterval(nextSlide, 6000);
    };
    

    // Pause auto-slide on mouse hover
    carousel.addEventListener("mouseover", () => clearInterval(intervalId));
    carousel.addEventListener(
      "mouseout",
      () => (intervalId = setInterval(nextSlide, 6000))
    );

    autoDisplayImgs(); // Start auto-slide

    // Generate blog post cards
    blogPosts.data.forEach((post) => {
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
    
      postID && (window.location.href = `/post/${event.target.classList.contains("manage-post-btn") ? "edit" : "index"}.html?id=${postID}`);
    });
    
    // Display message if no blog posts are found
    if (!cards.innerHTML) {
      cards.innerHTML = "<p>No posts found.</p>";
    }
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }
});
