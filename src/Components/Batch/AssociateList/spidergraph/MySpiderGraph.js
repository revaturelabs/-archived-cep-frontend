import Radar from "react-d3-radar";
import React from "react";

export default function MySpiderGraph(props) {
  // Generates assessment types for the graph
  function loadVariables() {
    let tempArr = [];
    props.scores.map((obj) => {
      let tempObj = {};
      tempObj.key = obj.assessmentType;
      tempObj.label = obj.assessmentType;
      tempArr.push(tempObj);
    });
    return tempArr;
  }

  // Generates the values of assessment types for the graph
  function loadValues() {
    let tempObj = {};
    props.scores.map((obj) => {
      tempObj[obj.assessmentType] = obj.score;
    });
    return tempObj;
  }

  return (
    <div>
      <Radar
        width={500}
        height={500}
        padding={70}
        domainMax={100}
        highlighted={null}
        onHover={(point) => {
          if (point) {
            //   console.log('hovered over a data point');
          } else {
            //   console.log('not over anything');
          }
        }}
        data={{
          variables: loadVariables(),
          sets: [
            {
              key: "me",
              label: "My Scores",
              values: loadValues(),
            },
          ],
        }}
      />
    </div>
  );
}
