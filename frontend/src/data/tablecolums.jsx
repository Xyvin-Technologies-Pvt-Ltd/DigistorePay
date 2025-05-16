import { FaEye, FaCheckCircle, FaEdit } from "react-icons/fa";
import { IoBanSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import React from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "../components/modal/Modal";
import { useSelector } from "react-redux";

const columns = (handleViewDetails, currentUser) => {
  const coloumArray = [
    {
      header: "Unique ID",
      accessorKey: "franchiseUniqueId",
    },
    {
      header: "Franchise Name",
      accessorKey: "franchiseName",
    },
    {
      header: "User Plan",
      accessorKey: "userPlan",
    },
    {
      header: "Business Type",
      accessorKey: "businessType",
    },
    {
      header: "Owner Name",
      accessorKey: "ownerName",
    },
    {
      header: "Email Address",
      accessorKey: "email",
    },
    {
      header: "Mobile Number",
      accessorKey: "phoneNumber",
    },
    {
      header: "Franchise Address 1",
      accessorKey: "franchiseAddressLine1",
    },
    {
      header: "Franchise Address 2",
      accessorKey: "franchiseAddressLine2",
    },
    {
      header: "State",
      accessorKey: "state",
    },
    {
      header: "District",
      accessorKey: "district",
    },
    {
      header: "Pin Code",
      accessorKey: "pinCode",
    },
    {
      header: "Pan Center",
      accessorKey: "panCenter",
    },
    {
      header: "View",
      cell: ({ row }) => (
        <button
          onClick={() => handleViewDetails(row.original.franchiseUniqueId)}
          style={{
            border: "none",
            background: "transparent",
            padding: 0,
            margin: 0,
            cursor: "pointer",
            fontSize: "23px",
          }}
        >
          <FaEye />
        </button>
      ),
    },

    {
      header: "Status",
      cell: ({ row }) => {
        const [blocked, setBlocked] = useState(row.original.blocked);
        const user = row.original.franchiseName;
        const handleBlockUser = async () => {
          const newState = blocked === "blocked" ? "unBlocked" : "blocked";
          try {
            const response = await axios.put(
              `updateAccess/updateFranchiseBlock`,
              {
                uniqueId: row.original.franchiseUniqueId,
                blockStatus: newState,
              }
            );
            if (response.status === 200) {
              setBlocked(newState);
              toast.success(` ${user} is ${newState}`, { id: "franchise" });
            } else {
              toast.error(`Failed to ${newState} franchise ${user}`, {
                id: "franchise",
              });
            }
          } catch (error) {
            toast.error(
              error.response?.data?.message || "Something went wrong",
              { id: "franchise" }
            );
          }
        };

        return (
          <button
            onClick={handleBlockUser}
            style={{
              border: "none",
              background: "transparent",
              padding: 0,
              margin: 0,
              cursor: "pointer",
              fontSize: "20px",
            }}
          >
            {blocked === "blocked" ? (
              <IoBanSharp style={{ color: "red" }} />
            ) : (
              <FaCheckCircle style={{ color: "green" }} />
            )}
          </button>
        );
      },
    },
  ];
  if (currentUser === "admin") {
    coloumArray.push({
      header: "Delete",
      id: "Delete",
      cell: ({ row }) => {
        const [isModalOpen, setIsModalOpen] = useState(false);
        const currentUser = row.original.franchiseName;

        const handleClickDelete = async () => {
          try {
            const response = await axios.delete(
              `adminEditRoute/deleteFranchise`,
              {
                data: {
                  uniqueId: row.original.franchiseUniqueId,
                },
              }
            );
            if (response.status === 200) {
              toast.success(` ${currentUser} is Deleted`);
              setIsModalOpen(false);
            } else {
              toast.error("Failed to delete , try again");
            }
          } catch (error) {
            toast.error(
              error.response?.data?.message || "Something went wrong"
            );
          }
        };

        const handleOpenModal = () => {
          setIsModalOpen(true);
        };

        const handleCloseModal = () => {
          setIsModalOpen(false);
        };

        return (
          <>
            <button
              onClick={handleOpenModal}
              style={{
                border: "none",
                background: "transparent",
                padding: 0,
                margin: 0,
                cursor: "pointer",
                fontSize: "25px",
                color: "red",
              }}
            >
              <MdDelete />
            </button>
            {isModalOpen && (
              <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <div
                  style={{
                    fontWeight: "400",
                    padding: "20px 20px 0px 20px",
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <p
                    style={{
                      color: "var(--jetblack)",
                      marginBottom: "28px",
                      marginTop: "20px",
                      paddingRight: "2px",
                      paddingLeft: "2px",

                      textWrap: "wrap",
                    }}
                  >
                    Are you Sure you want to delete {currentUser}
                  </p>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "16px",
                      padding: "12px 36px",
                    }}
                  >
                    <button
                      onClick={handleCloseModal}
                      style={{
                        padding: "8px 12px",
                        backgroundColor: "var(--honoblue)",
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: "500",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleClickDelete}
                      style={{
                        padding: "8px 12px",
                        backgroundColor: "red",
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: "500",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Modal>
            )}
          </>
        );
      },
    });
  }

  return coloumArray;
};
export default columns;
