window.addEventListener('scroll', function() {
    let offset = window.pageYOffset;
    let parallax = document.querySelectorAll('.parallax');

    parallax.forEach(function(element) {
        let speed = element.getAttribute('data-speed');
        element.style.backgroundPositionY = (offset * speed) + 'px';
    });
});

// Function to fetch JSON data from a file
async function fetchTripsData() {
    try {
      const response = await fetch('data.json'); // Assuming trips.json is the name of your JSON file
      if (!response.ok) {
        throw new Error('Failed to fetch trip data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching trip data:', error);
      return null;
    }
  }

  // Function to create HTML sections for each trip
async function generateTripSections() {
    const tripsData = await fetchTripsData();
    if (!tripsData || !tripsData.trips) {
      console.error('Invalid trips data');
      return;
    }
  
    const sectionContainer = document.getElementById('service-sections');
  
    // Iterate over each trip in the JSON data
    tripsData.trips.forEach(trip => {
      // Create a element
      const a = document.createElement('a');
      a.href = trip.html_file;
      a.innerHTML = `
      <section class="service parallax" style="background-image: url('${trip.image_background}');">
        <div class="container">
            <h2>${trip.name}</h2>
            <p>${trip.short_description}</p>
            <div class="danger-rating">
                <span class="dangerousness-label">!DANGEROUSNESS!</span>
                <span class="skull" n=${trip.dangerous_level}>💀</span>
            </div>
        </div>
      </section>
      `;
  
      // Append the section to the container
      sectionContainer.appendChild(a);
    });
  }

generateTripSections();
