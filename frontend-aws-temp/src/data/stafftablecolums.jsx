import { FaEdit, FaCheckCircle } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoBanSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "../components/modal/Modal";

const columns = (handleViewDetails) => [
  {
    header: "Unique ID",
    accessorKey: "employeeId",
  },
  {
    header: "Employment",
    accessorKey: "employment",
  },
  {
    header: "Employment Type",
    accessorKey: "employmentType",
  },
  {
    header: "First Name",
    accessorKey: "firstName",
  },
  {
    header: "Last Name",
    accessorKey: "lastName",
  },
  {
    header: "Email",
    accessorKey: "emailId",
  },
  {
    header: "Phone Number",
    accessorKey: "phoneNumber",
  },
  {
    header: "Gender",
    accessorKey: "gender",
  },
  {
    header: "Blood Group",
    accessorKey: "bloodGroup",
  },
  {
    header: "Address",
    accessorKey: "addressLine1",
  },
  {
    header: "District",
    accessorKey: "district",
  },
  {
    header: "View",
    cell: ({ row }) => (
      <button
        onClick={() => handleViewDetails(row.original.employeeId)}
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
      const user = row.original.firstName;
      const handleBlockUser = async () => {
        const newState = blocked === "blocked" ? "unBlocked" : "blocked";
        try {
          const response = await axios.put(`updateAccess/updateStaffAccess`, {
            employeeId: row.original.employeeId,
            blocked: newState,
          });
          if (response.status === 201) {
            setBlocked(newState);
            toast.success(` ${user} is ${newState}`, { id: "staffTable" });
          } else {
            toast.error(`Failed to ${newState} franchise ${user}`, {
              id: "staffTable",
            });
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "Something went wrong", {
            id: "staffTable",
          });
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
  {
    header: "Delete",
    cell: ({ row }) => {
      const [isModalOpen, setIsModalOpen] = useState(false);

      const handleClickDelete = async () => {
        try {
          const response = await axios.delete(``, {
            data: {
              employeeId: row.original.employeeId,
            },
          });
          if (response.status === 200) {
            toast.success(` ${row.original.firstName} is Deleted`);
            setIsModalOpen(false);
          } else {
            toast.error("Failed to delete , try again");
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "Something went wrong");
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
                  backgroundColor: "var(--snowwhite)",
                  fontWeight: "400",
                  border: "none",
                  borderRadius: "6px",
                  paddingTop: "20px",
                  marginTop: "10px",
                }}
              >
                <p
                  style={{
                    color: "var(--jetblack)",
                    marginBottom: "28px",
                    marginTop: "20px",
                  }}
                >
                  Are you Sure you want to delete {row.original.firstName}
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
  },
];

export default columns;
