import React, { useState } from "react";
import { Box, Typography, Button, Divider, TextField } from "@mui/material";
import TexturePicker from "./texturePicker";
import PartSelector from "./partSelector";
import { makeStyles } from "@mui/styles";
import Accordions from "./accordions";
import { Buffer } from "buffer";
import S3FileUpload from "react-s3";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import paths from "./finishesNames.json";
import array from "./fabricNames.json";
import { fabric_base_url } from "./constants";

Buffer.from("anything", "base64");
window.Buffer = window.Buffer || require("buffer").Buffer;

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  // dirName: 'orders' /* optional */,
  region: process.env.REACT_APP_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
};

const fabrics = array?.map((i) => {
  return {
    name: fabric_base_url + `${i}/Base_Color.jpg`,
    value: [
      fabric_base_url + `${i}/Roughness.jpg`,
      fabric_base_url + `${i}/Normal.jpg`,
      fabric_base_url + `${i}/Height.jpg`,
      fabric_base_url + `${i}/Base_Color.jpg`,
    ],
  };
});

const finishes = paths?.map((items) => {
  return {
    name: `/textures/finishes${items}/refrence.png`,
    value: [
      `/textures/finishes${items}/Plane_DefaultMaterial_Color.png`,
      `/textures/finishes${items}/Plane_DefaultMaterial_DisplaceHeightField.png`,
      `/textures/finishes${items}/Plane_DefaultMaterial_Metalness.png`,
      `/textures/finishes${items}/Plane_DefaultMaterial_Roughness.png`,
      `/textures/finishes${items}/Plane_DefaultMaterial_Normal.png`,
    ],
  };
});

const useStyles = makeStyles({
  quantityWrapper: {
    display: "flex",
    width: "40%",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  quantityText: {
    border: "1px solid #cdcdcd",
    width: "65px",
    paddingTop: "5px",
    textAlign: "center",
  },
  quantityButton: {
    color: "#12141d",
    border: "1px solid #cdcdcd",
  },
  orderButton: {
    backgroundColor: "#12141d",
    color: "#fff",
    width: "100%",
    height: "50px",
    "&:hover": {
      backgroundColor: "#12141d",
    },
  },
});

const Sidebar = (props) => {
  const { name, selectedPart, items, handleItems, handleSelectedPart, type } =
    props;
  const [noOfProductsToOrder, setNoOfProductsToOrder] = useState(1);
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [error, setError] = useState(false);
  const id = 1;
  const classes = useStyles();

  const accordionsData = [
    {
      name: "Size",
      details: <h4>Size Selection</h4>,
    },
    {
      name: "Configuration",
      details: <h4>Configuration</h4>,
    },
    {
      name: "Custom Options",
      details: (
        <>
          <Accordions
            accordionName={"Select Part"}
            accordionDetails={
              <PartSelector
                selectedPart={selectedPart}
                items={items}
                handleSelectedPart={handleSelectedPart}
              />
            }
          />
          <Accordions
            accordionName={"Select Finish"}
            accordionDetails={
              <TexturePicker
                selectedPart={selectedPart}
                items={items}
                handleItems={handleItems}
                textures={finishes}
              />
            }
          />
          <Accordions
            accordionName={"Select Fabric"}
            accordionDetails={
              <TexturePicker
                selectedPart={selectedPart}
                items={items}
                handleItems={handleItems}
                textures={fabrics}
              />
            }
          />
        </>
      ),
    },
  ];

  const handleQuantitySubstraction = () => {
    if (noOfProductsToOrder > 1) {
      setNoOfProductsToOrder(noOfProductsToOrder - 1);
    }
  };

  const handleOrder = async () => {
    const checkItems = items.filter((itm) => itm.texture == "");
    if (checkItems.length > 0) {
      setMessage(`${checkItems[0]?.name} is missing texture`);
      setNotificationOpen(true);
      setError(true);
      return;
    }
    setButtonDisable(true);

    var payload = {
      productDetails: {
        id: id,
        name: name,
        type: type,
        items: items,
      },
      count: noOfProductsToOrder,
      note: notes,
    };

    const fileData = JSON.stringify(payload);
    const blob = new Blob([fileData], { type: "application/json" });

    var file = new File([blob], `${name}_${id}_order.json`);

    const res = await S3FileUpload.uploadFile(file, config);
    setNotificationOpen(true);
    if (res) {
      setMessage(`Order Placed`);
      setError(false);
    } else {
      setMessage(`Unable to process your order, Please try again!`);
      setError(true);
    }
    setButtonDisable(false);
  };

  const handleAlertOpen = () => {
    setNotificationOpen(false);
  };

  return (
    <Box padding={"10px"}>
      <Box display={"flex"} margin={"20px"} justifyContent="space-between">
        <Typography variant="h6">{name}</Typography>
      </Box>
      <Box margin={"20px"}>
        {accordionsData.map((accordion) => (
          <Accordions
            key={accordion.name}
            accordionName={accordion.name}
            accordionDetails={accordion.details}
          />
        ))}

        <Box marginTop={"10px"}>
          <Divider />
        </Box>

        <Box marginTop={"10px"}>
          <TextField
            placeholder="Leave a note. Request special instructions."
            multiline
            rows={4}
            fullWidth
            onChange={(e) => setNotes(e.target.value)}
          />
        </Box>
        <Typography variant="caption" display="block" marginTop={"10px"}>
          note (optional)
        </Typography>

        <Box className={classes.quantityWrapper}>
          <Button
            className={classes.quantityButton}
            onClick={handleQuantitySubstraction}
          >
            -
          </Button>
          <Typography className={classes.quantityText}>
            {noOfProductsToOrder}
          </Typography>
          <Button
            className={classes.quantityButton}
            onClick={() => setNoOfProductsToOrder(noOfProductsToOrder + 1)}
          >
            +
          </Button>
        </Box>

        <Box marginTop={"10px"}>
          <Divider />
        </Box>
        <Box marginTop={"10px"}>
          <Button
            className={classes.orderButton}
            onClick={handleOrder}
            disabled={buttonDisable}
          >
            {buttonDisable ? (
              <Box display={"grid"}>
                <CircularProgress size={"1.8rem"} style={{ color: "#fff" }} />
              </Box>
            ) : (
              "ADD TO ORDER"
            )}
          </Button>
        </Box>
        <Box marginTop={"10px"}>
          {notificationOpen && (
            <Snackbar
              open={notificationOpen}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              autoHideDuration={6000}
              onClose={handleAlertOpen}
            >
              <Alert
                onClose={handleAlertOpen}
                sx={{ width: "100%" }}
                severity={error ? "error" : "success"}
              >
                <AlertTitle>{error ? "Error" : "Success"}</AlertTitle>
                {message}
              </Alert>
            </Snackbar>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
