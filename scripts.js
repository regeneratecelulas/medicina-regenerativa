import productsData from "./contentManage/productsData.js"; // Importing data for Tratamientos

console.log("from scripts.js");

// Function to populate "Tratamientos" items from local data (productsData)
function populateTratamientos(tratamientos) {
  const container = document.getElementById("tratamientoItemDiv");
  container.innerHTML = ""; // Clear existing content

  tratamientos.forEach((tratamiento) => {
    const details = document.createElement("details");

    // Create the summary with the icon next to the title
    const summary = document.createElement("summary");
    const icon = document.createElement("i"); // Create icon element
    icon.className = tratamiento.icon; // Assign the icon class from the data
    summary.appendChild(icon); // Append icon to the summary

    const titleText = document.createTextNode(" " + tratamiento.title); // Add space before title text
    summary.appendChild(titleText); // Append title text to the summary

    const content = `
      <p>${tratamiento.description}</p>
      <img src="${tratamiento.imageUrl}" alt="${tratamiento.title}" class="treatmentImage">
    `;

    details.innerHTML += content;
    details.prepend(summary);
    details.classList.add("generatedSection"); // Adding the class to apply the styling
    container.appendChild(details);
  });
}

// Function to extract the file ID from a Google Drive URL
function extractDriveFileId(url) {
  const match = url.match(/\/d\/([^/]+)/);
  return match ? match[1] : null;
}

// Function to populate "Capacitaciones" items from API data
function populateCapacitaciones(capacitaciones) {
  const container = document.getElementById("capacitacionItemDiv");
  container.innerHTML = ""; // Clear existing content

  capacitaciones.forEach((capacitacion) => {
    const details = document.createElement("details");

    // Create the summary with the icon next to the title
    const summary = document.createElement("summary");
    const icon = document.createElement("i"); // Create icon element
    icon.className = capacitacion.icon; // Assign the icon class from the data
    summary.appendChild(icon); // Append icon to the summary

    const titleText = document.createTextNode(" " + capacitacion.title); // Add space before title text
    summary.appendChild(titleText); // Append title text to the summary

    // Extract the file ID and construct the thumbnail URL
    const fileId = extractDriveFileId(capacitacion.imageUrl);
    const thumbnailUrl = fileId
      ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`
      : "#"; // Fallback to "#" if file ID is not found

    const content = `
      <p><strong>Fecha:</strong> ${capacitacion.fecha}</p>
      <p><strong>Lugar:</strong> ${capacitacion.lugar}</p>
      <p><strong>Ponente:</strong> ${capacitacion.ponente}</p>
      <p> ${capacitacion.description}</p>
      <img src="${thumbnailUrl}" alt="${capacitacion.title}" class="capacitacionImage">
    `;

    details.innerHTML += content;
    details.prepend(summary);
    details.classList.add("generatedSection"); // Adding the class to apply the styling
    container.appendChild(details);
  });
}

// Function to populate the reel with images from the eventos API data
function populateReel(eventos) {
  const reelContainer = document.getElementById("reel");
  reelContainer.innerHTML = ""; // Clear existing reel content

  // Helper function to extract the file ID from a Google Drive URL
  function extractDriveFileId(url) {
    const match = url.match(/\/d\/([^/]+)/);
    return match ? match[1] : null;
  }

  // Helper function to create a logo section
  function createLogoSection() {
    const section = document.createElement("section");
    const img = document.createElement("img");
    img.src = "celulasimages/whitelogo.jpg"; // Local logo image
    img.alt = "logo-celulas";
    img.loading = "lazy";
    section.appendChild(img);
    return section;
  }

  // Add the logo at the start
  reelContainer.appendChild(createLogoSection());

  // Add event images to the reel
  eventos.forEach((evento) => {
    if (evento.imageUrl) {
      const section = document.createElement("section");

      // Extract the file ID and construct the thumbnail URL
      const fileId = extractDriveFileId(evento.imageUrl);
      const thumbnailUrl = fileId
        ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`
        : evento.imageUrl; // Fallback to original URL if file ID is not found

      const img = document.createElement("img");
      img.src = thumbnailUrl; // Use the thumbnail URL
      img.alt = evento.title; // Use the event title for alt text
      img.loading = "lazy";
      section.appendChild(img);
      reelContainer.appendChild(section);
    }
  });

  // Add the logo at the end
  reelContainer.appendChild(createLogoSection());
}

// Fetching data from the API and populating the sections
fetch("https://content-manager-regerativa.vercel.app/api/eventos")
  .then((response) => response.json())
  .then((data) => {
    // Log the data to check its structure
    console.log(data);
    populateTratamientos(productsData); // Using local data for Tratamientos
    populateCapacitaciones(data); // Using API data for Capacitaciones
    populateReel(data); // Populate the reel with API data
  })
  .catch((error) => {
    console.error("Error loading data:", error);
  });

// REEL functionality (scrolling effect)
const reel = document.getElementById("reel");

function scrollReel() {
  const scrollAmount = reel.offsetWidth * 0.01; // Scroll 1% of the reel's width
  reel.scrollLeft += scrollAmount;
}

let scrollInterval = setInterval(scrollReel, 60);

reel.addEventListener("mouseenter", function () {
  clearInterval(scrollInterval);
});

reel.addEventListener("mouseleave", function () {
  scrollInterval = setInterval(scrollReel, 40);
});

reel.addEventListener("scroll", function () {
  const { scrollLeft, clientWidth } = reel;
  const totalWidth = Array.from(reel.children).reduce(
    (acc, child) => acc + child.offsetWidth,
    0
  );
  if (scrollLeft + clientWidth >= totalWidth) {
    reel.scrollLeft = 0; // Reset to the beginning
  }
});
// Floating WhatsApp icon visibility
window.addEventListener("scroll", function () {
  const whatsappSection = document.getElementById("whatsappSection");
  whatsappSection.style.display = window.scrollY > 400 ? "block" : "none";
});
