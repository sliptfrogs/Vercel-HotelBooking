import {
  Users,
  Home,
  Calendar,
  Search,
  Building,
  AlertCircle,
} from "lucide-react";
import DateRangePicker from "../../../../User/components/common/DateRangePicker";
import SelectRoom from "../../../../User/components/common/MenuSelection";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";

export default function RoomAvailabilityFilter({
  onSearch,
  className = "",
  title,
}) {
  const hotelOptions = [
    { value: "Suite", label: "Suite" },
    { value: "Deluxe", label: "Deluxe Room" },
    { value: "Standard", label: "Standard Room" },
    { value: "Executive", label: "Executive Suite" },
  ];

  const guestOptions = [
    { value: "1 Guest", label: "1 Guest" },
    { value: "2 Guests", label: "2 Guests" },
    { value: "3 Guests", label: "3 Guests" },
    { value: "4 Guests", label: "4 Guests" },
  ];

  // Validation schema
  const validationSchema = Yup.object().shape({
    dates: Yup.array()
      .min(2, "Please select both check-in and check-out dates")
      .required("Please select both check-in and check-out dates"),
    hotelType: Yup.string().required("Please select a hotel type"),
    guests: Yup.string().required("Please select number of guests"),
  });

  const formik = useFormik({
    initialValues: {
      dates: [],
      hotelType: "Suite",
      guests: "2 Guests",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("submitData", values);
    },
  });

  const handleRoomTypeChange = (hotelType) => {
    formik.setFieldValue("hotelType", hotelType);
  };
  const handleGuestsChange = (guests) => {
    formik.setFieldValue("guests", guests);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={`p-6 z-30 ${className} rounded-lg space-y-3 shadow-md`}
    >
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Date Selection */}
        <div className="col-span-1 h-full md:col-span-2">
          <DateRangePicker
            placeholder={["Check-in", "Check-out"]}
            name="dates"
            setFieldValue={formik.setFieldValue}
          />
        </div>

        {/* Hotel Type Selection */}
        <div className="col-span-1 h-full">
          <SelectRoom
            typeSelection={{ isSelectRoom: true }}
            icon={<Building />}
            title="Hotel Type"
            defaultSelection={formik.values.hotelType}
            defaultValue={hotelOptions}
            containerClassName="h-full"
            className="h-full"
            onChange={handleRoomTypeChange}
          />
          {formik.touched.hotelType && formik.errors.hotelType ? (
            <div className="mt-1 text-xs text-red-600">
              {formik.errors.hotelType}
            </div>
          ) : null}
        </div>

        {/* Guest Selection */}
        <div className="col-span-1 h-full">
          <SelectRoom
            typeSelection={{ isSelectGuests: true }}
            icon={<Users />}
            title="Guests"
            defaultSelection={formik.values.guests}
            defaultValue={guestOptions}
            onChange={handleGuestsChange}
            containerClassName="h-full"
            className="h-full"
          />
          {formik.touched.guests && formik.errors.guests ? (
            <div className="mt-1 text-xs text-red-600">
              {formik.errors.guests}
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          disabled={formik.isSubmitting}
        >
          <Search size={18} />
          {formik.isSubmitting ? "Searching..." : "Search Availability"}
        </button>
      </div>
    </form>
  );
}
