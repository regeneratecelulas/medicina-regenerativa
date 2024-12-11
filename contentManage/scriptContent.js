document.addEventListener("DOMContentLoaded", () => {
  console.log("from scriptConten.js");
  const form = document.getElementById("editForm");
  const statusMessage = document.getElementById("statusMessage");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Get form values
    const eventId = document.getElementById("eventId").value.trim();
    const eventName = document.getElementById("eventName").value.trim();
    const eventDescription = document
      .getElementById("eventDescription")
      .value.trim();
    const eventImage = document.getElementById("eventImage").value.trim();
    const eventDate = document.getElementById("eventDate").value.trim();
    const eventPlace = document.getElementById("eventPlace").value.trim();
    const eventSpeaker = document.getElementById("eventSpeaker").value.trim();

    // Validate inputs
    if (
      !eventId ||
      !eventName ||
      !eventDescription ||
      !eventDate ||
      !eventPlace ||
      !eventSpeaker
    ) {
      statusMessage.textContent = "Todos los campos son requeridos";
      statusMessage.style.color = "red";
      return;
    }

    // Convertir la fecha al formato día-mes-año
    const [year, month, day] = eventDate.split("-");
    const formattedDate = `${day}-${month}-${year}`;

    // Create updated event object
    const updatedEvent = {
      title: eventName,
      description: eventDescription,
      imageUrl: eventImage,
      fecha: formattedDate,
      lugar: eventPlace,
      ponente: eventSpeaker,
    };

    try {
      // Send the updated event data to the backend
      const response = await fetch(
        `https://content-manager-regerativa.vercel.app/api/eventos/${eventId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEvent),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update event. Please try again.");
      }

      const responseData = await response.json();
      statusMessage.textContent = responseData.message || "Se logró!";
      statusMessage.style.color = "green";

      // Optionally reset the form
      form.reset();
    } catch (error) {
      console.error("Error updating event:", error);
      statusMessage.textContent = "Error. Evento no fue actualizado";
      statusMessage.style.color = "red";
    }
  });
});
