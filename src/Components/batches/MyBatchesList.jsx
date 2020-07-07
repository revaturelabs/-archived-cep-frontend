import React, { useState } from "react";

import {
  Grid,
  Typography,
  makeStyles,
  Card,
  CardContent,
  CardHeader,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  left: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  right: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightButton: {
    marginTop: "5px",
    marginBottom: "5px",
  },
  spacing: {
    marginTop: "15px",
    marginBottom: "15px",
  },
}));

export default function MyBatchesList(props) {
  const styles = useStyles();
  const [statusColor, setStatusColor] = useState("#F26925");
  let title = `${props.batch.name}
    (${props.batch.startDate})`;
  //${props.batch.batchId}

  return (
    <Card className={styles.spacing}>
      <a onClick={() => props.handleClick(props.batch)}>
        <CardHeader style={{ backgroundColor: statusColor }} title={title} />
        <CardContent>
          <Grid container>
            <Grid item className={styles.left}>
              <Typography variant="overline">
                Name: {props.batch.name}
                <p></p>
                Location: {props.batch.location}
                <p></p>
                Dates: {props.batch.startDate}
                {" to "}
                {props.batch.endDate}
                <p></p>
                Skill: {props.batch.skill}
                <p></p>
                Progress: Week {props.batch.week}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </a>
    </Card>
  );
}
