import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { useDispatch, useSelector } from "react-redux";
import {
  orderShowVideoAction,
} from "../../../action/PaymentVideosAction";
import { API_URLS } from "../../url/Api_Urls";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
function OrderVideoBody() {
  const dispatch = useDispatch();
  const { lodding, OrdersShow } = useSelector(
    (state) => state.orderVideoShowStore
  );

  useEffect(() => {
    dispatch(orderShowVideoAction());
  }, []);

  const deleteHandler = () => {};

  const tatalPriceHandler = (listItems) => {
    let sum = 0;
    listItems.forEach((element) => {
      sum += element.videoCost;
    });
    return sum;
  };
  return (
    <>
      <div className="profict__container">
        <div className="profict__box">
          <button style={{padding:'5px 40px',fontWeight:'bold',color:'red'}}>${tatalPriceHandler(OrdersShow)}</button>
          <Table className="video__table__container" striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Address</th>
                <th>Videos</th>
                <th>User Name</th>
                <th>Cost</th>
                <th>Payment Date</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {OrdersShow?.map((item, index) => (
                <tr key={index}>
                  <td>{item._id.substring(0, 10)}..</td>
                  <td>
                    {item.addressInfos[0].city},{item.addressInfos[0].address},
                    {item.addressInfos[0].country},{item.addressInfos[0].state}
                  </td>
                  <td>
                  <Link to={`/videos/signal/payment/${item.videoId}/undifind`}>
                  <video style={{ width: "100px", height: "70px" }} controls>
                      <source
                        src={API_URLS + `/images/videos/${item.video}`}
                        type="video/mp4"
                      />
                    </video>
                  </Link>
                  </td>
                  <td>{item.username}</td>
                  <td>${item.videoCost}</td>
                  <td>{format(item.createdAt)}</td>
                  <td>{item.addressInfos[0].phone}</td>
                  <td>
                    <div className="icon__section">
                      <div
                        onClick={() => deleteHandler(item._id, item.video)}
                        title="delete"
                      >
                        <DeleteSweepIcon className="delete__icon" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <div className="profit__bar__plot"></div>
    </>
  );
}

export default OrderVideoBody;
