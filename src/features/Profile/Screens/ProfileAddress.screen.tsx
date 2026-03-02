import Addresses from "../Components/Addresses/Addresses";
import ProfileMain from "../Components/ProfileMain";

export default function ProfileAddressScreen() {
  return (
    <>
      <div className="min-h-screen bg-gray-50/50">
        <ProfileMain />
        <Addresses />
      </div>
    </>
  );
}
