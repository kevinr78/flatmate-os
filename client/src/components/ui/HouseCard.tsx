import { PlusCircleIcon, LoaderCircle } from "lucide-react";
import Card from "../utils/views/Card.tsx";
import { useModal } from "../../store/context/ModalContext.tsx";
import NewHouseForm from "../services/NewHouseForm.tsx";
import { getUserHouseDetails } from "../utils/api/house.ts";
import { useEffect, useState } from "react";

export default function HouseCard() {
  const [loading, setLoading] = useState<boolean>(false);
  const [houseDetails, setHouseDetails] = useState<any>(null);
  useEffect(() => {
    setLoading(true);
    async function getHouseDetails() {
      setLoading(true);
      const res = await getUserHouseDetails();
      if (res.data.success) {
        console.log(res.data.data.house);
        setHouseDetails(res.data.data.house);
      } else {
        console.error("Failed to fetch house details");
      }
      setLoading(false);
    }
    getHouseDetails();
  }, []);

  function renderMembers() {
    if (
      !houseDetails ||
      !houseDetails.members ||
      houseDetails.members.length === 0
    ) {
      return <p className="text-center">No members in this house.</p>;
    }
    return houseDetails.invites.map((member: any, index: number) => (
      <div className="badge badge-info" key={index}>
        {member.email}
      </div>
    ));
  }

  const { openModal } = useModal();
  return (
    <Card showImg={false}>
      <div>
        <header className="text-center flex justify-evenly mb-2">
          <p className="font-extrabold ">Your House Details</p>
          <button
            className="btn btn-primary btn-xs items-center"
            onClick={() => {
              openModal(<NewHouseForm />, "Create House", "md");
            }}
          >
            <PlusCircleIcon className="inline w-4" />
            Create New House
          </button>
        </header>
        {loading && (
          <p className="text-center">
            {" "}
            <LoaderCircle></LoaderCircle>{" "}
          </p>
        )}
        {!loading && houseDetails && (
          <div className="flex flex-col justify-center gap-2">
            <p className="flex justify-between">
              <span>
                You belong to
                <span className="font-semibold ml-2">{houseDetails.name}</span>
              </span>
            </p>
            <div>
              <p className="mb-4">Members</p>
              <div className="flex gap-4">{renderMembers()}</div>
            </div>
          </div>
        )}{" "}
      </div>
    </Card>
  );
}
