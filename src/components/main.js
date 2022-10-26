import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Lightformer } from "@react-three/drei";
import { Box, Divider, Typography } from "@mui/material";
import { ViewInAr } from "@mui/icons-material";
import Sidebar from "./sidebar";
import { Html } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import Model from "./model";
import CircularProgress from "@mui/material/CircularProgress";
import types from "./data.json";
import axios from "axios";
import Floor from "./floor";

const Loader = () => {
  return (
    <Html center>
      <Box>
        <CircularProgress style={{ color: "#12141d" }} />
      </Box>
    </Html>
  );
};

const Main = ({cookieData}) => {
  ///these need to filled via wordpress
  const productNameWordPress = product_obj.Name;
  const productTypeWordpress = product_obj.Cat;
  let productCategoryWordpress;

  if (productTypeWordpress === "Beds"){
     productCategoryWordpress = cookieData;
  }
  else{
     productCategoryWordpress = "";
  }

  const productIdWordpress = product_obj.ID;
  const backToProductLinkWordpress = product_obj.Link;

  const [productUrl, setProductUrl] = useState("");
  // const [productUrl, setProductUrl] = useState("./AthenaBench_B1514.glb");
  // const [productUrl, setProductUrl] = useState("./BrentwoodChair_DC747H18.glb");
  // const [productUrl, setProductUrl] = useState("./Luna_1507000.glb");
  // const [productUrl, setProductUrl] = useState("./Miramar_B521H26S_26.glb");
  // const [productUrl, setProductUrl] = useState(
  //   "./Quincy_1328_Queen_CBCMPF222.glb"
  // );
  // const [productUrl, setProductUrl] = useState("./Sunset_1320_Twin_HOWF.glb");
  // const [productUrl, setProductUrl] = useState(
  //   "./Quincy_1328_Queen_CBCMPF_2.glb"
  // );

  useEffect(() => {
    if (productTypeWordpress === "Beds") {
      setCameraPos([0, 0.5, 7]);
    } else {
      setCameraPos([0, 2.5, 6]);
    }
    loadGlb();
  }, []);

  const loadGlb = async () => {
    const name = productNameWordPress.replace(" ", "_");
    let url = "";
    if (productCategoryWordpress) {
      url = `https://s3.us-west-1.amazonaws.com/assets.wesleyallen.com/3D+files/${productTypeWordpress}/${productIdWordpress}_${name}_${productCategoryWordpress}.glb`;
    } else {
      url = `https://s3.us-west-1.amazonaws.com/assets.wesleyallen.com/3D+files/${productTypeWordpress}/${productIdWordpress}_${name}.glb`;
    }

    const file = await axios.get(url);
    if (file.status === 200) {
      setProductUrl(url);
    } else {
      alert("File not found");
    }
  };

  useEffect(() => {
    const arra = [];
    const selectedType = types.filter(
      (typ) => typ.name.toLowerCase() === productTypeWordpress.toLowerCase()
    );
    selectedType[0]?.parts.map((itm) => {
      if (itm.name === "Fabric") {
        return arra.push({
          name: itm,
          texture: [
            {
              name: "Sugarshack-Sea",
              textures: [
                {
                  name: "https://wesleyallendev.wpengine.com/wp-content/uploads/Textures/Fabrics/Sugarshack-Sea/Reference_Image.jpg",
                  value: [
                    "https://wesleyallendev.wpengine.com/wp-content/uploads/Textures/Fabrics/Sugarshack-Sea/Roughness.png",
                    "https://wesleyallendev.wpengine.com/wp-content/uploads/Textures/Fabrics/Sugarshack-Sea/Normal.png",
                    "https://wesleyallendev.wpengine.com/wp-content/uploads/Textures/Fabrics/Sugarshack-Sea/Height.png",
                    "https://wesleyallendev.wpengine.com/wp-content/uploads/Textures/Fabrics/Sugarshack-Sea/Base_Color.png",
                  ],
                },
              ],
            },
          ],
        });
      } else if (itm.name === "Finish") {
        return arra.push({
          name: itm,
          texture: [
            {
              name: "Aged-Gold",
              textures: [
                {
                  name: "https://wesleyallendev.wpengine.com/wp-content/uploads/Textures/Finishes/Aged-Gold/Base/Reference_Image.jpg",
                  value: [
                    "https://wesleyallendev.wpengine.com/wp-content/uploads/Textures/Finishes/Aged-Gold/Base/Base_Color.png",
                    "https://wesleyallendev.wpengine.com/wp-content/uploads/Textures/Finishes/Aged-Gold/Base/Base_Height.png",
                    "https://wesleyallendev.wpengine.com/wp-content/uploads/Textures/Finishes/Aged-Gold/Base/Base_Metalness.png",
                    "https://wesleyallendev.wpengine.com/wp-content/uploads/Textures/Finishes/Aged-Gold/Base/Base_Roughness.png",
                    "https://wesleyallendev.wpengine.com/wp-content/uploads/Textures/Finishes/Aged-Gold/Base/Base_Normal.png",
                  ],
                },
              ],
            },
          ],
        });
      }
      return arra.push({ name: itm, texture: "" });
    });

    setAllItems(arra);
  }, []);

  const [cameraPos, setCameraPos] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [selectedPart, setSelectedPart] = useState("");

  const handleItems = (items, checkFinish) => {
    if (checkFinish && productTypeWordpress === "Beds") {
      //Setting casting textures
      const name = items[0].texture[0].name;
      const values = [
        `https://wesleyallendev.wpengine.com/wp-content/uploads/Textures/Finishes/${name}/Cast/Cast_Color.png`,
        `https://wesleyallendev.wpengine.com/wp-content/uploads/Textures/Finishes/${name}/Cast/Cast_Height.png`,
        `https://wesleyallendev.wpengine.com/wp-content/uploads/Textures/Finishes/${name}/Cast/Cast_Metalness.png`,
        `https://wesleyallendev.wpengine.com/wp-content/uploads/Textures/Finishes/${name}/Cast/Cast_Roughness.png`,
        `https://wesleyallendev.wpengine.com/wp-content/uploads/Textures/Finishes/${name}/Cast/Cast_Normal.png`,
      ];

      const newJointsObject = {
        name: { name: "Joints", value: "Frame_Finish2" },
        texture: [
          {
            name: name,
            textures: [
              {
                name: `https://wesleyallendev.wpengine.com/wp-content/upl…ures/Finishes/${name}/Base/Reference_Image.jpg`,
                value: values,
              },
            ],
          },
        ],
      };
      items[1] = newJointsObject;
    }
    setAllItems(items);
  };

  const handleSelectedPart = (part) => {
    setSelectedPart(part);
  };

  return (
    <>
      {productUrl ? (
        <Box display={"flex"}>
          <Box paddingRight={"20px"} style={{ width: "55%", position: "relative" }}>
            <Box style={{ top: "10px",left:"2px", position: "absolute" }}>
              <ViewInAr />
            </Box>

            <Box
              style={{
                position: "relative",
                outline: "none",
                border: "1px solid #cdcdcd",
                height: "600px",
                left: "29px",
                //top: "85px",
                width: "100%",
              }}
            >
              <Canvas
                shadows
                camera={{ position: cameraPos, fov: 26 }}
                style={{
                  opacity: 1,
                  transition: "opacity 1s",
                }}
              >
                <Physics>
                  {/* <directionalLight
                    position={[0, 4, 0]}
                    intensity={0.6}
                    castShadow
                    shadow-mapSize-height={2 ** 8}
                    shadow-mapSize-width={2 ** 8}
                  /> */}
                  {/* <directionalLight
                    position={[0, 4, 0]}
                    intensity={0.6}
                    castShadow
                    shadow-mapSize-height={2 ** 8}
                    shadow-mapSize-width={2 ** 8}
                  />
                  <directionalLight
                    position={[4, 3, 0]}
                    intensity={0.8}
                    castShadow
                    shadow-mapSize-height={2 ** 8}
                    shadow-mapSize-width={2 ** 8}
                  />
                  <directionalLight
                    position={[-4, 3, 0]}
                    intensity={0.8}
                    castShadow
                    shadow-mapSize-height={2 ** 8}
                    shadow-mapSize-width={2 ** 8}
                  />
                  <directionalLight
                    position={[0, 3, 6]}
                    intensity={0.8}
                    castShadow
                    shadow-mapSize-height={2 ** 8}
                    shadow-mapSize-width={2 ** 8}
                  />{" "}
                  <directionalLight
                    position={[0, 3, -6]}
                    intensity={0.2}
                    castShadow
                    shadow-mapSize-height={2 ** 8}
                    shadow-mapSize-width={2 ** 8}
                  /> */}
                  {/* <directionalLight
                    position={[0, 0.5, 1]}
                    intensity={0.3}
                    castShadow
                    shadow-mapSize-height={2 ** 8}
                    shadow-mapSize-width={2 ** 8}
                  />

                  {/* //////////////////////// */}
                  {/* bottom */}
                  {/* <mesh position={[0, 2, 10]} castShadow>
                    <pointLight
                      castShadow
                      shadow-mapSize-height={2 ** 8}
                      shadow-mapSize-width={2 ** 8}
                      shadow-radius={10}
                    />
                    <boxGeometry args={[12, 10, 0.5]} />
                    <meshLambertMaterial color={"pink"} />
                  </mesh>
                  <mesh position={[0, 2, -10]} castShadow>
                    <pointLight
                      castShadow
                      shadow-mapSize-height={2 ** 8}
                      shadow-mapSize-width={2 ** 8}
                      shadow-radius={10}
                    />
                    <boxGeometry args={[12, 10, 0.5]} />
                    <meshLambertMaterial color={"pink"} />
                  </mesh> */}
                  {/* <mesh
                    position={[-10, 2, 0]}
                    rotation={[0, -Math.PI * 0.5, 0]}
                    castShadow
                  >
                    <pointLight
                      castShadow
                      shadow-mapSize-height={2 ** 8}
                      shadow-mapSize-width={2 ** 8}
                      shadow-radius={10}
                    />
                    <boxGeometry args={[12, 10, 0.5]} />
                    <meshLambertMaterial color={"pink"} />
                  </mesh>
                  <mesh
                    position={[10, 2, 0]}
                    rotation={[0, -Math.PI * 0.5, 0]}
                    castShadow
                  >
                    <pointLight
                      castShadow
                      shadow-mapSize-height={2 ** 8}
                      shadow-mapSize-width={2 ** 8}
                      shadow-radius={10}
                    />
                    <boxGeometry args={[12, 10, 0.5]} />
                    <meshLambertMaterial color={"pink"} />
                  </mesh> */}
                  {/* //////////////////////// */}

                  {/* <mesh position={[0, 1, 0]}>
                    <pointLight
                      castShadow
                      shadow-mapSize-height={2 ** 8}
                      shadow-mapSize-width={2 ** 8}
                      shadow-radius={10}
                    />
                    <sphereBufferGeometry args={[0.2, 10, 10]} />
                    <meshPhongMaterial emissive={"yellow"} />
                  </mesh> */}
                  {/* <ambientLight intensity={10} /> */}
                  {/* <spotLight
                    intensity={0}
                    angle={1}
                    penumbra={10}
                    position={[10, 10, 10]}
                    castShadow={true}
                  /> */}
                  <Suspense fallback={<Loader />}>
                    <Model
                      selectedPart={selectedPart}
                      handleSelectedPart={handleSelectedPart}
                      items={allItems}
                      url={productUrl}
                      type={productTypeWordpress}
                      types={types}
                    />
                    {/* <Environment files={"./artist_workshop_8k_sm.hdr"} /> */}
                    <Environment preset="city" />
                  </Suspense>
                  {/* <Floor position={[0, -1, 0]} /> */}
                  <OrbitControls
                    maxPolarAngle={Math.PI / 1.9}
                    enableZoom={true}
                    enablePan={false}
                  />
                </Physics>
              </Canvas>
            </Box>
          </Box>
          <Divider orientation="vertical" />
          <Box
            style={{
              width: "45%",
              padding: "10px",
              background: "rgb(244 244 244)",
            }}
          >
            <Sidebar
              name={productNameWordPress}
              selectedPart={selectedPart}
              items={allItems}
              handleItems={handleItems}
              handleSelectedPart={handleSelectedPart}
              type={productTypeWordpress}
              backToProductLink={backToProductLinkWordpress}
            />
          </Box>
        </Box>
      ) : (
        <Box
          style={{ display: "grid", justifyItems: "center", padding: "20px" }}
        >
          <Box>
            <Typography>Verifying Your URL</Typography>
          </Box>

          <CircularProgress style={{ color: "#12141d" }} />
        </Box>
      )}
    </>
  );
};

export default Main;
