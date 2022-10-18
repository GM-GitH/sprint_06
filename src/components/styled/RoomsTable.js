import { useEffect, useState } from "react";
import styled from "styled-components";
// import jsonRooms from "../../json/jsonRoom";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
// import { fetchedRooms } from "../../features/rooms/roomsSlice";
import { roomsList, fetchRooms } from "../../features/rooms/roomsSlice";
import ContextMenu from "../ContextMenu";
import presidential_suite from "../../assets/img/presidential_suite.jpeg"

const Style = styled.div`
  .card {
    margin-top: 30px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 4px 4px #00000005;
    padding: 0px 0px 20px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    overflow-wrap: break-word;
  }
  th {
    text-align: left;
    padding: 20px 10px 20px 15px;
    overflow-wrap: break-word;
  }
  tr {
    position: relative;
    border-bottom: 1px solid #f5f5f5;
    &:hover {
      background-color: #00000005;
    }
  }
  td {
    position: relative;
    padding: 20px 15px;
    vertical-align: center;
  }
  input {
    cursor: pointer;
  }
  .room__img {
    max-width: 200px;
    border-radius: 10px;
    background-color: gray;
    &:hover {
      cursor: pointer;
    }
  }
  .room_txt {
    &__p1 {
      cursor: pointer;
      margin-top: 0;
      color: #799283;
      font-size: 12px;
    }
    &__p2 {
      color: #393939;
      font-size: 14px;
    }
  }
  .mini {
    color: #799283;
    font-size: 12px;
    padding-left: 5px;
  }
  .status {
    display: flex;
    justify-content: space-between;
    & button {
    }
    &__b1 {
      min-width: 90px;
      font-family: "Poppins", sans-serif;
      color: #ffffff;
      border-style: none;
      border-radius: 10px;
      padding: 10px 20px;
      margin-right: 50px;
      overflow-wrap: normal;
    }
    &__b2 {
      cursor: pointer;
      position: absolute;
      top: 10px;
      right: 20px;
      border-style: none;
      border-radius: 10px;
      color: #6e6e6e;
      background-color: inherit;
      font-size: 25px;
      font-weight: 700;
      &:hover {
        color: black;
        font-size: 28px;
      }
    }
  }
  .Availible {
    background-color: #5ad07a;
    &:hover {
      filter: brightness(110%);
    }
  }
  .Booked {
    background-color: #e23428;
    &:hover {
      filter: brightness(110%);
    }
  }
  .paginationContainer {
    display: flex;
    justify-content: space-between;
    padding: 5px;
    margin-top: 20px;
    user-select: none;
  }
  .paginationBtns {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
    & li {
      margin-top: 10px;
    }
    & a {
      text-align: center;
      color: #135846;
      background-color: inherit;
      font-size: 14px;
      border-style: none;
      border-radius: 10px;
      padding: 10px 20px;
      margin-left: 0px;
      &:hover {
        color: #ffffff;
        background-color: #135846;
      }
    }
  }
  .previousBtn {
    border: 1px solid #135846 !important;
    margin-right: 20px;
  }
  .nextBtn {
    border: 1px solid #135846 !important;
    margin-left: 20px !important;
  }
  .paginationActive a {
    color: #ffffff;
    border: 1px solid #135846;
    background-color: #135846;
    cursor: default;
  }
`;

export const RoomsTable = () => {


  const rooms = useSelector(roomsList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRooms())
  }, [dispatch])
  


  const list = rooms.slice(0, 20);
  const [page, setPage] = useState(0);
  const listItemsPerPage = 5;
  const pagesVisited = page * listItemsPerPage;
  const displayRooms = list.slice(pagesVisited, pagesVisited + listItemsPerPage).map((room) => {
    return (
      <tr key={room.id}>
        <td>
          <input type="checkbox" name="" id="" />
        </td>
        <td>
          <img className="room__img" src={presidential_suite} alt="<Empty>" />
        </td>
        <td>
          <div className="room_txt">
            <p className="room_txt__p1">#{room.room_id}</p>
            <p className="room_txt__p2">{room.room_name}</p>
          </div>
        </td>
        <td>{room.bed_type}</td>
        <td>{`Floor ${room.floor} Room ${room.id}`}</td>
        <td>AC, Shower, Double Bed, Towel, Bathup, Coffee Set, LED TV, Wifi</td>
        <td>
          ${room.rate}
          <span className="mini">/night</span>
        </td>
        <td>
          <button className={room.status ? "status__b1 Availible" : "status__b1 Booked"}>{room.status ? "Availible" : "Booked"}</button>
          <div className="status__b2"><ContextMenu id={room.id}/></div>
          {/* ⋮ */}
        </td>
      </tr>
    );
  });
  const pageCount = Math.ceil(list.length / listItemsPerPage);
  const changePage = ({ selected }) => {
    setPage(selected);
  };

  return (
    <>
      <Style>
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" name="" id="" />
                </th>
                <th>Room Name</th>
                <th></th>
                <th style={{ width: "90px" }}>Bed Type</th>
                <th style={{ width: "90px" }}>Room Floor</th>
                <th>Facilities</th>
                <th>Rate</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{displayRooms}</tbody>
          </table>
        </div>
        <div className="paginationContainer">
          <p>
            Showing {listItemsPerPage} of {list.length} Data
          </p>
          <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBtns"}
            previousLinkClassName={"previousBtn"}
            nextLinkClassName={"nextBtn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>
      </Style>
    </>
  );
};
