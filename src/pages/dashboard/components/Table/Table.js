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
  console.log(data);
  const classes = useStyles();
  var keys = Object.keys(data[0]).map((i) => i.toUpperCase());
  keys.shift(); // delete "id" key
  console.log(keys);

  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          {keys.map((key) => (
            <TableCell key={key}>{key}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(
          ({
            tip_id,
            created,
            formData,
            product,
            price,
            date,
            city,
            status,
          }) => (
            <TableRow key={tip_id}>
              <TableCell className="pl-3 fw-normal">{created}</TableCell>
              <TableCell>{formData.regardingTip}</TableCell>
              <TableCell>{formData.dateTime}</TableCell>
              <TableCell>{formData.address}</TableCell>
              <TableCell>{formData.crimeTime}</TableCell>
              <TableCell>{formData.regarding}</TableCell>
              <TableCell>
                <Chip
                  label={status}
                  classes={{ root: classes[states[status.toLowerCase()]] }}
                />
              </TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
}
