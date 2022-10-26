import React, { useEffect, useState } from "react";
import { Box, Typography, Divider, Link } from "@mui/material";
import Accordions from "./accordions";
import { Buffer } from "buffer";
import conditionalTextures from "./textureConditions.json";
import paths from "./finishesNames.json";
import array from "./fabricNames.json";
import CustomOptions from "./customOptions";

Buffer.from("anything", "base64");
window.Buffer = window.Buffer || require("buffer").Buffer;

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  // dirName: 'orders' /* optional */,
  region: process.env.REACT_APP_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
};

const path = process.env.REACT_APP_WORDPRESS_BASE_URL;

const fabrics = array?.map((fabric) => {
  return {
    name: fabric,
    textures: [
      {
        name: `${path}Fabrics/${fabric}/Reference_Image.jpg`,
        value: [
          `${path}Fabrics/${fabric}/Roughness.png`,
          `${path}Fabrics/${fabric}/Normal.png`,
          `${path}Fabrics/${fabric}/Height.png`,
          `${path}Fabrics/${fabric}/Base_Color.png`,
        ],
      },
    ],
  };
});

const finishes = paths?.map((finish) => {
  return {
    name: finish,
    textures: [
      {
        name: `${path}Finishes/${finish}/Base/Reference_Image.jpg`,
        value: [
          `${path}Finishes/${finish}/Base/Base_Color.png`,
          `${path}Finishes/${finish}/Base/Base_Height.png`,
          `${path}Finishes/${finish}/Base/Base_Metalness.png`,
          `${path}Finishes/${finish}/Base/Base_Roughness.png`,
          `${path}Finishes/${finish}/Base/Base_Normal.png`,
        ],
      },
    ],
  };
});

const Sidebar = (props) => {
  const {
    name,
    selectedPart,
    items,
    handleItems,
    handleSelectedPart,
    type,
    backToProductLink,
  } = props;

  const [fabricsArray, setFabricsArray] = useState([]);
  const [finishesArray, setFinishesArray] = useState([]);

  useEffect(() => {
    handleConditionalTextures();
  }, []);

  const handleConditionalTextures = () => {
    const allFabrics = conditionalTextures[0]?.values;
    const allFinishes = conditionalTextures[1]?.values;

    //extracting relevant fabrics
    const fabricTypedArray = allFabrics.filter(
      (allFab) => allFab.name?.toLowerCase() === type?.toLowerCase()
    );

    if (fabricTypedArray[0]) {
      let findFabName = fabricTypedArray[0].types.filter((fabTA) =>
        fabTA?.name?.toLowerCase().includes(name.toLowerCase())
      );

      if (findFabName.length === 0) {
        findFabName = fabricTypedArray[0]?.types?.filter(
          (fabTA) => fabTA?.name === type.toLowerCase()
        );
      }

      const tempFabrics = findFabName[0]?.textures?.map((fFab) =>
        fabrics.filter(
          (fab) => fab?.name?.toLowerCase() === fFab?.toLowerCase()
        )
      );

      const finalFabrics = tempFabrics.filter((tFab) => tFab.length > 0);
      setFabricsArray(finalFabrics);
    }

    //extracting relevant finishes
    const finishesTypedArray = allFinishes.filter(
      (allFin) => allFin?.name?.toLowerCase() === type?.toLowerCase()
    );

    if (finishesTypedArray[0]) {
      let findFinName = finishesTypedArray[0]?.types.filter((fabTA) =>
        fabTA?.name?.toLowerCase()?.includes(name?.toLowerCase())
      );

      if (findFinName.length === 0) {
        findFinName = finishesTypedArray[0]?.types.filter(
          (fabTA) => fabTA?.name === type.toLowerCase()
        );
      }
      const tempFinishes = findFinName[0]?.textures?.map((fFin) =>
        finishes.filter(
          (fin) => fin?.name?.toLowerCase() === fFin?.toLowerCase()
        )
      );
      const finalFinishes = tempFinishes.filter((tFin) => tFin.length > 0);
      setFinishesArray(finalFinishes);
    }
  };

  return (
    <Box padding={"10px"}>
      <Box display={"flex"} margin={"20px"} justifyContent="space-between">
        <Typography variant="h6"sx={{
                        fontSize: "24px",
                        fontWeight: "500",
                        fontFamily: "Poppins",
                    }}>{name}</Typography>
      </Box>
      <Box margin={"20px"}>
        <Accordions
          accordionName={"Size"}
          accordionDetails={<h4>Size Selection</h4>}
        />
        <Accordions
          accordionName={"Configuration"}
          accordionDetails={<h4>Configuration</h4>}
        />
      </Box>
      <Box margin={"20px"}>
        <CustomOptions
          selectedPart={selectedPart}
          items={items}
          itemType={type}
          handleSelectedPart={handleSelectedPart}
          fabricsArray={fabricsArray}
          finishesArray={finishesArray}
          handleItems={handleItems}
        />

        <Box marginTop={"10px"}>
          <Divider />
        </Box>
        <Box
          marginTop={"10px"}
          style={{
            display: "grid",
            alignItems: "center",
            backgroundColor: "#12141d",
            width: "100%",
            height: "50px",
          }}
        >
          <Link
            style={{
              color: "#fff",
              textAlign: "center",
            }}
            href={backToProductLink}
            underline="none"
          >
            {"Back to Product"}
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
