"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faGear,
  faLocationDot,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

import AddAddressModal from "./AddAddressModal";
import AddressDetailsCard from "./AddressDetailsCard";
import { AddAddressPayload, Address } from "../../Types/addresses.types";
import {
  getAddresses,
  addAddress as addAddressServer,
  updateAddress,
} from "../../Server/addresses.actions";
import { deleteAddress as deleteAddressServer } from "../../Server/addresses.actions";

export default function Addresses() {
  const pathname = usePathname();
  const isAddresses = pathname === "/profile/addresses";
  const isSettings = pathname === "/profile/settings";

  const [isOpen, setIsOpen] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);

  // Fetch addresses on mount
  useEffect(() => {
    async function fetchAddresses() {
      try {
        const res = await getAddresses();
        setAddresses(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchAddresses();
  }, []);

  const handleSubmitAddress = async (values: AddAddressPayload) => {
    try {
      if (editingAddress) {
        const updated = await updateAddress(editingAddress._id, values);

        // Update state locally
        setAddresses((prev) =>
          prev.map((addr) =>
            addr._id === editingAddress._id ? updated : addr,
          ),
        );
      } else {
        const added = await addAddressServer(values);

        setAddresses((prev) => [...prev, added]);
      }

      setEditingAddress(null);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    try {
      await deleteAddressServer(id);

      const res = await getAddresses();
      setAddresses(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-72 shrink-0">
          <nav className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">My Account</h2>
            </div>
            <ul className="p-2">
              <li>
                <Link
                  href="/profile/addresses"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isAddresses
                      ? "bg-primary-50 text-primary-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                      isAddresses
                        ? "bg-primary-500 text-white"
                        : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                    }`}
                  >
                    <FontAwesomeIcon icon={faLocationDot} />
                  </div>
                  <span className="font-medium flex-1">My Addresses</span>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className={`text-xs ${
                      isAddresses ? "text-primary-500" : "text-gray-400"
                    }`}
                  />
                </Link>
              </li>
              <li>
                <Link
                  href="/profile/settings"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isSettings
                      ? "bg-primary-50 text-primary-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                      isSettings
                        ? "bg-primary-500 text-white"
                        : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                    }`}
                  >
                    <FontAwesomeIcon icon={faGear} />
                  </div>
                  <span className="font-medium flex-1">My Settings</span>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className={`text-xs ${
                      isSettings ? "text-primary-500" : "text-gray-400"
                    }`}
                  />
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  My Addresses
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Manage your saved delivery addresses
                </p>
              </div>
              <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25"
              >
                <FontAwesomeIcon icon={faPlus} /> Add Address
              </button>
            </div>

            {/* Address List */}
            {addresses.length === 0 ? (
              <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="text-gray-400 text-3xl"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  No Addresses Yet
                </h3>
                <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                  Add your first delivery address to make checkout faster and
                  easier.
                </p>
                <button
                  onClick={() => setIsOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25"
                >
                  <FontAwesomeIcon icon={faPlus} /> Add Your First Address
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {addresses.map((addr) => (
                  <AddressDetailsCard
                    key={addr._id}
                    address={addr}
                    onDelete={() => handleDeleteAddress(addr._id)}
                    onEdit={() => {
                      setEditingAddress(addr);
                      setIsOpen(true);
                    }}
                  />
                ))}
              </div>
            )}

            {/* Add Address Modal */}
            <AddAddressModal
              isOpen={isOpen}
              onClose={() => {
                setIsOpen(false);
                setEditingAddress(null);
              }}
              onSubmit={handleSubmitAddress}
              initialValues={editingAddress}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
