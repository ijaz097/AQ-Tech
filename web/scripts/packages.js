document.addEventListener("DOMContentLoaded", function () {
    // Tab Switching
    const tabButtons = document.querySelectorAll(".tab-btn");
    const packageSections = document.querySelectorAll(".package-section");

    tabButtons.forEach(button => {
        button.addEventListener("click", function () {
            tabButtons.forEach(btn => btn.classList.remove("active"));
            packageSections.forEach(section => section.classList.remove("active"));
            
            this.classList.add("active");
            document.getElementById(this.dataset.type + "-packages").classList.add("active");
        });
    });

    // Modal Functionality
    const modal = document.querySelector(".package-modal");
    const modalTitle = document.querySelector(".modal-title");
    const modalFeatures = document.querySelector(".modal-features");
    const closeModal = document.querySelector(".close-modal");
    const learnMoreButtons = document.querySelectorAll(".cta-learn-more");

    const packageDetails = {
        "analog-basic": {
            title: "Basic Home Security",
            features: [
                "2 x 2MP Cameras",
                "1 Channel DVR",
                "500GB Storage",
                "Night Vision"
            ]
        },
        "analog-business": {
            title: "Business Package",
            features: [
                "4 x 2MP Cameras",
                "4 Channel DVR",
                "1TB Storage",
                "Weatherproof"
            ]
        },
        "ip-smarthome": {
            title: "Smart Home Package",
            features: [
                "4 x 2MP IP Cameras",
                "PoE NVR System",
                "Mobile Access",
                "1TB Storage"
            ]
        }
    };

    learnMoreButtons.forEach(button => {
        button.addEventListener("click", function () {
            const packageKey = this.dataset.package;
            if (packageDetails[packageKey]) {
                modalTitle.textContent = packageDetails[packageKey].title;
                modalFeatures.innerHTML = packageDetails[packageKey].features.map(feature => `<li>${feature}</li>`).join("");
                modal.style.display = "flex";
            }
        });
    });

    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
