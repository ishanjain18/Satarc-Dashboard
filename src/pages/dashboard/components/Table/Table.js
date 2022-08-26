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
            <TableCell key={key}>
              {key.toUpperCase()}
              {console.log({ key })}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody style={{ width: "100%" }}>
        {data.map(({ tip_id, created, formData, status }) => {
          const dateTime = new Date(created);
          const createdOn = dateTime.toString();

          const sample = {
            // 8 Options
            created: createdOn, // timeStamp
            tip_id: "23xd-adfk",
            time: "22:28 PM", // reported time of crime
            location: "SVCET, PuduCherry", // string -> Exact Address from Form
            crime_type: "Physical Assault", // categories mentioned in notebook
            status: status, // ['PENDING', 'UNDER REVIEW', 'RESOLVED']
            user_rating: "77", // string
            description: "Male driver struck elderly woman outside hostel road", //string
            user_verified: true, // boolean
            is_anonymous: true, // boolean
            suspect_info: "short, wears glasses", // string
            regarding: "Organization", // string,
            evidence: "image.jpg", // string, image url
          };

          return (
            <TableRow key={tip_id}>
              <TableCell className="pl-3 fw-normal">{sample.created}</TableCell>
              <TableCell>{sample?.tip_id}</TableCell>
              <TableCell>{sample?.time}</TableCell>
              <TableCell>{sample?.description?.crimeType}</TableCell>
              <TableCell>{sample?.description}</TableCell>
              <TableCell>
                {sample?.location ? sample?.location : "SVCET, Puducherry"}
              </TableCell>
              <TableCell>{sample?.time}</TableCell>
              <TableCell>{sample?.regarding}</TableCell>
              <TableCell>
                <Chip
                  label={status}
                  classes={{ root: classes[states[status.toLowerCase()]] }}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
