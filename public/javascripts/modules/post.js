import axios from "axios";
import { $, $$ } from "./bling";

function post(e, datas) {
  e.preventDefault();
  const dateval = document.getElementById("date").value;

  const project = document.getElementById("protitle");
  const protitle = project.options[project.selectedIndex].text;

  const story = document.getElementById("storytitle");
  const storytitle = story.options[story.selectedIndex].text;

  const task = document.getElementById("tasktitle");
  const tasktitle = task.options[task.selectedIndex].text;
  const desc = document.getElementById("desc").value;
  const time = document.getElementById("time").value;

  axios
    .post("/timesheets", {
      projecttitle: protitle,
      storytitle: storytitle,
      tasktitle: tasktitle,
      description: desc,
      time: time,
      created: dateval
    })
    .then(res => {
      if (res.data.length) {
        window.location = "/timesheets";
      }
    })
    .catch(console.error);
}

export default post;
