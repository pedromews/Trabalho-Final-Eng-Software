function showSection(sectionName) {
    // Get all the profile sections
    var sections = document.getElementsByClassName("profile-section");
  
    // Loop through the sections and hide them all
    for (var i = 0; i < sections.length; i++) {
      sections[i].style.display = "none";
    }
  
    // Show the section with the given name
    document.getElementById(sectionName).style.display = "block";
  }
  
  // Show the posts section by default
  showSection("posts");
  