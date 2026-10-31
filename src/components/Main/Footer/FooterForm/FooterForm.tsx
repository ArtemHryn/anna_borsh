"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextareaAutosize from "react-textarea-autosize";
import { footerSchema, FooterFormData } from "@/schemas/footer.schema";
import FormInput from "./FormInput/FormInput";

import styles from "./FooterForm.module.scss";
import { useState } from "react";
import CheckBox from "./CheckBox/CheckBox";

const FooterForm = () => {
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false);
  const methods = useForm<FooterFormData>({
    resolver: zodResolver(footerSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      contact: "",
      message: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FooterFormData) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={styles.form}
      >
        <div className={styles.input_wrapper}>
          <FormInput
            name="name"
            label="ЯК ТЕБЕ ЗВАТИ?"
            placeholder="твоє ім’я"
          />
          <FormInput
            name="contact"
            label="КУДИ ВІДПОВІСТИ?"
            placeholder="пошта або @нік"
          />
          <label className={styles.label}>
            <span>ШО ХОЧЕШ СКАЗАТИ?</span>
            <TextareaAutosize
              {...register("message")}
              placeholder="пиши як є..."
              className={styles.textarea}
              minRows={3}
              maxRows={8}
            />
            {errors.message && <span>{errors.message.message}</span>}
          </label>
        </div>
        <CheckBox
          setIsPrivacyAccepted={setIsPrivacyAccepted}
          isPrivacyAccepted={isPrivacyAccepted}
        />
        <button
          type="submit"
          disabled={isSubmitting || !isPrivacyAccepted}
          className={`${styles.submit}`}
        >
          Відправити →
        </button>
      </form>
    </FormProvider>
  );
};

export default FooterForm;
