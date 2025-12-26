"use client";
import "./form.css";
import useHubspotForm from "@/app/common/hooks/useHubspotForm";
import { FORM_INSTANCES } from "@/app/common/utils/helper-hubspot";
import { useEffect } from "react";
import { useAnalytics } from "../../utils/AnalyticsProvider";

const HubspotForm = () => {
  const { track } = useAnalytics();

  const formConfig = FORM_INSTANCES.CONTACT;

  const baseFields = formConfig.fields.slice(0, 5);
  const customField = formConfig.fields[5];
  const messageField = formConfig.fields[6];

  const {
    register,
    handleSubmit,
    submissionState,
    formState: { errors },
  } = useHubspotForm(formConfig);

  useEffect(() => {
    if (submissionState.isSuccess) {
      console.log("🎯 Formulario enviado con éxito, disparando Lead...");
      track("Lead");
    }
  }, [submissionState.isSuccess]);

  return (
    <form onSubmit={handleSubmit} className="form__contact">
      <div className="form__wrapper">
        {/* Base labels */}
        {baseFields.map((field) => (
          <label key={field.name} className="block">
            <span>{field.label}</span>
            <input
              {...register(field.name)}
              type={field.type}
              className="w-full p-2 border rounded"
            />
            {errors[field.name] && (
              <span className="text-red-500">
                {errors[field.name]?.message as string}
              </span>
            )}
          </label>
        ))}

        {/* Custom field */}
        <label className="block block__custom">
          <span>{customField.label}</span>
          <select {...register(customField.name)}>
            <option value="">Selecciona una opción</option>
            {customField.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors[customField.name] && (
            <span className="text-red-500">
              {errors[customField.name]?.message as string}
            </span>
          )}
        </label>
      </div>

      {/* Base message */}
      <label className="block__textarea">
        <span>{messageField.label}</span>
        <textarea {...register(messageField.name)} rows={4} />
        {errors[messageField.name] && (
          <span className="text-red-500">
            {errors[messageField.name]?.message as string}
          </span>
        )}
      </label>

      <button type="submit" disabled={submissionState.isSubmitting}>
        {submissionState.isSubmitting ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
};

export default HubspotForm;
