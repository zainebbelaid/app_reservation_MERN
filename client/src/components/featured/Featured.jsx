
import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=marrakech,chefchaouen,casablanca"
  );
  
  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
       ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://images.pexels.com/photos/8571081/pexels-photo-8571081.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Marrakech</h1>
              <h2>{data[0]} Propriétés</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://media.istockphoto.com/photos/beautiful-street-of-blue-medina-in-city-chefchaouen-morocco-africa-picture-id923956240?b=1&k=20&m=923956240&s=612x612&w=0&h=0F0rb-bRMVN29uZJr1yiXLHOtcu5d_ViSSr-siWBi4w="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Chefchaouen</h1>
              <h2>{data[1]} Propriétés</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://images.pexels.com/photos/9677615/pexels-photo-9677615.png?auto=compress&cs=tinysrgb&w=600"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>casablanca</h1>
              <h2>{data[2]} Propriétés</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
