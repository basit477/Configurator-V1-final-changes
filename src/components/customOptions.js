import React from "react";
import { Box, Typography } from "@mui/material";
import TexturePicker from "./texturePicker";
import ConfigurationTable from "./configurationTable";

const CustomOptions = (props) => {
  const {
    selectedPart,
    items,
    handleItems,
    fabricsArray,
    finishesArray,
    itemType,
  } = props;

  const displayTextureSelectors = () => {
    const finishes = items.find((item) => item.name.name === "Finish");
    const fabrics = items.find((item) => item.name.name === "Fabric");
    const joints = items.find((item) => item.name.name === "Joints");

    return (
      <>
        {finishes ? (
          <>
            <Box
              style={{
                display: "grid",
                justifyItems: "center",
                alignItems: "center",
                height: "60px",
                borderTop: "1px #12141d solid",
                borderBottom: "1px #12141d solid",
              }}
            >
              <Typography>SELECT FINISH</Typography>
              <Typography style={{ fontSize: "10px" }}>
                *DUE TO THE MANY VARIATIONS IN MONITORS AND BROWSERS, ACTUAL
                METAL FINISHES MAY VARY ON DIFFERENT MONITORS
              </Typography>
            </Box>
            <Box style={{ height: "400px", overflowY: "scroll" }}>
              <TexturePicker
                selectedPart={selectedPart}
                items={items}
                handleItems={handleItems}
                textures={finishesArray}
                textureType={"Finish"}
                joints={joints ? "joints" : ""}
                itemType={itemType}
              />
            </Box>
          </>
        ) : (
          <></>
        )}
        {fabrics ? (
          <>
            <Box
              style={{
                display: "grid",
                justifyItems: "center",
                alignItems: "center",
                height: "60px",
                borderTop: "1px #12141d solid",
                borderBottom: "1px #12141d solid",
              }}
            >
              <Typography>SELECT FABRIC</Typography>
              <Typography style={{ fontSize: "8px" }}>
                *DUE TO THE MANY VARIATIONS IN MONITORS AND BROWSERS, ACTUAL
                Fabric Colors MAY VARY ON DIFFERENT MONITORS
              </Typography>
            </Box>
            <Box style={{ height: "400px", overflowY: "scroll" }}>
              <TexturePicker
                selectedPart={selectedPart}
                items={items}
                handleItems={handleItems}
                textures={fabricsArray}
                textureType={"Fabric"}
              />
            </Box>
          </>
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <>
      <Box style={{ border: "3px #12141d solid" }}>
        <Box
          style={{
            display: "grid",
            alignItems: "center",
            backgroundColor: "#12141d",
            width: "100%",
            height: "50px",
          }}
        >
          <Typography
            style={{
              color: "#fff",
              textAlign: "center",
            }}
          >
            CHOOSE CUSTOM OPTIONS
          </Typography>
        </Box>
        {displayTextureSelectors()}
        <ConfigurationTable />
      </Box>
    </>
  );
};

export default CustomOptions;
