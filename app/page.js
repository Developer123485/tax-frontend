import Image from "next/image";
import Header from "./components/header/header";
import HomeSections from "./components/home-sections/page";

export default function Home() {
  return (
    <>
      <Header></Header>
      <HomeSections></HomeSections>
    </>
  );
}
