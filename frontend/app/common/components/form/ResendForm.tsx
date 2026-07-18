"use client";

import "./form.css";
import { useResendForm } from "@/app/common/hooks/useResendForm";
import { useAnalytics } from "@/app/common/utils/AnalyticsProvider";
import { useEffect } from "react";

const INTEREST_OPTIONS = [
  { value: "option_1", label: "Opción 1" },
  { value: "option_2", label: "Opción 2" },
  { value: "option_3", label: "Opción 3" },
];

const ResendForm = () => {
  const { track } = useAnalytics();
  const {
    register,
    handleSubmit,
    formState: { errors },
    submissionState,
  } = useResendForm();

  useEffect(() => {
    if (submissionState.isSuccess) {
      track("Lead");
    }
  }, [submissionState.isSuccess]);

  return (
    <form onSubmit={handleSubmit} className="form__contact">
      <div className="form__wrapper">
        <label className="block">
          <span>Nombre</span>
          <input {...register("firstname", { required: "El nombre es obligatorio" })} type="text" />
          {errors.firstname && <span className="text-red-500">{errors.firstname.message}</span>}
        </label>

        <label className="block">
          <span>Apellido</span>
          <input {...register("lastname", { required: "El apellido es obligatorio" })} type="text" />
          {errors.lastname && <span className="text-red-500">{errors.lastname.message}</span>}
        </label>

        <label className="block">
          <span>Correo electrónico</span>
          <input {...register("email", { required: "El correo es obligatorio" })} type="email" />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </label>

        <label className="block">
          <span>Teléfono</span>
          <input {...register("phone", { required: "El teléfono es obligatorio" })} type="tel" />
          {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
        </label>

        <label className="block">
          <span>Ciudad</span>
          <input {...register("city", { required: "La ciudad es obligatoria" })} type="text" />
          {errors.city && <span className="text-red-500">{errors.city.message}</span>}
        </label>

        <label className="block block__custom">
          <span>Interesado en</span>
          <select {...register("interest", { required: "Selecciona una opción" })}>
            <option value="">Selecciona una opción</option>
            {INTEREST_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.interest && <span className="text-red-500">{errors.interest.message}</span>}
        </label>
      </div>

      <label className="block__textarea">
        <span>Comentarios</span>
        <textarea {...register("message")} rows={4} />
        {errors.message && <span className="text-red-500">{errors.message.message}</span>}
      </label>

      {submissionState.isSuccess && (
        <p style={{ color: "green" }}>¡Mensaje enviado con éxito!</p>
      )}
      {submissionState.isError && (
        <p style={{ color: "red" }}>{submissionState.errorMessage}</p>
      )}

      <button className="btn" type="submit" disabled={submissionState.isSubmitting}>
        {submissionState.isSubmitting ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
};

export default ResendForm;
