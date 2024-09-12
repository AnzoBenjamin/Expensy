"use client";

import { Button, Label, Modal, TextInput, Select } from "flowbite-react";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Toast } from "flowbite-react";
import { SET_USER_GOALS_AND_LIMITS } from "../graphql/mutations/userGoalsAndLimits.mutation";

export function LimitModal() {
  const [openModal, setOpenModal] = useState(false);
  const [category, setCategory] = useState("saving");
  const [amount, setAmount] = useState("");
  const [setUserGoalsAndLimits] = useMutation(SET_USER_GOALS_AND_LIMITS);

  function onCloseModal() {
    setOpenModal(false);
    setCategory("saving");
    setAmount("");
  }

  async function onSubmit(e) {
    e.preventDefault();

    try {
      const input = {
        goals: {},
        limits: {},
      };

      // Dynamically set the goal or limit for the selected category
      input.limits[category] = parseFloat(amount);

      // Send the mutation request
      await setUserGoalsAndLimits({
        variables: { input },
      });

      // Success: close the modal and reset state
      alert("Limits set successfully!");
      onCloseModal();
    } catch (err) {
      console.error("Error setting limits:", err);
      alert("Failed to set goals/limits. Please try again.");
    }
  }

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        className="bg-gradient-to-br from-pink-500 to-pink-500 hover:from-pink-600 hover:to-pink-600"
      >
        Set limits
      </Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={onSubmit} className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Set some limits based on your category of choice
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="category" value="Choose your category" />
              </div>
              <Select
                className="block appearance-none w-full text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value={"saving"}>Saving</option>
                <option value={"expense"}>Expense</option>
                <option value={"investment"}>Investment</option>
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="amount" value="Amount" />
              </div>
              <input
                className="appearance-none block w-full border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="amount"
                name="amount"
                type="number"
                placeholder="150"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div>
              <Button
                type="submit"
                className="bg-gradient-to-br from-green-500 to-green-500 hover:from-green-600 hover:to-green-600"
              >
                Submit
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
