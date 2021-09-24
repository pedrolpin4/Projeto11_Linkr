import { IoLocationSharp } from "react-icons/io5";
import styled from "styled-components";
import { useState, useRef, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function LocationPin() {

  const [ showModal, setShowModal ] = useState(false);
  const modalRef = useRef();

  function closeLocation (e) {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  }

  const modalKeyEvents = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal === true) {
        setShowModal(false);
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", modalKeyEvents);
  }, [modalKeyEvents]);


  return (
    <>
      <LocationIcon onClick={() => setShowModal(true)} />
      {showModal ? (
        <>
          <ModalBackground
            ref={modalRef}
            onClick={closeLocation}
          ></ModalBackground>
          <Modal>
            <TopSection>
              <h2>Juvenal’s location</h2>
              <p onClick={() => setShowModal(false)}>X</p>
            </TopSection>
            <MapContainer
              center={[51.505, -0.09]}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>
                  Juvenal was here!
                </Popup>
              </Marker>
            </MapContainer>
          </Modal>
        </>
      ) : (
        ""
      )}
    </>
  );
  
}

const LocationIcon = styled(IoLocationSharp)`
  color: #ffffff;
  margin: 0 0 0 5px;
  width: 18.5px;
  height: 18.5px;
  cursor: pointer;
`;

const Modal = styled.div`
  position: fixed;
  top: calc((100vh - 375px) / 2);
  left: calc((100vw - 790px) / 2);
  height: 375px;
  width: 790px;
  background-color: #333333;
  opacity: 1;
  z-index: 130;
  border-radius: 20px;

  h2 {
    font-family: "Oswald", sans-serif;
    font-weight: bold;
    font-size: 38px;
    line-height: 56px;
    color: #ffffff;
  }

  p {
    font-size: 19.74px;
    color: #ffffff;
  }
`;

const TopSection = styled.div`


`;

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  right: 0px;
  background-color: rgba(255,255,255,0.6);
  z-index: 120;
`
const ModalContainer = styled.div`
  position: fixed;
  width: 966px;
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  top: 60px;
  left: calc((100vw - 966px) / 2);
  background: #333333;
  opacity: 1;
  z-index: 130;
  padding: 15px 20px 21px 20px;

  @media (max-width: 1000px) {
    width: 580px;
    left: calc((100% - 580px) / 2);
  }

  @media (max-width: 600px) {
    width: 100vw;
    left: 0px;
  }
`;