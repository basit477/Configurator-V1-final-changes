import React from "react";
import { Box, Typography } from "@mui/material";

const TexturePicker = (props) => {
  const { handleItems, items, textures, textureType, itemType, joints } = props;

  const handleSetTexture = (text) => {
    if (
      itemType?.toLowerCase() === "beds" &&
      textureType === "Finish" &&
      joints
    ) {
      const updatedItems = items.map((el) =>
        el.name.name === textureType ? { ...el, texture: text } : el
      );

      handleItems(updatedItems, "Finish");
    } else {
      const updatedItems = items.map((el) =>
        el.name.name === textureType ? { ...el, texture: text } : el
      );
      handleItems(updatedItems, "");
    }
  };
  return (
    <Box>
      <Box
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center",padding: "20px", }}
      >
        {textures.map((texture, index) => (
          <Box
            key={`${texture} ${index}`}
            style={{
              margin: "7px",
              display: "grid",
              justifyItems: "center",
              cursor: "pointer",
            }}
          >
            <img
              style={{ border: "2px solid #cdcdcd", padding: "1px" }}
              key={texture[0]?.textures[0]?.name}
              onClick={() => {
                handleSetTexture(texture);
              }}
              src={texture[0]?.textures[0]?.name}
              width={"80px"}
              height={"80px"}
            />
            <Typography style={{ fontSize: "10px" }} variant="subtitle1">
              {texture[0]?.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TexturePicker;
