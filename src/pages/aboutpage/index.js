import HomeCarousel from "../../components/carousel";
import Footer from "../../components/footer";

const About = ()=>{
    return(
        <div style={{display:"flex", flexDirection:"column"}}>

        <div style={{minHeight:"calc( 100vh - 68.5px)", flexGrow:"1"}}>
        <HomeCarousel/>
        </div>

        <div style={{width:"100%", backgroundColor:"black", color:"white", alignSelf:"end"}}>
        <Footer />
        </div>
          
        </div>
    );
}
export default About;