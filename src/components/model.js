import React from "react";
import { useLoader } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { TextureLoader } from "three";
import { MeshStandardMaterial } from "three";
import * as THREE from "three";
import { RGBELoader } from "three-stdlib";

const Model = (props) => {
  const { items, url, type, types } = props;
  const { scene } = useGLTF(url);

  const loadTexture = (texture) => {
    return texture ? useLoader(TextureLoader, texture) : "";
  };

  const selectedType = types.filter(
    (typ) => typ.name.toLowerCase() === type.toLowerCase()
  );
  const selectedItems = selectedType[0]?.parts;

  // new RGBELoader().load("artist_workshop_8k_sm.hdr", function (texture) {
  //   texture.mapping = THREE.EquirectangularReflectionMapping;

  //   scene.background = texture;
  //   scene.environment = texture;
  // });

  console.log(scene);

  scene.traverse((node) => {
    if (node.isMesh) {
      if (node.name === "Floor") {
        console.log("bws");
        const mapB = loadTexture("./FLoor_Base_color.png");
        const mapRoughness = loadTexture("./FLoor_Roughness.png");
        var tempMaterial = new MeshStandardMaterial({
          ...node.material,
          map: mapB,
          roughnessMap: mapRoughness,
        });
        node.material = tempMaterial;
      }

      node.castShadow = true;
      const checkItem = selectedItems.find((itm) => {
        if (type.toLowerCase() === "beds") {
          let naming = node.name;
          if (naming[naming.length - 1] === "_") {
            naming = naming.substring(0, naming.length - 1);
          }
          if (naming[0] === "_") {
            naming = naming.substring(1, naming.length);
          }
          return naming.toLowerCase() === itm.value.toLowerCase();
        } else {
          return node.name.toLowerCase().includes(itm.value.toLowerCase());
        }
      });
      if (checkItem) {
        const fabric = items.filter(
          (item) => item?.name?.value && item?.name?.value === checkItem?.value
        );

        const textureValue = fabric[0]?.texture[0]?.textures[0]?.value;

        // fabric texture
        if (textureValue) {
          if (node.name.includes("fabric") || node.name.includes("Fabric")) {
            const mapT = loadTexture(textureValue[3]);
            mapT.wrapS = THREE.RepeatWrapping;
            mapT.wrapT = THREE.RepeatWrapping;
            mapT.repeat.set(8, 8);
            const displacementMapT = loadTexture(textureValue[2]);
            displacementMapT.wrapS = THREE.RepeatWrapping;
            displacementMapT.wrapT = THREE.RepeatWrapping;
            displacementMapT.repeat.set(10, 10);
            const normalMapT = loadTexture(textureValue[1]);
            normalMapT.wrapS = THREE.RepeatWrapping;
            normalMapT.wrapT = THREE.RepeatWrapping;
            normalMapT.repeat.set(10, 10);
            const roughnessMapT = loadTexture(textureValue[0]);
            roughnessMapT.wrapS = THREE.RepeatWrapping;
            roughnessMapT.wrapT = THREE.RepeatWrapping;
            roughnessMapT.repeat.set(10, 10);
            var tempMaterial = new MeshStandardMaterial({
              ...node.material,
              map: mapT,
              //Do not remove
              // displacementMap: displacementMapT,
              // normalMap: normalMapT,
              // roughnessMap: roughnessMapT,
            });
            node.material = tempMaterial;
          } else if (
            node.name.includes("Finish2") ||
            node.name.includes("finish2") ||
            node.name.includes("Finish") ||
            node.name.includes("finish")
          ) {
            //finish texture
            if (textureValue.length > 4) {
              // const mapF = loadTexture(textureValue[0]);
              const mapF = loadTexture("./Aged Bronze/Base_color.png");
              mapF.wrapS = THREE.RepeatWrapping;
              mapF.wrapT = THREE.RepeatWrapping;
              mapF.repeat.set(20, 20);
              // const metalnessF = loadTexture(textureValue[2]);
              const metalnessF = loadTexture(
                "./Aged Bronze/Base_Metalness.png"
              );
              metalnessF.wrapS = THREE.RepeatWrapping;
              metalnessF.wrapT = THREE.RepeatWrapping;
              metalnessF.repeat.set(20, 20);
              // const normalMapF = loadTexture(textureValue[4]);
              const normalMapF = loadTexture("./Aged Bronze/Base_Normal.png");
              normalMapF.wrapS = THREE.RepeatWrapping;
              normalMapF.wrapT = THREE.RepeatWrapping;
              normalMapF.repeat.set(20, 20);
              // const roughnessMapF = loadTexture(textureValue[3]);
              const roughnessMapF = loadTexture(
                "./Aged Bronze/Base_Roughness_New.png"
              );
              roughnessMapF.wrapS = THREE.RepeatWrapping;
              roughnessMapF.wrapT = THREE.RepeatWrapping;
              roughnessMapF.repeat.set(20, 20);
              const displacementMapT = loadTexture(textureValue[1]);
              displacementMapT.wrapS = THREE.RepeatWrapping;
              displacementMapT.wrapT = THREE.RepeatWrapping;
              displacementMapT.repeat.set(10, 10);

              var tempMaterial = new MeshStandardMaterial({
                ...node.material,
                map: mapF,
                // metalnessMap: metalnessF,
                normalMap: normalMapF,
                roughnessMap: roughnessMapF,
                // envMap: useLoader(RGBELoader, "./artist_workshop_8k_sm.hdr"),
                //Do not remove
                // displacementMap: displacementMapT,
              });
              node.material = tempMaterial;
            }
          }
        }
      }
    }
  });

  return <primitive object={scene} />;
};

export default Model;
