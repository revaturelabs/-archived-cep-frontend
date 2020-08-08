import React, { useState, ReactElement } from "react";

import {
  Grid,
  Typography,
  makeStyles,
  Card,
  CardContent,
  CardHeader,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";

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

interface batchINF {
  name: string,
  startDate: string,
  endDate: string,
  location: string,
  skill: string,
  currentWeek: string
}

interface propsINF {
  batch: batchINF,
  handleClick
}

export default function BatchComponent(props: propsINF): ReactElement {
  const styles = useStyles();
  const [statusColor, setStatusColor] = useState("#F26925");
  let title = `${props.batch.name}`;

  return (
    <Card className={styles.spacing}>
      <Link
        to="/associates"
        onClick={() => props.handleClick(props.batch)}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CardHeader style={{ backgroundColor: statusColor }} title={title} />
        <Button>
          <CardContent>
            <Grid container>
              <Grid item className={styles.left}>
                <Typography variant="overline">
                  Location: {props.batch.location}
                  <br />
                  Skill: {props.batch.skill}
                  <br />
                  Start Date: {props.batch.startDate}
                  <br />
                  End Date: {props.batch.endDate}
                  <br />
                  Progress: Week {props.batch.currentWeek}
                  <br />
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Button>
      </Link>
    </Card>
  );
}
