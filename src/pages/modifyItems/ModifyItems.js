import React from "react";
import { useLocation } from "react-router-dom";

export default function ModifyItems() {
  const location = useLocation();

  return (
    <div>
      ModifyItems
      {location.state?.user?.name && (
        <p>
          Hello{" "}
          <b style={{ textTransform: "capitalize" }}>
            {location.state.user.name}
          </b>
        </p>
      )}
    </div>
  );
}
