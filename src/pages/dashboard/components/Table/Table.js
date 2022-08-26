import React from "react";
import { MenuItem, Button } from "@material-ui/core";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Menu,
  Chip,
} from "@material-ui/core";
import * as Icons from "@material-ui/icons";
import useStyles from "../../styles";

const states = {
  resolved: "success",
  pending: "warning",
  spam: "secondary",
};

const weights = {
  drug_abuse: 5,
  drug_trafficking: 5,
  drug_production: 5,
  theft: 2,
  self_harm: 3,
  rape: 7,
  molestation: 7,
  prostitution: 7,
  vandalism: 1,
  bomb_threat: 8,
  terrorism: 8,
  missing: 4,
  road_rage: 6,
};
export default function TableComponent({ data }) {
  const classes = useStyles();
  let keys = [
    "Submit Time",
    "Involvement Level",
    "User Identity",
    "Tip Type",
    "Location",
    "Crime Type",
    "Credibility Rating",
    "Status",
    "Actions",
  ];
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
            status: "status", // ['pending', 'resolved', 'spam']
            user_rating: "77", // string
            description: "Male driver struck elderly woman outside hostel road", //string
            user_verified: true, // boolean
            is_anonymous: true, // boolean
            suspect_info: "short, wears glasses", // string
            regarding: "Organization", // string,
            evidence: "image.jpg", // string, image url
            exactAddress: "paschim Vihar",
          };
          const currentTime = Date.now();

          const isActive = currentTime - sample?.time > 600000;
          const rating =
            isActive * 1 +
            Boolean(sample?.exactAddress) * 1 +
            weights[sample?.crime_type] +
            Boolean(sample?.suspect_info) * 1 +
            Boolean(sample?.evidence) * 1 +
            sample?.user_verified * 1;

          return (
            <TableRow key={tip_id}>
              <TableCell className="pl-3 fw-normal">{sample.created}</TableCell>
              <TableCell>{sample?.regarding}</TableCell>

              <TableCell>
                {sample?.user_verified ? "Available" : "Unavailable"}
              </TableCell>
              <TableCell>
                {sample?.is_anonymous ? "Anonymous" : "Verified"}
              </TableCell>

              <TableCell>{sample?.location}</TableCell>
              <TableCell>{sample?.crime_type}</TableCell>
              <TableCell>{rating}</TableCell>
              <TableCell>
                <Chip
                  label={status}
                  classes={{ root: classes[states[status.toLowerCase()]] }}
                />
              </TableCell>
              <TableCell>
                <>
                  <Button
                    variant="contained"
                    size="medium"
                    color="secondary"
                    onClick={(e) => handleClick(e)}
                  >
                    Actions
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => {
                        // redirect to /app/tip-finder
                        // send sample as prop

                        handleClose();
                      }}
                    >
                      <Icons.Pageview style={{ marginRight: 16 }} /> Show
                      Details
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Icons.DeleteSweep style={{ marginRight: 16 }} /> Mark
                      Spam
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Icons.Done style={{ marginRight: 16 }} />
                      Mark Resolved
                    </MenuItem>
                  </Menu>
                </>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
