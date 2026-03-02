import { Address } from "../../Types/addresses.types";
import {
  faCity,
  faLocationDot,
  faPen,
  faPhone,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  address: Address;
  onDelete: () => void;
  onEdit: () => void;
}

export default function AddressDetailsCard({
  address,
  onDelete,
  onEdit,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-primary-100 transition-all duration-200 group">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center shrink-0 group-hover:bg-primary-100 transition-colors">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="text-lg text-primary-600"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 mb-1">{address.name}</h3>
              <p
                className="text-sm text-gray-600 mb-3 
               onEdit: () => void;line-clamp-2"
              >
                {address.details}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faPhone} /> {address.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faCity} /> {address.city}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-600 flex items-center justify-center transition-colors"
              onClick={onEdit}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button
              onClick={onDelete}
              className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-600 flex items-center justify-center transition-colors"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
