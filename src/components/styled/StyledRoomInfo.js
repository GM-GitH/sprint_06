import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


export default function StyledRoom() {

  const params = useParams();
  const rooms = useSelector((state) => state.rooms.rooms[params.id -1]);
console.log(rooms)
    return (
    <>
    ID: {rooms.id} <br/>
    Avatar: {rooms.avatar} <br/>
    Room ID: {rooms.room_id} <br/>
    Room Name: {rooms.room_name} <br/>
    Room Bed Type: {rooms.bed_type} <br/>
    Floor: {rooms.floor} <br/>
    Facilities: {rooms.facilities} <br/>
    Rate: {rooms.rate} <br/>
    Status: {JSON.stringify(rooms.status)} <br/>
    <br/>
    {JSON.stringify(params)}
    </>
    )
}


  