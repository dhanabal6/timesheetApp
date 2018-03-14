import axios from "axios";
import dompurify from "dompurify";

function searchResultsHTML(timesheets) {
  return timesheets
    .map(project => {
      return `
    <tr>
        <td>${project.projecttitle}</td>
        <td>${project.storytitle}</td>
        <td>${project.tasktitle}</td>
        <td>${project.description}</td>
        <td>${project.time}</td>
        <td> Task Added</td>
     </tr>
    `;
    })
    .join("");
}

function dateSearch(date) {
  if (!date) return;
  const dateInput = date.querySelector('input[name="date"]');
  const dateForms = date.querySelector("div.dateForm");
  const timeForm = date.querySelector(".timesheet");
  const appendForm = date.querySelector("#tbl");
  const postForm = date.querySelector("#post");

  dateInput.on("input", function() {
    console.log(this.value);
    if (!this.value) {
      dateForms.style.display = "block";
      return;
    }
    dateForms.style.display = "block";
    axios
      .get(`/api/timesheets?date=${this.value}`)
      .then(res => {
        if (res.data.length) {
          const datepic = searchResultsHTML(res.data);
          appendForm.innerHTML = datepic;
          alert("data show");
          appendForm.style.display = "table-row-group";
          timeForm.style.display = "block";
          return;
        }
        if (!res.data.length) {
          alert(`No results for ${this.value}`);
          appendForm.style.display = "none";
          timeForm.style.display = "block";
        }
      })
      .catch(err => {
        console.error(err);
      });
  });
  dateInput.on("change", e => {
    console.log("somethnig happen");
    console.log(window.location.href);
  });
}

export default dateSearch;
