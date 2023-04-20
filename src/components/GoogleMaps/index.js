import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState } from "react";

const center = { lat: 42.500399, lng: -83.319601 };

function GoogleMaps(props) {
  console.log("props", props);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBX0Y3EMJAuhTpMy2r9d5s-ZovicTkmXww",
    libraries: ["places"],
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [timeString, setTimeString] = useState("");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  if (!isLoaded) {
    return <SkeletonText />;
  }

  async function calculateRoute() {
    if (destiantionRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    console.log(
      "originRef.current.value",
      JSON.parse(localStorage.getItem("storeInfo")).address
    );
    const results = await directionsService.route({
      origin: JSON.parse(localStorage.getItem("storeInfo")).address,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    let time = convertToMins(results.routes[0].legs[0].duration.text);
    convertToHoursString(time);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  const convertToMins = (time) => {
    const timeString = time;
    const timeArray = timeString.split(" ");
    let hours = 0;
    let mins = 0;
    if (timeArray[1].includes("hour")) {
      hours = parseInt(timeArray[0]);
    } else if (timeArray[1]?.includes("mins")) {
      mins = parseInt(timeArray[0]);
    }
    if (timeArray[3]?.includes("mins")) {
      mins = parseInt(timeArray[2]);
    }
    const totalMins = hours * 60 + mins + 45;
    console.log("totalMins", totalMins, hours, mins);
    return totalMins; // Output: 123
  };

  const convertToHoursString = (time) => {
    const totalMins = time;
    const hours = Math.floor(totalMins / 60);
    const mins = totalMins % 60;
    const timeString = `${hours === 0 ? "" : `${hours} hours`} ${mins} mins`;

    setTimeString(timeString); // Output: "2 hours 3 mins"
  };

  return (
    <div
      style={{
        width: "900px",
        height: "500px",
        margin: "auto",
        marginTop: "50px",
      }}
    >
      {distance && <p>You will be receiving the order in {timeString}</p>}
      <Flex
        position="relative"
        flexDirection="column"
        alignItems="center"
        h="100%"
        w="100%"
      >
        <Box position="absolute" left={0} top={0} h="100%" w="100%">
          {/* Google Map Box */}
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={(map) => setMap(map)}
          >
            <Marker position={center} />
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        </Box>
        <Box
          p={4}
          borderRadius="lg"
          m={4}
          bgColor="white"
          shadow="base"
          minW="container.md"
          zIndex="1"
        >
          <HStack spacing={2} justifyContent="space-between">
            <Box flexGrow={1}>
              <Autocomplete>
                <Input
                  type="text"
                  placeholder="Destination"
                  ref={destiantionRef}
                />
              </Autocomplete>
            </Box>

            <ButtonGroup>
              <Button colorScheme="pink" type="submit" onClick={calculateRoute}>
                Calculate Route
              </Button>
              <IconButton
                aria-label="center back"
                icon={<FaTimes />}
                onClick={clearRoute}
              />
            </ButtonGroup>
          </HStack>
          <HStack spacing={4} mt={4} justifyContent="space-between">
            <Text>Distance: {distance} </Text>
            <Text>Duration: {duration} </Text>
            <IconButton
              aria-label="center back"
              icon={<FaLocationArrow />}
              isRound
              onClick={() => {
                map.panTo(center);
                map.setZoom(15);
              }}
            />
          </HStack>
        </Box>
      </Flex>
    </div>
  );
}

export default GoogleMaps;
