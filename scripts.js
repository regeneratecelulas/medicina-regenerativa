document.addEventListener('DOMContentLoaded', function() {
    console.log("from scripts.js");

//floating whatsapp icon
    window.addEventListener('scroll', function() {
        var whatsappSection = document.getElementById('whatsappSection');
        if (window.scrollY > 400) { // Change 100 to your desired scroll position
            whatsappSection.style.display = 'block';
        } else {
            whatsappSection.style.display = 'none';
        }
    });

    // Function to toggle the visibility of the paragraph and images
    function toggleContent(section) {
        const paragraph = section.querySelector('p');
        const images = section.querySelectorAll('img');
        paragraph.classList.toggle('active');
        images.forEach(img => img.classList.toggle('active'));
    }

    // Add click event listeners to each heading in the tratamientoItemDiv and capacitacionItemDiv
    function addClickEventListeners(sectionId) {
        const headings = document.querySelectorAll(`#${sectionId} h4`);
        headings.forEach(function(heading) {
            heading.addEventListener('click', function() {
                toggleContent(this.parentElement);
            });
        });
    }

    // Function to dynamically populate a section
    function populateSection(sectionId, data) {
        const sectionDiv = document.getElementById(sectionId);
    
        // Loop through the data array
        data.forEach(item => {
            // Create elements for the item
            const section = document.createElement('section');
            const h4 = document.createElement('h4');
            const i = document.createElement('i');
            const genericIcon = document.createElement('i'); // Generic icon element
            const p = document.createElement('p');
            const img = document.createElement('img');
    
            // Set attributes and content for the elements
            genericIcon.className = 'fa-solid fa-arrows-up-down'; // Set class for the generic icon
            i.className = item.icon;
            h4.appendChild(i);
            h4.appendChild(document.createTextNode(item.title));
            h4.appendChild(genericIcon); // Append the generic icon
            p.textContent = item.description;
            p.classList.add('retractable-section');
    
            img.src = item.imageUrl;
            img.alt = item.title;
            img.classList.add('product-image');
            img.classList.add('retractable-section');
            section.classList.add('generatedSection');
    
            // Create a div for the additional information
            const additionalInfoDiv = document.createElement('div');
            additionalInfoDiv.classList.add('additional-info');
    
            // If the item has 'lugar' property, add additional information
            if ('lugar' in item) {
                const fecha = document.createElement('p');
                const lugar = document.createElement('p');
                const linkZoom = document.createElement('a');
                const code = document.createElement('p');
    
                fecha.textContent = `Fecha: ${item.fecha}`;
                lugar.textContent = `Lugar: ${item.lugar}`;
                linkZoom.textContent = `Link Zoom`;
                linkZoom.href = item.linkZoom; // Set the href attribute to the linkZoom URL
                linkZoom.target = '_blank'; // Open link in a new tab/window
                linkZoom.style.cursor = 'pointer';
                code.textContent = `Code: ${item.code}`;
    
                additionalInfoDiv.appendChild(fecha);
                additionalInfoDiv.appendChild(lugar);
                additionalInfoDiv.appendChild(linkZoom);
                additionalInfoDiv.appendChild(code);
                additionalInfoDiv.classList.add('retractable-section');
            }
    
            // Append elements to the section
            section.appendChild(h4);
            section.appendChild(p);
            section.appendChild(img);
            section.appendChild(additionalInfoDiv); // Append the additional information div
    
            // Append the section to the parent element
            sectionDiv.appendChild(section);
    
            // Add click event listener to toggle additional information visibility
            h4.addEventListener('click', function() {
                additionalInfoDiv.classList.toggle('active');
            });

            img.addEventListener('mouseenter', function() {
                const hoverMessage = document.createElement('div');
                hoverMessage.textContent = '*Imagen ilustrativa. Contáctanos para obtener nuestros catálogos'; // Message text
                hoverMessage.classList.add('hover-message'); // Add CSS class
                img.parentNode.insertBefore(hoverMessage, img.nextSibling); // Insert after the image
            });

            // Remove hover message when mouse leaves the image
            img.addEventListener('mouseleave', function() {
                const hoverMessage = img.nextSibling; // Get the next sibling of the image
                if (hoverMessage && hoverMessage.classList.contains('hover-message')) {
                    hoverMessage.parentNode.removeChild(hoverMessage); // Remove the hover message
                }
            });
        });

        // Add click event listeners to the headings using the same id that pupullated the div
        addClickEventListeners(sectionId);
    }

    // Sample data for 14 products
    const productsData = [
        { icon: 'fa-solid fa-cookie', title: ' Células Madre', description: 'Las células madre mesenquimales son capaces de auto renovarse. Tienen propiedades inmunomodulatorias, debido a que secretan citoquinas y receptores que son capaces de modificar el microambiente inmune del huésped.', imageUrl: 'celulasimages/product1.jpg' },
        { icon: 'fa-solid fa-syringe', title: ' Implantes', description: 'El implante liofilizado de placenta apoya a la homeostasis del organismo, es decir, a mantener el equilibrio natural del cuerpo. Como resultado, el proceso de envejecimiento se hace más lento y se mejora la producción de colágeno y elastina.', imageUrl: 'celulasimages/product2.jpg' },
        { icon: 'fa-solid fa-thermometer', title: ' Fibroblastos', description: 'Los fibroblastos son las principales células productoras de colágeno y elastina en nuestro cuerpo. Son esenciales en el rejuvenecimiento de la piel.', imageUrl: 'celulasimages/product3.jpg' },
        { icon: 'fa-solid fa-virus-covid', title: ' Exosomas', description: 'Los Exosomas son pequeñas vesículas, que provienen de las células, con un alto contenido en proteínas, lípidos, ARN mensajero, ARN mitocondrial, ADN y distintos factores de crecimiento.', imageUrl: 'celulasimages/product4.jpg' },
        { icon: 'fa-solid fa-vial-virus', title: ' Factor de Transferencia', description: 'El Factor de Transferencia es un producto que consta de moléculas mensajeras que llevan información al sistema inmunológico de un individuo (Inmunomodulador) para incrementar sus defensas y su función.', imageUrl: 'celulasimages/product5.jpg' },
        { icon: 'fa-solid fa-viruses', title: ' NK', description: 'Las células asesinas naturales (natural killer cells [NK]) son un tipo de linfocitos producidos en la médula ósea, cuya función efectora está mediada por la producción de citocinas y su actividad citotóxica.', imageUrl: 'celulasimages/product6.jpg' },
        { icon: 'fa-solid fa-vials', title: ' Factores de Crecimiento', description: 'Los factores de crecimiento plasmático son proteínas que se encuentran en los tejidos y se encargan de la reparación de tejido dañado, en enfermedades como tendinopatías, lesiones meniscales o úlceras corneales y vasculares, o alopecia, entre otras.', imageUrl: 'celulasimages/product7.jpg' },
        { icon: 'fa-solid fa-seedling', title: ' Extracto Proteico', description: 'Actúa como una potente terapia reguladora del organismo humano y energizante general, gracias a su gran contenido de factores de crecimiento, nutrientes y proteínas.', imageUrl: 'celulasimages/product8.jpg' },
        { icon: 'fa-solid fa-flask', title: ' Mixture', description: 'Mixture combina las terapias más novedosas de la medicina regenerativa lo que lo convierte en el producto más completo de la industria estética. ', imageUrl: 'celulasimages/product10.jpg' },
        { icon: 'fa-solid fa-tablets', title: ' Pellet', description: 'Los pellets hormonales son el futuro de la terapia hormonal. Es un tratamiento de terapia hormonal bioidéntica. Contamos con pellet de DHEA-Testosterona y pellet de progesterona.', imageUrl: 'celulasimages/product11.jpg' },
        { icon: 'fa-solid fa-face-kiss-wink-heart', title: ' Suero Facial', description: 'El principal ingrediente de nuestro suero facial sonlos factores de crecimiento de las células troncales mesenquimales.', imageUrl: 'celulasimages/product12.jpg' },
        { icon: 'fa-solid fa-bottle-water', title: ' Sueroterapia', description: 'Amplia gama de sueros terapéuticos, contáctanos para compartirte nuestro catálogo.', imageUrl: 'celulasimages/product13.jpg' },
        { icon: 'fa-solid fa-bottle-droplet', title: ' Mix de Sueros', description: 'Viales de sueroterapia unidosis con las concentraciones necesarias de nutrientes, funcionan como adyuvantes en el tratamiento de diversas patologías crónico degenerativas, inmunológicas, neurodegenerativas y de envejecimiento.', imageUrl: 'celulasimages/product14.jpg' },
        { icon: 'fa-solid fa-head-side-virus', title: ' Kit de Alopecia', description: 'Tratamiento capilar contra la Alopecia que contiene factores de crecimiento de las Células Madre Mesenquimales, con resultados clínicamente comprobados.', imageUrl: 'celulasimages/product15.jpg' },
        { icon: 'fa-solid fa-face-grin-stars', title: ' Línea Estética', description: 'De la linea Science Beauty: -Skin Perfection. -Neocollagen. -Clear Skin Cell. -Dustasterida.', imageUrl: 'celulasimages/product16.jpg' },
        ]

    // Sample data for 4 services
    const servicesData = [
        { icon: 'fa-solid fa-pills', title: 'Certificaciónes Médicas', fecha: "8 y 9 de marzo", lugar: "Hotel Baruk, GDL", description: 'Certificación en medicina regenerativa y estética con aval curricular. Pregunta por nuestra próxima certificación modalidad presencial y online.', ponente: 'Varios Expertos', imageUrl: 'celulasimages/service0.jpg', linkZoom: '', code: '' },
        { icon: 'fa-solid fa-person-dots-from-line', title: 'Sueroterapia', fecha: "Ya realizado", lugar: "Via Zoom", description: 'Conoce la fórmula más innovadora que cambiará la vida de tus pacientes.', ponente: 'Andrés Castañeda Luna', imageUrl: 'celulasimages/service1.jpg', linkZoom: 'https://us06web.zoom.us/rec/share/Uwp-qWRW6RrpBwd7N54wjeWNM67v3jfBRzj68T4WbWOYalbkfLQygtCr_bGXV9Hy._kBmDC5P9Yoq3rQ5', code: '@zN7gCh=' },
        { icon: 'fa-solid fa-circle-nodes', title: 'Medicina Estética', fecha: "Ya realizado", lugar: "Via Zoom", description: 'Explorar nuestros productos de medicina estética. Respaldados por la última investigación científica, que proporcionan soluciones para realzar la belleza y mejorar la salud de la piel.', ponente: 'Andrés Castañeda Luna', imageUrl: 'celulasimages/service2.jpg', linkZoom: 'https://us06web.zoom.us/rec/share/wTC4o3oNfPRywahpXikePiAuZFHST_AuzkFGOKSNviDtNKgrXoNp7d7FIkhZYpY0.FbeculDz1K0f8ze5', code: 'j6b1?vhJ' },
        { icon: 'fa-solid fa-pills', title: 'Endocrinogenética', fecha: "Ya realizado", lugar: "Via Zoom", description: 'Endocrinogenética y hormonas bioidénticas.', ponente: 'Dr. Alexis Monge', imageUrl: 'celulasimages/service3.jpg', linkZoom: 'https://us06web.zoom.us/rec/share/4ui9kNBMlMj68XsJSdau-ZuUVx4cLii3scoSkCfs2-HZAE1bwsmGDywHH5Jkjzwz.hhcnPENeP3wMiDk7', code: 'zd#l3e%%' },
    
      ];

    // Call the function to populate the tratamientoItemDiv
    populateSection('tratamientoItemDiv', productsData);

    // Call the function to populate the capacitacionItemDiv
    populateSection('capacitacionItemDiv', servicesData);


//REEL
    const reel = document.getElementById('reel');

    function scrollReel() {
        reel.scrollLeft += 3; // Adjust scroll speed as needed
    }
    
    let scrollInterval = setInterval(scrollReel, 50); // Adjust scroll speed as needed
    
    reel.addEventListener('mouseenter', function() {
        clearInterval(scrollInterval);
    });
    
    reel.addEventListener('mouseleave', function() {
        scrollInterval = setInterval(scrollReel, 50); // Adjust scroll speed as needed
    });


    // reel.addEventListener('scroll', function() {
    // if (reel.scrollLeft + reel.clientWidth >= reel.scrollWidth) {
    //     // Reset scroll position to the beginning
    //     reel.scrollLeft = 0;
    // }

    
    reel.addEventListener('scroll', function() {
    //  Recalculate the scroll width when scrolling
      const { scrollLeft, clientWidth, scrollWidth } = reel;
        const totalWidth = Array.from(reel.children).reduce((acc, child) => acc + child.offsetWidth, 0);
       if (scrollLeft + clientWidth >= totalWidth) {
           // Reset scroll position to the beginning
          reel.scrollLeft = 0;
     }
    });









    
});





