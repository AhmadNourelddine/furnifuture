import { useSelector } from "react-redux";
import AboutHome from "../../components/aboutHome";
import ContactUsModal from "../../components/contact-us-modal";
import Footer from "../../components/footer";

const About = () => {
  const openContactUs = useSelector((state) => state.modalContactUs);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <AboutHome />
      {openContactUs && <ContactUsModal />}
      <div
        style={{
          width: "100%",
          backgroundColor: "black",
          color: "white",
          alignSelf: "end",
        }}
      >
        <Footer />
      </div>
    </div>
  );
};
export default About;
