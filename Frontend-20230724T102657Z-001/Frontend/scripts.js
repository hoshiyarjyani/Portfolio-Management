// Navbar starts

$(".flexnav").flexNav();


function ViewPortfolioSubmenus() {
    // const button = document.getElementById("myButton");
    const element = document.getElementById("PortfolioManagerSubmenus");
    if (element.style.display === "none") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  };

function ViewProjectSubmenus() {
    // const button = document.getElementById("myButton");
    const element = document.getElementById("ProjectsSubmenus");
    if (element.style.display === "none") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  };

function ViewDeveloperSubmenus() {
    // const button = document.getElementById("myButton");
    const element = document.getElementById("DeveloperSubmenus");
    if (element.style.display === "none") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  };

// Navbar ends


// View all portfolio managers


var managerId;
function fetchAllPMData() {
    console.log("working");
    alert("working");
    fetch("http://localhost:8088/portfolio_managers")
      .then(response => response.json())
      .then(data => {
        const tableContainer = document.getElementById("tableContainer");
        tableContainer.innerHTML = ""; // Clear previous data
  
        const table = document.createElement("table");
        table.classList.add("portfolio-table");
        table.border = "1";
  
        const headings = ["ID", "Name", "Status", "Email", "Description", "Activity"];
        const headingRow = document.createElement("tr");
        headings.forEach(heading => {
          const headingCell = document.createElement("th");
          headingCell.textContent = heading;
          headingRow.appendChild(headingCell);
        });
        table.appendChild(headingRow);
  
        data.forEach(itemData => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${itemData.id}</td>
            <td>${itemData.fullname}</td>
            <td>${itemData.status}</td>
            <td>${itemData.email}</td>
            <td>${itemData.description}</td>
            <td>
              <div class="activity-buttons">
                <button class="delete-button" data-id="${itemData.id}">Delete</button>
                <button class="update-button" data-id="${itemData.id}">Update</button>
              </div>
            </td>
          `;
          table.appendChild(row);
        });
  
        tableContainer.appendChild(table);
  
        // Attach event listener to parent element using event delegation
        tableContainer.addEventListener("click", function(event) {
          if (event.target.classList.contains("update-button")) {
            managerId = event.target.dataset.id;
            alert("working");
            const formContainer = document.getElementById("formContainer");
            formContainer.style.display = "block"; // Show the form
            alert("working show form")
            alert("maangerId "+managerId)
            
          }
        });
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }
  

function updatesubmit(){
  alert("new update form")
  event.preventDefault()
  let data= new FormData(document.getElementById("updateForm"));
  console.log(data)
  alert("submit form working");
  const formData = new FormData(document.getElementById("updateForm"));
  // const managerId = document.querySelector(".update-button").dataset.id;
  alert("maangerId "+managerId);
  alert("formData"+formData);
  fetch(`http://localhost:8088/portfolio_manager/${managerId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(Object.fromEntries(formData))
  })
    .then(response => response.json())
    .then(data => {
      console.log("Portfolio Manager updated:", data);
      document.getElementById("formContainer").style.display = "none"; // Hide the form
      fetchAllPMData(); // Fetch all data again to view the updated data
    })
    .catch(error => {
      console.error("Error updating Portfolio Manager:", error);
    });
  fetchAllPMData();
  document.getElementById("formContainer").style.display = "none";
}






// View all portfolio managers ends


// Form for creating portfolio manager

// const createDeveloperButton = document.getElementById("createDeveloperButton");
const createformContainer = document.getElementById("createformContainer");
let developerForm = document.getElementById("developerForm");

function createDeveloperButton() {
    
    const createformContainer = document.getElementById("createformContainer");
  if (createformContainer.style.display === "none") {
    createformContainer.style.display = "block";
  } else {
    createformContainer.style.display = "none";
  }
};


function submitForm() {
    const formData = new FormData(developerForm);
    
    fetch("/addPortfolioManager", {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log("Portfolio Manager added:", data);
        createformContainer.style.display = "none";
        fetchData(); // Fetch all data again to view the updated data
      })
      .catch(error => {
        console.error("Error adding Portfolio Manager:", error);
      });
  }


//   Deleet

const deleteButtons = document.querySelectorAll(".delete-button");
deleteButtons.forEach(button => {
    alert("works delete")
  button.addEventListener("click", function() {
    const managerId = this.dataset.id;
    fetch(`/deleteportfolio_manager/${managerId}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(data => {
        console.log("Portfolio Manager deleted:", data);
        fetchData(); // Fetch all data again to view the updated data
      })
      .catch(error => {
        console.error("Error deleting Portfolio Manager:", error);
      });
  });
});


function viewbyid(){
  const getformContainer = document.getElementById("getformContainer");
  if (getformContainer.style.display === "none") {
    getformContainer.style.display = "block";
  } else {
    getformContainer.style.display = "none";
  }
}

function formContainer(){
  const formContainer = document.getElementById("formContainer");
  if (formContainer.style.display === "none") {
    formContainer.style.display = "block";
  } else {
    formContainer.style.display = "none";
  }
}

function submitGetForm(){
  alert("getsubmit working")
  fetchsinglePMData()
}

function fetchsinglePMData() {
  console.log("working");
  alert("working");
  let id = document.getElementById("pmid").value
  alert(id)
  fetch(`http://localhost:8088/getportfolio_managerbyId/${id}`)
    .then(response => response.json())
    .then(data => {
      const tableContainer = document.getElementById("tableContainer");
      tableContainer.innerHTML = ""; // Clear previous data

      const table = document.createElement("table");
      table.classList.add("portfolio-table");
      table.border = "1";

      const headings = ["ID", "Name", "Status", "Email", "Description", "Activity"];
      const headingRow = document.createElement("tr");
      headings.forEach(heading => {
        const headingCell = document.createElement("th");
        headingCell.textContent = heading;
        headingRow.appendChild(headingCell);
      });
      table.appendChild(headingRow);

      console.log(data.id,data.fullname)
      
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${data.id}</td>
          <td>${data.fullname}</td>
          <td>${data.status}</td>
          <td>${data.email}</td>
          <td>${data.description}</td>
          <td>
            <div class="activity-buttons">
              <button class="delete-button" data-id="${data.id}">Delete</button>
              <button class="update-button" data-id="${data.id}">Update</button>
            </div>
          </td>
        `;
        table.appendChild(row);
      

      tableContainer.appendChild(table);

      // Attach event listener to parent element using event delegation
      tableContainer.addEventListener("click", function(event) {
        if (event.target.classList.contains("update-button")) {
          managerId = event.target.dataset.id;
          alert("working");
          const formContainer = document.getElementById("formContainer");
          formContainer.style.display = "block"; // Show the form
          alert("working show form")
          alert("maangerId "+managerId)
          
        }
      });
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
}

// Projects


const createprojectformContainer = document.getElementById("createprojectformContainer");
// let developerForm = document.getElementById("developerForm");

function createProjectButton() {
    
    const createprojectformContainer = document.getElementById("createprojectformContainer");
  if (createprojectformContainer.style.display === "none") {
    createprojectformContainer.style.display = "block";
  } else {
    createprojectformContainer.style.display = "none";
  }
};

let projectForm = document.querySelector(".projectForm");
function submitprojectForm() {
  const createprojectformContainer = document.getElementById("createprojectformContainer");
  let projectForm = document.querySelector(".projectForm");
  const formData = new FormData(projectForm);
  
  fetch("/addProjects", {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      console.log("Project added:", data);
      
      createprojectformContainer.style.display = "none";
      fetchData(); // Fetch all data again to view the updated data
    })
    .catch(error => {
      console.error("Error adding Project:", error);
    });
    fetchAllPJData();
    createprojectformContainer.style.display = "none";
}



var projectId;
function fetchAllPJData() {
  console.log("working");
  alert("working");
  fetch("http://localhost:8088/Projects")
    .then(response => response.json())
    .then(data => {
      const tableContainer = document.getElementById("tableContainer");
      tableContainer.innerHTML = ""; // Clear previous data

      const table = document.createElement("table");
      table.classList.add("portfolio-table");
      table.border = "1";

      const headings = ["ID", "Name", "Status", "Start Date", "End Date", "Description","Activity"];
      const headingRow = document.createElement("tr");
      headings.forEach(heading => {
        const headingCell = document.createElement("th");
        headingCell.textContent = heading;
        headingRow.appendChild(headingCell);
      });
      table.appendChild(headingRow);

      data.forEach(itemData => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${itemData.id}</td>
          <td>${itemData.ProjectName}</td>
          <td>${itemData.status}</td>
          <td>${itemData.Start_Date}</td>
          <td>${itemData.End_Date}</td>
          <td>${itemData.description}</td>
          <td>
            <div class="activity-buttons">
              <button class="deleteproject-button" data-id="${itemData.id}">Delete</button>
              <button class="updateproject-button" data-id="${itemData.id}">Update</button>
            </div>
          </td>
        `;
        table.appendChild(row);
      });

      tableContainer.appendChild(table);

      // Attach event listener to parent element using event delegation
      tableContainer.addEventListener("click", function(event) {
        if (event.target.classList.contains("updateproject-button")) {
          projectId = event.target.dataset.id;
          alert("working");
          const ProjectformContainer = document.getElementById("ProjectformContainer");
          ProjectformContainer.style.display = "block"; // Show the form
          alert("working show form")
          alert("projectId "+projectId)
          
        }
      });
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });

}


function updateProjectsubmit(){
  const ProjectformContainer = document.getElementById("ProjectformContainer");
  if (ProjectformContainer.style.display === "none") {
    ProjectformContainer.style.display = "block";
  } else {
    ProjectformContainer.style.display = "none";
  }
  updateprojectformsubmit()
}

function updateprojectformsubmit(){
  alert("new update form")
  event.preventDefault()
  let data= new FormData(document.querySelector(".Updateformdataproject"));
  console.log(data)
  alert("submit form working");
  const formData = new FormData(document.querySelector(".Updateformdataproject"));
  // const managerId = document.querySelector(".update-button").dataset.id;
  alert("projectId "+projectId);
  alert("formData"+formData);
  fetch(`http://localhost:8088/Updateprojects/${projectId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(Object.fromEntries(formData))
  })
    .then(response => response.json())
    .then(data => {
      console.log("Project updated:", data);
      document.getElementById("ProjectformContainer").style.display = "none"; // Hide the form
      fetchAllPJData(); // Fetch all data again to view the updated data
    })
    .catch(error => {
      console.error("Error updating Project:", error);
    });
  fetchAllPJData();
  document.getElementById("ProjectformContainer").style.display = "none";
}

function viewbyprojectid(){
  const getprojectformContainer = document.getElementById("getprojectformContainer");
  if (getprojectformContainer.style.display === "none") {
    getprojectformContainer.style.display = "block";
  } else {
    getprojectformContainer.style.display = "none";
  }
}




function fetchsinglePJData() {
  console.log("working");
  alert("working");
  let id = document.getElementById("pjid").value
  alert(id)
  fetch(`http://localhost:8088/getProjectbyId/${id}`)
    .then(response => response.json())
    .then(data => {
      const tableContainer = document.getElementById("tableContainer");
      tableContainer.innerHTML = ""; // Clear previous data

      const table = document.createElement("table");
      table.classList.add("portfolio-table");
      table.border = "1";

      const headings = ["ID", "Name", "Status", "Start Date", "End Date", "Description","Activity"];
      const headingRow = document.createElement("tr");
      headings.forEach(heading => {
        const headingCell = document.createElement("th");
        headingCell.textContent = heading;
        headingRow.appendChild(headingCell);
      });
      table.appendChild(headingRow);

      console.log(data.id,data.fullname)
      
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${data.id}</td>
        <td>${data.ProjectName}</td>
        <td>${data.status}</td>
        <td>${data.Start_Date}</td>
        <td>${data.End_Date}</td>
        <td>${data.description}</td>
        <td>
          <div class="activity-buttons">
            <button class="deleteproject-button" data-id="${data.id}">Delete</button>
            <button class="updateproject-button" data-id="${data.id}">Update</button>
          </div>
        </td>
        `;
        table.appendChild(row);
      

      tableContainer.appendChild(table);

      // Attach event listener to parent element using event delegation
      tableContainer.addEventListener("click", function(event) {
        if (event.target.classList.contains("updateproject-button")) {
          projectId = event.target.dataset.id;
          alert("working");
          const ProjectformContainer = document.getElementById("ProjectformContainer");
          ProjectformContainer.style.display = "block"; // Show the form
          alert("working show form")
          alert("projectId "+projectId)
          
        }
      });
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
}

function submitGetProjectForm(){
  alert("getsubmit working")
  fetchsinglePJData()
  const getprojectformContainer = document.getElementById("getprojectformContainer");
  if (getprojectformContainer.style.display === "none") {
    getprojectformContainer.style.display = "block";
  } else {
    getprojectformContainer.style.display = "none";
  }
}


// Developer


// Create


function createDevelopersButton() {
    alert("dev form display")
  const createdeveloperformContainer = document.getElementById("createdeveloperformContainer");
  alert(createdeveloperformContainer)
if (createdeveloperformContainer.style.display === "none") {
  createdeveloperformContainer.style.display = "block";
} else {
  createdeveloperformContainer.style.display = "none";
}
// submitDevForm()
};

// let projectForm = document.querySelector(".projectForm");
function submitdeveloperForm() {
const createdeveloperformContainer = document.getElementById("createdeveloperformContainer");
let developersForm = document.querySelector(".developersForm");
const formData = new FormData(developersForm);

fetch("/addDeveloper", {
  method: "POST",
  body: formData
})
  .then(response => response.json())
  .then(data => {
    console.log("Project added:", data);
    
    createdeveloperformContainer.style.display = "none";
    fetchAllDvpData(); // Fetch all data again to view the updated data
  })
  .catch(error => {
    console.error("Error adding Project:", error);
  });
  fetchAllDvpData();
  // alert("s")
  createdeveloperformContainer.style.display = "none";
}



// View all

var developerId;
function fetchAllDvpData() {
  console.log("working");
  alert("working");
  fetch("http://localhost:8088/Developer")
    .then(response => response.json())
    .then(data => {
      const tableContainer = document.getElementById("tableContainer");
      tableContainer.innerHTML = ""; // Clear previous data

      const table = document.createElement("table");
      table.classList.add("portfolio-table");
      table.border = "1";

      const headings = ["ID", "Name", "Projects","Activity"];
      const headingRow = document.createElement("tr");
      headings.forEach(heading => {
        const headingCell = document.createElement("th");
        headingCell.textContent = heading;
        headingRow.appendChild(headingCell);
      });
      table.appendChild(headingRow);

      data.forEach(itemData => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${itemData.id}</td>
          <td>${itemData.DeveloperName}</td>
          <td>${itemData.Projects}</td>
          <td>
            <div class="activity-buttons">
              <button class="deleteproject-button" data-id="${itemData.id}">Delete</button>
              <button class="updatedeveloper-button" data-id="${itemData.id}">Update</button>
            </div>
          </td>
        `;
        table.appendChild(row);
      });

      tableContainer.appendChild(table);

      // Attach event listener to parent element using event delegation
      tableContainer.addEventListener("click", function(event) {
        if (event.target.classList.contains("updatedeveloper-button")) {
          developerId = event.target.dataset.id;
          alert("working");
          const DeveloperformContainer = document.getElementById("DeveloperformContainer");
          DeveloperformContainer.style.display = "block"; // Show the form
          alert("working show form")
          alert("developerId "+developerId)
          
        }
      });
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });

}



function updateDevelopersubmit(){
  const DeveloperformContainer = document.getElementById("DeveloperformContainer");
  if (DeveloperformContainer.style.display === "none") {
    DeveloperformContainer.style.display = "block";
  } else {
    DeveloperformContainer.style.display = "none";
  }
  updatedeveloperformsubmit();
}

function updatedeveloperformsubmit(){
  alert("new update form")
  event.preventDefault()
  let data= new FormData(document.querySelector(".Updateformdatadeveloper"));
  console.log(data)
  alert("submit form working");
  const formData = new FormData(document.querySelector(".Updateformdatadeveloper"));
  // const managerId = document.querySelector(".update-button").dataset.id;
  alert("developerId "+developerId);
  alert("formData"+formData);
  fetch(`http://localhost:8088/UpdateDeveloper/${developerId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(Object.fromEntries(formData))
  })
    .then(response => response.json())
    .then(data => {
      console.log("developer updated:", data);
      document.getElementById("DeveloperformContainer").style.display = "none"; // Hide the form
      fetchAllDvpData(); // Fetch all data again to view the updated data
    })
    .catch(error => {
      console.error("Error updating Developer:", error);
    });
    fetchAllDvpData();
  document.getElementById("DeveloperformContainer").style.display = "none";
}




function viewbydeveloperid(){
  const getdeveloperformContainer = document.getElementById("getdeveloperformContainer");
  if (getdeveloperformContainer.style.display === "none") {
    getdeveloperformContainer.style.display = "block";
  } else {
    getdeveloperformContainer.style.display = "none";
  }
}




function submitGetDeveloperForm() {
  console.log("working");
  alert("working");
  let id = document.getElementById("dvid").value
  alert(id)
  fetch(`http://localhost:8088/getDeveloperbyId/${id}`)
    .then(response => response.json())
    .then(data => {
      const tableContainer = document.getElementById("tableContainer");
      tableContainer.innerHTML = ""; // Clear previous data

      const table = document.createElement("table");
      table.classList.add("portfolio-table");
      table.border = "1";

      const headings = ["ID", "Name", "Projects","Activity"];
      const headingRow = document.createElement("tr");
      headings.forEach(heading => {
        const headingCell = document.createElement("th");
        headingCell.textContent = heading;
        headingRow.appendChild(headingCell);
      });
      table.appendChild(headingRow);

      console.log(data.id,data.fullname)
      
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${data.id}</td>
          <td>${data.DeveloperName}</td>
          <td>${data.Projects}</td>
        <td>
          <div class="activity-buttons">
            <button class="deleteproject-button" data-id="${data.id}">Delete</button>
            <button class="updateproject-button" data-id="${data.id}">Update</button>
          </div>
        </td>
        `;
        table.appendChild(row);
      

      tableContainer.appendChild(table);

      // Attach event listener to parent element using event delegation
      tableContainer.addEventListener("click", function(event) {
        if (event.target.classList.contains("updatedeveloper-button")) {
          developerId = event.target.dataset.id;
          alert("working");
          const DeveloperformContainer = document.getElementById("DeveloperformContainer");
          DeveloperformContainer.style.display = "block"; // Show the form
          alert("working show form")
          alert("developerId "+developerId)
          
        }
      });
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
    const getdeveloperformContainer = document.getElementById("getdeveloperformContainer");
    getdeveloperformContainer.style.display = "none";
}


function submitGetProjectForm(){
  alert("getsubmit working")
  const getdeveloperformContainer = document.getElementById("getdeveloperformContainer");
  if (getdeveloperformContainer.style.display === "none") {
    getdeveloperformContainer.style.display = "block";
  } else {
    getdeveloperformContainer.style.display = "none";
  }
  submitGetDeveloperForm()
  // alert(getdeveloperformContainer)
  // alert("getsubmit working alast")
  getdeveloperformContainer.style.display = "none";

}