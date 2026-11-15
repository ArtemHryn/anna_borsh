"use client";

import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import FormLabel from "./FormLabel/FormLabel";
import Selector from "./Selector/Selector";

import styles from "./AmbassadorSettings.module.scss";

const payoutSchedules = [
  { label: "У день виплати", value: "ON_PAYOUT_DAY" },
  {
    label: "Через 14 днів після дня виплати",
    value: "ON_PAYOUT_DAY_AFTER_14_DAYS",
  },
] as const;

type PayoutSchedule = (typeof payoutSchedules)[number]["value"];

const accrualDays = Array.from({ length: 30 }, (_, index) => {
  const day = index + 1;
  return { label: String(day), value: day };
});

interface AmbassadorSettingsFormValues {
  commissionPercentage: number;
  payoutSchedule: PayoutSchedule;
  minimumPayoutAmount: number;
  termsUrl: string;
  accrualDayOfMonth: number;
}

const AmbassadorSettings = () => {
  const methods = useForm<AmbassadorSettingsFormValues>({
    defaultValues: {
      commissionPercentage: 0,
      payoutSchedule: "ON_PAYOUT_DAY_AFTER_14_DAYS",
      minimumPayoutAmount: 10,
      termsUrl: "",
      accrualDayOfMonth: 1,
    },
  });

  const onSubmit: SubmitHandler<AmbassadorSettingsFormValues> = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
        <div className={styles.label_wrapper}>
          <FormLabel
            label={"РОЗМІР КОМІСІЇ"}
            name={"commissionPercentage"}
            type="number"
            placeholder={"Введіть розмір комісії в %"}
            clampRange={{ min: 0, max: 100 }}
            registerOptions={{
              required: true,
              valueAsNumber: true,
              min: 0,
              max: 100,
            }}
          />
          <Selector<AmbassadorSettingsFormValues>
            name="payoutSchedule"
            label="ЗАРАХУВАННЯ ПРОДАЖІВ"
            options={payoutSchedules}
            placeholder="Оберіть термін виплати"
          />
          <FormLabel
            label={"УМОВИ ВИПЛАТИ"}
            name={"minimumPayoutAmount"}
            type="number"
            placeholder={"Мінімальна сума для виплати"}
            registerOptions={{ required: true, valueAsNumber: true }}
          />
          <FormLabel
            label={"В оферті (як посилання)"}
            name={"termsUrl"}
            type="text"
            placeholder={"Введіть URL умов офери"}
          />
          <Selector<AmbassadorSettingsFormValues>
            name="accrualDayOfMonth"
            label="ДЕНЬ НАРАХУВАННЯ КОШТІВ"
            options={accrualDays}
            placeholder="Оберіть день"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default AmbassadorSettings;
