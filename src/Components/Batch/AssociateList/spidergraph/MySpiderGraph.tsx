import Radar from "react-d3-radar";
import React, { ReactElement } from "react";

export default function MySpiderGraph(props: any): ReactElement {
  function loadVariables(): object[] {
    let tempArr: object[] = [];
    props.scores.map((obj: any) => {
      interface tempINF{
        label: string,
        key: string
      }
      let tempObj: tempINF = {label: obj.assessmentType, key: obj.assessmentType};
      
      tempArr.push(tempObj);
     
    });
    return tempArr;
  }

  function loadValues(): object {
    let tempObj: object = {};
    props.scores.map((obj: any) => {
      
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
