import { useState } from "react";
import CommingSoon from "../../component/homes/center_entry/CommingSoon";
import E_Top2 from "../../component/homes/top_entry/E_Top2";
import E_Top from "../../component/homes/top_entry/E_Top";
import E_Footer from "../../component/homes/footer/E_Footer";
import NotificationBox from "../../component/homes/top_entry/NotificationBox";

function Home() {
  const [notification, setNotification] = useState(false);
  const [coursolHeight, setCoursolHeight] = useState(false);
  return (
    <>
      {notification && <NotificationBox />}
      <div className="top__entry">
        <div className="top__entry__image">
          <E_Top
            coursolHeight={coursolHeight}
            setNotification={setNotification}
          />
        </div>
        <div>
          <E_Top2 coursolHeight={coursolHeight} />
        </div>
      </div>
      <div className="">
        <CommingSoon setCoursolHeight={setCoursolHeight} />
      </div>
      <E_Footer />
    </>
  );
}

export default Home;
