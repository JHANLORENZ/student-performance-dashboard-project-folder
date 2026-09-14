import { students } from "./students.js";
import {
  searchStudents,
  filterStudentsByBlock,
  filterStudentsByStatus
} from "./gradeUtils.js";
import {
  displayStudents,
  displaySummary,
  displayMessage
} from "./display.js";

const searchInput = document.getElementById("searchInput");
const blockFilter = document.getElementById("blockFilter");
const statusFilter = document.getElementById("statusFilter");
const applyBtn = document.getElementById("applyBtn");


function getFilteredStudents() {
  const query = searchInput.value;
  const selectedBlock = blockFilter.value;
  const selectedStatus = statusFilter.value;

  let results = searchStudents(students, query);
  results = filterStudentsByBlock(results, selectedBlock);
  results = filterStudentsByStatus(results, selectedStatus);

  return results;
}

function updateDashboard() {
  const results = getFilteredStudents();

  displayStudents(results);
  displaySummary(results);

  if (results.length === 0) {
    displayMessage("No students found");
  } else {
    displayMessage("");
  }
}

applyBtn.addEventListener("click", updateDashboard);

resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  blockFilter.value = "All";
  statusFilter.value = "All";

  displayStudents(students);
  displaySummary(students);
  displayMessage("");
});

searchInput.addEventListener("input", updateDashboard);

blockFilter.addEventListener("change", () => {
  updateDashboard();
});

statusFilter.addEventListener("change", () => {
  updateDashboard();
});

displayStudents(students);
displaySummary(students);
displayMessage("");
