import { useBox } from "@react-three/cannon";

const Floor = (props) => {
  const [ref, api] = useBox(() => ({ args: [10, 0.1, 10], ...props }));

  return (
    <mesh ref={ref} {...props} receiveShadow>
      <boxBufferGeometry args={[200, 0.1, 200]} />
      <meshPhysicalMaterial color={"#ffffff"} />
    </mesh>
  );
};

export default Floor;
