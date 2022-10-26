import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Link,
  Radio,
  Typography,
} from "@mui/material";

const tableStyles = {
  border: "1px solid black",
  borderCollapse: "collapse",
  tableLayout: "auto",
  width: "100%",
};
const tableDataStyles = {
  textAlign: "center",
  fontWeight: "600",
  fontSize: "12px",
  padding: "5px",
  border: "1px solid grey",
  width: "90px",
  padding: "9px 0",
};
const tableHeaderStyles = {
  textAlign: "center",
  fontWeight: "700",
  fontSize: "14px",
  padding: "5px",
  border: "1px solid grey",
};
const tableHeader = {
  fontSize: "12px",
  height: "60px",
};

const ConfigurationTable = () => {
  const [toggleRadio, setToggleRadio] = useState(false);

  const createData = (conf, twin, double, queen, cal) => {
    return { conf, twin, double, queen, cal };
  };

  const tableData = [
    createData("HB-FS", "4 YARDS", "5 YARDS", "6 YARDS", "6 YARDS"),
    createData("HO", "1.5 YARDS", "2 YARDS", "6 YARDS", "6 YARDS"),
    createData("CB", "4 YARDS", "N/A", "N/A", "N/A"),
    createData("CBS", "4 YARDS", "N/A", "N/A", "N/A"),
  ];

  return (
    <>
      <Box
        style={{
          display: "grid",
          justifyItems: "center",
          alignItems: "center",
          height: "45px",
          borderTop: "1px #12141d solid",
          borderBottom: "1px #12141d solid",
        }}
      >
        <Typography style={{ fontSize: "13px", fontWeight: "700" }}>
          C.O.M. (Customer's Own Material) WELCOME
        </Typography>
      </Box>

      <Box
        style={{
          height: "300px",
          overflowY: "auto",
          padding: "18px 20px",
        }}
      >
        <Box>
          <FormControl>
            <FormControlLabel
              checked={toggleRadio}
              onClick={() => setToggleRadio(!toggleRadio)}
              control={<Radio />}
              label="Customer's own material welcomed."
            />
          </FormControl>
        </Box>
        <Box
          style={{
            padding: "5px 0",
          }}
        >
          <Link
            style={{
              borderBottom: "1px solid #c2a26a",
              textDecoration: "none",
              color: "#c2a26a",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            INSTRUCTIONS
          </Link>
        </Box>

        <Box
          style={{
            marginTop: "20px",
          }}
        >
          <table style={tableStyles}>
            <thead>
              <tr style={tableHeader}>
                <th style={tableHeaderStyles}>CONF.</th>
                <th style={tableHeaderStyles}>TWIN</th>
                <th style={tableHeaderStyles}>DOUBLE</th>
                <th style={tableHeaderStyles}>QUEEN</th>
                <th style={tableHeaderStyles}>CAL/EASTERN KING</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((rowData, index) => (
                <tr key={index}>
                  <td style={tableDataStyles}>{rowData.conf}</td>
                  <td style={tableDataStyles}>{rowData.twin}</td>
                  <td style={tableDataStyles}>{rowData.double}</td>
                  <td style={tableDataStyles}>{rowData.queen}</td>
                  <td style={tableDataStyles}>{rowData.cal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Box>
    </>
  );
};

export default ConfigurationTable;
