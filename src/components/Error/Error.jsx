import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

export default function Error() {
  return (
    <div className="p-[20px] flex justify-center">
      <h1 className="text-red-600 text-center">
        <FontAwesomeIcon icon={faWarning} />
        {/* Error */}
      </h1>
    </div>
  );
}
