import React from "react";
import { createHouse } from "../utils/api/house";
export default function NewHouseForm() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const houseName = formData.get("name") as string;
    const invites = formData.get("inviteList") as string;
    invites.split(",").map((email) => (email = email.trim()));
    const response = await createHouse({
      name: houseName,
      inviteList: invites as unknown as string[],
    });
    console.log(response);
  };

  return (
    <section>
      <form action="" method="POST" onSubmit={handleSubmit}>
        <fieldset className="fieldset  border-base-300 rounded-box  border p-4">
          <label className="label">House Name</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Enter your house name"
            name="name"
          />

          <label className="label">Invites</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Enter ',' separated user emails"
            name="inviteList"
          />
        </fieldset>
        <div className="flex justify-end mt-4">
          <button type="submit" className="btn btn-primary">
            Create House
          </button>
        </div>
      </form>
    </section>
  );
}
