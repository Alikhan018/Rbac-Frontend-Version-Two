import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function BasicTable({ rows, onDelete, action, entity }) {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 250, width: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            {action && <TableCell align="right">Action</TableCell>}
          </TableRow>
        </TableHead>
        {rows && (
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  className="hover:text-blue-900 cursor-pointer md:uppercase"
                  onClick={() => {
                    navigate(`/${entity}/${row.id}`, {
                      state: { id: row.id },
                    });
                  }}
                >
                  {row.value || row.name || row.email}
                </TableCell>
                <TableCell align="right">
                  {action && (
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{
                        color: hoveredIndex === rowIndex ? "#EF0003" : "red",
                        cursor: "pointer",
                      }}
                      onMouseEnter={() => setHoveredIndex(rowIndex)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => {
                        onDelete(row.id);
                      }}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
