import {
  calculateFinalGrade,
  getAcademicStatus,
  getPerformanceRemark,
  calculateClassAverage,
  countPassingStudents,
  getTopStudent
} from "./gradeUtils.js";

export function displayStudents(students) {
  const studentList = document.getElementById("studentList");

  studentList.innerHTML = "";

  if (students.length === 0) {
    studentList.innerHTML = "";
    return;
  }

  students.forEach(student => {
    const { id, name, block, quiz, lab, exam } = student;
    const finalGrade = calculateFinalGrade(student);
    const status = getAcademicStatus(finalGrade);
    const remark = getPerformanceRemark(finalGrade);

    const card = document.createElement("article");
    card.className = "student-card";
    card.dataset.studentId = id;

    card.innerHTML = `
      <h2>${name}</h2>
      <p class="block">Block: ${block}</p>

      <div class="score-grid">
        <div class="score-item">
          <span>Quiz</span>
          <strong>${quiz}</strong>
        </div>
        <div class="score-item">
          <span>Laboratory</span>
          <strong>${lab}</strong>
        </div>
        <div class="score-item">
          <span>Prelim Exam</span>
          <strong>${exam}</strong>
        </div>
      </div>

      <div class="result-line">
        <span>Final Grade</span>
        <strong>${finalGrade.toFixed(2)}</strong>
      </div>
      <div class="result-line">
        <span>Academic Status</span>
        <strong>${status}</strong>
      </div>
      <div class="result-line">
        <span>Performance Remark</span>
        <strong>${remark}</strong>
      </div>
    `;

    studentList.appendChild(card);
  });
}

export function displaySummary(students) {
  const classAverage = document.getElementById("classAverage");
  const passingCount = document.getElementById("passingCount");
  const displayedCount = document.getElementById("displayedCount");
  const topStudent = document.getElementById("topStudent");

  const average = calculateClassAverage(students);
  const passing = countPassingStudents(students);
  const top = getTopStudent(students);

  classAverage.textContent = average.toFixed(2);
  passingCount.textContent = passing;
  displayedCount.textContent = students.length;
  topStudent.textContent = top
    ? `${top.name} (${calculateFinalGrade(top).toFixed(2)})`
    : "None";
}

export function displayMessage(message) {
  const messageArea = document.getElementById("messageArea");
  messageArea.textContent = message;
}
