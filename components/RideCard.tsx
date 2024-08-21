import { Image, Text, View } from "react-native";
import { formatDate, formatTime } from "@/libs/utils";

import { Ride } from "@/types/type";
import { icons } from "@/constants";

const RideCard = ({
  ride: {
    destination_longitude,
    destination_latitude,
    origin_address,
    destination_address,
    created_at,
    ride_time,
    driver,
    payment_status,
  },
}: {
  ride: Ride;
}) => {
  /**
   * Render detail component
   * @param {string} label - Label of the detail
   * @param {string} value - Value of the detail
   * @param {string} valueClass - Class of the value
   */
  const renderDetail = (label: string, value: string, valueClass?: string) => (
    <View className="flex flex-row items-center w-full justify-between mb-5">
      <Text className="text-md font-JakartaMedium text-gray-500">{label}</Text>
      <Text
        className={`text-md font-JakartaBold ${valueClass}`}
        numberOfLines={1}
      >
        {value}
      </Text>
    </View>
  );

  return (
    <View className="flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3">
      <View className="flex flex-col items-start justify-center p-3">
        <View className="flex flex-row items-center justify-between">
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            className="w-[80px] h-[90px] rounded-lg"
          />

          <View className="flex flex-col mx-5 gap-y-5 flex-1">
            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.to} className="w-5 h-5" />
              <Text className="text-md font-JakartaMedium" numberOfLines={1}>
                {origin_address}
              </Text>
            </View>

            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.point} className="w-5 h-5" />
              <Text className="text-md font-JakartaMedium" numberOfLines={1}>
                {destination_address}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex flex-col w-full mt-5 bg-general-500 rounded-lg p-3 items-start justify-center">
          {renderDetail(
            "Date & Time",
            `${formatDate(created_at)}, ${formatTime(ride_time)}`,
          )}
          {renderDetail("Driver", `${driver.first_name} ${driver.last_name}`)}
          {renderDetail("Car Seats", `${driver.car_seats}`)}
          {renderDetail(
            "Payment Status",
            payment_status,
            payment_status === "paid" ? "text-green-500" : "text-red-500",
          )}
        </View>
      </View>
    </View>
  );
};

export default RideCard;
