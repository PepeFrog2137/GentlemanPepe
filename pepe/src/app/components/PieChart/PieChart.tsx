import React from "react";
import { Pie } from "@nivo/pie";
import { useBreakpoint, useBreakpointValue } from "@chakra-ui/react";

interface dataProps {
  allocation: string;
  designation: string;
}

const dataMock = [
  {
    id: "Dev",
    label: "Dev",
    value: 5,
    color: "hsl(106, 70%, 50%)",
  },
  {
    id: "Comunity",
    label: "Community",
    value: 95,
    color: "hsl(108, 70%, 50%)",
  },

];

const PieChart = () => {
  const colorScheme = ["#3498db", "#76D7C4", "#7FB3D5", "#A9CCE3", "#76D7C4"];
  const sizeH = useBreakpointValue({base: 350, md: 500}) || 350;
  const sizeW = useBreakpointValue({base: 400, md: 700}) || 400;

  return (
    <Pie
      data={dataMock}
      margin={{
        top: 40,
        right: 80,
        bottom: 40,
        left: 50,
      }}
      width={sizeW}
      height={sizeH}
      arcLabel={(e: any) => String(`${e.value}%`)}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={colorScheme}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsStraightLength={8}
      arcLinkLabelsTextColor="#fff"
      arcLinkLabelsThickness={3}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      fit={true}
      arcLabelsTextColor={"inherit"}
      tooltip={() => <></>}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
    />
  );
};

export default PieChart;