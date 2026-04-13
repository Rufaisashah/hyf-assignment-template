import { key, CRUD_ENDPOINT } from "./secret.js";
const SCREENSHOT_HOST =
  "website-screenshot-capture-api-by-apirobots.p.rapidapi.com";

const inputUrl = document.getElementById("urlInput");
const submitButton = document.getElementById("captureBtn");
const libraryDom = document.getElementById("savedScreenshotsList");

class Screenshot {
  constructor(website, link, id = null) {
    this.website = website;
    this.link = link;
    this.id = id;
  }

  renderPreview() {
    const isOverlay = document.querySelector(".screenshot-overlay");
    if (isOverlay) isOverlay.remove();

    const showScreenshot = document.createElement("div");
    showScreenshot.className = "screenshot-overlay";

    const popupWindow = document.createElement("div");
    popupWindow.className = "popup";

    popupWindow.innerHTML = `
      <h3>Screenshot!</h3>
      <img src="${this.link}" alt="Preview">
      <p>
        <a href="${this.website}" target="_blank">Visit Website</a> | 
        <a href="${this.link}" target="_blank">View Image</a>
      </p>
      <button class="save-btn" id="temp-save-btn">Save to Library</button>
      <button class="close-btn">x</button>
    `;

    showScreenshot.appendChild(popupWindow);

    document.body.appendChild(showScreenshot);

    showScreenshot
      .querySelector(".close-btn")
      .addEventListener("click", () => showScreenshot.remove());

    const saveBtn = showScreenshot.querySelector("#temp-save-btn");
    if (this.id) {
      saveBtn.style.display = "none";
    } else {
      saveBtn.addEventListener("click", () =>
        saveScreenshot(this, showScreenshot),
      );
    }
  }
  y;
  renderInLibrary() {
    const container = document.createElement("div");
    container.className = "photo-container";

    const image = document.createElement("img");
    image.setAttribute("src", this.link);
    image.setAttribute("class", "photo");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    container.appendChild(image);
    container.appendChild(deleteBtn);
    libraryDom.appendChild(container);

    image.addEventListener("click", () => this.renderPreview());

    deleteBtn.addEventListener("click", () => deleteScreenshot(this.id));
  }
}

const getScreenshot = async () => {
  const url = inputUrl.value.trim();
  let validUrl;

  try {
    validUrl = new URL(url);
  } catch {
    showError(new InvalidUrlError(url).userMessage);
    return;
  }

  showLoading();

  const encodedUrl = encodeURIComponent(validUrl.href);

  const sendUrl = `https://${SCREENSHOT_HOST}/v1/screenshots/image?url=${encodedUrl}&width=800&height=450&quality=60&type=jpeg`;

  try {
    const response = await fetch(sendUrl, {
      method: "GET",
      headers: {
        "x-rapidapi-key": key,
        "x-rapidapi-host": SCREENSHOT_HOST,
      },
    });

    if (!response.ok) throw new ApiError(response.status, response.statusText);

    const imageBlob = await response.blob();

    const reader = new FileReader();
    reader.readAsDataURL(imageBlob);
    reader.onloadend = () => {
      const base64data = reader.result;
      const newSS = new Screenshot(validUrl.href, base64data);
      newSS.renderPreview();
    };
  } catch (error) {
    handleAppError(error);
  } finally {
    hideLoading();
  }
};

const saveScreenshot = async (screenshotObj, overlay) => {
  try {
    const response = await fetch(CRUD_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        website: screenshotObj.website,
        link: screenshotObj.link,
      }),
    });

    if (!response.ok) throw new ApiError(response.status, "Save failed");

    overlay.remove(); // Close preview
    loadLibrary(); // Refresh list
  } catch (error) {
    handleAppError(error);
  }
};

const loadLibrary = async () => {
  try {
    const response = await fetch(CRUD_ENDPOINT);
    if (!response.ok) throw new ApiError(response.status, "Load failed");

    const data = await response.json();
    libraryDom.innerHTML = "";

    data.forEach((item) => {
      const ss = new Screenshot(item.website, item.link, item._id);
      ss.renderInLibrary();
    });
  } catch (error) {
    console.error("Library load error:", error);
  }
};

const deleteScreenshot = async (id) => {
  try {
    const response = await fetch(`${CRUD_ENDPOINT}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new ApiError(response.status, "Delete failed");
    loadLibrary(); // Refresh
  } catch (error) {
    handleAppError(error);
  }
};

const handleAppError = (error) => {
  if (error instanceof ScreenshotError) {
    showError(error.userMessage);
  } else {
    console.error(error);
    showError("An unexpected error occurred.");
  }
};

const showLoading = () => {
  const loader = document.createElement("div");
  loader.id = "loading-screen";
  loader.className = "loading-overlay";
  loader.innerHTML = `<div class="loading-circle"></div><p>Processing...</p>`;
  document.body.appendChild(loader);
};

const hideLoading = () => {
  const loader = document.getElementById("loading-screen");
  if (loader) loader.remove();
};

const showError = (message) => {
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-toast";
  errorDiv.textContent = message;
  document.body.appendChild(errorDiv);
  setTimeout(() => errorDiv.remove(), 4000);
};

submitButton.addEventListener("click", getScreenshot);
window.addEventListener("DOMContentLoaded", loadLibrary);

class ScreenshotError extends Error {
  constructor(message, userMessage) {
    super(message);
    this.userMessage = userMessage || "Something went wrong.";
  }
}

class InvalidUrlError extends ScreenshotError {
  constructor(url) {
    super(
      `Invalid URL: ${url}`,
      "Please enter a valid URL starting with http:// or https://",
    );
  }
}

class ApiError extends ScreenshotError {
  constructor(status, statusText) {
    super(
      `API Error: ${status}`,
      "Service unavailable. Please check your API keys or CrudCrud endpoint.",
    );
  }
}
