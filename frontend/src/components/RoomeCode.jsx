// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import axios from "axios";

// const RoomRedirect = () => {
//     const navigate = useNavigate();

//     useEffect(() => {
//         const createRoom = async () => {
//             try{
//                 const res= await axios.get(`${import.meta.env.VITE_API_URL}/room/create`);
//                 const roomCode = res.data.roomCode;
//                 navigate(`/stream/${roomCode}`, )
//             }catch (error) {
//                 console.error("Error creating room:", error);
//                 toast.error("Failed to create room. Please try again.");
//             }
//         };

//         createRoom();
//     }, [navigate]);

//     return <p>Genreating room</p>;

// };

// export default RoomRedirect;

 
