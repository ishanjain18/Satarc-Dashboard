import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip,
} from "@material-ui/core";
import useStyles from "../../styles";

const states = {
  sent: "success",
  pending: "warning",
  declined: "secondary",
};

export default function TableComponent({ data }) {
  const classes = useStyles();
  let keys = [];

  if (data.length > 0) {
    Object.keys(data[0]).forEach((key) => {
      if (typeof data[0][key] === "object") {
        Object.keys(data[0][key]).forEach((i) => {
          keys.push(i);
        });
      } else {
        keys.push(key);
      }
    });
  }

  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          {keys.map((key) => (
            <TableCell key={key}>{key.toUpperCase()}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ tip_id, created, formData, status }) => (
          <TableRow key={tip_id}>
            <TableCell className="pl-3 fw-normal">{created}</TableCell>
            <TableCell>{formData?.regardingTip}</TableCell>
            <TableCell>{Date(formData?.dateTime)}</TableCell>
            <TableCell>{formData?.address}</TableCell>
            <TableCell>{formData?.crimeTime}</TableCell>
            <TableCell>{formData?.regarding}</TableCell>
            <TableCell>
              <Chip
                label={status}
                classes={{ root: classes[states[status.toLowerCase()]] }}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
