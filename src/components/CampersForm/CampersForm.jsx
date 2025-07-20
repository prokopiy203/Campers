import { useState } from "react";
import styles from "./CampersForm.module.css";
import toast from "react-hot-toast";
import CustomDatePicker from "../CustomDataPicker/CustomDataPicker";
import * as yup from "yup";

function CampersForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bookingDate: null,
    message: "",
  });

  const formSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    bookingDate: yup
      .date()
      .typeError("Booking date is required")
      .required("Booking date is required"),
    message: yup.string(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await formSchema.validate(formData, { abortEarly: false });

      const formattedDate = formData.bookingDate.toLocaleDateString("en-GB");

      toast.success(`Booking date selected: ${formattedDate}`);

      setFormData({
        name: "",
        email: "",
        bookingDate: null,
        message: "",
      });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        err.inner.forEach((error) => {
          toast.error(error.message);
        });
      } else {
        toast.error("Something went wrong while submitting the form.");
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className={styles.formWrapper}>
        <div className={styles.tittleBox}>
          <h2 className={styles.tittle}>Book your campervan now</h2>
          <p className={styles.decs}>
            Stay connected! We are always ready to help you.
          </p>
        </div>
        <div className={styles.formBox}>
          <div className={styles.formGroup}>
            <label htmlFor="name"></label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Name*"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email"></label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email*"
            />
          </div>
          <div>
            <label htmlFor="bookingDate"></label>
            <CustomDatePicker
              selectedDate={formData.bookingDate}
              onDateChange={(date) =>
                setFormData((prev) => ({ ...prev, bookingDate: date }))
              }
              placeholder="Booking date*"
            />
          </div>
          <div className={styles.formGroupTextarea}>
            <label htmlFor="message"></label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              placeholder="Comment"
            />
          </div>
          <div className={styles.btnBox}>
            <button type="submit" className={styles.submitButton}>
              Send
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default CampersForm;
